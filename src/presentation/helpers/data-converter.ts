export const dataConverter = (date: string) => {
  return new Date(date.split("/").reverse().join("-"));
}