import { Layout } from "antd";

function AppHeader() {
  return (
    <header>
        <Layout.Header
          style={{
            display: "flex",
            alignItems: "center",
            height: 48,
            background: "#121212"
          }}
        >
          <div className="demo-logo" />
        </Layout.Header>
    </header>
  );
}

export default AppHeader;
