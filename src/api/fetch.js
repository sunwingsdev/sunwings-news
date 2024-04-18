export const getAllMembers = async () => {
  const res = await fetch(`${import.meta.env.VITE_BASE_API_URL}/users`);
  const data = res.json();
  return data;
};

// save categories to the db
export const saveCategories = async (categoriesInfo) => {
  const res = await fetch(`${import.meta.env.VITE_BASE_API_URL}/categories`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(categoriesInfo),
  });
  const data = res.json();
  return data;
};

// get single  category
export const singleCategory = async (selectedCategory) => {
  const res = await fetch(
    `${import.meta.env.VITE_BASE_API_URL}/categories/${selectedCategory}`
  );
  const data = res.json();
  return data;
};
