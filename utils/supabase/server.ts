import { createPagesServerClient } from "@supabase/auth-helpers-nextjs"
import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"
import type { Database } from "@/types/supabase"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export function createServerSupabaseClient(
  context: GetServerSidePropsContext | { req: NextApiRequest; res: NextApiResponse },
) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL")
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY")
  }

  return createPagesServerClient<Database>(context, {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  })
}

export const createServerClient = () => {
  return createRouteHandlerClient({ cookies })
}
