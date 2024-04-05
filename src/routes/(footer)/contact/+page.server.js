import { fail } from "@sveltejs/kit";
import { getRedirectLoginParams } from "$lib/utils";
import { redirect, setFlash } from "sveltekit-flash-message/server";
import { SENDER_EMAIL, SENDER_PASSWORD } from "$env/static/private";
import { verifyCapcha } from "$lib/recaptchaServer";
import nodemailer from "nodemailer";

export const actions = {
  default: async ({ cookies, locals, request }) => {
    const { status, message } = await verifyCapcha(cookies);
    if (status !== 200) {
      return { status, message };
    }

    const formData = await request.formData();
    const { subject, msg } = Object.fromEntries(formData);

    if (!subject) {
      setFlash({ type: "error", message: "A subject is required." }, cookies);
      return fail(400);
    }
    if (!msg) {
      setFlash({ type: "error", message: "A message is required." }, cookies);
      return fail(400);
    }

    const session = await locals.getSession();
    const { username, email, id } = session.user;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: SENDER_EMAIL,
        pass: SENDER_PASSWORD,
      },
    });

    const mailOptions = {
      from: `${username} <${SENDER_EMAIL}>`,
      to: `Andy Tang <bossbadi123@gmail.com>`,
      replyTo: `${username} <${email}>`,
      subject: `Perceptron - ${subject}`,
      text: `${msg}\n\n--\nUser ID: ${id}`,
    };

    transporter.sendMail(mailOptions, (err, _) => {
      if (err) {
        setFlash({ type: "error", message: "Something went wrong." }, cookies);
        return fail(500);
      }
    });

    setFlash({ type: "success", message: "Your message has been sent." }, cookies);
  },
};

export const load = async ({ cookies, locals, url }) => {
  if (!(await locals.getSession())) {
    throw redirect(...getRedirectLoginParams({ cookies, url }));
  }
};
