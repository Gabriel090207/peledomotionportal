import { useState, useEffect } from "react";
import Header from "../components/Header";
import CategoryRow from "../components/CategoryRow/CategoryRow";
import styles from "./DashboardPage.module.css";
import { FiSearch } from "react-icons/fi";

import { checkAgentRunning } from "../utils/checkAgent";
import AgentRequiredOverlay from "../components/AgentRequiredOverlay";


import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../services/firebase";

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
import midartImg from "../assets/tools/midart.png";

// TODAS AS TOOLS
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
    description: "Biblioteca de músicas e efeitos sonoros.",
    image: artlistImg,
    category: "audio",
  },
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    description: "Geração de vozes realistas.",
    image: elevenlabsImg,
    category: "audio",
  },
  {
    id: "envato",
    name: "Envato",
    description: "Assets premium para projetos criativos.",
    image: envatoImg,
    category: "edicao",
  },
  {
    id: "studiosmonkey",
    name: "Studios Monkey",
    description: "Gestão inteligente de estúdios.",
    image: studiosmonkeyImg,
    category: "edicao",
  },
  {
    id: "stockmedia",
    name: "Stock Media",
    description: "Banco de mídias premium.",
    image: stockmediaImg,
    category: "edicao",
  },
  {
    id: "paineisadobe",
    name: "Painéis Adobe",
    description: "Gerenciamento de painéis Adobe.",
    image: paineisadobeImg,
    category: "edicao",
  },
  {
    id: "midart",
    name: "MidArt",
    description: "Curso completo de criação visual.",
    image: midartImg,
    category: "curso",
  },
];

export default function DashboardPage() {


  
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("todas");
  const [agentMissing, setAgentMissing] = useState(false);


  const [tools, setTools] = useState<any[]>([]);


  const [profileCounts, setProfileCounts] = useState<Record<string, number>>({});
  const [loadingProfiles, setLoadingProfiles] = useState(true);

 const filteredTools = tools.filter((tool) => {
  if (!loadingProfiles) {
    const count = profileCounts[tool.id] || 0;
    if (count === 0) return false;
  }

  const matchesSearch =
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesCategory =
    activeFilter === "todas" || tool.category === activeFilter;

  return matchesSearch && matchesCategory;
});


 const toolsByCategory = filteredTools.reduce<Record<string, typeof filteredTools>>(
  (acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }

    acc[tool.category].push(tool);
    return acc;
  },
  {}
);


async function fetchTools() {
  const snapshot = await getDocs(collection(db, "tools"));

 const data = snapshot.docs.map(doc => {
  const d = doc.data();

  return {
    id: doc.id,
    name: d.name,
    description: d.description,
    category: d.category,
    image: d.imageUrl, // <-- aqui corrige
  };
});


  setTools(data);
}


useEffect(() => {
  fetchTools();
}, []);


  useEffect(() => {
    async function check() {
      const running = await checkAgentRunning();
      setAgentMissing(!running);
    }

    check();
  }, []);


  useEffect(() => {
  async function loadProfileCounts() {
    setLoadingProfiles(true);

    const q = query(
      collection(db, "perfis"),
      where("ativo", "==", true)
    );

    const snapshot = await getDocs(q);

    const counts: Record<string, number> = {};

    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      const tool = data.tool;

      if (!counts[tool]) counts[tool] = 0;
      counts[tool]++;
    });

    setProfileCounts(counts);
    setLoadingProfiles(false);
  }

  loadProfileCounts();
}, []);


  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.content}>
        <section className={styles.banner}>
          <h1>
            Bem-vindo ao painel <span>mais completo</span> de IA do mercado.
          </h1>
          <p>
            Centralize as ferramentas mais poderosas do mundo em um só lugar.
          </p>
        </section>

        <section className={styles.filters}>
          <div className={styles.filterGroup}>
            {["todas", "ia", "imagem", "video", "audio", "edicao", "curso"].map(
              (cat) => (
                <button
                  key={cat}
                  className={activeFilter === cat ? styles.active : ""}
                  onClick={() => setActiveFilter(cat)}
                >
                  {cat.toUpperCase()}
                </button>
              )
            )}
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

        {activeFilter !== "todas" || searchTerm ? (
          <CategoryRow tools={filteredTools} hideHeader />
        ) : (
          <>
            {toolsByCategory.ia && (
              <CategoryRow
                title="Inteligência Artificial"
                tools={toolsByCategory.ia}
              />
            )}
            {toolsByCategory.imagem && (
              <CategoryRow title="Imagem" tools={toolsByCategory.imagem} />
            )}
            {toolsByCategory.video && (
              <CategoryRow title="Vídeo" tools={toolsByCategory.video} />
            )}
            {toolsByCategory.audio && (
              <CategoryRow title="Áudio" tools={toolsByCategory.audio} />
            )}
            {toolsByCategory.edicao && (
              <CategoryRow title="Edição" tools={toolsByCategory.edicao} />
            )}
            {toolsByCategory.curso && (
              <CategoryRow title="Cursos" tools={toolsByCategory.curso} />
            )}
          </>
        )}
      </main>

      {agentMissing && (
        <AgentRequiredOverlay
          onDownload={() => setAgentMissing(false)}
          onRetry={async () => {
            const running = await checkAgentRunning();
            if (!running) {
              alert("O agente ainda não foi instalado.");
              return;
            }
            setAgentMissing(false);
          }}
        />
      )}
    </div>
  );
}
