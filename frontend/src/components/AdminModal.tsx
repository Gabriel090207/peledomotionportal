import { useEffect, useState } from "react";
import styles from "./AdminModal.module.css";

import {
  FiMoreVertical,
  FiTrash2,
  FiSearch
} from "react-icons/fi";


import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase"; // ajuste o path
import { Timestamp } from "firebase/firestore";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { setDoc, serverTimestamp } from "firebase/firestore";



type Usuario = {
  id: string;
  email: string;
  ativo: boolean;
  criado_em?: Timestamp | string;
};



type AdminModalProps = {
  isOpen: boolean;
  onClose: () => void;
};


type Perfil = {
  id: string;           // 👈 ID REAL do Firestore
  profile_id: number;
  name: string;
  group: string;
  tool: string;
  ativo: boolean;
};






export default function AdminModal({ isOpen, onClose }: AdminModalProps) {
  const [activePage, setActivePage] = useState("usuarios");
  const [closing, setClosing] = useState(false);
 const [openConfirm, setOpenConfirm] = useState<string | null>(null);

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  const [openMenuUserId, setOpenMenuUserId] = useState<string | null>(null);
const [openEditUser, setOpenEditUser] = useState<Usuario | null>(null);
const [newEmail, setNewEmail] = useState("");


const [profileId, setProfileId] = useState<number | "">("");
const [profileName, setProfileName] = useState(""); // nome do perfil
const [group, setGroup] = useState("");
const [tool, setTool] = useState(""); // chave da ferramenta
const [saving, setSaving] = useState(false);



const [editingProfile, setEditingProfile] = useState<Perfil | null>(null);

const [editName, setEditName] = useState("");
const [editGroup, setEditGroup] = useState("");
const [editTool, setEditTool] = useState("");

const [perfis, setPerfis] = useState<Perfil[]>([]);

const [openConfirmProfile, setOpenConfirmProfile] = useState<string | null>(null);

const [searchPerfis, setSearchPerfis] = useState("");

const perfisFiltrados = perfis.filter((perfil) => {
  const termo = searchPerfis.toLowerCase().trim();

  if (!termo) return true;

  return perfil.name.toLowerCase().includes(termo);
});


  useEffect(() => {
    if (!isOpen) {
      setClosing(false);
    }
  }, [isOpen]);


  useEffect(() => {
  if (isOpen) {
    // 🔒 bloqueia scroll do fundo
    document.body.style.overflow = "hidden";
  } else {
    // 🔓 libera scroll
    document.body.style.overflow = "";
  }

  // segurança extra ao desmontar
  return () => {
    document.body.style.overflow = "";
  };
}, [isOpen]);


  useEffect(() => {
    if (isOpen && activePage === "usuarios") {
      fetchUsuarios();
    }
  }, [isOpen, activePage]);

  async function fetchUsuarios() {
    const snapshot = await getDocs(collection(db, "usuarios"));
    const data: Usuario[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Usuario, "id">),
    }));
    setUsuarios(data);
  }

  async function handleDeleteUser(userId: string) {
  await deleteDoc(doc(db, "usuarios", userId));
  setOpenConfirm(null);
  await fetchUsuarios();
}


  function handleClose() {
    setClosing(true);
    setTimeout(onClose, 300);
  }

 
async function handleSaveProfile(e: React.FormEvent) {
  e.preventDefault();

  if (
    profileId === "" ||
    !profileName.trim() ||
    !group.trim() ||
    !tool.trim()
  ) {
    alert("Preencha todos os campos");
    return;
  }

  setSaving(true);

  try {
    await setDoc(doc(db, "perfis", String(profileId)), {
      profile_id: profileId,
      name: profileName,
      group: group,
      tool: tool, // 👈 A CHAVE DA ROTA
      ativo: true,
      criado_em: serverTimestamp(),
    });

    alert("Perfil salvo com sucesso!");

    setProfileId("");
    setProfileName("");
    setGroup("");
    setTool("");
  } catch (err) {
    console.error(err);
    alert("Erro ao salvar perfil");
  } finally {
    setSaving(false);
  }
}


async function fetchPerfis() {
  const snapshot = await getDocs(collection(db, "perfis"));
 const data: Perfil[] = snapshot.docs.map((doc) => ({
  id: doc.id,          // 👈 AQUI
  ...(doc.data() as Omit<Perfil, "id">),
}));

  setPerfis(data);
}


useEffect(() => {
  if (
    isOpen &&
    (activePage === "editTool" || activePage === "deleteTool")
  ) {
    fetchPerfis();
  }
}, [isOpen, activePage]);


