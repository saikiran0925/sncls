import React from 'react';
import { Layout, Menu, theme } from 'antd';

const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

function AppHeader() {
  return (
    <header>
      <Layout>
        <Layout.Header
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            items={items1}
            style={{
              flex: 1,
              minWidth: 0,
            }}
          />
        </Layout.Header>
      </Layout>
    </header>
  );
}

export default AppHeader;
