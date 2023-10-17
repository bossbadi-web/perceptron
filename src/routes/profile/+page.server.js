// get user profile

export const load = async ({ locals }) => {
  const session = await locals.getSession();

  return {
    email: session.user.email,
    id: session.user.id,
  };
};
