import React, { useState } from "react";
import {
  Button,
  Modal,
  Input,
  Form,
  Select,
  InputNumber,
  Divider,
  Checkbox,
  Result,
  Radio,
} from "antd";
import styles from "../admin.less";
import { generateDiscountArr } from "Utilities/toolStore";
import allergies from "Utilities/allergies";
import { btwOptions, CapitalizeFC } from "Utilities/toolStore";
import { IconFont } from "Utilities/toolStore";
import { useTranslation } from "react-i18next";
const BulkOperation = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
    setShowResult(false);
    form.resetFields();
  };

  const {
    addInDb,
    loading,
    categories,
    products,
    options,
    bulkUpdateProducts,
    printgroups,
  } = props;

  return (
    <div style={{ margin: "10px auto 10px auto", textAlign: "center" }}>
      <Button type="danger" onClick={showModal}>
        Bulk Operatie
      </Button>
      <Modal
        className={styles.modalOneButton}
        visible={visible}
        title="Bulk update"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading.effects["admincrud/add"] === true}
            onClick={handleOk}
          >
            Submit
          </Button>,
        ]}
      >
        <BulkOperationForm
          form={form}
          addInDb={addInDb}
          loading={loading}
          options={options}
          categories={categories}
          products={products}
          bulkUpdateProducts={bulkUpdateProducts}
          setShowResult={setShowResult}
          printgroups={printgroups}
        />
        {!showResult ? null : (
          <div style={{ textAlign: "center" }}>
            <Result status="success" title="Update gelukt!" />
          </div>
        )}
      </Modal>
    </div>
  );
};
export default BulkOperation;

const discountArr = generateDiscountArr();

