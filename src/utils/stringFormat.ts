import moment, { Moment } from "moment";

export function dateString(
  date: Date | string | Moment,
  format: string = "MM/DD"
) {
  return moment(date).format(format);
}
