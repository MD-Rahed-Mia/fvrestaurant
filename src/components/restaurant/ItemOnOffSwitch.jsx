import React from "react";
import { Switch } from "antd";

export default function ItemOnOffSwitch({ status }) {
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <div>
      <Switch
        checked={status === "in stock" ? true : false}
        onChange={onChange}
      />
    </div>
  );
}
