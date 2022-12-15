import React from "react";
import PropTypes from "prop-types";
import AdminPage from "../components/admin/AdminPage";
import { useTranslation } from "react-i18next";
const propTypes = {};

function Admin(props) {
  const { t } = useTranslation();
  return (
    <div>
      <AdminPage {...props} t={t} />
    </div>
  );
}

Admin.propTypes = propTypes;

export default Admin;
