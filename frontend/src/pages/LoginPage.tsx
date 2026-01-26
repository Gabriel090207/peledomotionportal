import { useState } from "react";
import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
 // Importe a configuração do Firebase
import { signInWithEmailAndPassword } from "firebase/auth"; // Importe a função de login

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");  // Estado para o email
  const [password, setPassword] = useState("");  // Estado para a senha
  const [error, setError] = useState("");  // Estado para capturar erros de login

  // Função para login
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Usuário logado com sucesso
        const user = userCredential.user;
        console.log("Usuário logado:", user);
        navigate("/dashboard"); // Redireciona para o dashboard ou outra página
      })
      .catch((error) => {
        console.error("Erro no login:", error.code);
      
        if (error.code === "auth/invalid-credential") {
          setError("Email ou senha incorretos");
        } else if (error.code === "auth/user-not-found") {
          setError("Usuário não encontrado");
        } else if (error.code === "auth/wrong-password") {
          setError("Senha incorreta");
        } else {
          setError("Erro ao entrar. Tente novamente.");
        }
      });
      
  };

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

            {/* Input de email */}
            <label>Email</label>
            <input 
              type="email" 
              placeholder="seu@email.com"
              value={email} 
              onChange={(e) => setEmail(e.target.value)}  // Atualiza o estado do email
            />

            {/* Input de senha */}
            <label>Senha</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}  // Atualiza o estado da senha
            />

            {/* Botão de login */}
            <button onClick={handleLogin}>
              Entrar
            </button>

            {/* Exibir erro se houver */}
            {error && <p className={styles.error}>{error}</p>}

          </div>
        </div>
      </div>
    </div>
  );
}
