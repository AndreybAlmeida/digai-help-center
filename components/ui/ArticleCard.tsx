import { Icon, type IconName } from "@/components/icons/Sprite";
import { CATEGORIES } from "@/lib/content/categories";
import { KIND_LABEL, LEVEL_LABEL, formatShortDate, type Article } from "@/lib/content/types";
import Link from "next/link";

/**
 * Card central da v2. A capa é 100% CSS/SVG — nenhuma requisição de imagem no
 * grid, o que mantém o LCP no hero.
 */
export default function ArticleCard({ article }: { article: Article }) {
  const cat = CATEGORIES[article.category];
  const icon = cat.icon as IconName;

  return (
    <Link
      className="card"
      href={`/artigo/${article.slug}`}
      style={{ ["--c1" as string]: cat.c1, ["--c2" as string]: cat.c2 }}
    >
      <div className="cover">
        <Icon name={icon} className="glyph" />
        <Icon name={icon} className="art" />

        {cat.ai && (
          <span className="ai">
            <Icon name="spark" size={11} />
            IA
          </span>
        )}

        <span className="kind">{KIND_LABEL[article.kind]}</span>
        <span className="dur">{article.minutes} min</span>

        {/* Decorativo para leitor de tela: o link já tem nome pelo título e o
            conteúdo relevante está no corpo do card. */}
        <div className="peek" aria-hidden="true">
          <b>Você vai aprender</b>
          <ul>
            {article.learn.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h3>{article.title}</h3>
        <p className="desc">{article.excerpt}</p>
        <div className="row">
          <span className={`tag${cat.ai ? " ia" : ""}`}>{cat.label}</span>
          <span className="tag lv">{LEVEL_LABEL[article.level]}</span>
          <span className="date">{formatShortDate(article.publishedAt)}</span>
        </div>
      </div>
    </Link>
  );
}
