import React, { useState } from "react";
import styles from "../../../admin/admin.less";
import locale from "Utilities/locale";
import {
  CapitalizeFC,
  generateDiscountArr,
  discountTimesArr,
} from "Utilities/toolStore";
import { changeFormat } from "Utilities/gegevens";
import moment from "moment";
import {
  Table,
  Input,
  Popconfirm,
  Form,
  Button,
  Select,
  DatePicker,
} from "antd";
const { Option } = Select;
// let discountArr = [];
// for (var i = 0; i < 20; i++) {
//   const discount = {};
//   discount.value = Number((0.05 * i).toFixed(2));
//   discount.label = Number((discount.value * 100).toFixed(2)) + "%";
//   discountArr.push({ ...discount });
// }
const discountTimesOptions = discountTimesArr().map((item, i) => (
  <Option key={i} value={item.value}>
    {item.label}
  </Option>
));
const discountOptions = generateDiscountArr().map((item, i) => (
  <Option key={i} value={item.value}>
    {item.label}
  </Option>
));
const disabledDate = (current) => {
  return current && current < moment().startOf("day");
};
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode =
    inputType === "datepicker" ? (
      <DatePicker
        locale={locale}
        style={{ width: "100%" }}
        disabledDate={disabledDate}
      />
    ) : inputType === "select" ? (
      <Select style={{ width: "120px" }}>{discountOptions}</Select>
    ) : inputType === "selectTimes" ? (
      <Select style={{ width: "120px" }}>{discountTimesOptions}</Select>
    ) : (
      <Input />
    );
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const DiscountcodeTable = (props) => {
  const { discountcode, updateDiscountcode, deleteDiscountcode, t } = props;
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.discountcode === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      discountcode: "",
      discount: 0,
      ...record,
      validTo: !record.validTo
        ? moment()
        : moment(record.validTo, "YYYY-MM-DD"),
    });
    setEditingKey(record.discountcode);
  };

  const cancel = () => {
    setEditingKey("");
  };
  const deleteItem = async (record) => {
    try {
      deleteDiscountcode({
        discountcode: record.discountcode,
      }).then(() => setEditingKey(""));
    } catch (errInfo) {
      console.log("Delete Failed:", errInfo);
    }
  };

  const save = async (old_discountcode, discount, validTo) => {
    try {
      let row = await form.validateFields();
      console.log(form.getFieldsValue());
      let { discount, validTo, times } = row;
      console.log(row, typeof row.discount);
      if (typeof discount === "string") {
        row.discount = parseFloat(row.discount) / 100;
      }
      if (typeof validTo === "string") {
        row.validTo = moment(row.validTo, "YYYY-MM-DD");
      }
      if (typeof times === "string") {
        row.times = 999999;
      }
      updateDiscountcode({
        old_discountcode,
        ...row,
      }).then(() => setEditingKey(""));
    } catch (errInfo) {
      console.log("Update Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: CapitalizeFC(t("discountcode")),
      dataIndex: "discountcode",
      width: "15%",
      editable: true,
    },
    {
      title: CapitalizeFC(t("discount")),
      dataIndex: "discount",
      width: "15%",
      editable: true,
    },
    {
      title: CapitalizeFC(t("valid_to")),
      dataIndex: "validTo",
      width: "15%",
      editable: true,
    },
    {
      title: CapitalizeFC(t("times")),
      dataIndex: "times",
      width: "15%",
      editable: true,
    },
    {
      title: CapitalizeFC(t("operation")),
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              style={{
                marginRight: "5px",
                marginBottom: "5px",
                color: "white",
                background: "#268540",
              }}
              onClick={() =>
                save(record.discountcode, record.discount, record.validTo)
              }
            >
              Save
            </Button>
            <Button
              style={{
                marginRight: "5px",
                marginBottom: "5px",
                color: "white",
                background: "#ec3ff2",
              }}
              onClick={cancel}
            >
              Cancel
            </Button>
          </span>
        ) : (
          <span>
            <Button
              style={{ background: "#1613d1", color: "white" }}
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Edit
            </Button>
            <Popconfirm
              title={t("sure_to_delete")}
              onConfirm={() => deleteItem(record)}
            >
              <Button
                style={{ background: "#c90414", color: "white" }}
                disabled={editingKey !== ""}
              >
                Delete
              </Button>
            </Popconfirm>
          </span>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType:
          col.dataIndex === "discount"
            ? "select"
            : col.dataIndex === "validTo"
            ? "datepicker"
            : col.dataIndex === "times"
            ? "selectTimes"
            : "input",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <div className={styles.table}>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={discountcode.map((ele, i) => ({
            key: i,
            ...ele,
            discount:
              ele.discount < 1
                ? (ele.discount * 100).toString() + "%"
                : changeFormat(ele.discount),
            // validTo: new Date(ele.validTo).toLocaleDateString("nl-NL", options),
            validTo: moment(ele.validTo).format("YYYY-MM-DD"),
            times: ele.times > 999 ? "onbeperkt" : ele.times,
          }))}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </div>
  );
};

export default DiscountcodeTable;
