import { error, fail, redirect } from "@sveltejs/kit";
import { LIMITS } from "$lib/consts";

const updateQuiz = async ({ request, locals, params }) => {
  const formData = await request.formData();
  let { title, description, questions, visibility, bg } = Object.fromEntries(formData);

  let inputError = "";
  let newQuiz = { data: JSON.parse(questions) };

  // validate input
  if (title.length > LIMITS.title) {
    inputError = `Title must be less than ${LIMITS.title} characters.`;
  } else {
    newQuiz.title = title;
  }

  if (description.length > LIMITS.description) {
    inputError = `Description must be less than ${LIMITS.description} characters.`;
  } else {
    newQuiz.description = description;
  }

  if (!LIMITS.visibilities.includes(visibility)) {
    inputError = "Invalid visibility.";
  } else {
    newQuiz.visibility = visibility;
  }

  if (bg && !bg.match(LIMITS.bg)) {
    inputError = "Background image must be from Unsplash.";
  } else {
    newQuiz.bg = bg;
  }

  const { error: updateError } = await locals.supabase.from("quizzes").update(newQuiz).eq("id", params.quizId);

  if (updateError) {
    throw error(500, {
      message: "Internal Server Error",
      hint: "Try again later",
    });
  }

  return { inputError };
};

export const actions = {
  save: async ({ request, locals, params }) => {
    const { inputError } = await updateQuiz({ request, locals, params });

    if (inputError) {
      return fail(400, { message: inputError });
    }

    throw redirect(303, `/edit/${params.quizId}`);
  },
  preview: async ({ request, locals, params }) => {
    const { inputError } = await updateQuiz({ request, locals, params });

    if (inputError) {
      return fail(400, { message: inputError });
    }

    throw redirect(303, `/preview/${params.quizId}`);
  },
  play: async ({ request, locals, params }) => {
    const { inputError } = await updateQuiz({ request, locals, params });

    if (inputError) {
      return fail(400, { message: inputError });
    }

    throw redirect(303, `/play/${params.quizId}`);
  },
  delete: async ({ locals, params }) => {
    const { error: deleteError } = await locals.supabase.from("quizzes").delete().eq("id", params.quizId);

    if (deleteError) {
      throw error(500, {
        message: "Internal Server Error",
        hint: "Try again later",
      });
    }

    throw redirect(303, "/library");
  },
};

// get quiz id from params, url is /edit/[quizId]/+page
export const load = async ({ cookies, locals, params, url }) => {
  const { data: sessionData, error: err } = await locals.supabase.auth.getUser(cookies.get("access_token"));

  if (err) {
    throw redirect(303, `/login?redirectTo=${url.pathname}`);
  }

  const { data } = await locals.supabase.from("quizzes").select("*").eq("id", params.quizId).single();

  if (!data) {
    throw error(500, {
      message: "No quiz exists on this page",
      hint: "Try a different ID",
    });
  }

  if (data.owner !== sessionData.user.id) {
    throw error(403, {
      message: "Unauthorized",
      hint: "You are not the owner of this quiz",
    });
  }

  return { quiz: data, LIMITS };
};
