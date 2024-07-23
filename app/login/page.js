import LoginComponent from './login'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function HomeN() {
  const supabase = createClient()

  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    redirect('/news')
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return <LoginComponent/>
 
}



    