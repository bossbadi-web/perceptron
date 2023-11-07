import { writable } from "svelte/store";

export const createSearchStore = (data) => {
  const { subscribe, set, update } = writable({
    data: data,
    filtered: data,
    search: "",
  });

  const orderBy = (key, reverse = false) => {
    update((store) => {
      let sorted;

      // alphabetically or reverse alphabetically
      if (key === "A-Z") {
        sorted = store.filtered.sort((a, b) => {
          if (a.searchTerms < b.searchTerms) {
            return reverse ? 1 : -1;
          }
          if (a.searchTerms > b.searchTerms) {
            return reverse ? -1 : 1;
          }
          return 0;
        });
      } else {
        // sort by id
        sorted = store.filtered.sort((a, b) => {
          if (a.id < b.id) {
            return reverse ? 1 : -1;
          }
          if (a.id > b.id) {
            return reverse ? -1 : 1;
          }
          return 0;
        });
      }

      return {
        ...store,
        data: sorted,
      };
    });
  };

  return { subscribe, set, update, orderBy };
};

export const searchHandler = (store) => {
  const searchTerm = store.search.toLowerCase() || "";
  store.filtered = store.data.filter((item) => {
    return item.searchTerms.includes(searchTerm);
  });
};
