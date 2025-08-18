const { Keypair, Connection } = require('@solana/web3.js');
const { createMint, mintTo, getOrCreateAssociatedTokenAccount, TOKEN_PROGRAM_ID } = require('@solana/spl-token');

const SOL_RPC = process.env.SOL_RPC_URL || 'https://api.devnet.solana.com';
const solConnection = new Connection(SOL_RPC, 'confirmed');

// Load and parse the key
const secretKey = JSON.parse(process.env.SOL_PRIVATE_KEY);
const keypair = Keypair.fromSecretKey(Uint8Array.from(secretKey));

async function mintNFT(userId, metadataUrl) {
  const mint = await createMint(solConnection, keypair, keypair.publicKey, null, 0, TOKEN_PROGRAM_ID);
  const tokenAccount = await getOrCreateAssociatedTokenAccount(solConnection, keypair, mint, keypair.publicKey);
  await mintTo(solConnection, keypair, mint, tokenAccount.address, keypair, 1);
  return { tx: mint.toBase58(), userId, metadataUrl };
}

module.exports = { mintNFT };