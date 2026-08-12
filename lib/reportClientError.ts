/**
 * Envia um erro de client para /api/client-error (visível nos Runtime Logs).
 * Também trata falha de carregamento de chunk: quando um deploy novo invalida
 * os chunks que a aba já tinha, um reload único resolve.
 */
export function reportClientError(error: Error & { digest?: string }): void {
  if (typeof window === "undefined") return;

  console.error("[client-error]", error);

  try {
    fetch("/api/client-error", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: error?.message,
        stack: error?.stack,
        digest: error?.digest,
        url: window.location.href,
        userAgent: navigator.userAgent,
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // nunca deixar o reporter derrubar o boundary
  }
}

/** Chunk velho após deploy — recarrega uma única vez. Retorna true se recarregou. */
export function recoverFromChunkError(error: Error): boolean {
  if (typeof window === "undefined") return false;

  const msg = `${error?.name ?? ""} ${error?.message ?? ""}`;
  if (!/ChunkLoadError|Loading chunk .* failed|Failed to fetch dynamically imported module/i.test(msg)) {
    return false;
  }

  try {
    if (sessionStorage.getItem("digai_chunk_reload") === "1") return false;
    sessionStorage.setItem("digai_chunk_reload", "1");
  } catch {
    return false;
  }

  window.location.reload();
  return true;
}
