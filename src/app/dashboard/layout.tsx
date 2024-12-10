import { MainNav } from "@/components/dashboard/main-nav";
import { UserNav } from "@/components/dashboard/user-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="fixed inset-y-0 z-50 flex w-64 flex-col">
        <div className="flex flex-1 flex-col bg-background">
          <div className="border-b p-6">
            <h1 className="text-2xl font-bold">Lander</h1>
          </div>
          <div className="flex-1 space-y-4 p-6">
            <MainNav />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64 w-full">
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex flex-1 items-center justify-end space-x-4">
              <UserNav />
            </div>
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
