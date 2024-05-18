import { Layout } from "antd";

function AppHeader() {
  return (
    <header>
        <Layout.Header
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="demo-logo" />
        </Layout.Header>
    </header>
  );
}

export default AppHeader;
