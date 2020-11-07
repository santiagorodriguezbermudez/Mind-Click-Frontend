export const removeCurrentToken = () => {
  localStorage.removeItem('authToken');
};

export const validateCurrentToken = () => {
  const currentDate = Date.now();
  const savedToken = JSON.parse(localStorage.getItem('authToken'));

  let isValid;
  if (!savedToken) {
    isValid = false;
  } else if (savedToken.expirationDate < currentDate) {
    removeCurrentToken();
    isValid = false;
  } else {
    isValid = true;
  }

  return isValid;
};

export const saveCurrentToken = token => {
  localStorage.setItem('authToken', JSON.stringify({
    token,
    expirationDate: Date.now() + 86400000,
  }));
};

export const getCurrentToken = () => (
  JSON.parse(localStorage.getItem('authToken')).token
);
