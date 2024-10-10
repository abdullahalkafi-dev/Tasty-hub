import dynamic from "next/dynamic";









const UserTable =dynamic(() => import('./_components/userManagementComponent'),{ssr:false});



const Page = () => {

  return (
    <UserTable/>
  );
};

export default Page;