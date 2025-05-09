import TopMenu from "@/components/TopMenu";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-5xl min-w-md flex-col items-center justify-start">
      <TopMenu />
      {children}
    </div>
  );
}
