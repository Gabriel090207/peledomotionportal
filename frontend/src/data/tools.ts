import chatgptLogo from "../assets/tools/chatgptlogo.png";
import leonardoLogo from "../assets/tools/leonardologo.png";
import midjourneyLogo from "../assets/tools/midjourneylogo.png";
import artlistLogo from "../assets/tools/artlistlogo.png";
import elevenlabsLogo from "../assets/tools/elevenlabslogo.png";
import envatoLogo from "../assets/tools/envatologo.png";
import geminiLogo from "../assets/tools/geminilogo.png";
import motionarrayLogo from "../assets/tools/motionarraylogo.png";
import seeartLogo from "../assets/tools/seeartlogo.png";
import studiosmonkeyLogo from "../assets/tools/studiosmonkeylogo.png";
import vectorizerLogo from "../assets/tools/vectorizerlogo.png";
import googlelabsLogo from "../assets/tools/googlelabslogo.png";
import stockmediaLogo from "../assets/tools/adobestocklogo.png";
import paineisadobeLogo from "../assets/tools/paineisadobelogo.png";
import midartLogo from "../assets/tools/midart.png";



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
  artlist: {
  id: "artlist",
  name: "Artlist",
  logo: artlistLogo,
  description: "Gerencie e acesse seus perfis dessa ferramenta",
},

elevenlabs: {
  id: "elevenlabs",
  name: "ElevenLabs",
  logo: elevenlabsLogo,
  description: "Gerencie e acesse seus perfis dessa ferramenta",
},

envato: {
  id: "envato",
  name: "Envato",
  logo: envatoLogo,
  description: "Gerencie e acesse seus perfis dessa ferramenta",
},

gemini: {
  id: "gemini",
  name: "Gemini",
  logo: geminiLogo,
  description: "Gerencie e acesse seus perfis dessa ferramenta",
},

"motion-array": {
  id: "motionarray",
  name: "Motion Array",
  logo: motionarrayLogo,
  description: "Gerencie e acesse seus perfis dessa ferramenta",
},

seeart: {
  id: "seeart",
  name: "SeeArt",
  logo: seeartLogo,
  description: "Gerencie e acesse seus perfis dessa ferramenta",
},

"studiosmonkey": {
  id: "studios-monkey",
  name: "Studios Monkey",
  logo: studiosmonkeyLogo,
  description: "Gerencie e acesse seus perfis dessa ferramenta",
},

vectorizer: {
  id: "vectorizer",
  name: "Vectorizer",
  logo: vectorizerLogo,
  description: "Gerencie e acesse seus perfis dessa ferramenta",
},

googlelabs: {
  id: "googlelabs",
  name: "Google Labs",
  logo: googlelabsLogo,
  description: "Gerencie e acesse seus perfis dessa ferramenta",
},

stockmedia: {
  id: "stockmedia",
  name: "Stock Media",
  logo: stockmediaLogo,
  description: "Gerencie e acesse seus perfis dessa ferramenta",
},

paineisadobe: {
  id: "paineisadobe",
  name: "Painéis Adobe",
  logo: paineisadobeLogo,
  description: "Gerencie e acesse seus perfis dessa ferramenta",
},
midart: {
  id: "midart",
  name: "MidArt",
  logo: midartLogo,
  description: "Gerencie e acesse seus conteúdos e cursos dessa ferramenta",
},



} as const;

export type ToolKey = keyof typeof tools;
