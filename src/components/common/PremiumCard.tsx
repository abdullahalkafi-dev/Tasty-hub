"use client";
import { Check } from "lucide-react";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { TUser } from "@/types/user.types";
import { toast } from "sonner";
import { useGetSingleUserQuery } from "@/redux/api/features/auth/authApi";

const PremiumCard = ({ latestUser }: { latestUser: TUser }) => {
  const { refetch } = useGetSingleUserQuery(undefined);
  const handelPremium = async () => {
    if (latestUser?.isPremium) {
      return toast.error("Already-Premium");
    }

    const stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    );
    const body = {
      userId: latestUser._id,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/create-checkout-session`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      }
    );
    const session = await response.json();
    const stripe = await stripePromise;
    const result = await stripe?.redirectToCheckout({
      sessionId: session.id,
    });
    if (session.id) {
      refetch();
    }
    if (result?.error) {
      toast.error(result.error.message);
    }
  };

  return (
    <Card className=" bg-white  drop-shadow-xl ">
      <div className="flex justify-between ">
        <div>
          <CardHeader>
            <CardTitle>Plan Details</CardTitle>
            <CardDescription>
              Features included in your selected plan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {[
                "Access to Premium recipes",
                "Weekly newsletter",
                "Access to exclusive content",
              ].map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </div>
        <div className="flex justify-center items-center px-10">
          <Image
            src="https://png.pngtree.com/png-vector/20191011/ourmid/pngtree-premium-golden-label-icon-in-flat-style-png-image_1807297.jpg"
            alt="premium logo"
            width={200}
            height={200}
            className=" rounded-md"
          />
        </div>
      </div>
      <div className="w-full p-8" onClick={handelPremium}>
        <button className="w-full bg-[#B66055] drop-shadow-xl text-center rounded-md text-white font-semibold py-3">
          {latestUser?.isPremium ? "Already-Premium " : "Get-Premium "}
        </button>
      </div>
    </Card>
  );
};

export default PremiumCard;
