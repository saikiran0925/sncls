import React from 'react';
import TabsComponent from '../components/TabsComponent';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';

const pageOptions = [
    {
        label: '',
        icon: React.createElement(LaptopOutlined),
    },
    {
        label: '',
        icon: React.createElement(NotificationOutlined),
    },
    {
        label: '',
        icon: React.createElement(UserOutlined),
    },
].map((obj, i) => { obj.key = i + 1; return obj; });

function Formatter() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <div className='content-container'>
            <aside>
                <Layout.Sider
                    width={80}
                    style={{
                        background: colorBgContainer,
                        borderRight: '2px solid #f4f1f1',
                        height: '100%'
                    }}
                >
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        style={{
                            height: '100%',
                            borderRight: 0,
                        }}
                        items={pageOptions}
                    />
                </Layout.Sider>
            </aside>
            <main className='p-3 h-100 w-100 bg-white'>
                <TabsComponent pageName={'Decoder'} />
            </main>
        </div>
    );
}

export default Formatter;
