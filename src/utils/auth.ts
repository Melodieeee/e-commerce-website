export const isUserLoggedIn = async (): Promise<boolean> => {    
    return new Promise((resolve) => {
      const loggedIn = Boolean(localStorage.getItem('userToken'));
      resolve(loggedIn);
    });
  };