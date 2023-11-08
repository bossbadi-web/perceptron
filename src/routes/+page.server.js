// get logo color based on theme

export const load = ({ cookies }) => {
  const theme = cookies.get("theme") || "light";
  const logoPath = `/img/logo-${theme === "dark" ? "white" : "black"}.svg`;
  return { logoPath };
};
