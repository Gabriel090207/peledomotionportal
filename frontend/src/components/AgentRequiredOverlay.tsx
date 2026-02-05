import { useRef, useState } from "react";

type Props = {
  onDownload: () => void;
  onRetry: () => void;
};

export default function AgentRequiredOverlay({
  onDownload,
  onRetry,
}: Props) {

  // tutorial aparece primeiro quando overlay é aberto
  const [showTutorial, setShowTutorial] = useState(true);
  const [videoFinished, setVideoFinished] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  function finishTutorial() {
    setShowTutorial(false);
  }

  let downloading = false;

  function handleDownload() {
    if (downloading) return;
    downloading = true;

    const platform = navigator.platform.toLowerCase();

    let file =
      "https://peledomotionportal-backend.onrender.com/downloads/agent-mac.zip";

    if (platform.includes("win")) {
      file =
        "https://peledomotionportal-backend.onrender.com/downloads/portal-agent-installer.exe";
    }

    const link = document.createElement("a");
    link.href = file;
    link.setAttribute("download", "");

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onDownload?.();

    setTimeout(() => {
      downloading = false;
    }, 3000);
  }

  /* =======================
     TUTORIAL
  ======================== */

  if (showTutorial) {
    return (
      <div style={styles.overlay}>
        <div style={{ ...styles.card, maxWidth: 720 }}>
          <h2 style={styles.title}>Tutorial rápido</h2>

          <video
            ref={videoRef}
            width="100%"
            controls
            autoPlay
            onEnded={() => setVideoFinished(true)}
            style={{ borderRadius: 12, marginTop: 12 }}
          >
            {/* troque pelo caminho real do vídeo */}
            <source src="/video.mp4" type="video/mp4" />
          </video>

          <button
            style={{
              ...styles.primaryButton,
              marginTop: 20,
              opacity: videoFinished ? 1 : 0.5,
              cursor: videoFinished ? "pointer" : "not-allowed",
            }}
            disabled={!videoFinished}
            onClick={finishTutorial}
          >
            Continuar
          </button>
        </div>
      </div>
    );
  }

  /* =======================
     MODAL DOWNLOAD AGENT
  ======================== */

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <h2 style={styles.title}>Ativar acesso ao navegador</h2>

        <p style={styles.text}>
          Para abrir perfis automaticamente, é necessário instalar o agente
          local no seu computador.
        </p>

        <button
          style={styles.primaryButton}
          onClick={handleDownload}
        >
          Baixar agente
        </button>

        <button
          style={styles.secondaryButton}
          onClick={onRetry}
        >
          Já instalei o agente
        </button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed" as const,
    inset: 0,
    background: "rgba(7,4,13,0.75)",
    backdropFilter: "blur(6px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },

  card: {
    background: "var(--card)",
    border: "1px solid var(--stroke)",
    borderRadius: "var(--radius)",
    padding: "32px",
    maxWidth: "420px",
    width: "90%",
    textAlign: "center" as const,
    boxShadow: "var(--shadow)",
    color: "var(--text)",
  },

  title: {
    marginBottom: "12px",
  },

  text: {
    color: "var(--muted)",
    lineHeight: 1.5,
  },

  primaryButton: {
    marginTop: "24px",
    padding: "14px 22px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: 600,
    color: "#fff",
    background: "linear-gradient(90deg, var(--p-0), var(--p-1))",
    boxShadow: "0 6px 24px rgba(138,0,255,.5)",
    width: "100%",
  },

  secondaryButton: {
    marginTop: "12px",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid var(--stroke)",
    background: "transparent",
    color: "var(--text)",
    cursor: "pointer",
    width: "100%",
  },
};