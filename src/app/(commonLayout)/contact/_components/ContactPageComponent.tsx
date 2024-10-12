"use client";

import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { Card, CardHeader, CardContent } from "@/components/ui/card"; // Importing Card components
import { Input } from "@/components/ui/input"; // Assuming you have Input and Textarea components
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ContactPage = () => {
  const form = useForm();
  const { handleSubmit } = form;
  const router = useRouter();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    toast.success("Message sent successfully");
    router.push("/");
    form.reset();
  };

  return (
    <div className="py-20 bg-gradient-to-br from-background to-muted">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-center items-center mb-10 gap-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center">
            Contact Us
          </h2>
          <p className="max-w-2xl text-center">
            Have a question or need help with your rental? We are here to help!
            Fill out the form below and we will get back to you as soon as
            possible.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          <Card className="md:order-2">
            <CardHeader>
              <h1 className="text-2xl font-bold">Send Us a Message</h1>
            </CardHeader>
            <CardContent>
              <FormProvider {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      type="text"
                      placeholder="Your Name"
                      required
                      {...form.register("name")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      {...form.register("email")}
                      required
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Textarea
                      placeholder="Enter your address"
                      {...form.register("address")}
                      required
                    />
                  </div>

                  <Button
                    className="w-full bg-black hover:bg-primary Light mt-6"
                    type="submit"
                  >
                    Register
                  </Button>
                </form>
              </FormProvider>
            </CardContent>
          </Card>

          <Card className="md:order-1">
            <CardHeader>
              <h1 className="text-2xl font-bold">Contact Information</h1>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Our Location</h3>
                  <p className="text-muted-foreground">
                   1206,Dhaka, Bangladesh
                    <br />
                    Open daily: 8AM - 8PM
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-muted-foreground">
                    + (88) 01307-628955
                    <br />
                    Mon-Fri: 9AM - 6PM
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-muted-foreground">
                    kafikafi1922@gmail.com
                    <br />
                    kafikafi1922@gmail.com
                  </p>
                </div>
              </div>
              <div className="pt-6">
                <h3 className="font-semibold mb-2">Follow Us</h3>
                <div className="flex space-x-4">
                  <Button variant="default">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="sr-only">Facebook</span>
                  </Button>
                  <Button variant="default">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.975-.045 1.504-.207 1.857-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.023.058-1.351.058-3.807v-.468c0-2.456-.011-2.784-.058-3.807-.045-.975-.207-1.504-.344-1.857-.182-.466-.398-.8-.748-1.15-.35-.35-.683-.566-1.15-.748-.353-.137-.882-.3-1.857-.344-1.054-.048-1.37-.058-4.041-.058h-.08z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="sr-only">Github</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
