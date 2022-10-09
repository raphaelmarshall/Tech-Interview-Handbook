import { useState } from 'react';
import {
  AcademicCapIcon,
  BookmarkSquareIcon,
  BriefcaseIcon,
  BuildingOffice2Icon,
  CalendarDaysIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { Button, Tabs, TextArea } from '@tih/ui';

import { EducationBackgroundType } from '~/components/offers/profile/EducationCard';
import EducationCard from '~/components/offers/profile/EducationCard';
import OfferCard from '~/components/offers/profile/OfferCard';
import ProfilePhotoHolder from '~/components/offers/profile/ProfilePhotoHolder';

export default function OfferProfile() {
  const [selectedTab, setSelectedTab] = useState('offers');
  //   Const [isDialogOpen, setIsDialogOpen] = useState(false);
  function renderActionList() {
    return (
      //   <div>
      //     <Button
      //       label="Open"
      //       variant="primary"
      //       onClick={() => setIsDialogOpen(true)}
      //     />
      //     {isDialogOpen && (
      //       <Dialog
      //         primaryButton={
      //           <Button
      //             display="block"
      //             label="OK"
      //             variant="primary"
      //             onClick={() => setIsDialogOpen(false)}
      //           />
      //         }
      //         secondaryButton={
      //           <Button
      //             display="block"
      //             label="Cancel"
      //             variant="tertiary"
      //             onClick={() => setIsDialogOpen(false)}
      //           />
      //         }
      //         title="Lorem ipsum, dolor sit amet"
      //         onClose={() => setIsDialogOpen(false)}>
      //         <div>
      //           Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius
      //           aliquam laudantium explicabo pariatur iste dolorem animi vitae
      //           error totam. At sapiente aliquam accusamus facere veritatis.
      //         </div>
      //       </Dialog>
      //     )}
      //   </div>

      <div className="space-x-2">
        <Button
          icon={BookmarkSquareIcon}
          isLabelHidden={true}
          label="Save to user account"
          size="md"
          variant="tertiary"
        />
        <Button
          icon={PencilSquareIcon}
          isLabelHidden={true}
          label="Edit"
          size="md"
          variant="tertiary"
        />
        <Button
          icon={TrashIcon}
          isLabelHidden={true}
          label="Delete"
          size="md"
          variant="tertiary"
        />
      </div>
    );
  }
  function ProfileHeader() {
    return (
      <div className="relative h-40 bg-white p-4">
        <div className="justify-left flex h-1/2">
          <div className="mx-4 mt-2">
            <ProfilePhotoHolder />
          </div>
          <div className="w-full">
            <div className="justify-left flex ">
              <h2 className="flex w-4/5 text-2xl font-bold">anonymised-name</h2>
              <div className="flex h-8 w-1/5 justify-end">
                {renderActionList()}
              </div>
            </div>
            <div className="flex flex-row">
              <BuildingOffice2Icon className="mr-2.5 h-5" />
              <span className="mr-2 font-bold">Current:</span>
              <span>Level 4 Google</span>
            </div>
            <div className="flex flex-row">
              <CalendarDaysIcon className="mr-2.5 h-5" />
              <span className="mr-2 font-bold">YOE:</span>
              <span>4</span>
            </div>
          </div>
        </div>

        <div className="absolute left-8 bottom-1 content-center">
          <Tabs
            label="Profile Detail Navigation"
            tabs={[
              {
                label: 'Offers',
                value: 'offers',
              },
              {
                label: 'Background',
                value: 'background',
              },
              {
                label: 'Offer Engine Analysis',
                value: 'offerEngineAnalysis',
              },
            ]}
            value={selectedTab}
            onChange={(value) => setSelectedTab(value)}
          />
        </div>
      </div>
    );
  }

  function ProfileDetails() {
    if (selectedTab === 'offers') {
      return (
        <>
          {[
            {
              base: undefined,
              bonus: undefined,
              companyName: 'Meta',
              id: 1,
              jobLevel: 'G5',
              jobTitle: 'Software Engineer',
              location: 'Singapore',
              monthlySalary: undefined,
              negotiationStrategy:
                'Nostrud nulla aliqua deserunt commodo id aute.',
              otherComment:
                'Pariatur ut est voluptate incididunt consequat do veniam quis irure adipisicing. Deserunt laborum dolor quis voluptate enim.',
              receivedMonth: 'Jun 2022',
              stocks: undefined,
              totalCompensation: undefined,
            },
            {
              companyName: 'Meta',
              id: 2,
              jobLevel: 'G5',
              jobTitle: 'Software Engineer',
              location: 'Singapore',
              receivedMonth: 'Jun 2022',
            },
            {
              companyName: 'Meta',
              id: 3,
              jobLevel: 'G5',
              jobTitle: 'Software Engineer',
              location: 'Singapore',
              receivedMonth: 'Jun 2022',
            },
          ].map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </>
      );
    }
    if (selectedTab === 'background') {
      return (
        <>
          <div className="mx-8 my-4 flex flex-row">
            <BriefcaseIcon className="mr-1 h-5" />
            <span className="font-bold">Work Experience</span>
          </div>
          <OfferCard
            offer={{
              base: undefined,
              bonus: undefined,
              companyName: 'Prefer not to say',
              jobLevel: 'G4',
              jobTitle: 'N/A',
              location: '',
              monthlySalary: '1,400k',
              receivedMonth: '',
              stocks: undefined,
              totalCompensation: undefined,
            }}
          />
          <div className="mx-8 my-4 flex flex-row">
            <AcademicCapIcon className="mr-1 h-5" />
            <span className="font-bold">Education</span>
          </div>
          <EducationCard
            education={{
              backgroundType: EducationBackgroundType.Bachelor,
              field: 'CS',
              fromMonth: 'Aug 2019',
              school: 'NUS',
              toMonth: 'May 2021',
            }}
          />
        </>
      );
    }
    return <div>Detail page for {selectedTab}</div>;
  }

  function ProfileComments() {
    return (
      <div className="m-4">
        <h2 className="text-2xl font-bold">Discussions</h2>
        <TextArea label="Comment" placeholder="Type your comment here" />
      </div>
    );
  }

  return (
    <div className="mb-4 flex flex h-screen w-screen items-center justify-center divide-x">
      <div className="h-full w-2/3 divide-y">
        <ProfileHeader />
        <div className="h-4/5 w-full overflow-y-scroll pb-32">
          <ProfileDetails />
        </div>
      </div>
      <div className="h-full w-1/3 bg-white">
        <ProfileComments />
      </div>
    </div>
  );
}
