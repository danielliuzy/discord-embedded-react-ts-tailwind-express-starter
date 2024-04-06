import dotenv from "dotenv";
import express from "express";

dotenv.config({ path: "../../.env" });

const app = express();
const port = Number(process.env.PORT) || 3001;

app.use(express.json());

app.post("/api/token", async (req, res) => {
  const response = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: process.env.VITE_DISCORD_CLIENT_ID!,
      client_secret: process.env.DISCORD_CLIENT_SECRET!,
      grant_type: "authorization_code",
      code: req.body.code,
    }),
  });

  const { access_token } = (await response.json()) as {
    access_token: string;
  };

  res.send({ access_token });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
