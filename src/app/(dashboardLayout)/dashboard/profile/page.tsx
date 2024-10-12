import dynamic from 'next/dynamic';

const ProfileComponent = dynamic(()=> import("@/app/(dashboardLayout)/dashboard/profile/_components/ProfileComponent"),{ssr:false});
const ProfilePage = () => {
  return (
   <ProfileComponent/>
  );
};

export default ProfilePage;