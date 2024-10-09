import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type TLinks = {
  preLinks: {
    link: string;
    name: string;
  }[];
  pageName: string;
};

const BreadcrumbComponent = ({ links }: { links: TLinks }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {links.preLinks.map((preLink) => (
          <div className="flex items-center" key={preLink.name}>
            <BreadcrumbItem>
              <BreadcrumbLink href={preLink.link}>
                {preLink.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="mt-[2px]" />
          </div>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage className="font-medium">
            {links.pageName}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
