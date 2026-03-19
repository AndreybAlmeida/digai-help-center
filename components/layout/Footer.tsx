import Link from "next/link";

const links = [
  { label: "Primeiros Passos", href: "/categoria/primeiros-passos" },
  { label: "Gestão de Vagas", href: "/categoria/gestao-de-vagas" },
  { label: "Integrações", href: "/categoria/integracoes" },
  { label: "Relatórios", href: "/categoria/relatorios" },
  { label: "FAQ", href: "/faq" },
  { label: "Chat com ANA", href: "/chat" },
  { label: "Contato", href: "/contato" },
];

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", marginTop: "80px" }}>
      <div style={{ maxWidth: "1024px", margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ display: "flex", gap: "40px", justifyContent: "space-between", flexWrap: "wrap" }}>
          {/* Brand */}
          <div style={{ maxWidth: "280px" }}>
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/favicon-digai-32.png" width={24} height={24} alt="DigAI" style={{ borderRadius: "5px" }} />
              <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "14px", fontWeight: 800, letterSpacing: "-0.02em" }}>
                <span style={{ color: "#0034AB" }}>dig</span><span style={{ color: "#00B896" }}>AI</span>
                {" "}<span style={{ fontWeight: 400, fontSize: "13px", color: "var(--fg-subtle)" }}>Central de Ajuda</span>
              </span>
            </Link>
            <p style={{ marginTop: "12px", fontSize: "13px", color: "var(--fg-muted)", lineHeight: 1.6 }}>
              Tutoriais, artigos e suporte para você usar a DigAI com confiança e extrair o máximo da plataforma.
            </p>
          </div>

          {/* Links */}
          <nav style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px" }}>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ fontSize: "13px", color: "var(--fg-muted)", textDecoration: "none" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div
          style={{
            marginTop: "32px",
            paddingTop: "20px",
            borderTop: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <p style={{ fontSize: "12px", color: "var(--fg-subtle)" }}>
            © {new Date().getFullYear()} DigAI — Todos os direitos reservados.
          </p>
          <a
            href="https://www.digai.ai"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "12px", color: "var(--fg-subtle)", textDecoration: "none" }}
          >
            digai.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
