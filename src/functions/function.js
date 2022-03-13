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

export const mobileValidation = (data, name) => {
  const reg = /^\+?(0|[1-9]\d*)$/;
  if (!data) {
    return `The ${name} field is required `;
  }
  if (data.length !== 10) {
    return `The ${name} is not valid`;
  } else if (!reg.test(data)) {
    return `The ${name} is not valid`;
  } else return null;
};

export const dateFunction = (data) => {
  const str = data.split("-");
  let date = str[2];
  const month = getMonth(str[1]);
  const obj = {
    date: date,
    month: month,
    year: str[0],
  };
  return obj;
};

export const getMonth = (data) => {
  switch (data) {
    case "01": {
      return "January";
    }
    case "02": {
      return "February";
    }
    case "03": {
      return "March";
    }
    case "04": {
      return "April";
    }
    case "05": {
      return "May";
    }
    case "06": {
      return "June";
    }
    case "07": {
      return "July";
    }
    case "08": {
      return "August";
    }
    case "09": {
      return "September";
    }
    case "10": {
      return "October";
    }
    case "11": {
      return "November";
    }
    case "12": {
      return "December";
    }
    default:
      return;
  }
};
