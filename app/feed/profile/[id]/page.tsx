'use client'
import Image from "next/image";
import React from 'react'
import { useParams } from 'next/navigation';


const UserProfile = async () => {
  const { id } = useParams();
  let userData;

  try {
    const response = await fetch(`https://dummyjson.com/users/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    userData = await response.json();
    console.log("userData", userData)

  } catch (error) {
    console.error('Error fetching and sorting posts by likes:', error);
  }


  return (
    <main className="container mx-auto">
      <div className="w-full h-[56px] p-[var(--space-12)] pb-[var(--space-12)] px-[var(--space-8)] border-b text-center bg-white">
        Profile
      </div>
      <div className="container mx-auto w-full max-w-[700px] h-auto py-8 px-4 gap-12">
        {/*Profile card*/}
        <div className="w-[668px] h-auto rounded-[12px] bg-white border border-gray-300 shadow-[0px_1px_var(--Blurblur-2)_0px_#1A1A1A14]">
          {/*card*/}
          <div className="w-full max-w-[668px] h-auto rounded-[12px] border border-[var(--Content-border, #E4E7E8)]">
            {/* gradient */}
            <div className="w-full max-w-[668px] h-auto gap-[10px]">
              <div className="w-[668px] h-[64px] custom-gradient" />
            </div>
            {/* content */}
            <div className="w-full max-w-[668px] h-auto p-[24px] pl-[170px] gap-[24px] flex bg-white">
              {/* info */}
              <div className="w-[474px] h-auto flex gap-2">
                <h1 className="font-roboto-flex font-extrabold w-[474px] h-[30px] text-left text-[30px] text-[#141C24]">{userData.firstName} {userData.lastName}</h1>
                <div className="w-[268px] h-auto flex gap-3">
                  <div className="flex w-[63px] h-[19px] gap-1">
                    @{userData.username}
                  </div>
                  <div className="flex w-[193px] h-[19px] gap-1">
                    New York, United States
                  </div>

                </div>
              </div>
            </div>
            {/* actions */}
            <div className="flex w-full max-w-[668px] h-auto p-[16px] px-[24px] gap-[16px] border-t border-[var(--Grey-Cold-50, #F1F3F4)] bg-white">
              <div className="w-auto h-auto gap-[8px] rounded-full profile-follow-btn">
                <button className="w-[78px] h-auto p-[8px] px-[14px] gap-[8px] flex">
                  Follow
                </button>
              </div>
              <div className="w-auto h-auto gap-[8px] rounded-full border border-[#4426D9] text-[#4426D9]">
                <button className="w-[94px] h-auto p-[8px] px-[14px] gap-[8px] flex">
                  Message
                </button>
              </div>
            </div>
          </div>
          {/*Avatar container*/}
          <div className="w-[120px] h-[120px] rounded-full border-5 border-[var(--Content-surface)] shadow-[0px_2px_10px_0px_#1A1A1A1A] overflow-hidden">
            <div className="w-[120px] h-[120px] rounded-[333.33px]  border-5 border-[var(--Content-surface)] shadow-[0px_2px_10px_0px_#1A1A1A1A]">
              <Image
                src="/avatar.png"
                alt="Description of the image"
                width={120}
                height={120}
              />
            </div>
          </div>
        </div>



        <div className="w-full max-w-[668px] h-auto gap-4 mt-4">
          <h2 className="font-roboto-flex text-2xl font-extrabold leading-[24px] text-left">Recent</h2>
          {/* Post Card */}
          <div className="w-full max-w-[668px] h-auto rounded-[16px] border border-[#E4E7E8] bg-white mt-4">
            {/* Post  */}
            <div className="w-full max-w-[668px] h-auto p-4 gap-4">
              {/* Post content */}
              <div className="flex w-full max-w-[636px] h-auto gap-3">
                {/* Avatar container */}
                <div className="w-[40px] h-[40px] gap-[9.52px] rounded-full">
                  <div className="w-[40px] h-[40px] rounded-full bg-white overflow-hidden">
                    <Image
                      src="/avatar.png"
                      alt="Picture of the author"
                      width={40}
                      height={40}
                    />
                  </div>
                </div>
                {/* Post */}
                <div className="flex flex-col w-full max-w-[584px] h-auto gap-3">
                  {/* Name container */}
                  <div className="w-full max-w-[584px] h-auto py-1 px-0 gap-1">
                    <h4 className="font-roboto-flex text-base font-extrabold leading-[16px] text-left">Emily Johnson</h4>
                    <div className="font-roboto-flex text-xs font-medium leading-[14.06px] text-left h-[14px] w-[584px] text-[#5C6970]">
                      @emilys
                    </div>
                    <div className="font-roboto-flex text-sm font-medium leading-[16.41px] text-left w-[584px] h-[32px] text-[#5C6970]">
                      Post body lorem ipsum dolor sit amet consectetur. Sem vestibulum massa lacus interdum enim fringilla.
                    </div>
                  </div>
                  {/* Tag container */}
                  <div className="w-full max-w-[584px] h-auto gap-3 flex">
                    <div className="w-[35px] h-[14px]">
                      <div className="font-roboto-flex text-xs font-medium leading-[14.06px] text-left w-[10px] h-[14px] text-[#4426D9]">
                        #tag1
                      </div>
                    </div>
                    <div className="w-[35px] h-[14px]">
                      <div className="font-roboto-flex text-xs font-medium leading-[14.06px] text-left w-[10px] h-[14px] text-[#4426D9]">
                        #tag2
                      </div>
                    </div>
                    <div className="w-[35px] h-[14px]">
                      <div className="font-roboto-flex text-xs font-medium leading-[14.06px] text-left w-[10px] h-[14px] text-[#4426D9]">
                        #tag3
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Post stats bar */}
            <div className="flex w-full max-w-[668px] h-auto p-4 gap-6 border-t border-l-0 border-r-0 border-b-0">
              <div className="w-[36px] h-[16px] gap-1 flex  text-[#5C6970]">
                20
              </div>
              <div className="w-[36px] h-[16px] gap-1 flex">
                20
              </div>
              <div className="w-[36px] h-[16px] gap-1 flex">
                20
              </div>
            </div>
          </div>

          <div className="w-full max-w-[668px] h-auto rounded-[16px] border border-[#E4E7E8] bg-white mt-4">
            {/* Post  */}
            <div className="w-full max-w-[668px] h-auto p-4 gap-4">
              {/* Post content */}
              <div className="flex w-full max-w-[636px] h-auto gap-3">
                {/* Avatar container */}
                <div className="w-[40px] h-[40px] gap-[9.52px] rounded-full">
                  <div className="w-[40px] h-[40px] rounded-full bg-white overflow-hidden">
                    <Image
                      src="/avatar.png"
                      alt="Picture of the author"
                      width={40}
                      height={40}
                    />
                  </div>
                </div>
                {/* Post */}
                <div className="flex flex-col w-full max-w-[584px] h-auto gap-3">
                  {/* Name container */}
                  <div className="w-full max-w-[584px] h-auto py-1 px-0 gap-1">
                    <h4 className="font-roboto-flex text-base font-extrabold leading-[16px] text-left">Emily Johnson</h4>
                    <div className="font-roboto-flex text-xs font-medium leading-[14.06px] text-left h-[14px] w-[584px] text-[#5C6970]">
                      @emilys
                    </div>
                    <div className="font-roboto-flex text-sm font-medium leading-[16.41px] text-left w-[584px] h-[32px] text-[#5C6970]">
                      Post body lorem ipsum dolor sit amet consectetur. Sem vestibulum massa lacus interdum enim fringilla.
                    </div>
                  </div>
                  {/* Tag container */}
                  <div className="w-full max-w-[584px] h-auto gap-3 flex">
                    <div className="w-[35px] h-[14px]">
                      <div className="font-roboto-flex text-xs font-medium leading-[14.06px] text-left w-[10px] h-[14px] text-[#4426D9]">
                        #tag1
                      </div>
                    </div>
                    <div className="w-[35px] h-[14px]">
                      <div className="font-roboto-flex text-xs font-medium leading-[14.06px] text-left w-[10px] h-[14px] text-[#4426D9]">
                        #tag2
                      </div>
                    </div>
                    <div className="w-[35px] h-[14px]">
                      <div className="font-roboto-flex text-xs font-medium leading-[14.06px] text-left w-[10px] h-[14px] text-[#4426D9]">
                        #tag3
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Post stats bar */}
            <div className="flex w-full max-w-[668px] h-auto p-4 gap-6 border-t border-l-0 border-r-0 border-b-0">
              <div className="w-[36px] h-[16px] gap-1 flex  text-[#5C6970]">
                20
              </div>
              <div className="w-[36px] h-[16px] gap-1 flex">
                20
              </div>
              <div className="w-[36px] h-[16px] gap-1 flex">
                20
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default UserProfile