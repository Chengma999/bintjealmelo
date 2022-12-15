import moment from "moment";
import axios from "axios";
import { Select } from "antd";
import { createFromIconfontCN } from "@ant-design/icons";
import { changeFormat } from "./gegevens";
const { Option } = Select;

export const isIos = () => {
  var u = navigator.userAgent;
  if (u.indexOf("iPhone") > -1 || u.indexOf("iOS") > -1) {
    return true;
  }
  return false;
};
export const remain2Decimals = (num) => {
  return parseFloat(parseFloat(num).toFixed(2));
};

export const calcFee = (nettoPrice, bezorgchosen, bezorggebied) => {
  if (!bezorggebied || bezorggebied.length === 0) {
    return 0;
  }
  if (!bezorgchosen) {
    return Math.min.apply(
      null,
      bezorggebied.map(function (ele) {
        return ele.fee;
      })
    );
  }
  const index = bezorggebied.findIndex((ele) => ele.postcode === bezorgchosen);
  if (index === -1) {
    return Math.min.apply(
      null,
      bezorggebied.map(function (ele) {
        return ele.fee;
      })
    );
  }
  if (index > -1) {
    if (
      !bezorggebied[index].freeAt ||
      nettoPrice < bezorggebied[index].freeAt
    ) {
      return bezorggebied[index].fee;
    }
    return 0;
  }
  return 0;
};

export const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1449733_jat6qq7m3t.js",
});
export const NewIconFont = createFromIconfontCN({
  scriptUrl: "https://at.alicdn.com/t/c/font_1449733_nd3bvaazrna.js",
});
export const project_testclient =
  "//at.alicdn.com/t/font_1449733_jat6qq7m3t.js";
export const colorPurple = "#6f1c75";
export const colorBlue = "#1371fa";
export const colorRed = "#8a0c0c";
export const colorBlack = "rgb(50,50,50)";
export const timeFormat = (time) => {
  return moment(
    (Math.floor(time) * 100 + (time - Math.floor(time)) * 60).toString(),
    "hmm"
  ).format("HH:mm");
};

export const timeToNumber = (time) => {
  console.log(time);
  let number = Number(moment(time, "HH:mm").format("HHmm"));
  console.log(number);
  const part1 = Math.floor(number / 100);
  const part2 = (number - part1 * 100) / 60;
  return (number = part1 + part2);
};

export const days = [
  { value: 1, label: "monday" },
  { value: 2, label: "tuesday" },
  { value: 3, label: "wednesday" },
  { value: 4, label: "thursday" },
  { value: 5, label: "friday" },
  { value: 6, label: "saturday" },
  { value: 0, label: "sunday" },
];

export const numberToDay = (num) => {
  const index = days.findIndex((day) => day.value === num);
  if (index > -1) {
    return days[index].label;
  }
  return undefined;
};
export const getDiscountArr = () => {
  let discountArr = [];
  for (var i = 0; i <= 14; i++) {
    const discount = {};
    discount.value = Number((0.05 * i).toFixed(2));
    discount.label = Number((discount.value * 100).toFixed(2)) + "%";
    discountArr.push({ ...discount });
  }
  return discountArr;
};

export const btwArr = [0.06, 0.09, 0.21];

export const btwOptions = btwArr.map((item, i) => (
  <Option value={item}>{item * 100 + "%"}</Option>
));

export const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
export const tailLayout = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { offset: 4, span: 16 },
  },
};

export const numberOfWeeks = () => {
  let arr = [];
  for (let i = 1; i < 31; i++) {
    arr.push(i);
  }

  return arr;
};
export const pointValueArr = () => {
  let arr = [];
  for (let i = 1; i < 9; i++) {
    arr.push(i * 5);
  }

  return arr;
};

export const fullcardPointsArr = () => {
  let arr = [];
  for (let i = 1; i < 5; i++) {
    arr.push(i);
  }
  for (let i = 1; i < 6; i++) {
    arr.push(i * 5);
  }

  return arr;
};

export const fullcardValueArr = () => {
  let arr = [];
  for (let i = 1; i < 16; i++) {
    arr.push(i);
  }
  for (let i = 1; i < 10; i++) {
    arr.push(i * 0.05);
  }

  return arr;
};
export const fooiArr = () => {
  let arr = [];
  for (let i = 0; i < 11; i++) {
    arr.push(i * 0.5);
  }

  return arr;
};

export const CapitalizeFC = (str) => {
  return <div style={{ textTransform: "capitalize" }}>{str}</div>;
};
export const UppercaseFC = (str) => {
  return <div style={{ textTransform: "upperCase" }}>{str}</div>;
};
export const myfetcher = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

export class PriceManuplation {
  constructor(data) {
    this.data = data;
  }
  operate(handlers) {
    const {
      setTodayBezorgen,
      setRadioValue,
      setDisabled,
      updateCheckoutPrice,
      setMin_value,
    } = handlers;
    const {
      deliverytijden,
      bezorgstatus,
      bezorggebied,
      todayBezorgen,
      radioValue,
      totalPrice,
    } = this.data;
    const index = deliverytijden.findIndex(
      (tijd) => tijd.day === moment().day()
    );
    if (index === -1) {
      setTodayBezorgen(false);
    }
    if (index > -1) {
      setTodayBezorgen(true);
    }

    const min_value = Math.min.apply(
      null,
      bezorggebied.map((e) => e.min_value)
    );
    setMin_value(min_value);
    if (
      (radioValue === 1 && (!bezorgstatus || !todayBezorgen)) ||
      (radioValue === 1 && totalPrice && min_value - totalPrice > 0)
    ) {
      setRadioValue(2);
      setDisabled(true);
      updateCheckoutPrice({
        deliveryMethod: "afhalen",
      });
      console.log("change to afhalen");
    }
  }
}

export const generateDiscountArr = (productPrice) => {
  let discountArr = [];
  for (let i = 0; i <= 14; i++) {
    const discount = {};
    discount.value = Number((0.05 * i).toFixed(2));
    discount.label = Number((discount.value * 100).toFixed(2)) + "%";
    discountArr.push({ ...discount });
  }
  for (let i = 2; i <= (!productPrice ? 60 : productPrice * 2); i++) {
    const discount = {};
    discount.value = Number(0.5 * i);
    discount.label = changeFormat(discount.value);
    discountArr.push({ ...discount });
  }
  return discountArr;
};
export const discountTimesArr = () => {
  let arr = [];
  for (let i = 1; i < 11; i++) {
    let optionObj = {};
    optionObj.value = i;
    optionObj.label = i;
    arr.push(optionObj);
  }
  arr.push({ label: "onbeperkt", value: 999999 });
  return arr;
};
export const changenumToPercent = (num) => {
  return Number.parseFloat(num * 100).toFixed(0) + "%";
};
