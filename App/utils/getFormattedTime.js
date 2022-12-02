const getFormattedTime = (datetime) => {
  const dt = new Date(datetime);
  const pm = dt.getHours() > 12;

  return `${pm ? dt.getHours() - 12 : dt.getHours()}:${
    dt.getMinutes().length < 1 ? dt.getMinutes() : `0${dt.getMinutes()}`
  } ${pm ? "PM" : "AM"}`;
};

export default getFormattedTime;
