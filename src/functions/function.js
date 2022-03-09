export const emailValidation = (email) => {
  const x = email.replace(/\s/g, "");
  const regEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //(This reg is for email)
  if (!x || !email) {
    return "Please enter your email";
  } else if (!regEmail.test(email)) {
    return "Invalid Email";
  } else {
    return false;
  }
};

export const passwordValidation = (password) => {
  if (!password) {
    return "Please enter your password";
  } else if (password.length < 8) {
    return "Password must be of atleast 8 characters";
  } else {
    return false;
  }
};

export const newPasswordValidation = (password, confirmPassword) => {
  if (!password) {
    return "Please enter your password";
  } else if (password.length < 8) {
    return "Password must be of atleast 8 characters";
  } else if (!confirmPassword) {
    return "Please confirm you password";
  } else if (confirmPassword !== password) {
    return "Passwords do not match";
  } else {
    return false;
  }
};

export const OTPValidation = (otp) => {
  const xOtp = otp.replace(/\s/g, "");
  if (!xOtp || !otp) {
    return "Please enter the otp";
  } else {
    return false;
  }
};

export const changePassword = (oldPassword, newPassword, confirmPassword) => {
  let err = false;
  if (!oldPassword) {
    err = true;
    return { error: err, message: "Please enter your Old Password" };
  }
  if (!newPassword) {
    err = true;
    return { error: err, message: "Please enter the new Password" };
  } else if (newPassword.length < 8) {
    err = true;
    return { error: err, message: "Password must be of atleast 8 characters" };
  } else if (!confirmPassword) {
    err = true;
    return { error: err, message: "Please confirm your Password" };
  } else if (newPassword !== confirmPassword) {
    err = true;
    return { error: err, message: "Passwords do not match" };
  }
};

export const textValidation = (text, textName) => {
  const x = text.replace(/\s/g, "");
  if (!x || !text) {
    return `Please enter the ${textName}`;
  } else if (text.length < 2) {
    return `The ${textName} should be atleast more then 2 characters`;
  } else {
    return null;
  }
};
