import { load } from "cheerio";

class Config {
  private static _instance: Config | null = null;

  // Default values
  public apiBaseUrl: string = "https://shelaw-backend.onrender.com";
  public webSocketUrl: string = "wss://shelaw-backend.onrender.com/ws";
  public static readonly requestTimeout: number = 30;
  public static readonly appName: string = "SheLaw";

  private constructor() {}

  // Singleton accessor
  public static getInstance(): Config {
    if (!Config._instance) {
      Config._instance = new Config();
    }
    return Config._instance;
  }

  public async fetchNgrokUrls(): Promise<void> {
    try {
      const response = await fetch("https://crypticcortex.github.io/ngrok-usecase/");
      if (!response.ok) {
        console.error("Failed to fetch ngrok URLs:", response.status, response.statusText);
        return;
      }
      const htmlText = await response.text();
      const $ = load(htmlText); // Use `load` from cheerio

      const preContent = $("pre").text().trim();
      if (preContent) {
        const data = JSON.parse(preContent);
        if (data.apiBaseUrl) {
          this.apiBaseUrl = data.apiBaseUrl;
          console.log("Updated API Base URL:", this.apiBaseUrl);
        }
        if (data.webSocketUrl) {
          this.webSocketUrl = data.webSocketUrl;
          console.log("Updated WebSocket URL:", this.webSocketUrl);
        }
      } else {
        console.warn("Failed to find <pre> tag in the response.");
      }
    } catch (e) {
      console.error("Error fetching ngrok URLs:", e);
    }
  }
}

export default Config;
