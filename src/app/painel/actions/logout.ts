'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function fazerLogout() {
  const cookieStore = await cookies();
  
  // Deleta o cookie de autenticação
  cookieStore.delete('auth_token');

  // Redireciona de volta para a tela de login no painel
  redirect('/painel');
}