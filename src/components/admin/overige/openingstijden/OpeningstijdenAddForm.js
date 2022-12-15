import React, { useState } from "react";
import styles from "../../admin.less";
import { List, Divider } from "antd";
import moment from "moment";
import { days } from "Utilities/toolStore";
const arr = [];
const a = 8;
const n = 23.75;
const index = (n - a) / 0.25;
for (let i = 0; i < index + 1; i++) {
  arr.push(a + i * 0.25);
}

function openingstijdenAddForm({
  isDeliverytijden,
  openingstijden,
  addOpeningstijden,
  t,
  CapitalizeFC,
}) {
  const [day, setDay] = useState(1);
  const [begin, setBegin] = useState(8);
  const [end, setEnd] = useState(8);
  const [err, setErr] = useState(null);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "day") {
      setDay(Number(value));
      return;
    }
    if (name === "begin") {
      setBegin(Number(value));
      return;
    }
    if (name === "end") {
      setEnd(Number(value));
      return;
    }
  };

  const valid = () => {
    return day !== undefined && begin && end;
  };
  const optionsDay = days.map(({ value, label }, i) => {
    return (
      <option value={value} key={i}>
        {t(label)}
      </option>
    );
  });
  const optionsTime = arr.map((time, i) => {
    const label = moment(
      (Math.floor(time) * 100 + (time - Math.floor(time)) * 60).toString(),
      "hmm"
    ).format("HH:mm");
    return (
      <option value={time} key={i}>
        {label}
      </option>
    );
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const index = openingstijden.findIndex(
      (openingstijd) => openingstijd.day === Number(day)
    );
    console.log(begin, end);
    if (end <= begin) {
      setErr(t("openinghours_begin_later_than_end_message"));
      return;
    }
    if (
      index > -1 &&
      openingstijden[index].end > begin &&
      end > openingstijden[index].begin
    ) {
      setErr(t("openinghours_duplicated_message"));
      return;
    }

    addOpeningstijden({
      day,
      begin,
      end,
    }).then((a) => console.log(a));

    setDay(1);
    setBegin(8);
    setEnd(8);
    setErr(null);
  };

  return (
    <div style={{ margin: "auto auto", width: "80%" }}>
      <Divider orientation="left">
        {!isDeliverytijden
          ? CapitalizeFC(t("openingstijden"))
          : CapitalizeFC(t("delivery_time"))}
      </Divider>
      <form className="form-inline mb-3" onSubmit={handleSubmit}>
        <div className="form-group mr-1">
          <select
            className="form-control"
            onChange={handleChange}
            placeholder="Vul day in."
            name="day"
            value={day}
          >
            {optionsDay}
          </select>
        </div>
        <div className="form-group mr-1">
          <select
            className="form-control"
            onChange={handleChange}
            placeholder="Vul bezorgkosten in."
            name="begin"
            value={begin}
          >
            {optionsTime}
          </select>
        </div>
        <div className="form-group mr-1">
          <select
            className="form-control mdb-select md-form colorful-select dropdown-primary"
            name="end"
            placeholder="Vul minimumbestelwaarde in."
            onChange={handleChange}
            value={end}
          >
            {optionsTime}
          </select>
        </div>
        <button type="submit" className="btn btn-primary" disabled={!valid()}>
          {CapitalizeFC(t("add"))}
        </button>
      </form>

      <div className={styles.error}> {err}</div>
    </div>
  );
}

export default openingstijdenAddForm;
