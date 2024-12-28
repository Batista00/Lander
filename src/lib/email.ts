import { createTransport } from 'nodemailer';

interface EmailOptions {
  to: string | string[];
  subject: string;
  template: string;
  data: Record<string, any>;
}

const transporter = createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const templates = {
  'lead-notification': (data: Record<string, any>) => `
    <h1>Nuevo Lead Capturado</h1>
    <p>Se ha capturado un nuevo lead en el sistema.</p>
    
    <h2>Detalles del Lead</h2>
    <ul>
      ${Object.entries(data.formData)
        .map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`)
        .join('')}
    </ul>

    <h2>Metadata</h2>
    <ul>
      <li><strong>Fuente:</strong> ${data.leadDetails.metadata.source.url}</li>
      <li><strong>Fecha:</strong> ${new Date(data.leadDetails.metadata.createdAt.toDate()).toLocaleString()}</li>
    </ul>

    <p>
      <a href="${data.dashboardUrl}" style="
        background-color: #3b82f6;
        color: white;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 5px;
        display: inline-block;
        margin-top: 20px;
      ">
        Ver en Dashboard
      </a>
    </p>
  `,
};

export async function sendEmail({ to, subject, template, data }: EmailOptions) {
  const html = templates[template as keyof typeof templates](data);

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: Array.isArray(to) ? to.join(', ') : to,
    subject,
    html,
  };

  return transporter.sendMail(mailOptions);
}
