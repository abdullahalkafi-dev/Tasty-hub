/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Subheading from "@/components/common/subHeading/Subheading";
import TextField from "@/components/form/TextField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

const HomeStayInTouch = () => {
  const form = useForm();

  const onSubmit = (data:any) => {
    console.log(data);
  };
  return (
    
      <div className="py-20 my-16 bg-[#fff0ed] ">
        <div className="text-center space-y-4  pb-16">
          <Subheading  text="Let's Stay In Touch" />
          <p className="text-gray-600 text-xl">
            Join our newsletter ,so that we reach out to you with our news and
            offers
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex justify-center flex-col px-4 md:flex-row items-center mx-auto">
              <div className="w-full  max-w-[700px]">
                 <TextField
                 control={form.control}
                label="Email"
                placeholder="example@gmail.com"
                fieldName={"email"}
                type={"email"}
              />
              </div>
             

              <Button className="bg-[#b66055] ml-5 px-8 mt-[8.2px]">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
   
  );
};

export default HomeStayInTouch;
