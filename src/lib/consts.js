export const LIMITS = {
  title: 50,
  description: 100,
  file: 1024 * 1024, // 1 MB
  filetypes: ["png", "jpg", "jpeg"],
  question: 250,
  option: 500,
  visibilities: ["public", "unlisted", "private"],
  bg: /^https:\/\/images\.unsplash\.com\/photo-/,
  notes: 500,
  username: 40,
  countMin: 5,
  countMax: 20,
};

export const CAPTCHA_ROUTES = ["/login", "/register", "/create", "/contact"];
