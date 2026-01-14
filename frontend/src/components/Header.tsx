import styles from "./Header.module.css";
import logoPM from "../assets/logo-pm.png";
import { useNavigate } from "react-router-dom";



export default function Header() {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <img src={logoPM} alt="Pelé do Motion" className={styles.logo} />
        <span className={styles.brand}>Pelé do Motion</span>
      </div>

      <div className={styles.right}>
        <button className={styles.user}>Usuário</button>

        <button
          className={styles.logout}
          onClick={() => navigate("/login")}
        >
          Sair
        </button>
      </div>
    </header>
  );
}
