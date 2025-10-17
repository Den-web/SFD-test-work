type Env = {
  apiUrl: string;
};

export function getEnv(): Env {
  return {
    apiUrl: process.env.NEXT_PUBLIC_API_URL || "https://dummy.api/",
  };
}
