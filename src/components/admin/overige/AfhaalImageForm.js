import React from "react";
import { Form, Button, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import gegevens from "Utilities/gegevens";

const normFile = (e) => {
  console.log("Upload event:", e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

const AfhaalImageForm = (props) => {
  const { overige } = props;
  const { afhaaltext } = overige;
  const onFinish = async (values) => {
    console.log(values);
    values.namespace = gegevens.namespace;
    const { data } = await axios.post(
      `${gegevens.ouheng_url}/api/settings/updateText`,
      values
    );
    window.location.reload();
  };

  return (
    <div>
      <form
        action={gegevens.ouheng_url+"/api/settings/upload"}
        method="POST"
        enctype="multipart/form-data"
      >
        <div>
          <label for="name">Image Title</label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            name="name"
            required
          />
        </div>
        <div>
          <label for="desc">Image Description</label>
          <textarea
            id="desc"
            name="pesc"
            rows="2"
            placeholder="Description"
            required
          ></textarea>
        </div>
        <div>
          <label for="image">Upload Image</label>
          <input type="file" id="image" name="image" required />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AfhaalImageForm;
