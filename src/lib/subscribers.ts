import { promises as fs } from "fs";
import path from "path";

const SUBSCRIBERS_FILE = path.join(process.cwd(), "data", "subscribers.json");

async function ensureSubscribersFile() {
  await fs.mkdir(path.dirname(SUBSCRIBERS_FILE), { recursive: true });
  await fs.access(SUBSCRIBERS_FILE).catch(() => fs.writeFile(SUBSCRIBERS_FILE, "[]", "utf-8"));
}

export async function getSubscribers(): Promise<string[]> {
  await ensureSubscribersFile();

  try {
    const file = await fs.readFile(SUBSCRIBERS_FILE, "utf-8");
    const parsed = JSON.parse(file);
    return Array.isArray(parsed) ? parsed.map((email) => String(email).toLowerCase()) : [];
  } catch (error) {
    console.error("Failed to load subscriber list:", error);
    return [];
  }
}

export async function addSubscriber(email: string) {
  const normalized = email.trim().toLowerCase();
  const subscribers = await getSubscribers();

  if (subscribers.includes(normalized)) {
    return { added: false, message: "You're already subscribed to blog updates." };
  }

  subscribers.push(normalized);
  await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2), "utf-8");

  return {
    added: true,
    message: "Subscription confirmed. You'll receive new blog updates as soon as they're published.",
  };
}
