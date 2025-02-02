import { Resend } from "resend";
import express from "express";

const app = express();

const resend = new Resend(process.env.API_KEY);

app.use(express.json());

app.post("/send", async (req, res) => {
  const { to, subject, html } = req.body;
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to,
    subject,
    html,
  });

  if (error) {
    return res.status(400).json({ error });
  }

  res.status(200).json({ data });
});

export default app;
