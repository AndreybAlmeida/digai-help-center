import CategoryCard from "@/components/ui/CategoryCard";
import type { Category } from "@/lib/content/types";

/** Recebe as categorias por prop: assim a home client não precisa importar o
 *  módulo de conteúdo (que carrega o markdown inteiro dos artigos) no bundle. */
export default function CategoryGrid({ categorias }: { categorias: Category[] }) {
  return (
    <div className="grid g-cat">
      {categorias.map((c) => (
        <CategoryCard key={c.slug} category={c} />
      ))}
    </div>
  );
}
