import { useState } from "react";
import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore();

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  // LOGIN
  const handleLogin = () => {
    setError("");

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        // salva UID
        localStorage.setItem("uid", user.uid);

        // busca dados do usuário no Firestore
        const userRef = doc(db, "usuarios", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();

          // salva se é admin
          localStorage.setItem(
            "isAdmin",
            userData.admin ? "true" : "false"
          );

          // salva plano do usuário
          localStorage.setItem(
            "plano",
            userData.plano || "prata"
          );
        } else {
          localStorage.setItem("isAdmin", "false");
          localStorage.setItem("plano", "prata");
        }

        navigate("/dashboard");
      })
      .catch(() => {
        setError("Email ou senha incorretos");
      });
  };

  // RESET DE SENHA
  const handlePasswordReset = () => {
    if (!resetEmail) {
      setError("Digite um email válido");
      return;
    }

    sendPasswordResetEmail(auth, resetEmail)
      .then(() => {
        setToastMessage("Email de recuperação enviado com sucesso");
        setError("");
        setShowResetModal(false);
        setResetEmail("");

        setTimeout(() => {
          setToastMessage("");
        }, 3000);
      })
      .catch(() => {
        setError("Erro ao enviar email de recuperação");
      });
  };

  return (
    <>
      {toastMessage && (
        <div className={styles.toast}>{toastMessage}</div>
      )}

      <div className={styles.login}>
        <div className={styles.container}>
          {/* LADO ESQUERDO */}
          <div className={styles.left}>
            <div className={styles.brand}>
              <div className={styles.logo} />
              <h1 className={styles.headline}>Pelé do Motion</h1>
              <p className={styles.subtitle}>
                Potencialize sua performance digital centralizando ferramentas
                premium.
              </p>
            </div>
          </div>

          {/* LADO DIREITO */}
          <div className={styles.right}>
            <div className={styles.card}>
              <h2>Entrar no portal</h2>

              <label>Email</label>
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label>Senha</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button onClick={handleLogin}>Entrar</button>

              <p
                className={styles.forgot}
                onClick={() => setShowResetModal(true)}
              >
                Esqueceu a senha?
              </p>

              {error && <p className={styles.error}>{error}</p>}
            </div>
          </div>
        </div>

        {/* MODAL RESET */}
        {showResetModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h3>Recuperar senha</h3>
              <p>
                Informe seu email para receber o link de redefinição de senha.
              </p>

              <input
                type="email"
                placeholder="seu@email.com"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              />

              <div className={styles.modalActions}>
                <button
                  className={styles.cancel}
                  onClick={() => setShowResetModal(false)}
                >
                  Cancelar
                </button>

                <button
                  className={styles.send}
                  onClick={handlePasswordReset}
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

