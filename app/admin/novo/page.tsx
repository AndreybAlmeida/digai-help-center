import KnowledgeForm from "@/components/admin/KnowledgeForm";

export const metadata = { title: "Novo item — Admin DigAI" };

export default function NovoItemPage() {
  return (
    <div style={{ maxWidth: "720px" }}>
      <h1 style={{ fontSize: "20px", fontWeight: 800, color: "var(--fg)", marginBottom: "24px" }}>
        Novo item de conhecimento
      </h1>
      <KnowledgeForm />
    </div>
  );
}
