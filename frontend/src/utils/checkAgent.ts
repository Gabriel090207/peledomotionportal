export async function checkAgentRunning(): Promise<boolean> {
  try {
    const res = await fetch("http://127.0.0.1:3001/docs", {
      method: "GET",
    });

    return res.ok;
  } catch {
    return false;
  }
}
