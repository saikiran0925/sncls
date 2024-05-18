import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, theme } from "antd";
import { BsFiletypeJson } from "react-icons/bs";
import { SiJsonwebtokens } from "react-icons/si";

import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";

const sideNavItems = [
  {
    label: <Link to="/">JSON Editor</Link>,
    // label: 'JSON Editor',
    icon: <BsFiletypeJson />,
  },
  {
    label: <Link to="/decoder">JWT Decoder</Link>,
    // label: 'JWT Decoder',
    icon: <SiJsonwebtokens />,
  },
  {
    label: <Link to="/base">Base64 Decoder</Link>,
    icon: React.createElement(UserOutlined),
  },
].map((obj, i) => {
  obj.key = i + 1;
  return obj;
});

function Sidebar() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div className="sidebar">
      <Layout.Sider
        width={200}
        style={{
          background: colorBgContainer,
        }}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{
            height: "100%",
            borderRight: 0,
          }}
          items={sideNavItems}
        />
      </Layout.Sider>
    </div>
  );
}

export default Sidebar;
