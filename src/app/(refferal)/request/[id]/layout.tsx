import BreadcrumbNav from "@/app/_components/ui/BreadcrumbNav";

export const metadata = {
  title: "RCS | Reference Request",
  description: "RCS BY ...",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <BreadcrumbNav containerStyle={{ mb: 4 }} />
      {children}
    </div>
  );
}
