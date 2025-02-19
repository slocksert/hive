import { NextResponse } from 'next/server';
import Ably from 'ably';

export async function GET() {
  const ably = new Ably.Rest(process.env.ABLY_API_KEY!);
  const clientId = Math.random().toString();
  const tokenRequest = await ably.auth.createTokenRequest({ clientId });
  
  return NextResponse.json(tokenRequest);
}
