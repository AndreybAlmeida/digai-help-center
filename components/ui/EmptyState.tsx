import { Icon } from "@/components/icons/Sprite";
import Link from "next/link";

export default function EmptyState({
  title = "Nada encontrado por aqui",
  description = "Tente outra palavra — ou pergunte direto para a ANA, que consulta toda a base.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="empty">
      <h3>{title}</h3>
      <p>{description}</p>
      <Link className="btn btn-ana" href="/chat" style={{ display: "inline-flex" }}>
        <Icon name="spark" size={16} />
        Perguntar para a ANA
      </Link>
    </div>
  );
}
