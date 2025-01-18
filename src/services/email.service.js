import env from '~/config/env';
import transporter from '~/config/nodemailer';

class EmailService {
  async send({ to = [], subject, text, html }) {
    await transporter.sendMail({
      from: `"Krist Shop" <${env.SMTP_FROM_EMAIL}>`,
      to: to.join(', '),
      subject,
      text,
      html
    });
  }
}

export default new EmailService();
