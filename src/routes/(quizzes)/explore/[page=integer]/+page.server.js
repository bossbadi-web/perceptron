import { cleanQuizMeta } from "$lib/utils";
import { error } from "@sveltejs/kit";

// get quiz on specific page
export const load = async ({ locals, params, url }) => {
  const page = params.page || 1;
  const pageSize = 12;

  const order = url.searchParams.get("order");

  if (order === "A-Z") {
    var orderBy = "title";
    var ascending = true;
  } else if (order === "Z-A") {
    var orderBy = "title";
    var ascending = false;
  } else if (order === "Oldest first") {
    var orderBy = "created_at";
    var ascending = true;
  } else {
    var orderBy = "created_at";
    var ascending = false;
  }

  const total = await locals.supabase
    .from("quizzes")
    .select("id", { count: "exact", head: true })
    .eq("visibility", "public");

  const rangeLeft = (page - 1) * pageSize;
  const rangeRight = page * pageSize - 1 > total.count ? total.count - 1 : page * pageSize - 1;

  // ignore case in title
  const { data: quizzes } = await locals.supabase
    .from("quizzes")
    .select("*")
    .eq("visibility", "public")
    .order(orderBy, { ascending })
    .range(rangeLeft, rangeRight);

  if (!quizzes) {
    throw error(500, {
      message: "That didn't work",
      hint: "Try again later",
    });
  }

  return {
    quizzes: [...quizzes.map((quiz) => cleanQuizMeta(quiz))],
    rangeLeft: rangeLeft + 1,
    rangeRight: rangeRight + 1,
    total: total.count,
  };
};
