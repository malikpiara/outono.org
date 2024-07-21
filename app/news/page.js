import Home from "./news-client"
import { createClient } from '@/utils/supabase/server'

export default async function HomeN() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return <Home user={user}/>
 
}



    