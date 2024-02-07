import { RECAPTCHA_SECRET_KEY } from "$env/static/private";
import { redirect } from "@sveltejs/kit";
import { SENDER_EMAIL, SENDER_PASSWORD } from "$env/static/private";
import nodemailer from "nodemailer";

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export const actions = {
  default: async ({ cookies, locals, request }) => {
    const token = cookies.get("token");
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}`
    );

    const data = await response.json();
    if (!data?.success) {
      return { status: 400, message: "Captcha failed." };
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

    await transporter.sendMail(mailOptions, function (err, _) {
      if (err) {
        return { status: 500, message: "Something went wrong." };
      }
    });

    return { status: 200, message: "Your message has been sent." };
  },
};

export const load = async ({ locals, url }) => {
  if (!(await locals.getSession())) {
    throw redirect(303, `/login?redirectTo=${url.pathname}`);
  }
};
