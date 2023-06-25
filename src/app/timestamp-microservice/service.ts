export const getTimestamp = (dateStr: string) => {
  const date = dateStr.match(/^[0-9]+$/g)
    ? new Date(parseInt(dateStr))
    : new Date(dateStr);

  if (date.toString() !== "Invalid Date") {
    return {
      unix: date.getTime(),
      utc: date.toUTCString(),
    };
  } else {
    return {
      error: "Invalid Date",
    };
  }
};
