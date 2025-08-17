import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { summary, recipients } = req.body;

  if (!summary || !recipients) {
    return res
      .status(400)
      .json({ message: "Summary and recipients are required." });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // You must use this domain for the free tier
      to: recipients.split(",").map((email) => email.trim()),
      subject: "Your AI-Generated Meeting Summary",
      html: `<p>Here is your summary:</p><pre>${summary}</pre>`,
    });

    if (error) {
      return res.status(400).json(error);
    }

    res.status(200).json({ message: "Email sent successfully!", data });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email." });
  }
}
