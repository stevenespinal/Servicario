export const isValidImage = value => {
  if (!value) return true;
  if (typeof (value) !== "string") return false;
  const validFormats = ['png', 'jpg', 'jpeg', 'svg'];
  const extension = value.split('.').pop();
  return validFormats.includes(extension);
}

export const isValidUrl = value => {
  if (!value) return true;
  if (typeof (value) !== "string") return false;
  const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  const regex = new RegExp(expression);
  return !!value.match(regex);
}

export const sameAs = (getValues, field) => value => {
  if (!value) return true;
  if (typeof (value) !== "string") return false;
  const compareValues = getValues()[field];
  return compareValues === value;
}
