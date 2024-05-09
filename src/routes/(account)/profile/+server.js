// save customizations to database
export const POST = async ({ locals, request }) => {
  const session = await locals.getSession();
  if (!session) {
    return new Response(null, { status: 401 });
  }

  const args = await request.json();

  const { error: err } = await locals.supabase
    .from("profiles")
    .upsert([{ id: session.user.id, ...args }], { onConflict: ["id"] });

  if (err) {
    return new Response(null, { status: 500 });
  }

  return new Response(null, { status: 200 });
};
