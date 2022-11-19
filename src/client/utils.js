export const truncate = (str, length) => {
  if (str.length > length) {
    return str.slice(0, length) + '...';
  } else {
    return str;
  }
};

export const redirect = (template, property1, value1, property2, value2) => {
  if (value1 && value2) {
    window.location.href = `${template}.html?${property1}=${value1}&${property2}=${value2}`;
  } else if (value1) {
    window.location.href = `${template}.html?${property1}=${value1}`;
  }
}