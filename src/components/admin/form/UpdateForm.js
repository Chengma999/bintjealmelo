import React, { useState, useEffect } from "react";
import Groepdnd from "./Groepdnd";
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
import { useTranslation } from "react-i18next";
import { LoadingOutlined, SettingOutlined } from "@ant-design/icons";
import gegevens from "Utilities/gegevens";
import {
  btwOptions,
  CapitalizeFC,
  generateDiscountArr,
} from "Utilities/toolStore";
import allergies from "Utilities/allergies";
import { IconFont } from "Utilities/toolStore";
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

const UpdateForm = ({
  item,
  options,
  products,
  categories,
  updateInDb,
  deleteInDb,
  printgroups,
  loading,
  showGroepdnd,
  setShowGroepdnd,
}) => {
  const [duplicatedId, setDuplicatedId] = useState(false);
  const [errText, setErrText] = useState("");
  const [usedAtValue, setUsedAtValue] = useState("afhalen/bezorgen");
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const discountArr = generateDiscountArr(item.price);
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
    onlyselfvisible: [
      { required: true, message: "Vul het restaurantprijs voor in!" },
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
  const onFinish = (values) => {
    // values.price = Number(values.price);
    values.oldId = item.id;
    values._id = item._id;
    values.restaurant_id = restaurant_id;
    console.log("Received values of form: ", values);
    updateInDb(values).then((res) => {
      if (res.err) {
        setDuplicatedId(true);
        setErrText(res.err);
        return;
      } else {
        setDuplicatedId(false);
        setErrText("");
      }
    });
  };
  const onChange = (value) => {
    console.log(value);
  };
  const handleChange = (usedAtValue) => {
    setUsedAtValue(usedAtValue);
  };
  const onDelete = (e) => {
    const { id, categorie } = item;

    e.preventDefault();
    deleteInDb({ id, categorie, restaurant_id });
  };
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
      : categories.categories.map((cat) => {
          return <Option value={cat.cat_code}>{cat.cat_name}</Option>;
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
  useEffect(() => {
    console.log(item);
    if (JSON.stringify(item) !== "{}") {
      form.resetFields();
      form.setFieldsValue({
        chi_cha: undefined,
        discription: undefined,
        img_url: undefined,
        extra: undefined,
        discount: undefined,
        outofstock: undefined,
        ...item,
        usedAt: item.usedAt.length === 0 ? ["afhalen/bezorgen"] : item.usedAt,
        btw: !item.btw ? 0.09 : item.btw,
      });
      setUsedAtValue(
        item.usedAt.length === 0 ? ["afhalen/bezorgen"] : item.usedAt
      );
    }
  }, [item.id]);
  return showGroepdnd ? (
    <Groepdnd
      setShowGroepdnd={setShowGroepdnd}
      item={item}
      restaurant_id={restaurant_id}
      updateInDb={updateInDb}
    />
  ) : (
    <Form form={form} {...formItemLayout} onFinish={onFinish}>
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
        rules={[
          {
            required: true,
            message: "Kies je hier minimaal een keuze!",
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
        ]}
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
      <Form.Item
        name="img_url"
        label={CapitalizeFC(t("image_url"))}
        rules={rules.img_url}
      >
        <Input />
      </Form.Item>
      <Form.Item name="extra" label="Extra's" rules={rules.extra}>
        <Radio.Group>
          <Radio value={true}>{CapitalizeFC(t("display"))}</Radio>
          <Radio value={false}>{CapitalizeFC(t("not_display"))}</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="discount" label={CapitalizeFC(t("discount"))}>
        <Select placeholder={t("products_discount_placeholder")}>
          {discountOptions}
        </Select>
      </Form.Item>
      <div id="update_groep">
        <Form.Item
          name="menukind"
          label={CapitalizeFC(t("group"))}
          rules={rules.menukind}
        >
          <Select mode="multiple" onChange={onChange}>
            {optionsArr}
          </Select>
        </Form.Item>
        {Array.isArray(item.menukind) && item.menukind.length > 1 ? (
          <div className="groepButton">
            <SettingOutlined
              style={{ fontSize: "1.6em", cursor: "pointer" }}
              onClick={() => setShowGroepdnd(true)}
            />
          </div>
        ) : null}
      </div>
      {printgroups.length === 0 ? null : (
        <Form.Item
          name="printgroup"
          label={CapitalizeFC(t("print_group"))}
          rules={rules.printgroup}
        >
          <Select placeholder={t("products_printgroup_placeholder")}>
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
        <Select mode="multiple" value={item.categorie}>
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
        <Select placeholder="Selecteer BTW">{btwOptions}</Select>
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
          Update
        </Button>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="danger" htmlType="button" onClick={onDelete}>
          Delete Item
        </Button>
      </Form.Item>
      {duplicatedId ? (
        <div>
          <Result status="error" title={errText} />
        </div>
      ) : loading.effects["products/updateProduct"] === true ||
        loading.effects["products/deleteProduct"] === true ? (
        <Spin indicator={antIcon} />
      ) : products.deleteSucceed ? (
        <div>
          <Result status="success" title={t("products_delete_succeed")} />
        </div>
      ) : products.updateSucceed ? (
        <div>
          <Result status="success" title={t("products_update_succeed")} />
        </div>
      ) : (
        ""
      )}
    </Form>
  );
};

export default UpdateForm;
