import React from "react";
import { Form, Select } from "antd";
const { Option } = Select;
function BankIssuersFormItem({
  rules,
  styles,
  radioValue,
  bankIssuers,
  transactiekosten,
  changeFormat,
  onChangeRadioValue,
  payMethod,
  t,
}) {
  return (
    <div>
      {
        // {radioValue === "ideal" ? (
        //   <div className={styles.fieldBankIssuers}>
        //     <Form.Item
        //       name="bankissuers"
        //       label={t("Kies je bank")}
        //       rules={rules.bankissuers}
        //       hasFeedback
        //     >
        //       <Select>
        //         {bankIssuers.map((item, i) => {
        //           return (
        //             <Option key={i} value={item.value}>
        //               <div>
        //                 <div>{item.text}</div>
        //                 <div></div>
        //               </div>
        //             </Option>
        //           );
        //         })}
        //       </Select>
        //     </Form.Item>
        //   </div>
        // ) : null}
      }
      {["bancontact", "ideal", "applepay", "paypal", "creditcard"].includes(
        radioValue
      ) ? (
        <div style={{ paddingBottom: "15px" }}>
          {t("De transactiekosten bedragen", {
            amount: changeFormat(transactiekosten),
            payMethod: radioValue.toUpperCase(),
          })}
        </div>
      ) : null}
    </div>
  );
}
export default BankIssuersFormItem;