const { Option } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function BulkOperationForm({
  form,
  categories,
  options,
  bulkUpdateProducts,
  setShowResult,
  printgroups,
}) {
  const { t } = useTranslation();
  const [checked, setChecked] = useState(["Categorie"]);
  const [err, setErr] = useState([""]);
  const hasCategorie = checked.includes("Categorie");
  const hasGroep = checked.includes("Groep");
  const hasKorting = checked.includes("Korting");
  const hasExtra = checked.includes("Extra");
  const hasAllergie = checked.includes("Allergie(en)");
  const hasPrintGroep = checked.includes("Print Groep");
  const hasBtw = checked.includes("BTW");
  const rules = {
    beginId: [{ required: true, message: t("bulk_begin_id_message") }],
    endId: [
      { required: true, message: t("bulk_end_id_message") },
      ({ getFieldValue }) => ({
        validator(rule, value) {
          if (getFieldValue("beginId") <= value) {
            return Promise.resolve();
          }
          return Promise.reject(t("bulk_end_id_smaller_than_begin_message"));
        },
      }),
    ],
    categorie: [{ required: true, message: t("bulk_categorie_message") }],
    menukind: [{ required: true, message: t("bulk_menukind_message") }],
    extra: [{ required: true, message: t("bulk_extra_message") }],
    btw: [{ required: true, message: t("bulk_btw_message") }],
    print_group: [{ required: true, message: t("bulk_print_group_message") }],
    allergies: [{ required: true, message: t("bulk_allergies_message") }],
  };
  const plainOptions = [
    { label: CapitalizeFC(t("categories")), value: "Categorie" },
    { label: CapitalizeFC(t("group")), value: "Groep" },
    { label: CapitalizeFC(t("discount")), value: "Korting" },
    { label: "Extra", value: "Extra" },
    { label: CapitalizeFC(t("allergies")), value: "Allergie(en)" },
    { label: CapitalizeFC(t("print_group")), value: "Print Groep" },
    { label: CapitalizeFC(t("vat")), value: "BTW" },
  ];

  const discountOptions = discountArr.map((item, i) => (
    <Option key={i} value={item.value}>
      {item.label}
    </Option>
  ));
  const onFinish = (values) => {
    if (checked.length === 0) {
      setErr("Er is niets gekozen voor het updaten.");
      return;
    }
    setErr("");
    bulkUpdateProducts(values).then((result) => {
      if (result && result.ok === 1) {
        setShowResult(true);
      }
    });
    console.log(values);
  };

  const onChange = (checkedValues) => {
    setChecked(checkedValues);
    if (checkedValues.length > 0 && err !== "") {
      setErr("");
    }
  };
  const categoriesOptions = categories.categories.map((cat) => (
    <Option value={cat.cat_code}>{cat.cat_name}</Option>
  ));
  let menukindOptions = options.map((group) => (
    <Option value={group.title}>{group.title}</Option>
  ));
  menukindOptions.unshift(<Option value="withoutOption">withoutOption</Option>);
  const allergiesnames = Object.keys(allergies);
  let allergyOptions = allergiesnames.map((allergie, i) => {
    return (
      <Option key={i} value={allergie}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>{allergie}</div>
          <div>
            <IconFont type={allergies[allergie]} />
          </div>
        </div>
      </Option>
    );
  });
  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item
        name="beginId"
        label={t("bulk_begin_id")}
        rules={[{ required: true }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="endId"
        label={t("bulk_end_id")}
        rules={[
          { required: true },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (getFieldValue("beginId") <= value) {
                return Promise.resolve();
              }
              return Promise.reject(
                "Eind Id moet groter of gelijk zijn als Begin Id."
              );
            },
          }),
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Divider />
      <div style={{ textAlign: "center" }}>
        <Checkbox.Group
          options={plainOptions}
          value={checked}
          onChange={onChange}
        />
      </div>
      <Divider />
      {!hasCategorie ? null : (
        <Form.Item
          name="categorie"
          label={CapitalizeFC(t("categories"))}
          rules={rules.beginId}
        >
          <Select mode="multiple" allowClear>
            {categoriesOptions}
          </Select>
        </Form.Item>
      )}
      {!hasGroep ? null : (
        <Form.Item
          name="menukind"
          label={CapitalizeFC(t("group"))}
          rules={rules.menukind}
        >
          <Select mode="multiple" allowClear>
            {menukindOptions}
          </Select>
        </Form.Item>
      )}
      {!hasKorting ? null : (
        <Form.Item name="discount" label={CapitalizeFC(t("discount"))}>
          <Select placeholder={t("products_discount_placeholder")}>
            {discountOptions}
          </Select>
        </Form.Item>
      )}
      {!hasExtra ? null : (
        <Form.Item name="extra" label="Extra's" rules={rules.extra}>
          <Radio.Group>
            <Radio value={true}>{t("display")}</Radio>
            <Radio value={false}>{t("not_display")}</Radio>
          </Radio.Group>
        </Form.Item>
      )}
      {!hasAllergie ? null : (
        <Form.Item
          name="allergy"
          label={CapitalizeFC(t("allergies"))}
          rules={rules.allergies}
        >
          <Select
            mode="multiple"
            placeholder={t("products_allergies_placeholder")}
          >
            {allergyOptions}
          </Select>
        </Form.Item>
      )}
      {!hasPrintGroep || printgroups.length === 0 ? null : (
        <Form.Item
          name="printgroup"
          label={CapitalizeFC(t("print_group"))}
          rules={[{ required: true }]}
        >
          <Select placeholder={t("products_printgroup_placeholder")}>
            {["keuken"].concat(printgroups).map((printgr) => {
              return <Option value={printgr}>{printgr}</Option>;
            })}
          </Select>
        </Form.Item>
      )}
      {!hasBtw ? null : (
        <Form.Item
          name="btw"
          label={CapitalizeFC(t("vat"))}
          rules={[{ required: true }]}
        >
          <Select placeholder={t("products_vat_placeholder")}>
            {btwOptions}
          </Select>
        </Form.Item>
      )}

      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.gender !== currentValues.gender
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("gender") === "other" ? (
            <Form.Item
              name="customizeGender"
              label="Customize Gender"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          ) : null
        }
      </Form.Item>
      <Form.Item {...tailLayout}>
        <div className={styles.error}>{err}</div>
        <Button type="primary" htmlType="submit">
          Bulk Update
        </Button>
      </Form.Item>
    </Form>
  );
}
