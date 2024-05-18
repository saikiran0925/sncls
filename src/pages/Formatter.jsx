import { Button, Layout, Tooltip, theme } from "antd";
import { IoClipboardOutline } from "react-icons/io5";
import { MdFormatAlignJustify, MdFormatAlignLeft } from "react-icons/md";
import { SiVim } from "react-icons/si";
import TabsComponent from "../components/TabsComponent";

const pageOptions = [
  {
    icon: <MdFormatAlignLeft />,
    tooltip: "Prettify",
  },
  {
    icon: <MdFormatAlignJustify />,
    tooltip: "Stringify",
  },
  {
    icon: <SiVim />,
    tooltip: "Vim",
    mode: "vim",
  },
  {
    icon: <IoClipboardOutline />,
    tooltip: "Copy",
  },
].map((obj, i) => {
  obj.key = i + 1;
  return obj;
});

function Formatter(props) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div className="content-container">
      <aside>
        <Layout.Sider
          width={80}
          style={{
            background: colorBgContainer,
            borderRight: "2px solid #f4f1f1",
            height: "100%",
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            padding: "10px 0", 
          }}
        >
          {pageOptions.map((button) => (
            <Tooltip title={button.tooltip} key={button.key}>
              <Button
                shape="circle"
                icon={button.icon}
                style={{
                  margin: "10px 0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            </Tooltip>
          ))}
        </Layout.Sider>
      </aside>
      <main className="p-3 h-100 w-100">
        <TabsComponent pageName={"Formatter"} />
      </main>
    </div>
  );
}

export default Formatter;
