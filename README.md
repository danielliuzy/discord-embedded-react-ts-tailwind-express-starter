# React + TS + TailwindCSS + Express starter for Discord Activities

[Discord docs](https://discord.com/developers/docs/activities/building-an-activity)

## Getting started

First, add the client ID and client secret of your app to the `.env` file

### Client

1. `npm install`
1. `npm run dev`

In another terminal:

1. `cloudflared tunnel --url http://localhost:5173`
1. Add the cloudflared URL to the `/` URL mapping of your app in the [Discord Developer Portal](https://discord.com/developers/applications)

### Server

1. `npm install`
1. `npm run dev`

After performing the above steps, you should be able to run the activity in Discord
