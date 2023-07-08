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

  export function createArticle(
    title: string = '',
    date: string= '',
    urlToImage: string= '',
    url: string = ''
  ) {
    return {
      title,
      date,
      urlToImage,
      url,
    };
  }

  export function createFollow(name: string = '', userName: string= '', picture: string = '') {
    return {
      picture,
      name,
      userName,
    };
  }

  export function createComment(
    comment:string = "",
    name:string = "",
    timestamp:string = "",
    userImage:string = ""
  ) {
    return {
      comment,
      name,
      timestamp,
      userImage,
    };
  }