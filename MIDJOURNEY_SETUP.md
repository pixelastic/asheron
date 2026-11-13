# Midjourney setup for Asheron

This guide explains how to configure and use the Midjourney integration in the
Asheron project.

## Installation

The dependencies are installed with the project:

```bash
yarn install
```

They were originally added with:

```bash
yarn add midjourney dotenv
```

## Configuration

### 1. Get your Discord token (SALAI_TOKEN)

1. Log in to Discord in your web browser
2. Open the developer console (F12 or Ctrl+Shift+I)
3. Go to the Console tab
4. Paste and run this code:

   ```javascript
   window.webpackChunkdiscord_app.push([
     [Math.random()],
     {},
     (req) => {
       for (const m of Object.keys(req.c)
         .map((x) => req.c[x].exports)
         .filter((x) => x)) {
         if (m.default && m.default.getToken !== undefined) {
           return copy(m.default.getToken());
         }
         if (m.getToken !== undefined) {
           return copy(m.getToken());
         }
       }
     },
   ]);
   ```

5. Your token is now copied to the clipboard

⚠️ **WARNING**: NEVER share your Discord token. It works like a password.

### 2. Get the server and channel IDs

1. In Discord, click on a channel where the Midjourney bot is present
2. Look at the URL in your browser:

   ```text
   https://discord.com/channels/SERVER_ID/CHANNEL_ID
   ```

3. Copy the `SERVER_ID` and the `CHANNEL_ID`

### 3. Create the .env file

Create a `.env` file at the root of the project:

```bash
cp .env.example .env
```

Then edit the `.env` file and fill in the values:

```env
SALAI_TOKEN=your_discord_token
SERVER_ID=your_server_id
CHANNEL_ID=your_channel_id
```

## Usage

### Quick test

To test the Midjourney integration:

```bash
./bin/testMidjourney
```

Or with Node:

```bash
node bin/testMidjourney
```

### Code example

```javascript
import dotenv from 'dotenv';
import { Midjourney } from 'midjourney';

dotenv.config();

const client = new Midjourney({
  ServerId: process.env.SERVER_ID,
  ChannelId: process.env.CHANNEL_ID,
  SalaiToken: process.env.SALAI_TOKEN,
  Debug: true,
  Ws: true,
});

await client.init();

// Generate an image
const result = await client.Imagine(
  'A beautiful sunset over mountains',
  (uri, progress) => {
    console.log(`Progress: ${progress}`);
  }
);

console.log('Image URL:', result.uri);
```

## Available features

- **Imagine**: Generate images from a prompt
- **Upscale**: Enlarge a generated image (U1, U2, U3, U4)
- **Variation**: Create variations of an image (V1, V2, V3, V4)
- **Blend**: Blend several images together
- **Describe**: Get a description of an image

## Resources

- [midjourney NPM package](https://www.npmjs.com/package/midjourney)
- [GitHub erictik/midjourney-api](https://github.com/erictik/midjourney-api)
- [Official Midjourney documentation](https://docs.midjourney.com/)

## Security

⚠️ The `.env` file contains your tokens. The project already lists it in
`.gitignore`. Never commit it.

```text
.env
```
