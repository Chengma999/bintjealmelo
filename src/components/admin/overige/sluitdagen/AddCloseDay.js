import React, { useState, useEffect } from "react";
import { Modal, Divider, Form, DatePicker, Input, Button, Result } from "antd";
import gegevens from "Utilities/gegevens";
import moment from "moment";
import { layout, tailLayout } from "Utilities/toolStore";
import { PlusCircleOutlined } from "@ant-design/icons";
const { restaurant_id } = gegevens;
const { RangePicker } = DatePicker;
const dateFormat = "DD-MM-YYYY";
export default function Closeday_Form({ addCloseDay, t, CapitalizeFC }) {
  const [showResult, setShowResult] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const afterClose = () => {
    setShowResult(false);
    form.resetFields();
  };
  const onFinish = async (values) => {
    values.restaurant_id = restaurant_id;
    values.begin = values.periode[0];
    values.end = values.periode[1];
    console.log(values);
    await addCloseDay(values).then((res) => {
      console.log(res);
      setShowResult(true);
    });
  };
  return (
    <div style={{ margin: "auto auto", width: "80%" }}>
      <Divider orientation="left">
        {CapitalizeFC(t("extra_closing_days"))}
      </Divider>
      <div style={{ marginBottom: "20px" }}>
        <Button type="primary" size="large" shape="round" onClick={showModal}>
          {CapitalizeFC(t("add_extra_closing_days"))}
          <PlusCircleOutlined
            style={{ fontSize: "18px", color: "white", fontWeight: "800" }}
          />
        </Button>
      </div>

      <Modal
        title="Extra sluitingsdag(en) toevoegen"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose={true}
        afterClose={afterClose}
      >
        <Form {...layout} name="basic" form={form} onFinish={onFinish}>
          <Form.Item
            label="Periode"
            name="periode"
            rules={[
              {
                required: true,
                message: "Kies de dag(en) wanneer je gesloten bent!",
              },
            ]}
          >
            <RangePicker format={dateFormat} />
          </Form.Item>
          <Form.Item
            label="Reden"
            name="reason"
            rules={[
              {
                required: true,
                message: "Vul je reden in.",
              },
            ]}
          >
            <Input placeholder="bijv. vakantie, bruiloft" />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              {t("add")}
            </Button>
          </Form.Item>
        </Form>
        {!showResult ? null : (
          <div style={{ textAlign: "center" }}>
            <Result status="success" title="Add gelukt!" />
          </div>
        )}
      </Modal>
    </div>
  );
}
