"use client";

import { useAppSelector } from "@/lib/hooks";

import { useGetSingleUserQuery } from "@/redux/api/features/auth/authApi";
import { ProfileCard } from "./profileCard";
import ProfileTabs from "./profileTabs";
import LoadingAnimation from "@/app/loading";

const ProfileComponent = () => {
  const userFromRedux = useAppSelector((state) => state.auth.user);

  const user = useGetSingleUserQuery(userFromRedux?._id).data?.data;
  const userData = useGetSingleUserQuery(userFromRedux?._id);
  console.log(userData);
  if (!user) {
    return <LoadingAnimation />;
  }

  return (
    <div className="flex xl:justify-center xl:items-center flex-col w-full xl:flex-row">
      <ProfileCard user={user} />
      <ProfileTabs user={user} />
    </div>
  );
};

export default ProfileComponent;
