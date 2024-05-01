// save score to database
export const POST = async ({ locals, params, request }) => {
  const session = await locals.getSession();
  if (!session) {
    return new Response(null, { status: 401 });
  }

  const { finished_at, questions_wrong, time_taken, question_count } = await request.json();
  const { error: err } = await locals.supabase.from("scores").upsert(
    [
      {
        player_id: session.user.id,
        quiz_id: params.quizId,
        finished_at,
        questions_wrong,
        time_taken,
        question_count,
      },
    ],
    { onConflict: ["player_id", "quiz_id"] }
  );

  if (err) {
    return new Response(null, { status: 500 });
  }

  return new Response(null, { status: 200 });
};