async function handleUpdateProfile() {
  if (!editingProfile) return;

  try {
    await updateDoc(
      doc(db, "perfis", editingProfile.id), // ✅ ID REAL DO DOC
      {
        name: editName,
        group: editGroup,
        tool: editTool,
      }
    );

    alert("Perfil atualizado com sucesso!");
    setEditingProfile(null);
    fetchPerfis();
  } catch (err) {
    console.error(err);
    alert("Erro ao atualizar perfil");
  }
}


async function handleDeleteProfile(profile: Perfil) {
  try {
    await deleteDoc(doc(db, "perfis", profile.id)); // 🔥 remove direto

    fetchPerfis();
  } catch (err) {
    console.error(err);
    alert("Erro ao remover perfil");
  }
}


 // ✅ CONTROLE DE VISIBILIDADE AQUI
  if (!isOpen && !closing) {
    return null;
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

 <main className={styles.main}>

  {activePage === "usuarios" && (
    <>
      <h2>Usuários</h2>

      <div className={styles.table}>
        <div className={`${styles.row} ${styles.headerRow}`}>
          <span>Email</span>
          <span>Status</span>
          <span>Criado em</span>
          <span></span>
        </div>

        {usuarios.map((user) => (
          <div key={user.id} className={styles.row}>
            <span>{user.email}</span>

            <span>{user.ativo ? "Ativo" : "Inativo"}</span>

            <span>
  {user.criado_em
    ? user.criado_em instanceof Timestamp
      ? user.criado_em.toDate().toLocaleDateString("pt-BR")
      : new Date(user.criado_em).toLocaleDateString("pt-BR")
    : "-"}
</span>



<div className={styles.menuWrapper}>
  {/* BOTÃO ⋮ */}
  <button
    className={styles.more}
    onClick={() =>
      setOpenMenuUserId(
        openMenuUserId === user.id ? null : user.id
      )
    }
  >
    <FiMoreVertical size={18} />
  </button>

  {/* MENU DE AÇÕES */}
  {openMenuUserId === user.id && (
    <div className={styles.userMenu}>
  

      <button
        className={styles.danger}
        onClick={() => {
          setOpenConfirm(user.id);
          setOpenMenuUserId(null);
        }}
      >
        <FiTrash2 size={16} />
        Remover usuário
      </button>
    </div>
  )}


{openEditUser && (
  <div className={styles.editOverlay} onClick={() => setOpenEditUser(null)}>
    <div
      className={styles.editModal}
      onClick={(e) => e.stopPropagation()}
    >
      <h2>Alterar email</h2>

      <div className={styles.form}>
        <div className={styles.field}>
          <label>Novo email</label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </div>

        <div className={styles.actions}>
          <button
            className={styles.editBtn}
            onClick={async () => {
              await updateDoc(
                doc(db, "usuarios", openEditUser.id),
                { email: newEmail }
              );
              fetchUsuarios();
              setOpenEditUser(null);
            }}
          >
            Salvar
          </button>

          <button
            className={styles.cancelBtn}
            onClick={() => setOpenEditUser(null)}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
)}

  {/* CONFIRMAÇÃO */}
 {openConfirm === user.id && (
  <div className={styles.confirmCard}>
    <p>Remover usuário?</p>

   <div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: 8,
  }}
>
  <button
    className={styles.cancelBtn}
    onClick={() => setOpenConfirm(null)}
  >
    Cancelar
  </button>

  <button
    className={styles.confirmBtn}
    onClick={() => handleDeleteUser(user.id)}
  >
    Remover
  </button>
</div>

  </div>
)}

</div>


          </div>
        ))}

        {usuarios.length === 0 && (
          <div className={styles.empty}>
            Nenhum usuário encontrado
          </div>
        )}
      </div>
    </>
  )}


