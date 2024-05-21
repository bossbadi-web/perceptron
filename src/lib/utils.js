import filter from "leo-profanity";

// protect routes from unauthorized access
export const getRedirectLoginParams = ({ cookies, url }) => {
  return [
    303,
    `/login?redirectTo=${url.pathname}`,
    { type: "error", message: "Please log in to access this page." },
    cookies,
  ];
};

// add attributes from profiles table to session.user
export const completeUser = async (supabase, user) => {
  const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();

  return (data && { ...user, ...data }) || user;
};

export const formatDate = (s) => {
  return new Date(s).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const secondsToHms = (raw) => {
  let time = { h: 0, m: 0, s: 0 };

  time.h = Math.floor(raw / 3600);
  raw -= time.h * 3600;
  time.m = Math.floor(raw / 60);
  raw -= time.m * 60;
  time.s = Math.floor(raw);

  return time;
};

export const hmsToString = ({ h, m, s }) => {
  let output = "";

  if (h === 0 && m === 0 && s === 0) {
    output += "0 seconds";
  } else {
    if (h > 0) {
      output += `${h} hour${h !== 1 ? "s" : ""} `;
    }

    if (m > 0) {
      output += `${m} minute${m !== 1 ? "s" : ""} `;
    }

    if (s > 0) {
      output += `${s} second${s !== 1 ? "s" : ""}`;
    }
  }

  return output;
};

export const secondsToHmsString = (raw) => {
  return hmsToString(secondsToHms(raw));
};

export const wordCount = (s) => {
  return s.split(" ").length;
};

export const getSafeRedirect = (url, defaultUrl = "/") => {
  let result = defaultUrl;

  if (url && url.startsWith("/")) {
    result = url;
  }

  let tempURL = new URL(result, "http://localhost");
  tempURL.searchParams.set("reload", "true");

  return tempURL.pathname + tempURL.search;
};

// remove profanity from quiz
export const cleanQuiz = (data) => {
  return {
    ...data,
    username: filter.clean(data.username),
    title: filter.clean(data.title),
    description: filter.clean(data.description),
    questions: data.data.map((q) => {
      q.question = filter.clean(q.question);
      q.options = q.options.map((option) => filter.clean(option));
      return q;
    }),
  };
};

// remove profanity from quiz metadata
export const cleanQuizMeta = (data) => {
  return {
    ...data,
    title: filter.clean(data.title),
    description: filter.clean(data.description),
  };
};

// edit url params
export const changePage = (url, params, isSearch = false) => {
  const urlObj = new URL(url);
  const { page, q, order } = params;

  if (page !== undefined) {
    urlObj.searchParams.set("page", page && !isSearch ? page : 1);
  }

  if (q !== undefined) {
    urlObj.searchParams.set("q", q);
  }

  if (order) {
    urlObj.searchParams.set("order", order);
  }

  return urlObj.toString();
};
