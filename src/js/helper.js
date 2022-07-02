export const formatDate = function (date, style = "full") {
  let options;

  if (style === "full")
    options =
      new Date(date).getFullYear() === new Date(Date.now()).getFullYear()
        ? { month: "numeric", day: "numeric" }
        : { month: "numeric", day: "numeric", year: "numeric" };
  if (style === "weekday") options = { weekday: "short" };
  if (style === "fullTime")
    options = {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
};
