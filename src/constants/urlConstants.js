////////////////////////////////Constants///////////////////////////////////////////////////

export const loggingUser = "admin/login";
export const forgetPasswordEmail = "/forgot-password";
export const forgetPasswordOtp = "/verify-otp";
export const resetForgetPassword = "/reset-password";
export const changingPassword = "/change-password";
export const addingUser = "/user";
export const gettingRecentUsers = "/get_recent_users";
export const gettingDashboardDetail = "/analytics";

export const addingBlog = "/blogs";

export const addingCategory = "/categories";

export const addingSetting = "/settings";

/////////////////////////////////Functions///////////////////////////////////////////////////

export const gettingAllUsers = (
  page = 1,
  search = null,
  limit = 10,
  filterUsers
) => {
  if (search !== null) {
    return `/users?page=${
      page * 1
    }&limit=${limit}&search=${search}&filterUsers=${filterUsers}`;
  } else {
    return `/users?page=${page * 1}&limit=${limit}&filterUsers=${filterUsers}`;
  }
};

export const gettingUser = (data) => {
  return `/user/${data}`;
};

export const updatingUser = (id) => {
  return `/user/${id}`;
};

export const deletingUser = (id) => {
  return `/user/${id}`;
};

export const changingStatus = (id) => {
  return `/change-status/${id}`;
};

export const gettingAnimalsData = (
  page = 1,
  search = null,
  type = "",
  limit = 10
) => {
  if (search !== null) {
    return `/animals/?page=${
      page * 1
    }&limit=${limit}&search=${search}&type=${type}`;
  } else {
    return `/animals/?page=${page * 1}&limit=${limit}&type=${type}`;
  }
};

export const gettingAnimal = (data) => {
  return `/animal/${data}`;
};

export const deletingAnimal = (id) => {
  return `/animal/${id}`;
};

export const gettingAllBlogs = (page = 1,
  limit = 10,
  ) => {
  return `/blogs?page=${
    page * 1
  }&limit=${limit}`;
}

export const deletingBlog = (id) => {
  return `/blogs/${id}`;
};

export const gettingParticularBlog = (data) => {
  return `/blogs/${data}`;
};

export const updatingBlog = (id) => {
  return `/blogs/${id}`
}



export const gettingAllCategories = (page = 1,
  limit = 10,
  ) => {
  return `/categories?page=${
    page * 1
  }&limit=${limit}`;
}

export const deletingCategory = (id) => {
  return `/categories/${id}`;
};

export const gettingParticularCategory = (data) => {
  return `/categories/${data}`;
};

export const updatingCategory = (id) => {
  return `/categories/${id}`
}



export const gettingAllSettings = (page = 1,
  limit = 10,
  ) => {
  return `/settings?page=${
    page * 1
  }&limit=${limit}`;
}

export const deletingSetting = (id) => {
  return `/settings/${id}`;
};

export const gettingParticularSetting = (data) => {
  return `/settings/${data}`;
};

export const updatingSetting = (id) => {
  return `/settings/${id}`
}