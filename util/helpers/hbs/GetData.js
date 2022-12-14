const moment = require("moment");

exports.getDate = (date) => {
  date.toString().slice(0, 5);
  const time = moment(date, "YYYYMMDD, h:mm:ss")
    .startOf("second")
    .fromNow()
    return time.charAt(0).toUpperCase() + time.slice(1);
}