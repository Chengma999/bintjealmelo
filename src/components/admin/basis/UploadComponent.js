import React, { useEffect, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload, Select, Space } from "antd";
import AWS from "aws-sdk";
import axios from "axios";
const { Dragger } = Upload;
const { Option } = Select;

export default function UploadComponent({ username }) {
  //options of antd select picsList
  const props = {
    name: "file",
    multiple: true,
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
    },
    async beforeUpload(file, fileList) {
      const fileName = `${username || ""}_${Date.now()}_${file.name}`;
      const params = {
        Bucket: "hisight-afbeeldingen",
        Key: fileName,
        Body: file,
        ContentType: file.type,
        ACL: "public-read",
      };
      axios.get("/api/basis/aws-afbeeldingen-credentials").then((res) => {
        const { data } = res;
        AWS.config.update({
          accessKeyId: data.accessKeyId,
          secretAccessKey: data.secretAccessKey,
        });
        const s3 = new AWS.S3();
        s3.upload(params, (error, data) => {
          if (error) {
            console.log(error);
            message.error(error.message);
          } else {
            message.success(`${fileName} uploaded successfully.`);
          }
        });
      });
    },
  };
  return (
    <div>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click of draag bestand naar dit gebied voor upload
        </p>
        <p className="ant-upload-hint">
          Support voor een enkel of multi upload.
        </p>
      </Dragger>
    </div>
  );
}
