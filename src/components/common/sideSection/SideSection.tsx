// import React, { useState } from "react";

import Image from "next/image";
import { useAppSelector } from "@/lib/hooks";


import PremiumIcon from "../utils/PremiumIcon";
import {
  useFollowUserMutation,
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useUnFollowUserMutation,
} from "@/redux/api/features/auth/authApi";
import { TUser } from "@/types/user.types";
import { toast } from "sonner";
import PremiumCard from "../PremiumCard";

const SideSection = () => {


const loggedInUser = useAppSelector((state) => state.auth.user);
  const { data: usersRes, isLoading } = useGetAllUsersQuery(undefined);
  const users = usersRes?.data?.filter((u: TUser) => u._id !== loggedInUser?._id);

  

  const { data, refetch } = useGetSingleUserQuery(loggedInUser?._id);
  const [unFollow] = useUnFollowUserMutation();
  const [follow] = useFollowUserMutation();
  const handleUnFollow = async (userId: string) => {
    if (!loggedInUser) return toast("Please login to follow users");
    const res = await unFollow({
      id: loggedInUser?._id,
      targetUserId: userId,
    });
    if (res.error) {
      console.log(res.error);
    }
    if (res.data?.success) {
      toast("UnFollowed successfully");
    }
    await refetch();
  };
  const handleFollow = async (userId: string) => {
    if (!loggedInUser) return toast("Please login to follow users");
    const res = await follow({
      id: loggedInUser?._id,
      targetUserId: userId,
    });
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
    <div className="sticky top-20 h-[calc(100vh-5rem)] ">
     <PremiumCard latestUser={latestUser} />
      <div className="bg-[#FFF0ED]  drop-shadow-xl min-h-[52vh] mt-5">
        <div className="flex flex-col gap-2 p-6">
          {users?.slice(0, 6).map((user: TUser) => (
            <div
              key={user._id}
              className="drop-shadow-xl bg-gray-50 p-2 rounded-md flex justify-start items-center"
            >
              <div className="flex justify-between w-full items-center">
                <div className="flex justify-start items-center gap-2">
                  {" "}
                  <Image
                    src={user?.image}
                    alt="User profile image"
                    width={50}
                    height={50}
                    className=" rounded-full w-[50px] h-[50px]"
                  />
                  <span className="flex flex-col ">
                    <span className="font-semibold">{user?.name}</span>{" "}
                    <small className="text-xs">{user?.email}</small>
                  </span>
                </div>

                <div>{user?.isPremium && <PremiumIcon />}</div>
                <div>
                  {latestUser?.following?.some((u) => u._id === user._id) ? (
                    <button
                      onClick={() => handleUnFollow(user?._id)}
                      className="h-8 px-3 text-md font-bold text-blue-400 border border-blue-400 rounded-full hover:bg-blue-100"
                    >
                      UnFollow
                    </button>
                  ) : (
                    <button
                      onClick={() => handleFollow(user?._id)}
                      className="h-8 px-3 text-md font-bold text-blue-400 border border-blue-400 rounded-full hover:bg-blue-100"
                    >
                      Follow
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideSection;
