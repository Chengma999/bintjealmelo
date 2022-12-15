import moment from "moment";
import takeTime from "../src/components/checkout/form/options/timeOptions";
export class TakeTimeOptions {
  constructor(tijdenObj, orderType, obj) {
    const {
      timeInterval,
      waitingTimeFirstOrder,
      limitedNumberOfOrders,
      orderedOrders,
    } = obj;
    const { openingstijden, deliverytijden, zsmDelivery, zsmTakeaway } =
      tijdenObj;
    this.tijden = orderType === "bezorgen" ? deliverytijden : openingstijden;
    this.timeInterval = timeInterval;
    this.waitingTimeFirstOrder = waitingTimeFirstOrder;
    this.limitedNumberOfOrders = limitedNumberOfOrders;
    this.orderedOrders = orderedOrders;
    this.orderType = orderType;
    this.optionsObj = obj;
    this.zsm = orderType === "bezorgen" ? zsmDelivery : zsmTakeaway;
  }

  get_first_tijden(date) {
    const foundIndex = this.tijden.findIndex(
      (tijd) => tijd.day === moment(date).day()
    );
    let _t = {};
    _t.begin =
      this.tijden[foundIndex] !== undefined
        ? this.tijden[foundIndex].begin
        : 16;
    _t.end =
      this.tijden[foundIndex] !== undefined ? this.tijden[foundIndex].end : 20;
    _t.exclude = this.tijden[foundIndex]?.exclude;
    _t.excludeBegin = this.tijden[foundIndex]?.excludeBegin;
    _t.excludeEnd = this.tijden[foundIndex]?.excludeEnd;
    return _t;
  }
  get_second_tijden(date) {
    const foundFirstIndex = this.tijden
      .map((item) => item.day)
      .indexOf(moment(date).day());
    const secondIndex = this.tijden
      .map((item) => item.day)
      .indexOf(moment(date).day(), foundFirstIndex + 1);

    let _t = {};
    if (foundFirstIndex > -1 && secondIndex > -1) {
      _t.begin =
        this.tijden[secondIndex] !== undefined
          ? this.tijden[secondIndex].begin
          : 16;
      _t.end =
        this.tijden[secondIndex] !== undefined
          ? this.tijden[secondIndex].end
          : 20;
    }
    return _t;
  }
  cal_select_tijden(date) {
    const isNotToday = !date.isSame(moment(), "day");
    let optionsObj;
    let tijd_1 = this.get_first_tijden(date);
    let tijd_2 = this.get_second_tijden(date);
    console.log(tijd_1, tijd_2);
    if (tijd_1.exclude) {
      const openingstijden = [
        { begin: tijd_1.begin, end: tijd_1.excludeBegin },
        { begin: tijd_1.excludeEnd, end: tijd_1.end },
      ];
      tijd_1 = openingstijden[0];
      tijd_2 = openingstijden[1];
    }
    console.log(tijd_1, tijd_2);
    if (this.orderType === "bezorgen") {
      optionsObj = { ...this.optionsObj, zsmDelivery: this.zsm, isNotToday };
    }
    if (this.orderType === "afhalen") {
      optionsObj = { ...this.optionsObj, zsmTakeaway: this.zsm, isNotToday };
    }
    let selectOptions = takeTime({
      begin: tijd_1.begin,
      end: tijd_1.end,
      ...optionsObj,
    });

    if (tijd_2.begin && tijd_2.begin > tijd_1.begin) {
      selectOptions = selectOptions.concat(
        takeTime({
          begin: tijd_2.begin,
          end: tijd_2.end,
          ...optionsObj,
        })
      );
    }
    if (tijd_2.begin && tijd_2.begin < tijd_1.begin) {
      selectOptions = takeTime({
        begin: tijd_2.begin,
        end: tijd_2.end,
        ...optionsObj,
      }).concat(selectOptions);
    }
    return selectOptions;
  }
}
