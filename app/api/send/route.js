import { EmailTemplate } from '../../../components/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Outono <onboarding@resend.dev>', // berlin@outono.org
      to: ['delivered@resend.dev'], // TODO: replace
      subject: 'Outono: Update Semanal',
      react: EmailTemplate({ firstName: 'Malik' }), // TODO: replace dynamically
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
