import { z } from 'zod';
import { Vote } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { createProtectedRouter } from './context';

import type { Answer } from '~/types/questions-question';

export const questionsQuestionAnswerRouter = createProtectedRouter()
  .query('getAnswers', {
    input: z.object({
      questionId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const questionAnswersData = await ctx.prisma.questionsAnswer.findMany({
        include: {
        _count: {
          select: {
            comments: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
        votes: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          ...input,
        },
    });
    return questionAnswersData.map((data) => {
      const votes:number = data.votes.reduce(
        (previousValue:number, currentValue) => {
          let result:number = previousValue;

          switch(currentValue.vote) {
          case Vote.UPVOTE:
            result += 1
            break;
          case Vote.DOWNVOTE:
            result -= 1
            break;
          }
          return result;
        },
        0
        );

      let userName = "";

      if (data.user) {
        userName = data.user.name!;
      }


      const question: Answer = {
        content: data.content,
        createdAt: data.createdAt,
        id: data.id,
        numComments: data._count.comments,
        numVotes: votes,
        user: userName,
      };
      return question;
    });
    }
  })
  .mutation('create', {
    input: z.object({
      content: z.string(),
      questionId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;

      return await ctx.prisma.questionsAnswer.create({
        data: {
          ...input,
          userId,
        },
      });
    },
  })
  .mutation('update', {
    input: z.object({
      content: z.string().optional(),
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;

      const questionCommentToUpdate = await ctx.prisma.questionsAnswer.findUnique({
        where: {
          id: input.id,
        },
      });

      if (questionCommentToUpdate?.id !== userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User have no authorization to record.',
        });
      }

      return await ctx.prisma.questionsAnswer.update({
        data: {
          ...input,
          userId,
        },
        where: {
          id: input.id,
        },
      });
    },
  })
  .mutation('delete', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.user?.id;

      const questionCommentToUpdate = await ctx.prisma.questionsAnswer.findUnique({
        where: {
          id: input.id,
        },});

      if (questionCommentToUpdate?.id !== userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User have no authorization to record.',
        });
      }

      return await ctx.prisma.questionsAnswer.delete({
        where: {
          id: input.id,
        },
      });
    },
  });