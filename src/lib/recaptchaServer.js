import { RECAPTCHA_SECRET_KEY } from "$env/static/private";

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export const verifyCapcha = async (cookies) => {
  const token = cookies.get("token");

  if (!token) {
    return { status: 401, message: "No captcha token." };
  }

  cookies.set("token", "", { maxAge: 0, path: "/" });

  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}`
  );

  const data = await response.json();

  if (!data?.success) {
    return { status: 400, message: "Captcha failed." };
  }

  return { status: 200, message: "Captcha verified." };
};
