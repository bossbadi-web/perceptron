export const load = async (serverLoadEvent) => {
  const { fetch, params, url, route } = serverLoadEvent;
  const { quizId } = params;

  return { quizId };
};
