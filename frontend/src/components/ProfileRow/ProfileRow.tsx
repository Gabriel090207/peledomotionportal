import styles from "./ProfileRow.module.css";
import { useState } from "react";


type Props = {
  profileId: number;
  name: string;
  group: string;
  status: "active" | "inactive";
};


export default function ProfileRow({ profileId, name, group, status }: Props) {

const [loading, setLoading] = useState(false);

async function handleOpenProfile() {
  console.log("PROFILE ID:", profileId);

  try {
    setLoading(true);

    const response = await fetch(
      `http://127.0.0.1:8000/ixbrowser/profiles/${profileId}/open`,
      {
        method: "POST",
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao abrir perfil");
    }

    console.log("Perfil aberto com sucesso");
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
      <span className={status === "active" ? styles.active : styles.inactive}>
        {status === "active" ? "Ativo" : "Inativo"}
      </span>
      <button
  onClick={handleOpenProfile}
  disabled={status !== "active" || loading}
>
  {loading ? "Abrindo..." : "Acessar"}
</button>

    </div>
    </div>
  );
}
