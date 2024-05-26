import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, theme, Tooltip, Button } from "antd";
import { BsFiletypeJson } from "react-icons/bs";
import { SiJsonwebtokens } from "react-icons/si";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";

const sideNavItems = [
  {
    // label: <Link to="/">JSON Editor</Link>,
    tooltip: 'JSON Editor',
    icon: <BsFiletypeJson />,
    redirectPath: '/'
  },
  {
    // label: <Link to="/decoder">JWT Decoder</Link>,
    tooltip: 'JWT Decoder',
    icon: <SiJsonwebtokens />,
    redirectPath: '/decoder'
  },
  {
    // label: <Link to="/base">Base64 Decoder</Link>,
    tooltip: 'Base64 Decoder',
    icon: React.createElement(UserOutlined),
    redirectPath: '/base'
  },
].map((obj, i) => {
  obj.key = i + 1;
  return obj;
});

function Sidebar() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  let location = useLocation();

  return (
    <div className="sidebar">
      <Layout.Sider
        width={70}
        style={{
          background: colorBgContainer,
        }}
      >
        {sideNavItems.map((obj, i) => (
          <Tooltip title={obj.tooltip} key={obj.key} placement="right">
            <Button
              type={obj.redirectPath == location.pathname ? 'primary' : 'default'}
              shape="circle"
              icon={obj.icon}
              style={{
                margin: "10px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => navigate(obj.redirectPath)}
            />
          </Tooltip>
        ))}
      </Layout.Sider>
    </div>
  );
}

export default Sidebar;
