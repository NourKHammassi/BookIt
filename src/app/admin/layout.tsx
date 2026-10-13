import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user || (session.user as any).role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex bg-[#FAF7F2]">
      <AdminSidebar userName={session.user.name || "Admin"} />
      <main className="flex-1 ml-64 p-8">{children}</main>
    </div>
  );
}