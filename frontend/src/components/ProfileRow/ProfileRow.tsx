import styles from "./ProfileRow.module.css";
import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

type Props = {
  profileId: number; // número do perfil (ex: 27)
  name: string;
  group: string;
  status: "active" | "inactive";
};

export default function ProfileRow({ profileId, name, group, status }: Props) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [inUse, setInUse] = useState(false);

  async function handleOpenProfile() {
    console.log("PROFILE NO:", profileId);

    try {
      setLoading(true);
      setErrorMsg(null);

      const data: any = await invoke("open_profile", {
        profileNo: String(profileId),
      });

      console.log("Resposta AdsPower:", data);

      const parsed = typeof data === "string" ? JSON.parse(data) : data;

      if (parsed?.code !== 0) {
        const msg = parsed?.msg || "Erro ao abrir o perfil";

        const isInUse =
          typeof msg === "string" &&
          (msg.toLowerCase().includes("in use") ||
            msg.toLowerCase().includes("used") ||
            msg.toLowerCase().includes("opened") ||
            msg.toLowerCase().includes("running"));

        setErrorMsg(msg);
        setInUse(isInUse);
        return;
      }

      console.log("Perfil aberto com sucesso");
      setInUse(false);
      setErrorMsg(null);
    } catch (err) {
      console.error(err);
      setErrorMsg("Erro ao abrir o perfil");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rowcontent">
      <div className={styles.row}>
        <span>{name}</span>
        <span>{group}</span>

        <span className={status === "active" ? styles.active : styles.inactive}>
          {status === "active" ? "Ativo" : "Inativo"}
        </span>

        <button
          onClick={handleOpenProfile}
          disabled={status !== "active" || loading}
          className={inUse ? styles.inUseButton : ""}
        >
          {loading ? "Abrindo..." : inUse ? "Em uso" : "Acessar"}
        </button>

        {errorMsg && (
          <span style={{ color: "red", fontSize: "12px" }}>{errorMsg}</span>
        )}
      </div>
    </div>
  );
}