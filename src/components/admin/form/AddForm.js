import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Spin,
  Result,
  Radio,
  Checkbox,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import gegevens from "Utilities/gegevens";
import { btwOptions } from "Utilities/toolStore";
import allergies from "Utilities/allergies";
import {
  IconFont,
  CapitalizeFC,
  generateDiscountArr,
} from "Utilities/toolStore";
const { restaurant_id } = gegevens;
const { Option } = Select;

const antIcon = (
  <LoadingOutlined type="loading" style={{ fontSize: 24 }} spin />
);

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const discountArr = generateDiscountArr();
const AddForm = ({
  options,
  products,
  printgroups,
  categories,
  addInDb,
  loading,
  form,
  showResult,
  setShowResult,
  t,
}) => {
  const [duplicatedId, setDuplicatedId] = useState(false);
  const [usedAtValue, setUsedAtValue] = useState(["afhalen/bezorgen"]);
  const rules = {
    id: [
      {
        required: true,
        message: CapitalizeFC(t("products_rules_id")),
      },
    ],
    title: [
      {
        required: true,
        message: CapitalizeFC(t("products_rules_product_name")),
      },
    ],
    usedAt: [
      {
        required: true,
        message: CapitalizeFC(t("products_rules_used_for")),
      },
      () => ({
        validator(rule, value) {
          console.log(value);
          if (
            !value ||
            value.includes("restaurant") ||
            value.includes("afhalen/bezorgen")
          ) {
            return Promise.resolve();
          }

          return Promise.reject(
            "Een van de 'restaurant' en 'afhalen/bezorgen' moet gekozen worden!"
          );
        },
      }),
    ],
    price: [
      {
        required: true,
        message: CapitalizeFC(t("products_rules_price")),
      },
    ],
    price_r: [
      {
        required: true,
        message: CapitalizeFC(t("products_rules_restaurant_price")),
      },
    ],
    price_ayce: [
      {
        required: true,
        message: t("product_ayce_message"),
      },
    ],
    price_half: [
      {
        required: true,
        message: t("product_price_half_message"),
      },
    ],

    chi_cha: [
      {
        message: CapitalizeFC(t("products_rules_chi_cha")),
      },
    ],

    discription: [
      {
        message: CapitalizeFC(t("products_rules_description")),
      },
    ],
    img_url: [
      {
        message: CapitalizeFC(t("products_rules_image_url")),
      },
    ],
    extra: [{ required: false, message: "Vul extra in!" }],
    menukind: [
      {
        required: true,
        message: CapitalizeFC(t("products_rules_group")),
      },
    ],
    printgroup: [
      {
        required: false,
        message: CapitalizeFC(t("products_rules_print_group")),
      },
    ],
    categorie: [
      {
        required: true,
        message: CapitalizeFC(t("products_rules_categories")),
      },
    ],
    allergy: [
      {
        required: false,
        message: CapitalizeFC(t("products_rules_allergies")),
      },
    ],

    btw: [
      {
        required: false,
        message: CapitalizeFC(t("products_rules_btw")),
      },
    ],
    outofstock: [
      {
        required: false,
        message: CapitalizeFC(t("products_rules_out_of_stock")),
      },
    ],
  };
  const plainOptions = [
    { label: t("takeaway_and_pickup"), value: "afhalen/bezorgen" },
    { label: t("Restaurant"), value: "restaurant" },
    { label: "all you can eat", value: "all you can eat" },
    { label: t("takeaway_half_portion"), value: "afhalen/halfportie" },
  ];
  const reset = () => {
    form.resetFields();
    setShowResult(false);
  };
  const handleChange = (usedAtValue) => {
    setUsedAtValue(usedAtValue);
  };
  const handleSubmit = (values) => {
    // values.price = Number(values.price);
    values.restaurant_id = restaurant_id;
    const foundIndex = products.products.findIndex(
      (product) => product.id === values.id
    );
    if (foundIndex === -1) {
      if (duplicatedId) {
        setDuplicatedId(false);
      }
      addInDb(values);
      setShowResult(true);
    }
    if (foundIndex > -1) {
      if (!duplicatedId) {
        setDuplicatedId(true);
      }
    }
  };
  const initialId =
    products.products.length > 0
      ? Math.max(...products.products.map((product) => product.id)) + 1
      : 1;
  let optionsArr = (arr) => {
    if (Array.isArray(arr)) {
      const newarr = [...arr];
      newarr.unshift({ title: "withoutOption" });
      return newarr;
    }
    if (!Array.isArray(arr)) {
      const newarr = [];
      newarr.unshift({ title: "withoutOption" });
      return newarr;
    }
  };
  optionsArr = optionsArr(options).map((item, i) => (
    <option key={i} value={item.title}>
      {item.title}
    </option>
  ));
  const discountOptions = discountArr.map((item, i) => (
    <Option key={i} value={item.value}>
      {item.label}
    </Option>
  ));
  let catOptions =
    Array.isArray(categories.categories) !== true
      ? []
      : categories.categories.map((cat, i) => {
          return (
            <Option key={i} value={cat.cat_code}>
              {cat.cat_name}
            </Option>
          );
        });
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
    <Form
      {...formItemLayout}
      form={form}
      initialValues={{
        menukind: [],
        categorie: [],
        id: initialId,
        extra: false,
        outofstock: false,
        usedAt: ["afhalen/bezorgen"],
      }}
      onFinish={handleSubmit}
    >
      <Form.Item
        name="id"
        label={CapitalizeFC(t("product_id"))}
        rules={rules.id}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="title"
        label={CapitalizeFC(t("product_name"))}
        rules={rules.title}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="usedAt"
        label={CapitalizeFC(t("used_for"))}
        rules={rules.usedAt}
      >
        <Checkbox.Group options={plainOptions} onChange={handleChange} />
      </Form.Item>
      {!usedAtValue.includes("afhalen/bezorgen") ? null : (
        <Form.Item
          name="price"
          label={CapitalizeFC(t("price"))}
          rules={rules.price}
        >
          <InputNumber step="0.05" />
        </Form.Item>
      )}
      {!usedAtValue.includes("restaurant") ? null : (
        <Form.Item
          name="price_r"
          label={CapitalizeFC(t("restaurant_price"))}
          rules={rules.price_r}
        >
          <InputNumber step="0.05" />
        </Form.Item>
      )}
      {!usedAtValue.includes("all you can eat") ? null : (
        <Form.Item
          name="price_ayce"
          label={t("ayce_price")}
          rules={rules.price_ayce}
        >
          <InputNumber step="0.05" />
        </Form.Item>
      )}
      {!usedAtValue.includes("afhalen/halfportie") ? null : (
        <Form.Item
          name="price_half"
          label={t("half_portion_price")}
          rules={rules.price_half}
        >
          <InputNumber step="0.05" />
        </Form.Item>
      )}

      <Form.Item name="chi_cha" label={t("chi_cha")} rules={rules.chi_cha}>
        <Input />
      </Form.Item>
      <Form.Item
        name="discription"
        label={CapitalizeFC(t("description"))}
        rules={rules.discription}
      >
        <Input />
      </Form.Item>
      <Form.Item name="img_url" label="Image URL" rules={rules.img_url}>
        <Input />
      </Form.Item>
      <Form.Item name="extra" label="Extra's" rules={rules.extra}>
        <Radio.Group>
          <Radio value={true}>{CapitalizeFC(t("display"))}</Radio>
          <Radio value={false}>{CapitalizeFC(t("not_display"))}</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="discount" label={CapitalizeFC(t("discount"))}>
        <Select placeholder="Selecteer een optie">{discountOptions}</Select>
      </Form.Item>
      <Form.Item
        name="menukind"
        label={CapitalizeFC(t("group"))}
        rules={rules.menukind}
      >
        <Select mode="multiple" placeholder={t("products_group_placeholder")}>
          {optionsArr}
        </Select>
      </Form.Item>
      {printgroups.length === 0 ? null : (
        <Form.Item
          name="printgroup"
          label={CapitalizeFC(t("print_group"))}
          rules={rules.printgroup}
        >
          <Select placeholder="Selecteer een printgroep">
            {["keuken"].concat(printgroups).map((printgr) => {
              return <Option value={printgr}>{printgr}</Option>;
            })}
          </Select>
        </Form.Item>
      )}
      <Form.Item
        name="categorie"
        label={CapitalizeFC(t("categories"))}
        rules={rules.categorie}
      >
        <Select
          mode="multiple"
          placeholder={t("products_categorie_placeholder")}
        >
          {catOptions}
        </Select>
      </Form.Item>
      <Form.Item
        name="allergy"
        label={CapitalizeFC(t("allergies"))}
        rules={rules.allergy}
      >
        <Select
          mode="multiple"
          placeholder={t("products_allergies_placeholder")}
        >
          {allergyOptions}
        </Select>
      </Form.Item>
      <Form.Item name="btw" label={CapitalizeFC(t("vat"))} rules={rules.btw}>
        <Select placeholder={t("products_vat_placeholder")}>
          {btwOptions}
        </Select>
      </Form.Item>
      <Form.Item
        name="outofstock"
        label={CapitalizeFC(t("sold_out"))}
        rules={rules.outofstock}
      >
        <Radio.Group>
          <Radio value={true}>{CapitalizeFC(t("yes"))}</Radio>
          <Radio value={false}>{CapitalizeFC(t("no"))}</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          {CapitalizeFC(t("add"))}
        </Button>
      </Form.Item>
      {duplicatedId ? (
        <div>
          <Result
            status="error"
            title={t("add_result_failed_duplicated_product_id")}
          />
        </div>
      ) : loading.effects["products/addProduct"] === true ? (
        <Spin indicator={antIcon} />
      ) : !showResult ? (
        ""
      ) : products.succeedId === parseFloat(form.getFieldValue("id")) &&
        showResult ? (
        <div style={{ textAlign: "center" }}>
          <Result status="success" title={t("add_result_succeed")} />
          <Button onClick={reset}> Naar de volgende </Button>
        </div>
      ) : (
        <div>
          <Result
            status="error"
            title={t("add_result_failed")}
            subTitle={t("add_result_failed_subtitle")}
          />
        </div>
      )}
    </Form>
  );
};

export default AddForm;
