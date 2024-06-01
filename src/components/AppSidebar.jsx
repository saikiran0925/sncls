import { Button, Layout, Tooltip, theme } from "antd";
import React from "react";
import { BsFiletypeJson } from "react-icons/bs";
import { MdCompare } from "react-icons/md";
import { SiJsonwebtokens } from "react-icons/si";
import { useLocation, useNavigate } from "react-router-dom";

const sideNavItems = [
  {
    // label: <Link to="/">JSON Editor</Link>,
    tooltip: "JSON Editor",
    icon: <BsFiletypeJson />,
    redirectPath: "/",
  },
  {
    // label: <Link to="/decoder">JWT Decoder</Link>,
    tooltip: "Diff Editor",
    icon: <MdCompare />,
    redirectPath: "/diffeditor",
  },
  // {
  //   // label: <Link to="/decoder">JWT Decoder</Link>,
  //   tooltip: "JWT Decoder",
  //   icon: <SiJsonwebtokens />,
  //   redirectPath: "/decoder",
  // },
  // {
  //   // label: <Link to="/base">Base64 Decoder</Link>,
  //   tooltip: 'Base64 Decoder',
  //   icon: React.createElement(UserOutlined),
  //   redirectPath: '/base'
  // },
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
              type={
                obj.redirectPath == location.pathname ? "primary" : "default"
              }
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
