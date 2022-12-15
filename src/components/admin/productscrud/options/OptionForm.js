import React, { useState } from "react";
import styles from "../../admin.less";

function OptionForm(props) {
  const { addGroupOption, selectedGroup, options, restaurantType, t } = props;
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [chi_cha, setChiCha] = useState("");
  const [price, setPrice] = useState("");
  const [err, setErr] = useState(null);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "title") {
      setTitle(value);
      return;
    }
    if (name === "name") {
      setName(value);
      return;
    }
    if (name === "price") {
      setPrice(value);
      return;
    }
    if (name === "chi_cha") {
      setChiCha(value);
      return;
    }
  };
  const valid = () => {
    if (restaurantType !== "chinees") {
      return title && name && price && selectedGroup;
    }
    if (restaurantType === "chinees") {
      return title && name && chi_cha && price && selectedGroup;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const index = options.findIndex((group) => group.title === selectedGroup);
    if (
      options[index].options.findIndex(
        (option) => option.option_title === title
      ) > -1
    ) {
      setErr(t("group_add_group_error"));
      return;
    }
    const data =
      restaurantType !== "chinees"
        ? {
            option_title: title,
            option_name: name,
            option_price: price,
          }
        : {
            option_title: title,
            option_name: name,
            option_chi_cha: chi_cha,
            option_price: price,
          };
    addGroupOption({
      title: selectedGroup,
      ...data,
    }).then(() => {
      setTitle("");
      setName("");
      setPrice("");

      if (restaurantType === "chinees") {
        setChiCha("");
      }
      setErr(null);
    });
  };

  return (
    <div>
      <form className="form-inline mb-3" onSubmit={handleSubmit}>
        <div className="form-group mr-1">
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            placeholder={t("group_option_title")}
            name="title"
            value={title}
          />
        </div>
        <div className="form-group mr-1">
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            placeholder={t("group_option_name")}
            name="name"
            value={name}
          />
        </div>
        {restaurantType !== "chinees" ? null : (
          <div className="form-group mr-1">
            <input
              type="text"
              className="form-control"
              onChange={handleChange}
              placeholder={t("group_option_chi_cha")}
              name="chi_cha"
              value={chi_cha}
            />
          </div>
        )}
        <div className="form-group mr-1">
          <input
            type="number"
            className="form-control"
            onChange={handleChange}
            placeholder={t("group_option_price")}
            step="any"
            name="price"
            value={price}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={!valid()}>
          {t("add")}
        </button>
      </form>
      <div className={styles.error}>{err}</div>
    </div>
  );
}

export default OptionForm;
