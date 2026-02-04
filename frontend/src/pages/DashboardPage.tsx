import { useState, useEffect } from "react";
import Header from "../components/Header";
import CategoryRow from "../components/CategoryRow/CategoryRow";
import styles from "./DashboardPage.module.css";
import { FiSearch } from "react-icons/fi";

import { checkAgentRunning } from "../utils/checkAgent";
import AgentRequiredOverlay from "../components/AgentRequiredOverlay";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../services/firebase";

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

  const toolsByCategory = filteredTools.reduce<
    Record<string, typeof filteredTools>
  >((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }

    acc[tool.category].push(tool);
    return acc;
  }, {});

  async function fetchTools() {
    // 👇 pega plano salvo no login
    const plano = localStorage.getItem("plano") || "prata";

    const snapshot = await getDocs(collection(db, "tools"));

    const data = snapshot.docs
      .map((doc) => {
        const d = doc.data();

        return {
          id: doc.id,
          name: d.name,
          description: d.description,
          category: d.category,
          image: d.imageUrl,
          planoOuro: d.planoOuro,
          planoPrata: d.planoPrata,
        };
      })
      .filter((tool) => {
        // se campo não existir, considera liberado
        if (plano === "ouro") {
          return tool.planoOuro !== false;
        }

        return tool.planoPrata !== false;
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
