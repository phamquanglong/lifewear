//validate email
export var isValidEmail = (Email) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email)) {
    return true;
  }
  return false;
};

export var isValidPassword = (Password) => {
  if (Password.length >= 7) {
    return true;
  } else {
    return false;
  }
};

export var isValidConfirmPassword = (ConfirmPassword, Password) => {
  if (ConfirmPassword == Password)
    return true;
  else return false;
}

export var isValidResetCode = (resetCode) => {
  if (resetCode.length == 6) return true
  else return false
}

export var isValidPhone = (phone) => {
  if (phone !== null) return phone.length >= 10 && phone.length <= 11 ? true : false
  else return false
}
