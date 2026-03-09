import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../../components/Header";
import styles from "./AdsPowerPage.module.css";

const API_BASE = "https://peledomotionportal-backend.onrender.com";

export default function AdsPowerPage() {

  const navigate = useNavigate();

  const [codigo, setCodigo] = useState("");
  const [loading, setLoading] = useState(false);

  const gerarCodigo = async () => {

    try{

      setLoading(true);

      const res = await fetch(`${API_BASE}/gerar-codigo`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email:"peledomotion@gmail.com"
        })
      });

      const data = await res.json();

      if(data.ok){

        setCodigo(data.code);

        setTimeout(()=>{
          setCodigo("");
        },30000);

      }else{

        alert(data.error);

      }

    }catch(err){

      alert("Erro ao gerar código");

    }

    setLoading(false);

  };

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.content}>

        <button
          className={styles.back}
          onClick={() => navigate(-1)}
        >
          ← Voltar para ferramenta
        </button>


        {/* VIDEO */}

        <h2 className={styles.videoTitle}>
          Assista o tutorial abaixo
        </h2>

        <div className={styles.videoWrapper}>
          <video
            controls
            className={styles.video}
          >
            <source src="/video.mp4" type="video/mp4"/>
          </video>
        </div>


        {/* CARDS */}

        <div className={styles.cards}>


          {/* DADOS DE ACESSO */}

          <div className={styles.card}>

            <h3>Dados de acesso</h3>

            <p className={styles.subtitle}>
              Credenciais rotativas
            </p>

            <div className={styles.credentials}>

              <div>
                <span>Email:</span>
                <strong>peledomotion@gmail.com</strong>
              </div>

              <div>
                <span>Senha:</span>
                <strong>@Pele3272</strong>
              </div>

            </div>

            <button className={styles.download}>
              Baixar AdsPower
            </button>

            <p className={styles.info}>
              As credenciais são atualizadas periodicamente.
              Caso mude, retorne a esta página para obter
              os dados mais recentes.
            </p>

          </div>


          {/* GERAR CODIGO */}

          <div className={styles.card}>

            <h3>Gerar códigos de autenticação</h3>

            <p className={styles.subtitle}>
              Gere seu código do Google Authenticator
              para acessar o AdsPower.
            </p>


            <div className={styles.codeBox}>

              {codigo ? (

                <h2>{codigo}</h2>

              ) : (

                <>
                  Certifique-se de que você está na opção
                  <strong> AUTHENTICATOR</strong>
                 
                  O código dura apenas 30 segundos.
                </>

              )}

            </div>


            <button
              className={styles.generate}
              onClick={gerarCodigo}
            >

              {loading ? "Gerando..." : "Gerar código"}

            </button>


            <p className={styles.info}>
              Você pode solicitar até 2 códigos por dia.
              Utilize apenas quando necessário.
            </p>

          </div>

        </div>

      </main>
    </div>
  );
}