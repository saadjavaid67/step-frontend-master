import moment from 'moment';

var dateFormat = "YYYY-MM-DD";
var dateTimeFormat = "YYYY-MM-DD HH:mm:ss";
var timeFormat = "HH:mm";
var dateDisplayFormat = "YYYY-MM-DD";
var dateTimeDisplayFormat = "YYYY-MM-DD HH:mm:ss";

export const getDayOfWeek = (index)=>{  
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  return days[index];
}

export function dateTimeStringToDate(dateString) {
  return moment(dateString, dateTimeFormat);
}

export function dateStringToDate(dateString) {
  return moment(dateString, dateFormat);
}

export function timeStringToDate(time) {
  return moment(time, timeFormat);
}

export function dateTimeToString(date) {
  return date.format(dateTimeDisplayFormat);
}

export function dateToString(date) {
  return date.format(dateDisplayFormat);
}

export function dateTimeToAPIString(date) {
  return date.format(dateTimeFormat);
}

export function dateToAPIString(date) {
  return date.format(dateFormat);
}

export function timeToAPIString(date) {
  return date.format(timeFormat);
}