import LoginComponent from './login'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function HomeN({ searchParams }) {
  const supabase = createClient()
  
  const { data: { session } } = await supabase.auth.getSession()
  
  if (session) {
    redirect('/news')
  }

  let fullName = null
  if (searchParams.email) {
    const { data, error } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('email', searchParams.email)
      .single()
    
    if (data) {
      fullName = data.full_name
    }
  }

  return <LoginComponent initialEmail={searchParams.email} initialFullName={fullName} />
}