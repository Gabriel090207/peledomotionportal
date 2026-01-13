import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.logo} />
        <span className={styles.brand}>Pelé do Motion</span>
      </div>

      <div className={styles.right}>
        <button className={styles.user}>Usuário</button>
        <button className={styles.logout}>Sair</button>
      </div>
    </header>
  );
}
