import { cleanQuiz } from "$lib/utils";
import { error, redirect } from "@sveltejs/kit";

// export const actions = {
//   like: async ({ locals, params }) => {
//     const session = await locals.getSession();

//     if (!session) {
//       throw error(403, {
//         message: "Unauthorized",
//         hint: "You must be logged in to like a quiz",
//       });
//     }

//     const { data } = await locals.supabase.from("quizzes").select("likers, dislikers").eq("id", params.quizId).single();

//     if (!data) {
//       throw error(500, {
//         message: "No quiz exists on this page",
//         hint: "Try a different ID",
//       });
//     }

//     // if user already liked the quiz, remove their id from the likers array
//     const alreadyLiked = data.likers.includes(session.user.id);

//     const { error: err } = await locals.supabase
//       .from("quizzes")
//       .update({
//         likers: alreadyLiked ? data.likers.filter((id) => id !== session.user.id) : [...data.likers, session.user.id],
//         dislikers: data.dislikers.filter((id) => id !== session.user.id),
//       })
//       .eq("id", params.quizId);

//     if (err) {
//       throw error(500, {
//         message: "Server error. Please try again later.",
//       });
//     }

//     return { status: 200, message: "Liked" };
//   },
//   dislike: async ({ locals, params }) => {
//     const session = await locals.getSession();

//     if (!session) {
//       throw error(403, {
//         message: "Unauthorized",
//         hint: "You must be logged in to dislike a quiz",
//       });
//     }

//     const { data } = await locals.supabase.from("quizzes").select("likers, dislikers").eq("id", params.quizId).single();

//     if (!data) {
//       throw error(500, {
//         message: "No quiz exists on this page",
//         hint: "Try a different ID",
//       });
//     }

//     const alreadyDisliked = data.dislikers.includes(session.user.id);

//     const { error: err } = await locals.supabase
//       .from("quizzes")
//       .update({
//         dislikers: alreadyDisliked
//           ? data.dislikers.filter((id) => id !== session.user.id)
//           : [...data.dislikers, session.user.id],
//         likers: data.likers.filter((id) => id !== session.user.id),
//       })
//       .eq("id", params.quizId);

//     if (err) {
//       throw error(500, {
//         message: "Server error. Please try again later.",
//       });
//     }

//     return { status: 200, message: "Disliked" };
//   },
// };

// get quiz id from params, url is /play/[quizId]/+page
export const load = async ({ locals, params, url }) => {
  const { data } = await locals.supabase.from("quizzes").select("*").eq("id", params.quizId).single();

  if (!data) {
    throw error(500, {
      message: "No quiz exists on this page",
      hint: "Try a different ID",
    });
  }

  if (data.visibility === "private") {
    const session = await locals.getSession();

    if (!session) {
      throw redirect(303, `/login?redirectTo=${url.pathname}`);
    }

    if (data.owner !== session.user.id) {
      throw error(403, {
        message: "Unauthorized",
        hint: "You are not the owner of this quiz",
      });
    }
  }

  // randomize the order of the questions
  data.data = data.data.sort(() => Math.random() - 0.5);

  // randomize the order of the options
  data.data.forEach((q) => {
    let correctAnswer = q.options[q.answer];
    q.options = q.options.sort(() => Math.random() - 0.5);
    q.answer = q.options.indexOf(correctAnswer);
  });

  const { data: dataOwner } = await locals.supabase.rpc("get_raw_user_meta_data", {
    user_id: data.owner,
  });

  return {
    quiz: cleanQuiz({ ...data, username: dataOwner?.username }),
  };
};
