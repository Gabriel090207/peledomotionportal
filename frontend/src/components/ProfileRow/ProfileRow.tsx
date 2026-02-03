import styles from "./ProfileRow.module.css";
import { useState, useEffect } from "react";

type Props = {
  profileId: number;
  name: string;
  group: string;
  status: "active" | "inactive";
};

export default function ProfileRow({
  profileId,
  name,
  group,
  status,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [inUse, setInUse] = useState(false);

  async function checkIfProfileIsOpen() {
    try {
      const response = await fetch(
        "http://127.0.0.1:3001/opened-profiles",
        {
          method: "POST",
        }
      );

      const data = await response.json();

      const openedProfiles = data?.data || [];

      const isOpened = openedProfiles.some(
        (p: any) => p.profile_id === profileId
      );

      setInUse(isOpened);
    } catch (err) {
      console.error("Erro verificando perfis abertos:", err);
    }
  }

  useEffect(() => {
    checkIfProfileIsOpen();
  }, []);

  async function handleOpenProfile() {
    console.log("PROFILE ID:", profileId);

    try {
      setLoading(true);
      setErrorMsg(null);

      const response = await fetch(
        "http://127.0.0.1:3001/open-profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            profile_id: profileId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao abrir perfil");
      }

      const data = await response.json();
      console.log("Resposta agente:", data);

      if (data?.error?.code === 111003) {
        setErrorMsg("Perfil em uso, tente novamente mais tarde.");
        setInUse(true);
        return;
      }

      console.log("Perfil aberto com sucesso");
      setInUse(false);
    } catch (err) {
      console.error(err);
      alert("Erro ao abrir o perfil");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rowcontent">
      <div className={styles.row}>
        <span>{name}</span>
        <span>{group}</span>

        <span
          className={
            status === "active" ? styles.active : styles.inactive
          }
        >
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
          <span style={{ color: "red", fontSize: "12px" }}>
            {errorMsg}
          </span>
        )}
      </div>
    </div>
  );
}
