// ─── CONEXÃO COM O SUPABASE ───────────────────────────────────────────────────
// Este arquivo cria a conexão com o banco de dados.
// Os valores vêm das variáveis de ambiente configuradas na Vercel.
//
// Para rodar localmente: crie um arquivo .env.local na raiz do projeto com:
//   VITE_SUPABASE_URL=https://seu-projeto.supabase.co
//   VITE_SUPABASE_ANON_KEY=sua-chave-publica
//
// Para publicar: configure essas variáveis em Vercel → Settings → Environment Variables

import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL  as string
const supabaseKey  = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    '[Supabase] Variáveis de ambiente não configuradas.\n' +
    'Crie o arquivo .env.local com VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.'
  )
}

export const supabase = createClient(supabaseUrl ?? '', supabaseKey ?? '')
