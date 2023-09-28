import { error } from "@sveltejs/kit";

export const load = async (serverLoadEvent) => {
  throw error(404, {
    message: "No quiz exists on this page",
    hint: "Try a different ID",
  });
};
