import AdminHeader from "@/components/admin/AdminHeader";

export const metadata = { title: "Administração — DigAI" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminHeader />
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px" }}>
        {children}
      </div>
    </>
  );
}
