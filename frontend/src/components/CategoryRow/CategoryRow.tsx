import { useRef } from "react";
import ToolCard from "../ToolCard/ToolCard";
import styles from "./CategoryRow.module.css";

type Tool = {
  name: string;
  description: string;
  image: string;
};

type Props = {
  title: string;
  tools: Tool[];
};

export default function CategoryRow({ title, tools }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!rowRef.current) return;

    const scrollAmount = 340; // largura do card + gap
    rowRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.arrows}>
          <button onClick={() => scroll("left")}>‹</button>
          <button onClick={() => scroll("right")}>›</button>
        </div>
      </div>

      <div className={styles.row} ref={rowRef}>
        {tools.map((tool, index) => (
          <ToolCard
            key={index}
            name={tool.name}
            description={tool.description}
            image={tool.image}
          />
        ))}
      </div>
    </section>
  );
}
