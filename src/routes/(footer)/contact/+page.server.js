import { redirect } from "sveltekit-flash-message/server";
import { SENDER_EMAIL, SENDER_PASSWORD } from "$env/static/private";
import { verifyCapcha } from "$lib/recaptchaServer";
import nodemailer from "nodemailer";

export const actions = {
  default: async ({ cookies, locals, request, url }) => {
    const { status, message } = await verifyCapcha(cookies);
    if (status !== 200) {
      return { status, message };
    }

    const formData = await request.formData();
    const msg = formData.get("msg");
    const subject = formData.get("subject");

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

    transporter.sendMail(mailOptions, function (err, _) {
      if (err) {
        throw redirect(303, url.pathname, { type: "danger", message: "Something went wrong." }, cookies);
      }
    });

    throw redirect(303, url.pathname, { type: "success", message: "Your message has been sent." }, cookies);
  },
};

export const load = async ({ locals, url }) => {
  if (!(await locals.getSession())) {
    throw redirect(303, `/login?redirectTo=${url.pathname}`);
  }
};
