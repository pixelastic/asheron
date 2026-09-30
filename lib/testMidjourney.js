import { Midjourney } from 'midjourney';
import dotenv from 'dotenv';

// Charger les variables d'environnement depuis .env
dotenv.config();

/**
 * Test script pour générer une image avec Midjourney via Discord
 */
export default async function testMidjourney() {
  // Vérifier que les variables d'environnement sont définies
  const { SALAI_TOKEN, SERVER_ID, CHANNEL_ID } = process.env;

  if (!SALAI_TOKEN || !SERVER_ID || !CHANNEL_ID) {
    console.error("❌ Variables d'environnement manquantes!");
    console.log('Veuillez définir:');
    console.log('  - SALAI_TOKEN: Votre token Discord');
    console.log("  - SERVER_ID: L'ID de votre serveur Discord");
    console.log("  - CHANNEL_ID: L'ID de votre channel Discord");
    console.log('\nExemple:');
    console.log('  export SALAI_TOKEN="votre_token"');
    console.log('  export SERVER_ID="votre_server_id"');
    console.log('  export CHANNEL_ID="votre_channel_id"');
    return;
  }

  console.log('🚀 Initialisation du client Midjourney...');

  const client = new Midjourney({
    ServerId: SERVER_ID,
    ChannelId: CHANNEL_ID,
    SalaiToken: SALAI_TOKEN,
    Debug: true,
    Ws: true,
  });

  try {
    await client.init();
    console.log('✅ Client initialisé avec succès!');

    console.log("\n🎨 Génération d'une image de test...");
    const prompt =
      'A beautiful sunset over mountains, digital art, highly detailed';

    const result = await client.Imagine(prompt, (uri, progress) => {
      console.log(`⏳ Progression: ${progress}`);
    });

    console.log('\n✅ Image générée avec succès!');
    console.log('📊 Résultat:', result);

    if (result.uri) {
      console.log(`\n🖼️  URL de l'image: ${result.uri}`);
    }

    if (result.options) {
      console.log('\n🔧 Actions disponibles:');
      console.log('  - Upscale: U1, U2, U3, U4');
      console.log('  - Variations: V1, V2, V3, V4');
    }
  } catch (error) {
    console.error('\n❌ Erreur lors de la génération:', error.message);
    console.error('Détails:', error);
  }
}
