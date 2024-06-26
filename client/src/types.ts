import { AsyncReturnType } from "type-fest";
import { discordSdk } from "./discordSdk";

export type TAuthenticateResponse = AsyncReturnType<
  typeof discordSdk.commands.authenticate
>;

export type TAuthenticatedContext = TAuthenticateResponse & {
  guildMember: TGuildsMembersRead | null;
};

export type TGuildsMembersRead = {
  roles: string[];
  nick: string | null;
  avatar: string | null;
  premium_since: string | null;
  joined_at: string;
  is_pending: boolean;
  pending: boolean;
  communication_disabled_until: string | null;
  user: {
    id: string;
    username: string;
    avatar: string | null;
    discriminator: string;
    public_flags: number;
  };
  mute: boolean;
  deaf: boolean;
};
