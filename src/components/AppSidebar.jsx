import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, theme } from 'antd';

import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';

const sideNavItems = [
  {
    label: <Link to="/">JSON Editor</Link>,
    // label: 'JSON Editor',
    icon: React.createElement(LaptopOutlined),
  },
  {
    label: <Link to="/decoder">JWT Decoder</Link>,
    // label: 'JWT Decoder',
    icon: React.createElement(NotificationOutlined),
  },
  {
    label: <Link to="/base">Bas6e4 Decoder</Link>,
    icon: React.createElement(UserOutlined),
  },
].map((obj, i) => { obj.key = i + 1; return obj; });


const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,
  };
});

function Sidebar() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <div className="sidebar">
      <Layout>
        <Layout.Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{
              height: '100%',
              borderRight: 0,
            }}
            items={sideNavItems}
          />
        </Layout.Sider>
      </Layout>

    </div>
  );
}

export default Sidebar;