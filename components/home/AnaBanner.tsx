import { Icon } from "@/components/icons/Sprite";
import Link from "next/link";

/**
 * Fecha a home ligando explicitamente as categorias ainda sem artigo à ANA —
 * é o que evita que "Em produção" vire beco sem saída.
 */
export default function AnaBanner() {
  return (
    <div className="ana">
      <svg className="mosaic" aria-hidden="true">
        <rect width="100%" height="100%" fill="url(#px)" />
      </svg>
      <span className="av">ANA</span>
      <span className="tx">
        <h3>Prefere só perguntar?</h3>
        <p>
          A ANA lê toda a base de conhecimento da DigAI, responde em segundos e indica o tutorial
          certo — inclusive das áreas que ainda não têm artigo publicado.
        </p>
      </span>
      <Link className="btn btn-w" href="/chat">
        <Icon name="spark" size={16} />
        Iniciar conversa
      </Link>
    </div>
  );
}
