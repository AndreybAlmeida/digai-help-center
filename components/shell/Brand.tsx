import Image from "next/image";

/**
 * Marca da DigAI no topbar.
 *
 * PENDÊNCIA DE ASSET: o spec (§5.2) pede o arquivo oficial do logo servido de
 * /public, e proíbe reconstruir a marca em texto. Esse arquivo ainda não existe
 * no repositório — só há `favicon-digai-32.png` (32px). Até ele chegar, este
 * componente usa o símbolo oficial disponível junto do wordmark, como no
 * protótipo. Ao receber o SVG/PNG oficial: trocar por uma única <Image> dele e
 * apagar o <span className="wm">.
 */
export default function Brand() {
  return (
    // Sem aria-label: o texto visível já dá o nome acessível ao link. Um
    // aria-label diferente do texto visível quebra comando por voz — o usuário
    // fala o que vê e nada acontece.
    <a className="brand" href="/">
      <Image src="/favicon-digai-32.png" alt="" width={28} height={28} priority />
      <span className="wm">
        dig<i>AI</i>
      </span>
      <span className="sub">Central de Ajuda</span>
    </a>
  );
}
