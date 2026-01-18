import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import ProfileRow from "../../components/ProfileRow/ProfileRow";
import styles from "./ToolPage.module.css";

import { tools } from "../../data/tools";
import type { ToolKey } from "../../data/tools";

export default function ToolPage() {
  const { toolId } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] =
    useState<"profiles" | "groups">("profiles");

  const tool =
    toolId && toolId in tools
      ? tools[toolId as ToolKey]
      : null;

  // 🔥 PERFIS FIXOS (TESTE)
  const profiles = [
    {
      profile_id: 77,
      name: "Gpt Busines 2",
      group: "ChatGPT",
      tool: "chatgpt", // 🔑 MUITO IMPORTANTE
    },
    {
      profile_id: 76,
      name: "Gpt Busines",
      group: "ChatGPT",
      tool: "chatgpt", // 🔑 MUITO IMPORTANTE
    },
    {
      profile_id: 75,
      name: "ChatGPT 08 + Sora",
      group: "ChatGPT",
      tool: "chatgpt", // 🔑 MUITO IMPORTANTE
    },
    {
      profile_id: 74,
      name: "ChatGPT 07 + Sora 2",
      group: "ChatGPT",
      tool: "chatgpt", // 🔑 MUITO IMPORTANTE
    },
    {
      profile_id: 52,
      name: "ChatGPT Pro",
      group: "ChatGPT",
      tool: "chatgpt", // 🔑 MUITO IMPORTANTE
    },
    {
      profile_id: 51,
      name: "ChatGPT 05",
      group: "ChatGPT",
      tool: "chatgpt", // 🔑 MUITO IMPORTANTE
    },
    {
      profile_id: 44,
      name: "GPT 04",
      group: "ChatGPT",
      tool: "chatgpt", // 🔑 MUITO IMPORTANTE
    },
    {
      profile_id: 42,
      name: "ChatGPT 03",
      group: "ChatGPT",
      tool: "chatgpt", // 🔑 MUITO IMPORTANTE
    },
    {
      profile_id: 40,
      name: "ChatGPT 02",
      group: "ChatGPT",
      tool: "chatgpt", // 🔑 MUITO IMPORTANTE
    },
    {
      profile_id: 21,
      name: "ChatGPT 01",
      group: "ChatGPT",
      tool: "chatgpt", // 🔑 MUITO IMPORTANTE
    },
    {
      profile_id: 54,
      name: "Leonardo AI 05",
      group: "Leonardo AI",
      tool: "leonardo", // 🔑 MUITO IMPORTANTE
    },
  ];

  // 🔥 FILTRO PELO TOOL ID DA URL
  const filteredProfiles = profiles.filter(
    (profile) => profile.tool === toolId
  );

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
        <button className={styles.back} onClick={() => navigate("/")}>
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

          <button
            className={`${styles.tab} ${
              activeTab === "groups" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("groups")}
          >
            Grupos
          </button>
        </div>

        <div className={styles.list}>
          {activeTab === "profiles" &&
            filteredProfiles.map((profile) => (
              <ProfileRow
                key={profile.profile_id}
                profileId={profile.profile_id}
                name={profile.name}
                group={profile.group}
                status="active"
              />
            ))}

          {activeTab === "profiles" && filteredProfiles.length === 0 && (
            <p>Nenhum perfil encontrado.</p>
          )}
        </div>
      </main>
    </div>
  );
}
