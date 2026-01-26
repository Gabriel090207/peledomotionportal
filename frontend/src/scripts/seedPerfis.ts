import { db } from "../services/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import type { Perfil } from "../types/Perfil";

const perfis: Perfil[] = [
  // 🔹 CHATGPT
  { profile_id: 77, name: "Gpt Busines 2", group: "ChatGPT", tool: "chatgpt" },
  { profile_id: 76, name: "Gpt Busines", group: "ChatGPT", tool: "chatgpt" },
  { profile_id: 75, name: "ChatGPT 08 + Sora", group: "ChatGPT", tool: "chatgpt" },
  { profile_id: 74, name: "ChatGPT 07 + Sora 2", group: "ChatGPT", tool: "chatgpt" },
  { profile_id: 52, name: "ChatGPT Pro", group: "ChatGPT", tool: "chatgpt" },
  { profile_id: 51, name: "ChatGPT 05", group: "ChatGPT", tool: "chatgpt" },
  { profile_id: 44, name: "GPT 04", group: "ChatGPT", tool: "chatgpt" },
  { profile_id: 42, name: "ChatGPT 03", group: "ChatGPT", tool: "chatgpt" },
  { profile_id: 40, name: "ChatGPT 02", group: "ChatGPT", tool: "chatgpt" },
  { profile_id: 21, name: "ChatGPT 01", group: "ChatGPT", tool: "chatgpt" },

  // 🔹 LEONARDO
  { profile_id: 54, name: "Leonardo AI 05", group: "Leonardo AI", tool: "leonardo" },
  { profile_id: 53, name: "Leonardo AI 04", group: "Leonardo AI", tool: "leonardo" },
  { profile_id: 38, name: "Leonardo AI 03", group: "Leonardo AI", tool: "leonardo" },
  { profile_id: 16, name: "Leonardo AI 02", group: "Leonardo AI", tool: "leonardo" },
  { profile_id: 5, name: "Leonardo AI 01", group: "Leonardo AI", tool: "leonardo" },

  // 🔹 ELEVENLABS
  { profile_id: 37, name: "ElevenLabs 03", group: "ElevenLabs", tool: "elevenlabs" },
  { profile_id: 36, name: "ElevenLabs 02", group: "ElevenLabs", tool: "elevenlabs" },
  { profile_id: 26, name: "ElevenLabs 01", group: "ElevenLabs", tool: "elevenlabs" },

  // 🔹 GEMINI
  { profile_id: 32, name: "Google Gemini 03", group: "Google Ultra AI", tool: "gemini" },
  { profile_id: 31, name: "Google Gemini 02", group: "Google Ultra AI", tool: "gemini" },
  { profile_id: 28, name: "Google Gemini 01", group: "Google Ultra AI", tool: "gemini" },

  // 🔹 MIDJOURNEY
  { profile_id: 58, name: "Midjourney 03", group: "Midjourney", tool: "midjourney" },
  { profile_id: 56, name: "Midjourney 02", group: "Midjourney", tool: "midjourney" },
  { profile_id: 55, name: "Midjourney 01", group: "Midjourney", tool: "midjourney" },

  // 🔹 VECTORIZER
  { profile_id: 30, name: "Vectorizer 03", group: "Vectorizer", tool: "vectorizer" },
  { profile_id: 29, name: "Vectorizer 02", group: "Vectorizer", tool: "vectorizer" },
  { profile_id: 27, name: "Vectorize.ai 01", group: "Vectorizer", tool: "vectorizer" },

  // 🔹 MOTION ARRAY
  { profile_id: 47, name: "Motion Array 05", group: "Motion Array", tool: "motionarray" },
  { profile_id: 46, name: "Motion Array 04", group: "Motion Array", tool: "motionarray" },
  { profile_id: 39, name: "Motion Array 03", group: "Motion Array", tool: "motionarray" },
  { profile_id: 24, name: "Motion Array 02", group: "Motion Array", tool: "motionarray" },
  { profile_id: 23, name: "Motion Array 01", group: "Motion Array", tool: "motionarray" },

  // 🔹 ENVATO
  { profile_id: 71, name: "Envato Elements 02", group: "Envato Elements", tool: "envato" },
  { profile_id: 64, name: "Envato 04", group: "Envato Elements", tool: "envato" },
  { profile_id: 25, name: "Envato Elements 03", group: "Envato Elements", tool: "envato" },
  { profile_id: 4, name: "Envato Elements 01", group: "Envato Elements", tool: "envato" },

  // 🔹 ARTLIST
  { profile_id: 67, name: "Artlist 04", group: "Artlist", tool: "artlist" },
  { profile_id: 66, name: "Artlist 03", group: "Artlist", tool: "artlist" },
  { profile_id: 63, name: "Artlist 02", group: "Artlist", tool: "artlist" },
  { profile_id: 9, name: "Artlist Perfil 01", group: "Artlist", tool: "artlist" },

  // 🔹 STUDIOS MONKEY
  { profile_id: 10, name: "Studios Monkey", group: "Packs para designers", tool: "studiosmonkey" },

  // 🔹 SEEART
  { profile_id: 73, name: "Seeart teste", group: "Grupo padrão", tool: "seeart" },

  // 🔹 GOOGLE LABS + STUDIO
  { profile_id: 45, name: "Google Labs 04 Veo 3", group: "Google Ultra AI", tool: "googlelabs" },
  { profile_id: 35, name: "Google Labs 03", group: "Google Ultra AI", tool: "googlelabs" },
  { profile_id: 34, name: "Google Labs 02", group: "Google Ultra AI", tool: "googlelabs" },
  { profile_id: 33, name: "Google Labs 01", group: "Google Ultra AI", tool: "googlelabs" },
  { profile_id: 20, name: "Google Studio 01", group: "Google Ultra AI", tool: "googlelabs" },
  { profile_id: 18, name: "Google Studio 02", group: "Google Ultra AI", tool: "googlelabs" },

  // 🔹 PAINÉIS ADOBE
  { profile_id: 43, name: "Painel Canva", group: "Painéis Adobe", tool: "paineisadobe" },
  { profile_id: 41, name: "Painel Adobe Net", group: "Painéis Adobe", tool: "paineisadobe" },
  { profile_id: 3, name: "Pelé Motion Admin Adobe", group: "Painéis Adobe", tool: "paineisadobe" },
  { profile_id: 2, name: "Zapremium para Painel Adobe", group: "Painéis Adobe", tool: "paineisadobe" },

  // 🔹 STOCK MEDIA
  { profile_id: 50, name: "Stock Media 03", group: "Stock Media", tool: "stockmedia" },
  { profile_id: 49, name: "Stock Media 02", group: "Stock Media", tool: "stockmedia" },
  { profile_id: 48, name: "Stock Media 01", group: "Stock Media", tool: "stockmedia" },

  // 🔹 MIDART (CURSOS)
  { profile_id: 68, name: "Curso Design AI PRO", group: "Curso de IA", tool: "midart" },
  { profile_id: 69, name: "Curso Design AI PRO 02", group: "Curso de IA", tool: "midart" },
  { profile_id: 70, name: "Curso Design AI PRO 03", group: "Curso de IA", tool: "midart" },
];

export async function seedPerfis(): Promise<void> {
  for (const perfil of perfis) {
    await setDoc(doc(db, "perfis", String(perfil.profile_id)), {
      name: perfil.name,
      tool: perfil.tool,
      group: perfil.group,
      ativo: true,
      criado_em: serverTimestamp(),
    });
  }

  console.log("✅ TODOS os perfis foram enviados para o Firestore");
}
