import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";
import { Outlet } from "react-router-dom";
import { Layout, theme } from "antd";

function AppLayout() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <div className="h-100 d-flex" style={{ maxWidth: "100%"}}>
      <aside className="h-100">
        <AppSidebar />
      </aside>
      <div className="pg-ct">
        <AppHeader />
        <main className="h-100 flex-1">
          <Layout.Content
            style={{
              padding: 6,
              margin: 0,
              minHeight: 280,
              borderRadius: borderRadiusLG,
              background: "#f5f5f5"
            }}
          >
            <Outlet />
          </Layout.Content>
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
