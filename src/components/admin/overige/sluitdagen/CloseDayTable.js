import React, { useState } from "react";
import styles from "../../../admin/admin.less";
import moment from "moment";
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  DatePicker,
  Form,
  Button,
} from "antd";
const { RangePicker } = DatePicker;
const dateFormat = "DD-MM-YYYY";
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
    ) : inputType === "rangepicker" ? (
      <RangePicker format={dateFormat} />
    ) : inputType === "text" ? (
      <Input />
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

const CloseDayTable = ({ updateCloseDay, deleteCloseDay, _closeday }) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record._id === editingKey;

  const edit = (record) => {
    // console.log(record);
    form.setFieldsValue({
      begin: "",
      end: "",
      reason: "",
      ...record,
    });
    setEditingKey(record._id);
  };

  const cancel = () => {
    setEditingKey("");
  };
  const deleteItem = async (record) => {
    try {
      deleteCloseDay({
        closeday_id: record._id,
      }).then(() => setEditingKey(""));
    } catch (errInfo) {
      console.log("Delete Failed:", errInfo);
    }
  };
  const save = async (_id) => {
    try {
      const row = await form.validateFields();
      console.log(_id, row.reason);
      updateCloseDay({
        closeday_id: _id,
        ...row,
      }).then(() => setEditingKey(""));
    } catch (errInfo) {
      console.log("Update Failed:", errInfo);
    }
  };
  const columns = [
    {
      title: "Begin ",
      dataIndex: "begin",
      width: "25%",
      editable: false,
    },
    {
      title: "Einde",
      dataIndex: "end",
      width: "25%",
      editable: false,
    },
    {
      title: "Reden",
      dataIndex: "reason",
      width: "25%",
      editable: true,
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
              onClick={() => save(record._id)}
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
        inputType: "text",
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
          dataSource={_closeday.map((ele, i) => ({
            key: i,
            ...ele,
            begin: moment(ele.begin).format("DD-MMMM-YYYY"),
            end: moment(ele.end).format("DD-MMMM-YYYY"),
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

export default CloseDayTable;
