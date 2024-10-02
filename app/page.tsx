import Image from "next/image";
import Link from "next/link";

export default async function Home() {

  let sortedPosts = [];
  let finalData: any = [];
  let topFollowersData: any = [];
  let recentData = [];
  let finalRecentData: any = [];

  try {
    const response = await fetch('https://dummyjson.com/posts');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    sortedPosts = data.posts.sort((a: any, b: any) => {
      return b.reactions.likes - a.reactions.likes;
    }).slice(0, 2);


    const userPromises = sortedPosts.map(async (p: any) => {
      const res = await fetch(`https://dummyjson.com/users/${p.userId}`);
      const user = await res.json();

      return {
        id: p.id,
        userId: p.userId,
        body: p.body,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        reactions: p.reactions,
        views: p.views,
        tags: p.tags
      };
    })

    finalData = await Promise.all(userPromises);
  } catch (error) {
    console.error('Error fetching and sorting posts by likes:', error);
  }



  try {
    // Fetch posts from the API
    const response = await fetch('https://dummyjson.com/posts');
    const data = await response.json();

    // Create a map to store the count of posts per user
    const userPostCount: { [key: number]: number } = {};

    // Loop through the posts and count the number of posts per user
    data.posts.forEach((post: any) => {
      if (userPostCount[post.userId]) {
        userPostCount[post.userId]++;
      } else {
        userPostCount[post.userId] = 1;
      }
    });

    // Convert the userPostCount object to an array of userId and post count pairs
    const userPostCountArray = Object.entries(userPostCount)
      .map(([userId, postCount]) => ({
        userId: Number(userId),
        postCount: postCount as number,
      }));

    // Sort the array by postCount in descending order
    const topUsers = userPostCountArray
      .sort((a, b) => b.postCount - a.postCount)
      .slice(0, 4); // Get the top 4 users


    const userPromises = topUsers.map(async (p: any) => {
      const res = await fetch(`https://dummyjson.com/users/${p.userId}`);
      const user = await res.json();

      return {
        userId: p.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
      };
    })

    topFollowersData = await Promise.all(userPromises);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }



  try {
    const res = await fetch('https://dummyjson.com/posts?limit=5&skip=0');
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    recentData = data.posts

    const userPromises = recentData.map(async (p: any) => {
      const res = await fetch(`https://dummyjson.com/users/${p.userId}`);
      const user = await res.json();

      return {
        id: p.id,
        userId: p.userId,
        body: p.body,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        reactions: p.reactions,
        views: p.views,
        tags: p.tags
      };
    })

    finalRecentData = await Promise.all(userPromises);

  } catch (error) {
    console.error('Error fetching and sorting posts by likes:', error);
  }

  return (
    <main className="container mx-auto">
      <div className="w-full h-[56px] p-[var(--space-12)] pb-[var(--space-12)] px-[var(--space-8)] border-b text-center bg-white">
        Feed
      </div>
      <div className="container mx-auto w-full max-w-[700px] h-auto py-8 px-4 gap-12">
        <div className="w-full max-w-[668px] h-auto gap-4">
          <h2 className="font-roboto-flex text-2xl font-extrabold leading-[24px] text-left">Suggested Posts</h2>
          {/* Post Card */}
          {finalData.map((post: any) => (
            <div className="w-full max-w-[668px] h-auto rounded-[16px] border border-[#E4E7E8] bg-white mt-4" key={post.id}>
              {/* Post  */}
              <div className="w-full max-w-[668px] h-auto p-4 gap-4">
                {/* Post content */}
                <div className="flex w-full max-w-[636px] h-auto gap-3">
                  {/* Avatar container */}
                  <Link href={`/feed/profile/${post.userId}`} passHref>
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
                  </Link>
                  {/* Post */}
                  <div className="flex flex-col w-full max-w-[584px] h-auto gap-3">
                    {/* Name container */}
                    <div className="w-full max-w-[584px] h-auto py-1 px-0 gap-1">
                      <h4 className="font-roboto-flex text-base font-extrabold leading-[16px] text-left hover:underline"><Link href={`/feed/profile/${post.userId}`} passHref>{post.firstName} {post.lastName}</Link></h4>
                      <div className="font-roboto-flex text-xs font-medium leading-[14.06px] text-left h-[14px] w-[584px] text-[#5C6970]">
                        @{post.username}
                      </div>
                      <div className="font-roboto-flex text-sm font-medium leading-[16.41px] text-left w-[584px] h-[32px] text-[#5C6970]">
                        {post.body}
                      </div>
                    </div>
                    {/* Tag container */}
                    <div className="w-full max-w-[584px] h-auto gap-3 flex">
                      {post.tags.map((tag: string, i: number) => (
                        <div className="w-[35px] h-[14px]" key={i}>
                          <div className="font-roboto-flex text-xs font-medium leading-[14.06px] text-left w-[10px] h-[14px] text-[#4426D9]">
                            #{tag}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Post stats bar */}
              <div className="flex w-full max-w-[668px] h-auto p-4 gap-6 border-t border-l-0 border-r-0 border-b-0">
                <div className="w-[36px] h-[16px] gap-1 flex  text-[#5C6970]">
                  {post.reactions.likes}
                </div>
                <div className="w-[36px] h-[16px] gap-1 flex text-[#5C6970]">
                  {post.reactions.dislikes}
                </div>
                <div className="w-[36px] h-[16px] gap-1 flex text-[#5C6970]">
                  {post.views}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full max-w-[668px] h-auto gap-4 mt-4">
          <h2 className="font-roboto-flex text-2xl font-extrabold leading-[24px] text-left">Who to follow</h2>
          <div className="w-full max-w-[668px] h-auto gap-4 mt-4 grid grid-cols-2">
            {/* User card */}
            {topFollowersData.map((follow: any) => (
              <div className="w-[326px] h-auto rounded-[16px] border border-[#E4E7E8] bg-white" key={follow.userId}>
                {/* User container */}
                <div className="w-[326px] h-auto p-[16px] gap-[16px]">
                  <div className="w-full max-w-[294px] h-auto gap-3 flex">
                    {/* Avatar content */}
                    <Link href={`/feed/profile/${follow.userId}`} passHref>
                      <div className="w-[40px] h-[40px] gap-[9.52px] rounded-full">
                        <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                          <Image
                            src="/avatar.png"
                            alt="Picture of the author"
                            width={40}
                            height={40}
                          />
                        </div>
                      </div>
                    </Link>
                    {/* Info */}
                    <div className="w-full max-w-[154px] h-auto gap-1">
                      <h4 className="font-roboto-flex font-extrabold leading-[16px] text-left w-[154px] h-[16px] text-[#141C24] hover:underline"><Link href={`/feed/profile/${follow.userId}`} passHref>{follow.firstName} {follow.lastName}</Link></h4>
                      <small className="font-roboto-flex text-sm font-medium leading-[14.06px] text-left w-[154px] h-[14px] text-[#5C6970]">@{follow.username}</small>
                    </div>
                    {/* Follow btn */}
                    <div className="w-[76px] h-[35px] gap-2 rounded-full border border-[#4426D9] text-[#4426D9] flex items-center">
                      <button className="w-[76px] h-auto p-[8px] px-[14px] gap-2 flex">Follow</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full max-w-[668px] h-auto gap-4 mt-4">
          <h2 className="font-roboto-flex text-2xl font-extrabold leading-[24px] text-left">Recent</h2>
          {/* Post Card */}
          {finalRecentData.map((recent: any) => (
            <div className="w-full max-w-[668px] h-auto rounded-[16px] border border-[#E4E7E8] bg-white mt-4" key={recent.id}>
              {/* Post  */}
              <div className="w-full max-w-[668px] h-auto p-4 gap-4">
                {/* Post content */}
                <div className="flex w-full max-w-[636px] h-auto gap-3">
                  {/* Avatar container */}
                  <Link href={`/feed/profile/${recent.userId}`} passHref>
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
                  </Link>
                  {/* Post */}
                  <div className="flex flex-col w-full max-w-[584px] h-auto gap-3">
                    {/* Name container */}
                    <div className="w-full max-w-[584px] h-auto py-1 px-0 gap-1">
                      <h4 className="font-roboto-flex text-base font-extrabold leading-[16px] text-left hover:underline"><Link href={`/feed/profile/${recent.userId}`} passHref>{recent.firstName} {recent.lastName}</Link></h4>
                      <div className="font-roboto-flex text-xs font-medium leading-[14.06px] text-left h-[14px] w-[584px] text-[#5C6970]">
                        @{recent.username}
                      </div>
                      <div className="font-roboto-flex text-sm font-medium leading-[16.41px] text-left w-[584px] h-[32px] text-[#5C6970]">
                        {recent.body}.
                      </div>
                    </div>
                    {/* Tag container */}
                    <div className="w-full max-w-[584px] h-auto gap-3 flex">
                      {recent.tags.map((tag: string, i: number) => (
                        <div className="w-[35px] h-[14px]" key={i}>
                          <div className="font-roboto-flex text-xs font-medium leading-[14.06px] text-left w-[10px] h-[14px] text-[#4426D9]">
                            #{tag}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Post stats bar */}
              <div className="flex w-full max-w-[668px] h-auto p-4 gap-6 border-t border-l-0 border-r-0 border-b-0">
                <div className="w-[36px] h-[16px] gap-1 flex  text-[#5C6970]">
                  {recent.reactions.likes}
                </div>
                <div className="w-[36px] h-[16px] gap-1 flex text-[#5C6970]">
                  {recent.reactions.dislikes}
                </div>
                <div className="w-[36px] h-[16px] gap-1 flex text-[#5C6970]">
                  {recent.views}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
