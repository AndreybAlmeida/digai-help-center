import ArticleCard from "@/components/article/ArticleCard";
import { getArticleById } from "@/data/articles";

interface RelatedContentProps {
  ids: string[];
}

export default function RelatedContent({ ids }: RelatedContentProps) {
  const related = ids
    .map((id) => getArticleById(id))
    .filter(Boolean)
    .slice(0, 3) as NonNullable<ReturnType<typeof getArticleById>>[];

  if (related.length === 0) return null;

  return (
    <div>
      <h2 style={{ fontSize: "16px", fontWeight: 600, color: "var(--fg)", marginBottom: "16px" }}>
        Conteúdo relacionado
      </h2>
      <div style={{ display: "grid", gap: "10px", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
        {related.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
