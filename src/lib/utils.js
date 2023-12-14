import filter from "leo-profanity";

// add username to session.user
export const completeUser = (user) => {
  return {
    ...user,
    username: user.user_metadata.username,
  };
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
  if (url && url.startsWith("/")) {
    return url;
  }
  return defaultUrl;
};

// remove profanity from quiz
export const cleanQuiz = (data) => {
  return {
    ...data,
    title: filter.clean(data.title),
    description: filter.clean(data.description),
    questions: data.data.map((q) => {
      q.question = filter.clean(q.question);
      q.options = q.options.map((option) => filter.clean(option));
      return q;
    }),
  };
};
