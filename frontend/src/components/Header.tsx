import { useState } from "react";
import styles from "./Header.module.css";
import logoPM from "../assets/logo-pm.png";
import { useNavigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import ChangePasswordForm from "../components/ChangePasswordForm";
import AdminModal from "./AdminModal";

export default function Header() {
  const navigate = useNavigate();
  const [adminOpen, setAdminOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  const isAdmin = localStorage.getItem("isAdmin") === "true";

  return (
    <>
      <header className={styles.header}>
        <div className={styles.left}>
          <img src={logoPM} alt="Pelé do Motion" className={styles.logo} />
          <span className={styles.brand}>Pelé do Motion</span>
        </div>

        <div className={styles.right}>
          <button
            className={styles.user}
            onClick={() => setPasswordModalOpen(true)}
          >
            Usuário
          </button>

          <button
            className={styles.logout}
            onClick={() => navigate("/")}
          >
            Sair
          </button>

          {isAdmin && (
            <button
              className={styles.settings}
              onClick={() => setAdminOpen(true)}
            >
              <FiSettings size={15} />
            </button>
          )}
        </div>
      </header>

      {passwordModalOpen && (
        <ChangePasswordForm onClose={() => setPasswordModalOpen(false)} />
      )}

      <AdminModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
      />
    </>
  );
}
