export const confirmEmailLink = (message: string) => {
  return `${process.env.URL_WEB}/user/confirm/${message}`;
};
