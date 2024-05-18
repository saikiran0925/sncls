import React from 'react';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';
import { Outlet } from 'react-router-dom';
import { Layout, theme } from 'antd';


function AppLayout() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <div className='h-100'>
            <AppHeader />
            <div className="pg-ct">
                <aside className='h-100'>
                    <AppSidebar />
                </aside>
                <main className='h-100 flex-1'>
                    <Layout
                        style={{
                            padding: '24px',
                        }}
                    >
                        <Layout.Content
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            <Outlet />
                        </Layout.Content>
                    </Layout>
                </main>
            </div>
        </div>
    );
}

export default AppLayout;
