import { load } from "recaptcha-v3";
import { PUBLIC_RECAPTCHA_SITE_KEY } from "$env/static/public";
import toast from "svelte-french-toast";

export const submitCaptcha = async () => {
  await new Promise((resolve) => {
    load(PUBLIC_RECAPTCHA_SITE_KEY).then((recaptcha) => {
      recaptcha.execute("submit").then((t) => {
        document.cookie = `token=${t}; path=/; max-age=3600`;
        resolve();
      });
    });
  });
};

const captchaToast = (message) => {
  return toast.promise(submitCaptcha(), {
    loading: "Validating captcha...",
    success: message,
    error: "Captcha validation failed.",
  });
};

export const loginGoogle = async () => {
  return captchaToast("Redirecting to Google sign-in...");
};

export const loginDefault = async () => {
  return captchaToast("Logging you in...");
};

export const registerDefault = async () => {
  return captchaToast("Creating your account...");
};
