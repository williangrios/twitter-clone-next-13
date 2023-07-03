export function createUser( uid ='' , name = '', userName = '', image = '', email = '', expires ='') {
    return {
      user:{
        email,
        image,
        name,
        uid,
        userName,
      },
      expires
    };
  }


  export function createPost(
    id: string = '',
    name: string = '',
    userName: string = '',
    userImage: string = '',
    img: string = '',
    text: string = '',
    seconds: number = 0,
    nanoseconds: number = 0
  ) {
    return {
      id,
      name,
      userName,
      userImage,
      img,
      text,
      seconds,
      nanoseconds
    };
  }