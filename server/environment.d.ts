declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VITE_DISCORD_CLIENT_ID: string;
      DISCORD_CLIENT_SECRET: string;
      PORT?: string;
    }
  }
}

export {};
