export const formatDate = (s) => {
  return new Date(s).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const secondsToHMS = (raw) => {
  let time = { h: 0, m: 0, s: 0 };

  time.h = Math.floor(raw / 3600);
  raw -= time.h * 3600;
  time.m = Math.floor(raw / 60);
  raw -= time.m * 60;
  time.s = raw % 60;

  return time;
};
