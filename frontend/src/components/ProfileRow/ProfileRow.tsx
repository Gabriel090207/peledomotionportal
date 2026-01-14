import styles from "./ProfileRow.module.css";

type Props = {
  name: string;
  group: string;
  status: "active" | "inactive";
};

export default function ProfileRow({ name, group, status }: Props) {
  return (
    <div className="rowcontent">

    <div className={styles.row}>
      <span>{name}</span>
      <span>{group}</span>
      <span className={status === "active" ? styles.active : styles.inactive}>
        {status === "active" ? "Ativo" : "Inativo"}
      </span>
      <button>Acessar</button>
    </div>
    </div>
  );
}
