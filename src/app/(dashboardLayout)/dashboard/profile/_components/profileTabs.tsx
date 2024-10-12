import { TUser } from "@/types/user.types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

import {
  useFollowUserMutation,
  useGetSingleUserQuery,
  useUnFollowUserMutation,
} from "@/redux/api/features/auth/authApi";
import { useAppSelector } from "@/lib/hooks";
import { toast } from "sonner";

const ProfileTabs = ({ user }: { user: TUser }) => {
  return (
    <div className="flex w-full justify-center items-center pt-5 ">
      <Tabs defaultValue="Followers" className="min-w-[400px]  border p-5">
        <TabsList className="flex ">
          <TabsTrigger className="w-full" value="Followers">
            Followers
          </TabsTrigger>
          <TabsTrigger className="w-full" value="Following">
            Following
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Followers">
          <FollowersUserList user={user} /> {/* Followers component */}
        </TabsContent>
        <TabsContent value="Following">
          <FollowingUserList user={user} /> {/* Following component */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileTabs;

const FollowersUserList = ({ user }: { user: TUser }) => {
  // console.log(user.following);
  return (
    <div className="max-w-sm mx-auto ">
      {user?.followers?.map((user) => (
        <UserCard key={user?._id} user={user} />
      ))}
    </div>
  );
};
const FollowingUserList = ({ user }: { user: TUser }) => {
  return (
    <div className="max-w-sm mx-auto ">
      {user?.following?.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </div>
  );
};

const UserCard = ({ user }: { user: TUser }) => {
  const loggedInUser = useAppSelector((state) => state.auth.user);

  const { data, refetch, isLoading } = useGetSingleUserQuery(loggedInUser?._id);
  const [unFollow] = useUnFollowUserMutation();
  const [follow] = useFollowUserMutation();
  const handleUnFollow = async () => {
    const res = await unFollow({ id: loggedInUser, targetUserId: user._id });
    if (res.error) {
      console.log(res.error);
    }
    if (res.data?.success) {
      toast("UnFollowed successfully");
    }
    await refetch();
  };
  const handleFollow = async () => {
    const res = await follow({ id: loggedInUser, targetUserId: user._id });
    if (res.error) {
      console.log(res.error);
    }
    if (res.data?.success) {
      toast("Followed successfully");
    }
    await refetch();
  };
  const latestUser = data?.data as TUser;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-3 flex items-center justify-between border-t cursor-pointer hover:bg-gray-200">
      <div className="flex items-center">
        <Image
          className="rounded-full h-10 w-10"
          src={user.image}
          alt={user.name}
          width={40} // Specify the width
          height={40} // Specify the height
        />
        <div className="ml-2 flex flex-col">
          <div className="leading-snug text-sm text-gray-900 font-bold">
            {user.name}
          </div>
          <div className="leading-snug text-xs text-gray-600">{user.email}</div>
        </div>
      </div>
      {latestUser?.following?.some((u) => u._id === user._id) ? (
        <button
          onClick={() => handleUnFollow()}
          className="h-8 px-3 text-md font-bold text-blue-400 border border-blue-400 rounded-full hover:bg-blue-100"
        >
          UnFollow
        </button>
      ) : (
        <button
          onClick={() => handleFollow()}
          className="h-8 px-3 text-md font-bold text-blue-400 border border-blue-400 rounded-full hover:bg-blue-100"
        >
          Follow
        </button>
      )}
    </div>
  );
};
