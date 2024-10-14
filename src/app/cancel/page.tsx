import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { XCircle } from "lucide-react"
import Link from "next/link"
const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <CardTitle className="text-2xl font-bold">Payment Cancelled</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-gray-600">
          Your payment has been cancelled. No charges have been made to your account.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </CardFooter>
    </Card>
  </div>
  );
};

export default Page;