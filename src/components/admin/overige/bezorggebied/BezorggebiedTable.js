import React, { useState } from "react";
import styles from "../../../admin/admin.less";
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Button,
  Tag,
  Select,
} from "antd";
import { CapitalizeFC } from "Utilities/toolStore";
const { Option } = Select;

const BezorggebiedTable = (props) => {
  const { bezorggebied, updateBezorggebied, deleteBezorggebied, t } = props;
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.postcode === editingKey;
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
      inputType === "number" ? (
        <InputNumber />
      ) : inputType === "text" ? (
        <Input />
      ) : (
        <Select style={{ width: "120px" }}>
          <Option value={true}> {CapitalizeFC(t("on"))}</Option>
          <Option value={false}> {CapitalizeFC(t("off"))}</Option>
        </Select>
      );
    return (
      <td {...restProps} key={index}>
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

  const edit = (record) => {
    form.setFieldsValue({
      postcode: "",
      fee: "",
      min_value: "",
      freeAt: 1000,
      ...record,
    });
    setEditingKey(record.postcode);
  };

  const cancel = () => {
    setEditingKey("");
  };
  const deleteItem = async (record) => {
    try {
      deleteBezorggebied({
        postcode: record.postcode,
      }).then(() => setEditingKey(""));
    } catch (errInfo) {
      console.log("Delete Failed:", errInfo);
    }
  };

  const save = async (old_postcode, fee, cat_number) => {
    try {
      let row = await form.validateFields();
      let { isEnabled } = row;
      if (typeof isEnabled !== "boolean") {
        if (isEnabled === "Aan") {
          row.isEnabled = true;
        }
        if (isEnabled === "Uit") {
          row.isEnabled = false;
        }
      }
      updateBezorggebied({
        old_postcode,
        ...row,
      }).then(() => setEditingKey(""));
    } catch (errInfo) {
      console.log("Update Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: CapitalizeFC(t("postalcode")),
      dataIndex: "postcode",
      width: "15%",
      editable: true,
    },
    {
      title: CapitalizeFC(t("Bezorgkosten")),
      dataIndex: "fee",
      width: "15%",
      editable: true,
    },
    {
      title: CapitalizeFC(t("min_order_value")),
      dataIndex: "min_value",
      width: "15%",
      editable: true,
    },
    {
      title: CapitalizeFC(t("free_delivery_from")),
      dataIndex: "freeAt",
      width: "15%",
      editable: true,
    },
    {
      title: CapitalizeFC(t("delivery_status")),
      dataIndex: "isEnabled",
      width: "15%",
      editable: true,
      render: function IsEnabled(isEnabled) {
        return [true, "Aan", undefined].includes(isEnabled) ? (
          <Tag color="geekblue">{t("on").toUpperCase()}</Tag>
        ) : (
          <Tag color="red">{t("off").toUpperCase()}</Tag>
        );
      },
    },
    {
      title: "operation",
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
                save(record.postcode, record.fee, record.min_value)
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
        inputType: col.dataIndex === "isEnabled" ? "select" : "number",
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
          dataSource={bezorggebied.map((ele, i) => ({
            key: i,
            ...ele,
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

export default BezorggebiedTable;
