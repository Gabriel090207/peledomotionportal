import { useState } from "react";
import Header from "../components/Header";
import CategoryRow from "../components/CategoryRow/CategoryRow";
import styles from "./DashboardPage.module.css";
import { FiSearch } from "react-icons/fi";

// IMAGENS
import leonardoImg from "../assets/tools/leonardo.png";
import chatgptImg from "../assets/tools/chatgpt.png";
import midjourneyImg from "../assets/tools/midjourney.png";
import artlistImg from "../assets/tools/artlist.png";
import elevenlabsImg from "../assets/tools/elevenlabs.png";
import envatoImg from "../assets/tools/envato.png";
import geminiImg from "../assets/tools/Gemini.png";
import motionarrayImg from "../assets/tools/motionarray.png";
import seeartImg from "../assets/tools/seeart.png";
import studiosmonkeyImg from "../assets/tools/studiosmonkey.png";
import vectorizerImg from "../assets/tools/vectorizer.png";
import googlelabsImg from "../assets/tools/googlelabs.png";
import stockmediaImg from "../assets/tools/adobestock.png";
import paineisadobeImg from "../assets/tools/paineisadobe.png";
import midartImg from "../assets/tools/midart.png"; // 🔹 CURSO


import { useEffect } from "react";
import { checkAgentRunning } from "../utils/checkAgent";
import AgentRequiredOverlay from "../components/AgentRequiredOverlay";

// 🔹 TODAS AS TOOLS
const tools = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    description: "IA conversacional com sessões independentes.",
    image: chatgptImg,
    category: "ia",
  },
  {
    id: "gemini",
    name: "Gemini",
    description: "IA multimodal para escrita, análise e raciocínio avançado.",
    image: geminiImg,
    category: "ia",
  },
  {
    id: "googlelabs",
    name: "Google Labs",
    description: "Ambiente experimental para testes e inovações em IA.",
    image: googlelabsImg,
    category: "ia",
  },
  {
    id: "leonardo",
    name: "Leonardo AI",
    description: "Geração de imagens com perfis isolados.",
    image: leonardoImg,
    category: "imagem",
  },
  {
    id: "midjourney",
    name: "Midjourney",
    description: "Criação visual avançada sem cruzamento de dados.",
    image: midjourneyImg,
    category: "imagem",
  },
  {
    id: "seeart",
    name: "SeeArt",
    description: "Criação de imagens artísticas com estilos personalizados.",
    image: seeartImg,
    category: "imagem",
  },
  {
    id: "vectorizer",
    name: "Vectorizer",
    description: "Conversão precisa de imagens em vetores escaláveis.",
    image: vectorizerImg,
    category: "imagem",
  },
  {
    id: "motionarray",
    name: "Motion Array",
    description: "Templates e recursos profissionais para edição de vídeo.",
    image: motionarrayImg,
    category: "video",
  },
  {
    id: "artlist",
    name: "Artlist",
    description: "Biblioteca de músicas e efeitos sonoros com licenciamento global.",
    image: artlistImg,
    category: "audio",
  },
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    description: "Geração de vozes realistas com controle total de identidade.",
    image: elevenlabsImg,
    category: "audio",
  },
  {
    id: "envato",
    name: "Envato",
    description: "Acesso a assets premium para projetos criativos e comerciais.",
    image: envatoImg,
    category: "edicao",
  },
  {
    id: "studiosmonkey",
    name: "Studios Monkey",
    description: "Gestão inteligente de estúdios e fluxos de produção.",
    image: studiosmonkeyImg,
    category: "edicao",
  },
  {
    id: "stockmedia",
    name: "Stock Media",
    description: "Banco de mídias premium para projetos criativos.",
    image: stockmediaImg,
    category: "edicao",
  },
  {
    id: "paineisadobe",
    name: "Painéis Adobe",
    description: "Gerenciamento centralizado de painéis e recursos Adobe.",
    image: paineisadobeImg,
    category: "edicao",
  },
  {
    id: "midart",
    name: "MidArt",
    description: "Curso completo de criação visual com IA.",
    image: midartImg,
    category: "curso",
  },
];

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("todas");
 const [agentMissing, setAgentMissing] = useState(false);


  // 🔎 BUSCA
 const filteredTools = tools.filter((tool) => {
  const matchesSearch =
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesCategory =
    activeFilter === "todas" || tool.category === activeFilter;

  return matchesSearch && matchesCategory;
});


  // 🔹 CATEGORIAS
 const iaTools = filteredTools.filter((t) => t.category === "ia");
const imagemTools = filteredTools.filter((t) => t.category === "imagem");
const videoTools = filteredTools.filter((t) => t.category === "video");
const edicaoTools = filteredTools.filter((t) => t.category === "edicao");
const cursoTools = filteredTools.filter((t) => t.category === "curso");


useEffect(() => {
  async function check() {
    const running = await checkAgentRunning();
    setAgentMissing(!running);
  }

  check();
}, []);

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.content}>
        {/* BANNER */}
        <section className={styles.banner}>
          <h1>
            Bem-vindo ao painel <span>mais completo</span> de IA do mercado.
          </h1>
          <p>
            Centralize as ferramentas mais poderosas do mundo em um só lugar,
            com acesso rápido, simples e inteligente.
          </p>
        </section>

        {/* FILTROS */}
        <section className={styles.filters}>
  <div className={styles.filterGroup}>
    <button
      className={activeFilter === "todas" ? styles.active : ""}
      onClick={() => setActiveFilter("todas")}
    >
      Todas
    </button>

    <button
      className={activeFilter === "ia" ? styles.active : ""}
      onClick={() => setActiveFilter("ia")}
    >
      IA
    </button>

    <button
      className={activeFilter === "imagem" ? styles.active : ""}
      onClick={() => setActiveFilter("imagem")}
    >
      Imagem
    </button>

    <button
      className={activeFilter === "video" ? styles.active : ""}
      onClick={() => setActiveFilter("video")}
    >
      Vídeo
    </button>

    <button
      className={activeFilter === "edicao" ? styles.active : ""}
      onClick={() => setActiveFilter("edicao")}
    >
      Edição
    </button>

    <button
      className={activeFilter === "curso" ? styles.active : ""}
      onClick={() => setActiveFilter("curso")}
    >
      Cursos
    </button>
  </div>

  <div className={styles.searchWrapper}>
    <FiSearch className={styles.searchIcon} />
    <input
      type="text"
      placeholder="Buscar ferramenta..."
      className={styles.search}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>
</section>


        {/* RESULTADOS */}
        {activeFilter !== "todas" || searchTerm ? (
  <CategoryRow tools={filteredTools} hideHeader />
) : (
  <>
    <CategoryRow title="Inteligência Artificial" tools={iaTools} />
    <CategoryRow title="Imagem" tools={imagemTools} />
    <CategoryRow title="Vídeo" tools={videoTools} />
    <CategoryRow title="Edição" tools={edicaoTools} />
    <CategoryRow title="Cursos" tools={cursoTools} />
  </>
)}

      </main>


      {agentMissing && (
  <AgentRequiredOverlay
    onDownload={() => {
      window.location.href = "/agent.app";
    }}
    onRetry={async () => {
      const running = await checkAgentRunning();
      setAgentMissing(!running);
    }}
  />
)}


    </div>
  );
}