import { redirect } from "@sveltejs/kit";

export const GET = () => {
  throw redirect(303, `/explore/1`);
};
