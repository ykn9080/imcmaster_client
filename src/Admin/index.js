import React from "react";
import BootFormDisplay from "components/Common/BootFormDisplay";
import ElementList from "Admin/ElementList";

const formArray1 = [
  {
    controlId: "formEmail",
    labelText: "Email",
    name: "email",
    controlType: "email",
    placeholder: "test placeholder",
    formText: "We'll never share your email with anyone else."
  }
];
const Admin = () => {
  const pathname = encodeURIComponent(window.location.pathname);

  return <ElementList eltype={["password", "email"]} />;
};

export default Admin;
