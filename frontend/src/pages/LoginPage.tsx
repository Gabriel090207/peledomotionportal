import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";


export default function LoginPage() {

    const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.left}>
  <div className={styles.brand}>
    <div className={styles.logo} />
    <h1 className={styles.headline}>
 Pelé do Motion
</h1>

<p className={styles.subtitle}>
Potencialize sua performane digital centralizando ferramentas premium.
</p>

  </div>
</div>


      <div className={styles.right}>
        <div className={styles.card}>
          <h2>Entrar no portal</h2>

          <label>Email</label>
          <input type="email" placeholder="seu@email.com" />

          <label>Senha</label>
          <input type="password" placeholder="••••••••" />

         <button onClick={() => navigate("/dashboard")}>
  Entrar
</button>

        </div>
      </div>
    </div>
  );
}
