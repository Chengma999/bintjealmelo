import moment from "moment";
// const IsBusyTime = (day, time1, time2) => {
//   return (
//     moment().day() === day &&
//     moment().isBetween(
//       `${moment().format("YYYY-MM-DD")}T${time1}`,
//       `${moment().format("YYYY-MM-DD")}T${time2}`
//     )
//   );
// };

const takeTime = (obj) => {
  const {
    begin,
    end,
    timeInterval,
    waitingTimeFirstOrder,
    limitedNumberOfOrders,
    orderedOrders,
    zsmTakeaway,
    zsmDelivery,
    isNotToday,
  } = obj;
  let arr = [];
  const index = (end - begin) / timeInterval;
  for (let i = 0; i < index + 1; i++) {
    arr.push(begin + i * timeInterval);
  }
  // const objArr = arr.map((time) => {
  //   const label = moment(
  //     (Math.floor(time) * 100 + (time - Math.floor(time)) * 60).toFixed(),
  //     "hmm"
  //   ).format("HH:mm");
  //   return { value: time, label, available: 3 };
  // });

  let newarr;
  const date = moment();
  const htime =
    date.get("hour") +
    date.get("minute") / 60 +
    // fnWaitTime(5, "12:00", "12:35", orderType);
    waitingTimeFirstOrder;
  let arr1 = arr.slice(0);
  arr1.push(htime);
  arr1.sort((a, b) => a - b);
  const indexNum = arr1.indexOf(htime) + 1;
  let arr2;
  const notCLosedYet =
    Math.floor(end) * 100 + (end - Math.floor(end)) * 60 >
    parseFloat(moment().format("Hmm"));
  if (isNotToday) {
    arr2 = arr;
  } else if (indexNum < arr1.length) {
    //when htime is less than end
    arr2 = arr1.slice(indexNum);
  } else if (notCLosedYet) {
    //when htime is bigger  than or equal end but still not closed
    arr2 = arr.slice(arr.length - 1);
  } else {
    //when closed
    arr2 = [];
  }
  if (isNotToday) {
    newarr = arr2.map((time, i) => {
      let val = moment(
        (Math.floor(time) * 100 + (time - Math.floor(time)) * 60).toFixed(),
        "hmm"
      ).format("HH:mm");
      return {
        value: val,
        text: val,
        key: i,
        available: limitedNumberOfOrders,
      };
    });
  } else {
    newarr = arr2.map((time, i) => {
      let val = moment(
        (Math.floor(time) * 100 + (time - Math.floor(time)) * 60).toFixed(),
        "hmm"
      ).format("HH:mm");
      if (!orderedOrders[val]) {
        return {
          value: val,
          text: val,
          key: i,
          available: limitedNumberOfOrders,
        };
      } else {
        return {
          value: val,
          text: val,
          key: i,
          available: limitedNumberOfOrders - orderedOrders[val],
        };
      }
    });
  }
  //newarr 不能为空数组
  const isAfterBegin = moment().hour() + moment().minute() / 60 > begin;
  if (
    newarr.length > 0 &&
    (zsmTakeaway || zsmDelivery) &&
    isAfterBegin &&
    !isNotToday
  ) {
    newarr.unshift({
      value: "z.s.m.",
      text: "zo snel mogelijk",
      key: "z.s.m.",
      available: 1,
    });
  }
  return newarr;
};
export default takeTime;
export const reservationTimeFunc = (obj) => {
  const { begintime, endtime, timeinterval } = obj;
  let arr = [];
  const index = (endtime - begintime) / timeinterval;
  for (let i = 0; i < index + 1; i++) {
    arr.push(begintime + i * timeinterval);
  }
  const time = arr.map((time) => {
    const label = moment(
      (Math.floor(time) * 100 + (time - Math.floor(time)) * 60).toFixed(),
      "hmm"
    ).format("HH:mm");
    return { value: label, label };
  });
  return time;
};
export const daysOptions = [
  { value: 0, text: "zondag" },
  { value: 1, text: "maandag" },
  { value: 2, text: "dinsdag" },
  { value: 3, text: "woensdag" },
  { value: 4, text: "donderdag" },
  { value: 5, text: "vrijdag" },
  { value: 6, text: "zaterdag" },
  { value: 9, text: "NIET SLUITEN" },
];
//voor openingstijden
export const days = [
  { value: 1, text: "maandag" },
  { value: 2, text: "dinsdag" },
  { value: 3, text: "woensdag" },
  { value: 4, text: "donderdag" },
  { value: 5, text: "vrijdag" },
  { value: 6, text: "zaterdag" },
  { value: 0, text: "zondag" },
];
