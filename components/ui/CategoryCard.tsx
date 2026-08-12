import { Icon, type IconName } from "@/components/icons/Sprite";
import { CATEGORIES } from "@/lib/content/categories";
import type { Category } from "@/lib/content/types";
import Link from "next/link";

export default function CategoryCard({ category }: { category: Category }) {
  const cat = CATEGORIES[category.slug];
  const icon = cat.icon as IconName;
  const vazia = category.articleCount === 0;

  return (
    // Categoria vazia continua clicável: a página mostra o estado vazio com CTA
    // para a ANA, que é justamente a porta de entrada do que ainda não tem artigo.
    <Link
      className={`cat${vazia ? " is-soon" : ""}`}
      href={`/categoria/${category.slug}`}
      style={{ ["--c1" as string]: cat.c1, ["--c2" as string]: cat.c2 }}
    >
      <div className="band">
        <Icon name={icon} className="glyph" />
        <Icon name={icon} className="art" />
      </div>
      <div className="body">
        <h3>{cat.label}</h3>
        <p>{category.description}</p>
        <div className="foot">
          {vazia ? (
            <span className="soon">Em produção</span>
          ) : (
            <span className="count">
              {category.articleCount} {category.articleCount === 1 ? "artigo" : "artigos"}
            </span>
          )}
          <span className="arrow">
            <Icon name="arrow" size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}
