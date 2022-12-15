import React, { useState } from "react";
import styles from "../../../admin/admin.less";
import { Table, Input, Select, Popconfirm, Form, Button, Tag } from "antd";
import { useTranslation } from "react-i18next";
const { Option } = Select;

const MainCategoriesTable = (props) => {
  const {
    categories,
    mainCategories,
    updateMainCategorie,
    deleteMainCategorie,
  } = props;
  const { t } = useTranslation();
  const plainOptions = [
    { value: "afhalen/bezorgen", label: t("takeaway_and_pickup") },
    { value: "restaurant", label: t("Restaurant") },
  ];
  const usedAtOptions = plainOptions.map((opt) => (
    <Option value={opt.value}>{opt.label}</Option>
  ));
  const containsCategoriesOptions = categories.map((cat) => (
    <Option value={cat.cat_code}>{cat.cat_name}</Option>
  ));
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
      inputType === "select" && dataIndex === "usedAt" ? (
        <Select mode="multiple" style={{ width: 200 }}>
          {usedAtOptions}
        </Select>
      ) : inputType === "select" && dataIndex === "containsCategories" ? (
        <Select mode="multiple" style={{ width: 200 }}>
          {containsCategoriesOptions}
        </Select>
      ) : inputType === "text" ? (
        <Input />
      ) : (
        <Input />
      );
    return (
      <td {...restProps}>
        {editing ? (
          dataIndex !== "image_link" ? (
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
            <Form.Item
              name={dataIndex}
              style={{
                margin: 0,
              }}
              rules={[
                {
                  message: `Please Input ${title}!`,
                },
              ]}
            >
              {inputNode}
            </Form.Item>
          )
        ) : (
          children
        )}
      </td>
    );
  };

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.maincategoriename === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      maincategoriename: "",
      usedAt: "",
      containsCategories: "",
      image_link: "",
      ...record,
    });
    setEditingKey(record.maincategoriename);
  };

  const cancel = () => {
    setEditingKey("");
  };
  const deleteItem = async (record) => {
    try {
      deleteMainCategorie({
        maincategoriename: record.maincategoriename,
      }).then(() => setEditingKey(""));
    } catch (errInfo) {
      console.log("Delete Failed:", errInfo);
    }
  };

  const save = async (oldMaincategoriename) => {
    try {
      const row = await form.validateFields();
      const { maincategoriename, usedAt, containsCategories, image_link } = row;

      updateMainCategorie({
        oldMaincategoriename,
        maincategoriename,
        usedAt,
        containsCategories,
        image_link,
      }).then(() => setEditingKey(""));
    } catch (errInfo) {
      console.log("Update Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: t("main_categorie_name"),
      dataIndex: "maincategoriename",
      width: "25%",
      editable: true,
    },
    {
      title: t("used_for"),
      dataIndex: "usedAt",
      width: "25%",
      editable: true,
      render: (usedAts) => (
        <div>
          {usedAts.map((usedAt) => {
            return (
              <Tag color="green" key={usedAt}>
                {usedAt.toUpperCase()}
              </Tag>
            );
          })}
        </div>
      ),
    },
    {
      title: t("contains_categories"),
      dataIndex: "containsCategories",
      width: "15%",
      editable: true,
      render: (containsCats) => (
        <div>
          {containsCats.map((containsCat) => {
            const foundCat = categories.find(
              (cat) => cat.cat_code === containsCat
            );
            const catName =
              foundCat &&
              categories.find((cat) => cat.cat_code === containsCat).cat_name;
            return !catName ? null : (
              <Tag color="geekblue" key={catName}>
                {catName.toUpperCase()}
              </Tag>
            );
          })}
        </div>
      ),
    },
    {
      title: t("image_url"),
      dataIndex: "image_link",
      width: "15%",
      editable: true,
    },
    {
      title: "Operatie",
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
                save(
                  record.maincategoriename,
                  record.usedAt,
                  record.containsCategories,
                  record.image_link
                )
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
        inputType: ["containsCategories", "usedAt"].includes(col.dataIndex)
          ? "select"
          : "text",
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
          dataSource={mainCategories.map((ele, i) => ({
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

export default MainCategoriesTable;
