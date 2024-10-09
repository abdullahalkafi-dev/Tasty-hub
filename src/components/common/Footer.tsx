import Link from 'next/link';

export default function Footer() {
  return (
    <div className="bg-[#FFF0ED]">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 text-gray-800 flex flex-wrap justify-center sm:justify-between">
        <div className="p-5">
          <div className="text-xs uppercase text-gray-500 font-medium">Home</div>
          <Link href="/" className="my-3 block">
            Services <span className="text-teal-600 text-xs p-1"></span>
          </Link>
          <Link href="/" className="my-3 block">
            Products <span className="text-teal-600 text-xs p-1"></span>
          </Link>
          <Link href="/" className="my-3 block">
            About Us <span className="text-teal-600 text-xs p-1"></span>
          </Link>
          <Link href="/" className="my-3 block">
            Pricing <span className="text-teal-600 text-xs p-1"></span>
          </Link>
          <Link href="/" className="my-3 block">
            Partners <span className="text-teal-600 text-xs p-1">New</span>
          </Link>
        </div>

        <div className="p-5">
          <div className="text-xs uppercase text-gray-500 font-medium">Resources</div>
          <Link href="/" className="my-3 block">
            Documentation <span className="text-teal-600 text-xs p-1"></span>
          </Link>
          <Link href="/" className="my-3 block">
            Tutorials <span className="text-teal-600 text-xs p-1"></span>
          </Link>
          <Link href="/" className="my-3 block">
            Support <span className="text-teal-600 text-xs p-1">New</span>
          </Link>
        </div>

        <div className="p-5">
          <div className="text-xs uppercase text-gray-500 font-medium">Support</div>
          <Link href="/" className="my-3 block">
            Help Center <span className="text-teal-600 text-xs p-1"></span>
          </Link>
          <Link href="/" className="my-3 block">
            Privacy Policy <span className="text-teal-600 text-xs p-1"></span>
          </Link>
          <Link href="/" className="my-3 block">
            Conditions <span className="text-teal-600 text-xs p-1"></span>
          </Link>
        </div>

        <div className="p-5">
          <div className="text-xs uppercase text-gray-500 font-medium">Contact us</div>
          <Link href="/" className="my-3 block">
            XXX XXXX, Floor 4 San Francisco, CA
            <span className="text-teal-600 text-xs p-1"></span>
          </Link>
          <Link href="mailto:contact@company.com" className="my-3 block">
            contact@company.com <span className="text-teal-600 text-xs p-1"></span>
          </Link>
        </div>
      </div>
    </div>
  );
}
