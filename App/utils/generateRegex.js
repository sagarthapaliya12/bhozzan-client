const generateRegex = (query) => {
  const words = query.trim().split(/\s/);
  let regexQuery = "[a-z\\s]*";
  // Create regex query by separating words
  words.forEach((word) => (regexQuery += word + "[a-z\\s]*"));
  // Create regex out of regex query
  const regex = new RegExp(regexQuery, "i");
  return regex;
};

export default generateRegex;
