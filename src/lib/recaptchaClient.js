import { load } from "recaptcha-v3";
import { PUBLIC_RECAPTCHA_SITE_KEY } from "$env/static/public";

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
