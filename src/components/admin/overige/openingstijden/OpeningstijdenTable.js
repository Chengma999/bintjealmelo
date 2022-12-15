import React, { useState } from "react";
import styles from "../../../admin/admin.less";
import { timeFormat, timeToNumber } from "Utilities/toolStore";
import {
  Table,
  Input,
  InputNumber,
  Select,
  Popconfirm,
  Form,
  Button,
} from "antd";
import moment from "moment";
// import { days } from "../../../checkout/form/options/timeOptions";
import { days } from "Utilities/toolStore";
const { Option } = Select;
const arr = [];
const a = 8;
const n = 23.75;
const index = (n - a) / 0.25;
for (let i = 0; i < index + 1; i++) {
  arr.push(a + i * 0.25);
}

const BezorggebiedTable = ({
  openingstijden,
  updateOpeningstijden,
  deleteOpeningstijden,
  CapitalizeFC,
  t,
}) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record._id === editingKey;
  const optionsDay = days.map(({ value, label }, i) => {
    return (
      <Option key={i} value={t(label)}>
        {t(label)}{" "}
      </Option>
    );
  });
  const optionsTime = arr.map((time) => {
    const label = moment(
      (Math.floor(time) * 100 + (time - Math.floor(time)) * 60).toString(),
      "hmm"
    ).format("HH:mm");
    return <Option value={label}>{label}</Option>;
  });
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
      ) : inputType === "selectday" ? (
        <Select style={{ width: 90 }}>{optionsDay}</Select>
      ) : inputType === "selecttime" ? (
        <Select style={{ width: 90 }}>{optionsTime}</Select>
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

  const edit = (record) => {
    form.setFieldsValue({
      day: "",
      begin: "",
      end: "",
      ...record,
    });
    setEditingKey(record._id);
  };

  const cancel = () => {
    setEditingKey("");
  };
  const deleteItem = async (record) => {
    try {
      deleteOpeningstijden({
        openingstijden_id: record._id,
      }).then(() => setEditingKey(""));
    } catch (errInfo) {
      console.log("Delete Failed:", errInfo);
    }
  };

  const save = async (_id, begin, cat_number) => {
    try {
      const row = await form.validateFields();
      const indexDay = days.findIndex((day) => t(day.label) === row.day);
      updateOpeningstijden({
        openingstijden_id: _id,
        day: days[indexDay].value,
        begin: timeToNumber(row.begin),
        end: timeToNumber(row.end),
      }).then(() => setEditingKey(""));
    } catch (errInfo) {
      console.log("Update Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: CapitalizeFC(t("day")),
      dataIndex: "day",
      width: "25%",
      editable: true,
    },
    {
      title: CapitalizeFC(t("begintime")),
      dataIndex: "begin",
      width: "25%",
      editable: true,
    },
    {
      title: CapitalizeFC(t("endtime")),
      dataIndex: "end",
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
              onClick={() => save(record._id, record.begin, record.end)}
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
              title="Zeker weten om te verwijderen?"
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
        inputType: col.dataIndex === "day" ? "selectday" : "selecttime",
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
          dataSource={openingstijden
            .map((ele, i) => {
              const indexDay = days.findIndex((day) => day.value === ele.day);
              return {
                key: indexDay + 0.1 * ele.begin,
                ...ele,
                day: t(days[indexDay].label),
                begin: timeFormat(ele.begin),
                end: timeFormat(ele.end),
              };
            })
            .sort((a, b) => a.key - b.key)}
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
