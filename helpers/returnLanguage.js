const returnLanguage = ( headers ) =>{
  let language = "en";
  if (headers.mylanguage){
    language = headers.mylanguage
  };
  return language;
}

export default returnLanguage
