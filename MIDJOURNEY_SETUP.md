# Configuration Midjourney pour Asheron

Ce guide explique comment configurer et utiliser l'intégration Midjourney dans le projet Asheron.

## Installation

Les dépendances ont déjà été installées via:

```bash
yarn add midjourney dotenv
```

## Configuration

### 1. Obtenir votre token Discord (SALAI_TOKEN)

1. Connectez-vous à Discord dans votre navigateur web
2. Ouvrez la console développeur (F12 ou Ctrl+Shift+I)
3. Allez dans l'onglet Console
4. Collez et exécutez ce code:

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

5. Votre token est maintenant copié dans le presse-papier

⚠️ **ATTENTION**: Ne partagez JAMAIS votre token Discord, c'est comme un mot de passe!

### 2. Obtenir les IDs de serveur et de channel

1. Dans Discord, cliquez sur un channel où le bot Midjourney est présent
2. Regardez l'URL dans votre navigateur:
   ```
   https://discord.com/channels/SERVER_ID/CHANNEL_ID
   ```
3. Copiez le `SERVER_ID` et le `CHANNEL_ID`

### 3. Créer le fichier .env

Créez un fichier `.env` à la racine du projet:

```bash
cp .env.example .env
```

Puis éditez le fichier `.env` et remplissez les valeurs:

```env
SALAI_TOKEN=votre_token_discord
SERVER_ID=votre_server_id
CHANNEL_ID=votre_channel_id
```

## Utilisation

### Test rapide

Pour tester l'intégration Midjourney:

```bash
./bin/testMidjourney
```

Ou avec Node:

```bash
node bin/testMidjourney
```

### Exemple de code

```javascript
import { Midjourney } from 'midjourney';
import dotenv from 'dotenv';

dotenv.config();

const client = new Midjourney({
  ServerId: process.env.SERVER_ID,
  ChannelId: process.env.CHANNEL_ID,
  SalaiToken: process.env.SALAI_TOKEN,
  Debug: true,
  Ws: true,
});

await client.init();

// Générer une image
const result = await client.Imagine(
  'A beautiful sunset over mountains',
  (uri, progress) => {
    console.log(`Progression: ${progress}`);
  }
);

console.log('Image URL:', result.uri);
```

## Fonctionnalités disponibles

- **Imagine**: Générer des images à partir d'un prompt
- **Upscale**: Agrandir une image générée (U1, U2, U3, U4)
- **Variation**: Créer des variations d'une image (V1, V2, V3, V4)
- **Blend**: Mélanger plusieurs images
- **Describe**: Obtenir une description d'une image

## Ressources

- [Package NPM midjourney](https://www.npmjs.com/package/midjourney)
- [GitHub erictik/midjourney-api](https://github.com/erictik/midjourney-api)
- [Documentation Midjourney officielle](https://docs.midjourney.com/)

## Sécurité

⚠️ N'oubliez pas d'ajouter `.env` à votre `.gitignore` pour ne pas committer vos tokens!

```
.env
```
