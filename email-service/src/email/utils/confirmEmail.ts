export const confirmEmailLink = (message: string) => {
  return `${process.env.URL_WEB}/user/confirm/${message}`;
};

export const resetPasswordLink = (message: string) => {
  return `${process.env.URL_WEB}/user/reset-password/${message}`;
};
