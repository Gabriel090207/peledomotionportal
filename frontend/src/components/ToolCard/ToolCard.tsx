import styles from "./ToolCard.module.css";
import { useNavigate } from "react-router-dom";


type Props = {
  id: string; // 🔹 novo
  name: string;
  description: string;
  image: string;
};

export default function ToolCard({ id, name, description, image }: Props) {
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${image})` }}
      />

      <div className={styles.body}>
        <h3>{name}</h3>
        <p>{description}</p>

        <button onClick={() => navigate(`/tool/${id}`)}>
          Acessar
        </button>
      </div>
    </div>
  );
}
