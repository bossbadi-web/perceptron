import { PUBLIC_RECAPTCHA_SITE_KEY } from "$env/static/public";

export const submitCaptcha = async () => {
  await new Promise((resolve) => {
    grecaptcha.ready(() => {
      grecaptcha.execute(PUBLIC_RECAPTCHA_SITE_KEY, { action: "submit" }).then((t) => {
        document.cookie = `token=${t}; path=/; max-age=3600`;
        resolve();
      });
    });
  });
};
