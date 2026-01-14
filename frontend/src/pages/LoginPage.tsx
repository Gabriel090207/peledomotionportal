import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.login}>
      <div className={styles.container}>
        
        {/* LADO ESQUERDO */}
        <div className={styles.left}>
          <div className={styles.brand}>
            <div className={styles.logo} />
            <h1 className={styles.headline}>Pelé do Motion</h1>
            <p className={styles.subtitle}>
              Potencialize sua performance digital centralizando ferramentas premium.
            </p>
          </div>
        </div>

        {/* LADO DIREITO */}
        <div className={styles.right}>
          <div className={styles.card}>
            <h2>Entrar no portal</h2>

            <label>Email</label>
            <input type="email" placeholder="seu@email.com" />

            <label>Senha</label>
            <input type="password" placeholder="••••••••" />

            <button onClick={() => navigate("/")}>
              Entrar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
