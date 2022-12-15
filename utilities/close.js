import moment from "moment";
export class CloseDays {
  constructor(_closeday, openingstijden) {
    this._closeday = _closeday;
    this.openingstijden = openingstijden;
  }

  extra_closed(date) {
    let _a = { closed: false, reason: "", begin: "", end: "" };

    this._closeday.forEach((item) => {
      if (moment(date).isBetween(item.begin, item.end, "day", "[]")) {
        _a.closed = true;
        _a.reason = item.reason;
        _a.begin = item.begin;
        _a.end = item.end;
      }
    });
    return _a;
  }

  normal_closed() {
    return (
      !this.openingstijden.map((item) => item.day).includes(moment().day()) ||
      this.openingstijden.find(
        (openingstijd) => openingstijd.day === moment().day()
      )?.isopen === false
    );
  }
}
