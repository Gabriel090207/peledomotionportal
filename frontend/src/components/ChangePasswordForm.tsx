import React, { useState, useEffect } from "react";
import styles from "./ChangePasswordForm.module.css";

import { auth } from "../services/firebase";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

import { FiEye, FiEyeOff } from "react-icons/fi";

interface Props {
  onClose: () => void;
}

const ChangePasswordForm: React.FC<Props> = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [closing, setClosing] = useState(false);


  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    if (newPassword.length < 8) {
      setError("A nova senha deve ter no mínimo 8 caracteres.");
      return;
    }

    if (currentPassword === newPassword) {
      setError("A nova senha deve ser diferente da senha atual.");
      return;
    }

    const user = auth.currentUser;

    if (!user || !user.email) {
      setError("Usuário não autenticado.");
      return;
    }

    setLoading(true);

    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );

      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);

      setSuccess(true);

      setTimeout(() => {
        handleClose();

      }, 800);
    } catch (err: any) {
      console.error("Firebase error:", err);

      switch (err.code) {
        case "auth/wrong-password":
          setError("Senha atual incorreta.");
          break;
        case "auth/requires-recent-login":
          setError("Por segurança, faça login novamente.");
          break;
        default:
          setError("Não foi possível atualizar a senha.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setClosing(true);
  
    setTimeout(() => {
      onClose();
    }, 300); // mesmo tempo da animação CSS
  };
  

  return (
    <div className={styles.overlay}>
<div
  className={`${styles.modal} ${closing ? styles.closing : ""}`}
>

        <h3>Alterar Senha</h3>

        {success && (
          <p className={styles["success-message"]}>
            Senha alterada com sucesso!
          </p>
        )}

        {error && (
          <p className={styles["error-message"]}>
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          {/* Senha Atual */}
          <label>
            Senha Atual:
            <div className={styles.inputWrapper}>
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowCurrent(!showCurrent)}
              >
                {showCurrent ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </label>

          {/* Nova Senha */}
          <label>
            Nova Senha:
            <div className={styles.inputWrapper}>
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowNew(!showNew)}
              >
                {showNew ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </label>

          {/* Confirmar Senha */}
          <label>
            Confirmar Nova Senha:
            <div className={styles.inputWrapper}>
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </label>

          <button type="submit" disabled={loading}>
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </form>

        <button
          className={styles["close-btn"]}
          onClick={handleClose}

          disabled={loading}
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
