import { Icon } from "@/components/icons/Sprite";
import Link from "next/link";

/** Mosaico de pixels do fundo. Definido uma vez e reusado pelo AnaBanner. */
export function MosaicDefs() {
  return (
    <svg width={0} height={0} style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <pattern id="px" width="26" height="26" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="7" height="7" fill="rgba(255,255,255,.09)" />
          <rect x="13" y="13" width="4" height="4" fill="rgba(102,216,198,.32)" />
        </pattern>
      </defs>
    </svg>
  );
}

export default function HeroFeature({
  href,
  minutes,
}: {
  href: string;
  minutes: number;
}) {
  return (
    // O bloco inteiro é o link; os "botões" internos são <span> justamente para
    // não aninhar <a> dentro de <a>.
    <Link className="hero-main" href={href}>
      <svg className="mosaic" aria-hidden="true">
        <rect width="100%" height="100%" fill="url(#px)" />
      </svg>
      <span className="badge">
        <Icon name="play" size={13} />
        Tour guiado · {minutes} min
      </span>
      <h1>
        Aprenda a DigAI em <em>uma tarde</em>.
      </h1>
      <p>
        Tour interativo por todos os módulos: workspaces, triagem com IA, hunting, ranking e
        integrações. É o melhor ponto de partida.
      </p>
      <span className="hero-cta">
        <span className="btn btn-w">
          <Icon name="play" size={16} />
          Começar o tour
        </span>
        <span className="btn btn-o">Ver a trilha completa</span>
      </span>
    </Link>
  );
}
