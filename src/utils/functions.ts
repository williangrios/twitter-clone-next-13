export function createUser( uid ='' , name = '', userName = '', img = '', email = '') {
    return {
      userName,
      name,
      img,
      email,
      uid,
    };
  }