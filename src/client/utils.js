export const truncate = (str, length) => {
  if (str.length > length) {
    return str.slice(0, length) + '...';
  } else {
    return str;
  }
};

export const redirect = (template, property, value) => {
  if (value) {
    window.location.href = `${template}.html?${property}=${value}`;
  }
}