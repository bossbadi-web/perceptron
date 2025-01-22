import { cleanQuizMeta } from "$lib/utils";
import { error } from "@sveltejs/kit";

// get quiz on specific page
export const load = async ({ locals, url }) => {
  const pageSize = 12;
  let page = parseInt(url.searchParams.get("page")) || 1;
  const order = url.searchParams.get("order");
  const query = url.searchParams.get("q");

  if (order === "A-Z") {
    var orderBy = "title";
    var ascending = true;
  } else if (order === "Z-A") {
    var orderBy = "title";
    var ascending = false;
  } else if (order === "Oldest") {
    var orderBy = "id";
    var ascending = true;
  } else if (order === "Recent") {
    var orderBy = "id";
    var ascending = false;
  } else if (order === "Most liked") {
    var orderBy = "likers";
    var ascending = false;
  } else {
    var orderBy = "id";
    var ascending = false;
  }

  if (query) {
    var total = await locals.supabase
      .from("quizzes")
      .select("id", { count: "exact", head: true })
      .eq("visibility", "public")
      .ilike("title", `%${query}%`);
  } else {
    var total = await locals.supabase
      .from("quizzes")
      .select("id", { count: "exact", head: true })
      .eq("visibility", "public");
  }

  // if page is less than 1, make it 1
  // if page is more than total pages, make it total pages
  const totalPages = Math.ceil(total.count / pageSize);
  if (page < 1) {
    page = 1;
  } else if (page > totalPages) {
    page = totalPages;
  }

  const rangeLeft = (page - 1) * pageSize;
  const rangeRight = page * pageSize - 1 > total.count ? total.count - 1 : page * pageSize - 1;

  if (query) {
    var { data: quizzes } = await locals.supabase
      .from("quizzes")
      .select("*")
      .eq("visibility", "public")
      .ilike("title", `%${query}%`)
      .order(orderBy, { ascending })
      .range(rangeLeft, rangeRight);
  } else {
    var { data: quizzes } = await locals.supabase
      .from("quizzes")
      .select("*")
      .eq("visibility", "public")
      .order(orderBy, { ascending })
      .range(rangeLeft, rangeRight);
  }

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
    currentPage: page,
  };
};
