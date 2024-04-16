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

export const loginGoogle = async () => {
  return toast.promise(submitCaptcha(), {
    loading: "Validating captcha...",
    success: "Redirecting to Google sign-in...",
    error: "That didn't work. Please try again later.",
  });
};

export const loginDefault = async () => {
  return toast.promise(submitCaptcha(), {
    loading: "Validating captcha...",
    success: "Logging you in...",
    error: "That didn't work. Please try again later.",
  });
};
