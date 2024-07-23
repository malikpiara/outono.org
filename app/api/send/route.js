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

    // Fetch users with their profiles
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id, full_name, email');

    if (profilesError) throw profilesError;

    for (const user of profiles) {
      // According to the console.log, the full_name is not accessible. It makes sense because it is
      // stored in the profiles table.
      const firstName = user.full_name.split(' ')[0];
      const link = `${process.env.NEXT_PUBLIC_SITE_URL}/login?email=${user.email}`

      try {
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
      console.log(`Email sent successfully to ${user.email}`);
      } catch (emailError) {
        console.error(`Error sending email to ${user.email}:`, emailError);
      }
    }

    return Response.json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}