import { createContext, useContext, useEffect, useRef, useState } from "react";
import { discordSdk } from "../discordSdk";
import {
  TAuthenticateResponse,
  TAuthenticatedContext,
  TGuildsMembersRead,
} from "../types";

export const AuthenticatedContext = createContext<TAuthenticatedContext>({
  user: {
    id: "",
    username: "",
    discriminator: "",
    avatar: null,
    public_flags: 0,
  },
  access_token: "",
  scopes: [],
  expires: "",
  application: {
    rpc_origins: undefined,
    id: "",
    name: "",
    icon: null,
    description: "",
  },
  guildMember: null,
});

export const useAuthenticatedContextSetup = () => {
  const [auth, setAuth] = useState<TAuthenticatedContext | null>(null);
  const settingUp = useRef(false);

  useEffect(() => {
    const setUpDiscordSdk = async () => {
      await discordSdk.ready();

      const { code } = await discordSdk.commands.authorize({
        client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
        response_type: "code",
        state: "",
        prompt: "none",
        scope: ["identify", "guilds", "guilds.members.read", "rpc.voice.read"],
      });

      const response = await fetch("api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
        }),
      });

      const { access_token } = await response.json();

      const newAuth: TAuthenticateResponse =
        await discordSdk.commands.authenticate({
          access_token,
        });

      const guildMember: TGuildsMembersRead | null = await fetch(
        `/discord/api/users/@me/guilds/${discordSdk.guildId}/member`,
        {
          method: "get",
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
        .then((res) => res.json())
        .catch(() => null);

      setAuth({
        ...newAuth,
        guildMember,
      });
    };
    if (!settingUp.current) {
      settingUp.current = true;
      setUpDiscordSdk();
    }
  }, []);
  console.log(auth);

  return auth;
};

export const useAuthenticatedContext = () => {
  return useContext(AuthenticatedContext);
};
