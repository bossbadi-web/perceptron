import { error, redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ request, locals, params }) => {
    // form data
    const formData = await request.formData();
    let { title, description, questions } = Object.fromEntries(formData);

    // convert to json
    questions = JSON.parse(questions);
    console.log(questions);

    const { error: updateError } = await locals.supabase
      .from("quizzes")
      .update({ data: questions, title, description })
      .eq("id", params.quizId);

    if (updateError) {
      throw error(500, {
        message: "Internal Server Error",
        hint: "Try again later",
      });
    }

    return {
      status: 200,
      body: {
        message: "Successfully updated quiz",
      },
    };
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

  return { quiz: data };
};
