import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend';
import { EmailTemplate } from '../../../components/email-template.jsx';
import { v4 as uuidv4 } from 'uuid';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  // Check for API secret key
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.API_SECRET_KEY}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Fetch posts
    const { data: posts, error: postError } = await supabase
      .from('posts')
      .select(`*, profiles ( full_name, id, email )`);

    if (postError) throw postError;

    // Fetch users
    const { data: { users }, error: usersError } = await supabase.auth.admin.listUsers();

    if (usersError) throw usersError;

    for (const user of users) {
      // According to the console.log, the full_name is not accessible. It makes sense because it is
      // stored in the profiles table.
      const firstName = user.user_metadata.full_name; // Add split(' ')[0] when ready.
      const link = `${process.env.NEXT_PUBLIC_SITE_URL}/login?email=${user.email}`

      // Trying to debug and see what we're getting from the user metadata.
      console.log(user.user_metadata)

      await resend.emails.send({
        from: 'Outono <berlin@mail.outono.org>',
        to: user.email, // ['delivered@resend.dev'] for testing
        subject: 'Outono: Update Semanal',
        react: EmailTemplate({ 
          firstName, 
          posts,
          link 
        }),
      });
    }

    return Response.json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}