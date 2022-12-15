import React, { useState } from "react";
import styles from "./kortingcodeForm.less";
import { useMediaQuery } from "react-responsive";
function KortingcodeForm({ enterDiscountcode, basket, deliveryMethod, t }) {
  const { errorMessage, successMessage } = basket;
  const [formVisible, setFormVisible] = useState(false);
  const [discountcode, setDiscountcode] = useState("");
  const isSmallscreen = useMediaQuery({ maxWidth: 857 });

  const handleClick = (event) => {
    event.preventDefault();
    if (formVisible) {
      setFormVisible(false);
      return;
    }
    setFormVisible(true);
  };
  const valid = () => {
    return discountcode !== "";
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setDiscountcode(value);
  };
  const handleForm = async (event) => {
    event.preventDefault();
    enterDiscountcode({ discountcode, deliveryMethod, fee: 0 });
    // setDiscountcode("");
  };

  return (
    <div>
      <button
        className={!formVisible ? "btn btn-dark" : "btn btn-success"}
        onClick={handleClick}
      >
        {t("Ik heb een kortingscode.")}
      </button>
      {!formVisible ? null : (
        <div className={styles.form}>
          <div className={!isSmallscreen ? "form-inline mb-3" : "form mb-3"}>
            <div className="form-group mr-1">
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                placeholder={t("Vul kortingscode in.")}
                name="discountcode"
                value={discountcode}
              />
            </div>

            <button
              type="submit"
              className="btn btn-dark"
              style={{ margin: "5px 0" }}
              disabled={!valid()}
              onClick={handleForm}
            >
              {t("invoeren")}
            </button>
          </div>
          {!errorMessage && !successMessage ? null : errorMessage ? (
            <div style={{ color: "red", fontWeight: "bold" }}>
              {t(errorMessage)}
            </div>
          ) : (
            <div style={{ color: "#28a745", fontWeight: "bold" }}>
              {t(successMessage)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default KortingcodeForm;
