import { useEffect, useState } from "react";
import styles from "./AdminModal.module.css";

import { FiMoreVertical, FiTrash2 } from "react-icons/fi";


type AdminModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AdminModal({
  isOpen,
  onClose,
}: AdminModalProps) {

  const [activePage, setActivePage] = useState("usuarios");

  const [closing, setClosing] = useState(false);

  const [openConfirm, setOpenConfirm] = useState<number | null>(null);


  useEffect(() => {
    if (!isOpen) {
      setClosing(false);
    }
  }, [isOpen]);

  if (!isOpen && !closing) return null;

  function handleClose() {
    setClosing(true);
    setTimeout(onClose, 300);
  }

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div
        className={`${styles.modal} ${closing ? styles.closing : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.close} onClick={handleClose}>
          ✕
        </button>

        <div className={styles.layout}>
  {/* Sidebar */}
  <aside className={styles.sidebar}>
    <h3 className={styles.sidebarTitle}>Admin</h3>

    <nav className={styles.menu}>
  <button
    className={styles.menuItem}
    onClick={() => setActivePage("usuarios")}
  >
    Usuários
  </button>

  <button
    className={styles.menuItem}
    onClick={() => setActivePage("addTool")}
  >
    Adicionar ferramenta
  </button>

  <button
    className={styles.menuItem}
    onClick={() => setActivePage("editTool")}
  >
    Editar ferramenta
  </button>

  <button
    className={styles.menuItem}
    onClick={() => setActivePage("deleteTool")}
  >
    Excluir ferramenta
  </button>
</nav>

  </aside>

  {/* Conteúdo */}
  <main className={styles.main}>
  {activePage === "usuarios" && (
  <>
    <h2>Usuários</h2>

    <div className={styles.table}>
      {/* Cabeçalho */}
      <div className={`${styles.row} ${styles.headerRow}`}>
        <span>Nome</span>
        <span>Email</span>
        <span>Plano</span>
        <span></span>
      </div>

      {/* Linha */}
      <div className={styles.row}>
        <span>João Silva</span>
        <span>joao@email.com</span>
        <span>Pro</span>
        <button className={styles.more}>
  <FiMoreVertical size={18} />
</button>
      </div>

      <div className={styles.row}>
        <span>Maria Souza</span>
        <span>maria@email.com</span>
        <span>Free</span>
        <button className={styles.more}>
  <FiMoreVertical size={18} />
</button>
      </div>

      <div className={styles.row}>
        <span>Carlos Lima</span>
        <span>carlos@email.com</span>
        <span>Enterprise</span>
        <button className={styles.more}>
  <FiMoreVertical size={18} />
</button>

      </div>
    </div>
  </>
)}


{activePage === "addTool" && (
  <>
    <h2>Adicionar ferramenta</h2>

    <form className={styles.form}>
      {/* Nome */}
      <div className={styles.field}>
        <label>Nome da ferramenta</label>
        <input
          type="text"
          placeholder="Ex: Automação WhatsApp"
        />
      </div>

      {/* Linha com dois campos */}
      <div className={styles.rowFields}>
        <div className={styles.field}>
          <label>Grupo</label>
          <input
            type="text"
            placeholder="Ex: Marketing"
          />
        </div>

        <div className={styles.field}>
          <label>ID da ferramenta</label>
          <input
            type="text"
            placeholder="Ex: tool_001"
          />
        </div>
      </div>
    </form>
  </>
)}


{activePage === "editTool" && (
  <>
    <h2>Editar ferramenta</h2>

    <div className={styles.list}>
      <div className={styles.listItem}>
        <span>Automação WhatsApp</span>
        <button className={styles.editBtn}>Editar</button>
      </div>

      <div className={styles.listItem}>
        <span>Gerador de Leads</span>
        <button className={styles.editBtn}>Editar</button>
      </div>

      <div className={styles.listItem}>
        <span>CRM Inteligente</span>
        <button className={styles.editBtn}>Editar</button>
      </div>
    </div>
  </>
)}


{activePage === "deleteTool" && (
  <>
    <h2>Excluir ferramenta</h2>

    <div className={styles.deleteList}>
      <div className={styles.deleteItem}>
        <span>Automação WhatsApp</span>

        <div
  className={styles.deleteWrapper}
  onClick={(e) => e.stopPropagation()}
>

        <button
  className={styles.trashBtn}
  onClick={() =>
    setOpenConfirm(openConfirm === 0 ? null : 0)
  }
>
  <FiTrash2 size={18} />
</button>

{openConfirm === 0 && (
  <div className={styles.confirmCard}>
    <p>Remover ferramenta?</p>
    <button className={styles.confirmBtn}>
      Remover
    </button>
  </div>
)}

        </div>
      </div>

      <div className={styles.deleteItem}>
        <span>Gerador de Leads</span>

        <div
  className={styles.deleteWrapper}
  onClick={(e) => e.stopPropagation()}
>

        <button
  className={styles.trashBtn}
  onClick={() =>
    setOpenConfirm(openConfirm === 1 ? null : 1)
  }
>
  <FiTrash2 size={18} />
</button>

{openConfirm === 1 && (
  <div className={styles.confirmCard}>
    <p>Remover ferramenta?</p>
    <button className={styles.confirmBtn}>
      Remover
    </button>
  </div>
)}



        </div>
      </div>
    </div>
  </>
)}

</main>

</div>

      </div>
    </div>
  );
}

