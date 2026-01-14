import Header from "../components/Header";

import styles from "./DashboardPage.module.css";
import CategoryRow from "../components/CategoryRow/CategoryRow";


import leonardoImg from "../assets/tools/leonardo.png";
import chatgptImg from "../assets/tools/chatgpt.png";
import midjourneyImg from "../assets/tools/midjourney.png";


 const conteudoInteligente = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    description: "IA conversacional com sessões independentes.",
    image: chatgptImg,
  },
  {
    id: "leonardo",
    name: "Leonardo AI",
    description: "Geração de imagens com perfis isolados.",
    image: leonardoImg,
  },
  {
    id: "midjourney",
    name: "Midjourney",
    description: "Criação visual avançada sem cruzamento de dados.",
    image: midjourneyImg,
  },
  
];




export default function DashboardPage() {
  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.content}>

        {/* BANNER */}
        <section className={styles.banner}>
          <h1>
            Bem-vindo ao painel <span>mais completo</span> de IA do mercado.
          </h1>
          <p>
            Centralize as ferramentas mais poderosas do mundo em um só lugar,
            com acesso rápido, simples e inteligente que te ajudam a turbinar sua performance digital.
          </p>
        </section>

        {/* FILTROS */}
        <section className={styles.filters}>

            <div className={styles.filterGroup}>
            <button className={styles.active}>Todas</button>
            <button>IA</button>
            <button>Imagem</button>
            <button>Texto</button>
            <button>Vídeo</button>
             <button>Aúdio</button>
          </div>

          <input
            type="text"
            placeholder="Buscar ferramenta..."
            className={styles.search}
          />



          
        </section>


        <CategoryRow
  title="Conteúdo Inteligente"
  tools={conteudoInteligente}
/>

<CategoryRow
  title="Edição e Designer"
  tools={conteudoInteligente}
/>


     

      </main>
    </div>
  );
}
