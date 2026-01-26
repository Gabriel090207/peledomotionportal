const API_BASE = "https://peledomotionportal-backend.onrender.com";

export type Profile = {
  profile_id: number;
  name: string;
  group: string;
  tag?: string;
};

export async function fetchAllProfiles(
  page = 1,
  limit = 100,
  retries = 2
): Promise<Profile[]> {
  try {
    const res = await fetch(
      `${API_BASE}/ixbrowser/profiles?page=${page}&limit=${limit}`
    );

    if (!res.ok) {
      throw new Error("Erro HTTP");
    }

    const data = await res.json();
    const profiles: Profile[] = data.profiles ?? [];

    // 🔁 retry se vier vazio
    if (profiles.length === 0 && retries > 0) {
      console.warn("Lista vazia, tentando novamente...");
      await new Promise((r) => setTimeout(r, 800));
      return fetchAllProfiles(page, limit, retries - 1);
    }

    return profiles;
  } catch (err) {
    if (retries > 0) {
      console.warn("Erro ao buscar perfis, retry...");
      await new Promise((r) => setTimeout(r, 800));
      return fetchAllProfiles(page, limit, retries - 1);
    }
    throw err;
  }
}