{activePage === "addTool" && (
  <>
    <h2>Adicionar ferramenta</h2>

  <form className={styles.form} onSubmit={handleSaveProfile}>

  <div className={styles.field}>
    <label>ID do perfil</label>
    <input
      type="number"
      placeholder="ex: 20"
      value={profileId}
      onChange={(e) =>
        setProfileId(e.target.value === "" ? "" : Number(e.target.value))
      }
    />
  </div>

  <div className={styles.field}>
    <label>Nome do perfil</label>
    <input
      type="text"
      placeholder="ex: Google Studio 02"
      value={profileName}
      onChange={(e) => setProfileName(e.target.value)}
    />
  </div>

  <div className={styles.field}>
    <label>Grupo</label>
    <input
      type="text"
      placeholder="ex: Google Ultra AI"
      value={group}
      onChange={(e) => setGroup(e.target.value)}
    />
  </div>

  <div className={styles.field}>
    <label>Ferramenta (tool)</label>
    <input
      type="text"
      placeholder="ex: googlelabs"
      value={tool}
      onChange={(e) => setTool(e.target.value.toLowerCase())}
    />
  </div>

<div className={styles.saveWrapper}>
  <button
    type="submit"
    className={styles.saveToolBtn}
    disabled={saving}
  >
    Salvar perfil
  </button>
</div>

</form>

  </>
)}


  {activePage === "editTool" && (
   <>
  <h2>Editar perfis</h2>

  <div className={styles.searchBar}>
  <FiSearch size={18} className={styles.searchIcon} />
  <input
    className={styles.searchInput}
    type="text"
    placeholder="Pesquisar perfis..."
    value={searchPerfis}
    onChange={(e) => setSearchPerfis(e.target.value)}
  />
</div>


  <div className={styles.list}>
{perfisFiltrados.map((perfil) => (

  <div key={perfil.id} className={styles.listItem}>

        <div>
  <strong>{perfil.name}</strong>
</div>


        <button
          className={styles.editBtn}
         onClick={() => {
  setEditingProfile(perfil);
  setEditName(perfil.name);
  setEditGroup(perfil.group);
  setEditTool(perfil.tool);
}}

        >
          Editar
        </button>
      </div>
    ))}
  </div>
</>

  )}


  {editingProfile && (
  <div className={styles.editOverlay} onClick={() => setEditingProfile(null)}>
    <div
      className={styles.editModal}
      onClick={(e) => e.stopPropagation()}
    >
      <h2>Editar perfil</h2>

      <div className={styles.form}>
        <div className={styles.field}>
          <label>Nome do perfil</label>
          <input value={editName} onChange={(e) => setEditName(e.target.value)} />
        </div>

        <div className={styles.field}>
          <label>Grupo</label>
          <input value={editGroup} onChange={(e) => setEditGroup(e.target.value)} />
        </div>

        <div className={styles.field}>
          <label>Ferramenta</label>
          <input value={editTool} onChange={(e) => setEditTool(e.target.value)} />
        </div>

        <div className={styles.actions}>
          <button
            className={styles.editBtn}
            onClick={handleUpdateProfile}
          >
            Salvar
          </button>

          <button
            className={styles.cancelBtn}
            onClick={() => setEditingProfile(null)}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
)}


 
{activePage === "deleteTool" && (
  <>
    <h2>Excluir perfis</h2>

<div className={styles.searchBar}>
  <FiSearch size={18} className={styles.searchIcon} />
  <input
    className={styles.searchInput}
    type="text"
    placeholder="Pesquisar perfis..."
    value={searchPerfis}
    onChange={(e) => setSearchPerfis(e.target.value)}
  />
</div>


    <div className={styles.list}>
     {perfisFiltrados.map((perfil) => (

        <div key={perfil.id} className={styles.listItem}>
          <strong>{perfil.name}</strong>

          <div className={styles.profileWrapper}>
            <button
              className={styles.trashBtn}
              onClick={() =>
                setOpenConfirmProfile(
                  openConfirmProfile === perfil.id ? null : perfil.id
                )
              }
            >
              <FiTrash2 size={18} />
            </button>

            {openConfirmProfile === perfil.id && (
              <div className={styles.confirmCardProfile}>
                <p>Remover perfil?</p>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <button
                    className={styles.cancelBtn}
                    onClick={() => setOpenConfirmProfile(null)}
                  >
                    Cancelar
                  </button>

                  <button
  className={styles.confirmBtn}
  onClick={() => {
    handleDeleteProfile(perfil);
    setOpenConfirmProfile(null);
  }}
>
  Remover
</button>

                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </>
)}





</main>

{openEditUser && (
  <div className={styles.overlay} onClick={() => setOpenEditUser(null)}>
    <div
      className={styles.modal}
      onClick={(e) => e.stopPropagation()}
      style={{ maxWidth: 420, height: "auto" }}
    >
      <h2>Alterar email</h2>

      <div className={styles.form}>
        <div className={styles.field}>
          <label>Novo email</label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button
            className={styles.editBtn}
            onClick={async () => {
              await updateDoc(
                doc(db, "usuarios", openEditUser.id),
                { email: newEmail }
              );
              fetchUsuarios();
              setOpenEditUser(null);
            }}
          >
            Salvar
          </button>

          <button
            className={styles.confirmBtn}
            onClick={() => setOpenEditUser(null)}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
)}


</div>

      </div>


      
    </div>
  );
}

