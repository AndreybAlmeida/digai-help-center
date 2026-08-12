import { Icon, type IconName } from "@/components/icons/Sprite";
import Link from "next/link";

export interface QuickAction {
  slug: string;
  label: string;
  meta: string;
  icon: IconName;
  c1: string;
  c2: string;
}

export default function QuickActions({ acoes }: { acoes: QuickAction[] }) {
  return (
    <div className="shortcuts">
      {acoes.map((a) => (
        <Link className="sc" key={a.slug} href={`/artigo/${a.slug}`}>
          <span className="ico" style={{ ["--c1" as string]: a.c1, ["--c2" as string]: a.c2 }}>
            <Icon name={a.icon} size={19} />
          </span>
          <span className="stack">
            <span className="tt">{a.label}</span>
            <span className="kk">{a.meta}</span>
          </span>
          <Icon name="arrow" size={17} className="go" />
        </Link>
      ))}
    </div>
  );
}
