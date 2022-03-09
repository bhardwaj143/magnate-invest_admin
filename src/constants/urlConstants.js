////////////////////////////////Constants///////////////////////////////////////////////////

export const loggingUser = "/admin/auth/login";
export const forgetPasswordEmail = "/admin/forgot-password";
export const forgetPasswordOtp = "/admin/verify-otp";
export const resetForgetPassword = "/admin/reset-password";
export const changingPassword = "/admin_change_password";
export const addingUser = "/register";
export const gettingRecentUsers = "/get_recent_users";
export const changingStatus = "/change_user_status";

/////////////////////////////////Functions///////////////////////////////////////////////////

export const gettingAllUser = (page = 1, search = null) => {
  if (search !== null) {
    return `/users/user?page=${page * 1}&search=${search}`;
  } else {
    return `/users/user?page=${page}`;
  }
};

export const gettingUser = (data) => {
  return `/user/${data}`;
};

export const updatingUser = (id) => {
  return `/updateuser/${id}`;
};

export const deletingUser = (id) => {
  return `/user/delete/${id}`;
};
