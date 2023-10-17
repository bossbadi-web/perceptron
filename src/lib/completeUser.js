// add username to session.user

export const completeUser = (user) => {
  return {
    ...user,
    username: user.email.split("@")[0],
  };
};
