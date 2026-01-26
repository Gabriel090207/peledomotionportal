import { useState } from "react";
import styles from "./Header.module.css";
import logoPM from "../assets/logo-pm.png";
import { useNavigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import AdminModal from "./AdminModal"; // Certifique-se de que o caminho está correto
import ChangePasswordForm from "../components/ChangePasswordForm"; // Importando o novo componente

export default function Header() {
  const navigate = useNavigate();
  const [adminOpen, setAdminOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false); // Estado para abrir/fechar o modal de troca de senha

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
            onClick={() => setPasswordModalOpen(true)} // Abre o modal de troca de senha
          >
            Usuário
          </button>

          <button
            className={styles.logout}
            onClick={() => navigate("/login")}
          >
            Sair
          </button>

          <button
            className={styles.settings}
            onClick={() => setAdminOpen(true)}
          >
            <FiSettings size={15} />
          </button>
        </div>
      </header>

      {passwordModalOpen && (
        <ChangePasswordForm onClose={() => setPasswordModalOpen(false)} /> // Exibe o formulário de troca de senha
      )}

      {/* Modal para configurações admin */}
      <AdminModal isOpen={adminOpen} onClose={() => setAdminOpen(false)} />
    </>
  );
}
