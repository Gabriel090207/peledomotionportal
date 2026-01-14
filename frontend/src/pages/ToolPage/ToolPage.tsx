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
  <i className="fa-solid fa-arrow-left-long" />
  <span>Voltar para ferramentas</span>
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
    className={`${styles.tab} ${activeTab === "profiles" ? styles.active : ""}`}
    onClick={() => setActiveTab("profiles")}
  >
    Perfis
  </button>

  <button
    className={`${styles.tab} ${activeTab === "groups" ? styles.active : ""}`}
    onClick={() => setActiveTab("groups")}
  >
    Grupos
  </button>
</div>


        <div className={styles.list}>
          {activeTab === "profiles" && (
            <>
              <ProfileRow
                name="ChatGPT - Cliente A"
                group="Agência X"
                status="active"
              />
              <ProfileRow
                name="ChatGPT - Cliente B"
                group="Time Interno"
                status="inactive"
              />
            </>
          )}

          
        </div>

      </main>
    </div>
  );
}
