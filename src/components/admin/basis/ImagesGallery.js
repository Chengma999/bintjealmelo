import React from "react";
import { Card, Row, Col, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { removeFileExtension } from "Utilities/toolStore";
import axios from "axios";
export default function ImagesGallery({ pictures, deletePicture }) {
  const handleOnConfirm = (pic) => {
    console.log(pic);
    axios.post("/api/basis/deleteImage", { Key: pic.Key }).then((res) => {
      if (res.status === 200) {
        message.success("Afbeelding verwijderd");
        deletePicture(pic.Key);
      }
    });
  };
  const handleOncancel = (e) => {
    console.log("niet verwijderen");
  };
  const displayImages = pictures.map((pic, index) => {
    return (
      <Col
        xs={24}
        sm={12}
        md={8}
        lg={6}
        xl={4}
        key={index}
        style={{ columnGap: "6px" }}
      >
        <Card
          key={index}
          hoverable
          style={{ width: 240 }}
          cover={
            <div>
              <img
                width={240}
                alt="example"
                src={
                  "https://hisight-afbeeldingen.s3.eu-central-1.amazonaws.com/" +
                  pic.Key
                }
              />
              <div style={{ wordBreak: "break-all" }}>
                {removeFileExtension(pic.Key)}
              </div>
            </div>
          }
          actions={[
            <Popconfirm
              title="Wil je deze afbeelding verwijderen?"
              description="Deze actie kan niet ongedaan worden gemaakt."
              okText="Ja"
              cancelText="Nee"
              onConfirm={() => handleOnConfirm(pic)}
              onCancel={handleOncancel}
            >
              <DeleteOutlined key="delete" />
            </Popconfirm>,
          ]}
        />
      </Col>
    );
  });
  return (
    <div>
      <Row gutter={16} style={{ rowGap: "14px", columnGap: "28px" }}>
        {displayImages}
      </Row>
    </div>
  );
}
