import { error } from "@sveltejs/kit";
import { LIMITS } from "$lib/consts";
import { redirect, setFlash } from "sveltekit-flash-message/server";

const updateQuiz = async ({ request, locals, params }) => {
  const formData = await request.formData();
  let { title, description, questions, visibility, bg } = Object.fromEntries(formData);

  if (!title) {
    return { inputError: "Title is required." };
  }
  if (!description) {
    return { inputError: "Description is required." };
  }

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
    inputError = "Internal Server Error";
  }

  return { inputError };
};

export const actions = {
  save: async ({ cookies, request, locals, params }) => {
    const { inputError } = await updateQuiz({ request, locals, params });
    setFlash({ type: inputError ? "error" : "success", message: inputError || "Quiz saved." }, cookies);
  },
  preview: async ({ cookies, request, locals, params }) => {
    const { inputError } = await updateQuiz({ request, locals, params });

    if (inputError) {
      throw redirect(303, `/edit/${params.quizId}`, { type: "error", message: inputError }, cookies);
    }

    throw redirect(303, `/preview/${params.quizId}`);
  },
  play: async ({ cookies, request, locals, params }) => {
    const { inputError } = await updateQuiz({ request, locals, params });

    if (inputError) {
      throw redirect(303, `/edit/${params.quizId}`, { type: "error", message: inputError }, cookies);
    }

    throw redirect(303, `/play/${params.quizId}`);
  },
  delete: async ({ cookies, locals, params }) => {
    const { error: deleteError } = await locals.supabase.from("quizzes").delete().eq("id", params.quizId);

    if (deleteError) {
      throw error(500, {
        message: "Internal Server Error",
        hint: "Try again later",
      });
    }

    throw redirect(303, "/library", { type: "success", message: "Quiz deleted." }, cookies);
  },
};

// get quiz id from params, url is /edit/[quizId]/+page
export const load = async ({ locals, params, url }) => {
  const session = await locals.getSession();

  if (!session) {
    throw redirect(303, `/login?redirectTo=${url.pathname}`);
  }

  const { data } = await locals.supabase.from("quizzes").select("*").eq("id", params.quizId).single();

  if (!data) {
    throw error(500, {
      message: "No quiz exists on this page",
      hint: "Try a different ID",
    });
  }

  if (data.owner !== session.user.id) {
    throw error(403, {
      message: "Unauthorized",
      hint: "You are not the owner of this quiz",
    });
  }

  return { quiz: data };
};
