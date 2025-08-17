const { Connection, Keypair } = require('@solana/web3.js');
const { createMint, mintTo, getOrCreateAssociatedTokenAccount, TOKEN_PROGRAM_ID } = require('@solana/spl-token');

const SOL_RPC = process.env.SOL_RPC_URL || 'https://api.devnet.solana.com';
const solConnection = new Connection(SOL_RPC, 'confirmed');
const payer = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env.SOL_PRIVATE_KEY || '[]')));

async function mintNFT() {
  const mint = await createMint(solConnection, payer, payer.publicKey, null, 0, TOKEN_PROGRAM_ID);
  const tokenAccount = await getOrCreateAssociatedTokenAccount(solConnection, payer, mint, payer.publicKey);
  await mintTo(solConnection, payer, mint, tokenAccount.address, payer, 1);
  return mint.toBase58();
}

module.exports = { mintNFT };
