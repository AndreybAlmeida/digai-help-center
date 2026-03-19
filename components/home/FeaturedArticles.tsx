import ArticleCard from "@/components/article/ArticleCard";
import { getFeaturedArticles } from "@/data/articles";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FeaturedArticles() {
  const articles = getFeaturedArticles();

  return (
    <section
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--bg-subtle)",
        padding: "56px 24px",
      }}
    >
      <div style={{ maxWidth: "1024px", margin: "0 auto" }}>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "32px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "'Switzer', sans-serif",
                fontSize: "22px",
                fontWeight: 700,
                color: "var(--fg)",
                letterSpacing: "-0.02em",
              }}
            >
              Mais acessados
            </h2>
            <p style={{ marginTop: "6px", fontSize: "14px", color: "var(--fg-muted)" }}>
              Tutoriais e guias que mais ajudam nossos clientes
            </p>
          </div>
          <Link
            href="/categoria/primeiros-passos"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "13px",
              fontWeight: 600,
              color: "var(--brand)",
              textDecoration: "none",
            }}
          >
            Ver todos
            <ArrowRight style={{ width: "13px", height: "13px" }} />
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gap: "10px",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          }}
        >
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} variant="default" />
          ))}
        </div>

      </div>
    </section>
  );
}
