import { EmailTemplate } from '../../../components/email-template.jsx';
import { Resend } from 'resend';
import { createClient } from '../../../utils/supabase/client';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    // 1. Fetch posts from Supabase:
    const supabase = createClient();
    const { data: posts, error: postError } = await supabase
      .from('posts')
      .select(`*, profiles ( full_name, id, email )`);

    if (postError) {
      return Response.json({ error: postError }, { status: 500 });
    }

    // 2. Send the email, passing posts as a prop:
    const { data, error } = await resend.emails.send({
      from: 'Outono <berlin@mail.outono.org>',
      to: ['delivered@resend.dev'], // TODO: replace
      subject: 'Outono: Update Semanal',
      react: EmailTemplate({ firstName: 'Malik', posts }), // TODO: replace dynamically
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
