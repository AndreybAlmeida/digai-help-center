import ArticleFeedback from "@/components/article/ArticleFeedback";
import RelatedContent from "@/components/article/RelatedContent";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { getArticleBySlug } from "@/data/articles";
import { getCategoryBySlug } from "@/data/categories";
import { contentTypeLabel, difficultyLabel, formatDate } from "@/lib/utils";
import { Bot, Clock, ExternalLink, FileText, GraduationCap, Play } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const contentTypeIcon = {
  article: FileText,
  tutorial: GraduationCap,
  video: Play,
  faq: FileText,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return { title: article.title, description: article.summary };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const category = getCategoryBySlug(article.category);
  const ContentIcon = contentTypeIcon[article.contentType] || FileText;

  return (
    <div style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 24px 64px" }}>
      <Breadcrumb
        items={[
          { label: category?.label || "Categoria", href: `/categoria/${article.category}` },
          { label: article.title },
        ]}
      />

      {/* Meta */}
      <div style={{ marginTop: "28px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px" }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            padding: "3px 10px",
            borderRadius: "100px",
            border: "1px solid var(--border)",
            fontSize: "11px",
            fontWeight: 600,
            color: "var(--fg-muted)",
            background: "var(--bg-subtle)",
          }}
        >
          <ContentIcon style={{ width: "11px", height: "11px" }} />
          {contentTypeLabel[article.contentType]}
        </span>
        <span
          style={{
            padding: "3px 10px",
            borderRadius: "100px",
            border: "1px solid var(--border)",
            fontSize: "11px",
            color: "var(--fg-subtle)",
            background: "var(--bg-subtle)",
          }}
        >
          {difficultyLabel[article.difficulty]}
        </span>
        {article.readTime && (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "12px",
              color: "var(--fg-subtle)",
            }}
          >
            <Clock style={{ width: "12px", height: "12px" }} />
            {article.readTime} min de leitura
          </span>
        )}
      </div>

      <h1
        style={{
          fontFamily: "'Switzer', sans-serif",
          marginTop: "16px",
          fontSize: "clamp(24px, 4vw, 32px)",
          fontWeight: 700,
          color: "var(--fg)",
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
        }}
      >
        {article.title}
      </h1>
      <p style={{ marginTop: "10px", fontSize: "16px", color: "var(--fg-muted)", lineHeight: 1.6 }}>
        {article.summary}
      </p>
      <p style={{ marginTop: "6px", fontSize: "12px", color: "var(--fg-subtle)" }}>
        Atualizado em {formatDate(article.updatedAt)}
      </p>

      {/* Interactive demo / source link */}
      {article.sourceUrl && (
        <a
          href={article.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginTop: "28px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            padding: "16px 20px",
            borderRadius: "12px",
            border: "1px solid var(--border)",
            background: "var(--bg-subtle)",
            textDecoration: "none",
            transition: "border-color 0.15s",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "var(--brand)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Play style={{ width: "16px", height: "16px", color: "#fff" }} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--fg)" }}>Tutorial Interativo</p>
            <p style={{ marginTop: "2px", fontSize: "12px", color: "var(--fg-muted)" }}>
              Clique para abrir a demonstração passo a passo
            </p>
          </div>
          <ExternalLink style={{ width: "14px", height: "14px", color: "var(--fg-subtle)", flexShrink: 0 }} />
        </a>
      )}

      {/* YouTube embed */}
      {article.youtubeId && (
        <div
          style={{
            marginTop: "28px",
            borderRadius: "12px",
            overflow: "hidden",
            position: "relative",
            paddingBottom: "56.25%",
          }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${article.youtubeId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              border: "none",
              borderRadius: "12px",
            }}
          />
        </div>
      )}

      {/* Drive link */}
      {article.driveUrl && (
        <a
          href={article.driveUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginTop: "20px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 16px",
            borderRadius: "10px",
            border: "1px solid var(--border)",
            background: "var(--bg-subtle)",
            fontSize: "13px",
            color: "var(--fg-muted)",
            textDecoration: "none",
          }}
        >
          <ExternalLink style={{ width: "14px", height: "14px", color: "var(--brand)", flexShrink: 0 }} />
          <span>
            <span style={{ fontWeight: 500, color: "var(--fg)" }}>Ver documento no Google Drive</span>
            <span style={{ marginLeft: "6px", color: "var(--fg-subtle)" }}>— clique para abrir</span>
          </span>
        </a>
      )}

      {/* Markdown Content */}
      <div style={{ marginTop: "32px" }}>
        {article.content ? (
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(article.content) }}
          />
        ) : (
          <div
            style={{
              borderRadius: "12px",
              border: "1px dashed var(--border)",
              padding: "48px 24px",
              textAlign: "center",
              fontSize: "14px",
              color: "var(--fg-muted)",
            }}
          >
            Conteúdo completo disponível em breve. Consulte o link acima ou{" "}
            <Link href="/chat" style={{ color: "var(--brand)", fontWeight: 600, textDecoration: "none" }}>
              pergunte à ANA
            </Link>
            .
          </div>
        )}
      </div>

      {/* Tags */}
      {article.tags.length > 0 && (
        <div style={{ marginTop: "32px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {article.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: "4px 10px",
                borderRadius: "100px",
                background: "var(--bg-muted)",
                fontSize: "11px",
                color: "var(--fg-muted)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Feedback */}
      <div style={{ marginTop: "40px", paddingTop: "32px", borderTop: "1px solid var(--border)" }}>
        <ArticleFeedback />
      </div>

      {/* CTAs */}
      <div style={{ marginTop: "20px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
        <Link
          href="/chat"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "9px 18px",
            borderRadius: "8px",
            background: "var(--brand)",
            color: "#fff",
            fontSize: "13px",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          <Bot style={{ width: "14px", height: "14px" }} />
          Falar com a ANA
        </Link>
        <Link
          href={`/categoria/${article.category}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "9px 18px",
            borderRadius: "8px",
            border: "1px solid var(--border)",
            color: "var(--fg-muted)",
            fontSize: "13px",
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          Ver mais em {category?.label}
        </Link>
      </div>

      {/* Related */}
      {article.relatedContent.length > 0 && (
        <div style={{ marginTop: "48px" }}>
          <RelatedContent ids={article.relatedContent} />
        </div>
      )}
    </div>
  );
}

// Simple markdown-to-HTML converter
function renderMarkdown(md: string): string {
  return md
    .trim()
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/^\- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>[\s\S]*?<\/li>)/gm, "<ul>$1</ul>")
    .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
    .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[hupbol])/gm, "");
}
