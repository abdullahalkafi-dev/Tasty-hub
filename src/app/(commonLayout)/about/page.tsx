import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AboutUs() {
  return (
    <Card className="max-w-7xl mx-auto my-12 p-8 shadow-none">
      <CardHeader>
        <CardTitle className="text-3xl font-semibold text-center mb-6">
          About TastyHub
        </CardTitle>
      </CardHeader>
      <Separator className="my-6" />

      <CardContent className="space-y-8">
        <section>
          <h3 className="text-xl font-medium mb-3">Our Story</h3>
          <p className="text-gray-600">
            TastyHub was founded by a group of dedicated food enthusiasts with a
            shared vision: to create a comprehensive resource for food lovers
            that combines expert advice with heartwarming stories. Our platform
            has since grown into a trusted source of information and inspiration
            for culinary enthusiasts worldwide.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-medium mb-3">Our Mission</h3>
          <p className="text-gray-600">
            At TastyHub, our mission is to empower food lovers with knowledge
            and inspiration, ensuring that every culinary experience is the best
            it can be. We strive to strengthen the bond between people and their
            love for food through practical tips, expert insights, and touching
            narratives.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-medium mb-3">Our Team</h3>
          <p className="text-gray-600">
            Our team consists of experienced chefs, certified nutritionists, and
            passionate foodies. This diverse group of experts collaborates to
            bring you accurate, up-to-date, and engaging content about food and
            culinary arts. From our writers and editors to our community
            moderators, every team member is committed to our mission of
            improving the culinary experiences of our audience.
          </p>
        </section>

        <Separator className="my-6" />

        <section>
          <h3 className="text-xl font-medium mb-3">Our Vision</h3>
          <p className="text-gray-600">
            We envision a world where every food lover is equipped with the
            knowledge and inspiration to create the best culinary experiences.
            Through our platform, we aim to foster a community where food
            enthusiasts can learn, share experiences, and grow together. By
            promoting responsible culinary practices and celebrating the love
            for food, we strive to contribute to a society where people lead
            happier, healthier lives through their culinary journeys.
          </p>
        </section>
      </CardContent>

      <Separator className="my-6" />

      <footer className="text-center text-gray-600">
        <p>
          Join us in our commitment to enhancing the culinary experiences of
          food lovers through education, inspiration, and community.
        </p>
      </footer>
    </Card>
  );
}
