import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../../components/Header";
import styles from "./AdsPowerPage.module.css";

const API_BASE = "https://peledomotionportal-backend.onrender.com";

export default function AdsPowerPage() {

  const navigate = useNavigate();

  const [codigo, setCodigo] = useState("");
  const [loading, setLoading] = useState(false);
  const [tempo, setTempo] = useState(0);

  const gerarCodigo = async () => {

    try{

      setLoading(true);

      const res = await fetch(`${API_BASE}/gerar-codigo`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email:"comboprata@peledomotion.com"
        })
      });

      const data = await res.json();

      if(data.ok){

        setCodigo(data.code);
        setTempo(30);

        const intervalo = setInterval(()=>{

          setTempo((prev)=>{

            if(prev <= 1){

              clearInterval(intervalo);
              setCodigo("");
              return 0;

            }

            return prev - 1;

          });

        },1000);

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

          

            <div className={styles.credentials}>

              <div>
                <span>Email:</span>
                <strong>comboprata@peledomotion.com</strong>
              </div>

              <div>
                <span>Senha:</span>
                <strong>#Comboprata3272</strong>
              </div>

            </div>

           <button
  className={styles.download}
  onClick={() =>
    window.open(
      "https://activity.adspower.com/ap/dist/fast/?utm_source=google&utm_medium=cpc&utm_term=Pmax-90%E6%97%A5%E4%BB%A5%E5%86%85%E5%A5%97%E9%A4%90%E7%9A%84%E5%AE%A2%E6%88%B7-EN-20260226&utm_content=90%E6%97%A5%E5%86%85%E5%A5%97%E9%A4%90%E5%AE%A2%E6%88%B7&utm_campaign=&campaignid={23607652210}&adgroupid=&adid=&network=x&device=c&locid=9074244&utm_matchtype=&utm_targetid=&utm_source=google&utm_medium=cpc&utm_term=&utm_content=&utm_campaign=&campaignid=23607652210&adgroupid=&adid=&network=x&device=c&locid=9074244&utm_matchtype=&utm_targetid=&gad_source=1&gad_campaignid=23602976789&gbraid=0AAAAACQgKVME7E7hLp76DOsYPlv4bU9FX&gclid=Cj0KCQjw37nNBhDkARIsAEBGI8NU2ZOxRDgrSWYUZP8LQZi8Pgyj6TLhMwYH7yA7RM_2tK6RlQydWMgaAhymEALw_wcB",
      "_blank"
    )
  }
>
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

                <>
                  <div className={styles.codigo}>
                    {codigo}
                  </div>

                  <span className={styles.timer}>
                    expira em {tempo}s
                  </span>
                </>

              ) : (

                <>
                  Certifique-se de que você está na opção
                  <strong> AUTHENTICATOR</strong>
                  <br/>
                  O código dura apenas 30 segundos.
                </>

              )}

            </div>


            <button
              className={styles.generate}
              onClick={gerarCodigo}
              disabled={loading || tempo > 0}
            >

              {loading ? "Gerando..." : tempo > 0 ? "Aguarde..." : "Gerar código"}

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