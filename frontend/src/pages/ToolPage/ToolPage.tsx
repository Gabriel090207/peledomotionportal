import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import ProfileRow from "../../components/ProfileRow/ProfileRow";
import styles from "./ToolPage.module.css";

import { tools } from "../../data/tools";
import type { ToolKey } from "../../data/tools";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/firebase";

type Perfil = {
  profile_id: number;
  name: string;
  group: string;
  tool: string;
  ativo: boolean;
};

export default function ToolPage() {
  const { toolId } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] =
    useState<"profiles" | "groups">("profiles");

  const [profiles, setProfiles] = useState<Perfil[]>([]);
  const [loading, setLoading] = useState(true);

  const tool =
    toolId && toolId in tools
      ? tools[toolId as ToolKey]
      : null;

  // 🔥 BUSCAR PERFIS PELO TOOL
  useEffect(() => {
    async function fetchProfiles() {
      if (!toolId) return;

      setLoading(true);

      const q = query(
        collection(db, "perfis"),
        where("tool", "==", toolId),
        where("ativo", "==", true)
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => doc.data() as Perfil);

      setProfiles(data);
      setLoading(false);
    }

    fetchProfiles();
  }, [toolId]);

  // ❌ Tool não existe
  if (!tool) {
    return (
      <div className={styles.page}>
        <Header />
        <main className={styles.content}>
          <p>Ferramenta não encontrada.</p>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.content}>
        <button className={styles.back} onClick={() => navigate("/dashboard")}>
          ← Voltar para ferramentas
        </button>

        <div className={styles.toolCard}>
          <img src={tool.logo} alt={tool.name} />
          <div>
            <h1>{tool.name}</h1>
            <p>{tool.description}</p>
          </div>
        </div>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${
              activeTab === "profiles" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("profiles")}
          >
            Perfis
          </button>

          
        </div>

        <div className={styles.list}>
          {activeTab === "profiles" && loading && (
            <p>Carregando perfis...</p>
          )}

          {activeTab === "profiles" &&
            !loading &&
            profiles.map((profile) => (
              <ProfileRow
                key={profile.profile_id}
                profileId={profile.profile_id}
                name={profile.name}
                group={profile.group}
                status="active"
              />
            ))}

          {activeTab === "profiles" &&
            !loading &&
            profiles.length === 0 && (
              <p>Nenhum perfil encontrado.</p>
            )}
        </div>
      </main>
    </div>
  );
}
