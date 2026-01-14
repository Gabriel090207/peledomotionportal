import chatgptLogo from "../assets/tools/chatgptlogo.png";
import leonardoLogo from "../assets/tools/leonardo.png";
import midjourneyLogo from "../assets/tools/midjourney.png";



export const tools = {
  chatgpt: {
    id: "chatgpt",
    name: "ChatGPT",
    logo: chatgptLogo,
    description: "Gerencie e acesse seus perfis dessa ferramenta",
  },
  leonardo: {
    id: "leonardo",
    name: "Leonardo AI",
    logo: leonardoLogo,
    description: "Gerencie e acesse seus perfis dessa ferramenta",
  },
  midjourney: {
    id: "midjourney",
    name: "Midjourney",
    logo: midjourneyLogo,
    description: "Gerencie e acesse seus perfis dessa ferramenta",
  },
} as const;

export type ToolKey = keyof typeof tools;
