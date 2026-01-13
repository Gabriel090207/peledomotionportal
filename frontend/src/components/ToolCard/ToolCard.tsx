import styles from "./ToolCard.module.css";

type Props = {
  name: string;
  description: string;
  image: string;
};

export default function ToolCard({ name, description, image }: Props){
  return (
    <div className={styles.card}>
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${image})` }}
      />

      <div className={styles.body}>
        <h3>{name}</h3>
        <p>{description}</p>
        <button>Acessar</button>
      </div>
    </div>
  );
}
