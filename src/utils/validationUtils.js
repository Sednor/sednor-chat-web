export const getFormDataErrors = (data, formType) => {
  const userData = data;

  let statusArray = null;
  if (formType === 'signIn') {
    statusArray = [validateEmail(userData.email), validatePassword(userData.password)];
  }
  if (formType === 'signUp') {
    statusArray = [validateEmail(userData.email), validateName(userData.firstName, 'firstName'),
      validateName(userData.lastName, 'lastName'), validatePassword(userData.password),
      validatePasswordConfirm(userData.password, userData.passwordConfirm)];
  }

  return statusArray.filter(item => {
    if (item instanceof Error) {
      return item;
    }
  });
};

export const validatePassword = data => {
  if (!data || !data.length) {
    return new Error('password')
  }
  else {
    const password = data.trim();

    if (password.length < 2) {
      return new Error('password')
    }
    if (password.length >= 2) {
      return true;
    }
  }
};

export const validatePasswordConfirm = (password, passwordToConfirm) => {
  if (!password || !passwordToConfirm || !password.length || !passwordToConfirm.length) {
    return new Error('passwordConfirm');
  }
  if (password.trim() !== passwordToConfirm.trim()) {
    return new Error('passwordConfirm');
  }
  else {
    return true;
  }
};

export const validateEmail = data => {
  if (!data || !data.length) {
    return new Error('email')
  }
  else {
    const email = data.trim();

    if (email && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    else {
      return new Error('email');
    }
  }

};

export const validateName = (data, type) => {
  if (!data || !data.length) {
    return new Error(type);
  }
  else {
    const name = data.trim();

    if (name.length < 3) {
      return new Error(type);
    }
    else {
      return true;
    }
  }
};


