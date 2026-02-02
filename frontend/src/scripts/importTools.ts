import { db } from "../services/firebase";
import { doc, setDoc } from "firebase/firestore";

const tools = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    description: "IA conversacional com sessões independentes.",
    category: "ia",
  },
  {
    id: "gemini",
    name: "Gemini",
    description: "IA multimodal para escrita, análise e raciocínio avançado.",
    category: "ia",
  },
  {
    id: "googlelabs",
    name: "Google Labs",
    description: "Ambiente experimental para testes e inovações em IA.",
    category: "ia",
  },
  {
    id: "leonardo",
    name: "Leonardo AI",
    description: "Geração de imagens com perfis isolados.",
    category: "imagem",
  },
  {
    id: "midjourney",
    name: "Midjourney",
    description: "Criação visual avançada sem cruzamento de dados.",
    category: "imagem",
  },
  {
    id: "seeart",
    name: "SeeArt",
    description: "Criação de imagens artísticas com estilos personalizados.",
    category: "imagem",
  },
  {
    id: "vectorizer",
    name: "Vectorizer",
    description: "Conversão precisa de imagens em vetores escaláveis.",
    category: "imagem",
  },
  {
    id: "motionarray",
    name: "Motion Array",
    description: "Templates e recursos profissionais para edição de vídeo.",
    category: "video",
  },
  {
    id: "artlist",
    name: "Artlist",
    description: "Biblioteca de músicas e efeitos sonoros.",
    category: "audio",
  },
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    description: "Geração de vozes realistas.",
    category: "audio",
  },
  {
    id: "envato",
    name: "Envato",
    description: "Assets premium para projetos criativos.",
    category: "edicao",
  },
  {
    id: "studiosmonkey",
    name: "Studios Monkey",
    description: "Gestão inteligente de estúdios.",
    category: "edicao",
  },
  {
    id: "stockmedia",
    name: "Stock Media",
    description: "Banco de mídias premium.",
    category: "edicao",
  },
  {
    id: "paineisadobe",
    name: "Painéis Adobe",
    description: "Gerenciamento de painéis Adobe.",
    category: "edicao",
  },
  {
    id: "midart",
    name: "MidArt",
    description: "Curso completo de criação visual.",
    category: "curso",
  },
];

async function importTools() {
  for (const tool of tools) {
    await setDoc(doc(db, "tools", tool.id), {
      name: tool.name,
      description: tool.description,
      category: tool.category,
      active: true,
    });

    console.log("Importado:", tool.name);
  }

  console.log("✅ Importação finalizada");
}

importTools();
