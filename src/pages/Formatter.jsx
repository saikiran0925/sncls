import { Button, Layout, Tooltip, theme } from "antd";
import { IoClipboardOutline } from "react-icons/io5";
import { MdFormatAlignJustify, MdFormatAlignLeft } from "react-icons/md";
import { SiVim } from "react-icons/si";
import TabsComponent from "../components/TabsComponent";
import { useRef, useState } from "react";

const initialItems = [
  {
    label: "Tab 1",
    children: "Content of Tab 1",
    key: "1"
  },
  {
    label: "Tab 2",
    children: "Content of Tab 2",
    key: "2",
  },
  {
    label: "Tab 3",
    children: "Content of Tab 3",
    key: "3",
    closable: false,
  },
];

function Formatter(props) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [activeKey, setActiveKey] = useState(initialItems[0].key);

  const onPrettify = (i) => {
    let activeK;
    setActiveKey(prev => {
      activeK = prev;
      console.log('on prettify', initialItems, activeK);
      const editor = initialItems[activeK - 1].editorRef.current.editor;
      editor.setValue(`sai kiran ${activeK}`);
      return prev
    });
  }

  const onVim = () => {
    console.log('on vim');
  }
  const onStringify = () => {
    console.log('on stringify');
  }
  const onCopy = () => {
    console.log('on copy');
  }

  const pageOptions = useRef([
    {
      icon: <MdFormatAlignLeft />,
      tooltip: "Prettify",
      clickHandler: (i) => onPrettify(i)
    },
    {
      icon: <MdFormatAlignJustify />,
      tooltip: "Stringify",
      clickHandler: (i) => onStringify(i)
    },
    {
      icon: <SiVim />,
      tooltip: "Vim",
      mode: "vim",
      clickHandler: (i) => onVim(i)
    },
    {
      icon: <IoClipboardOutline />,
      tooltip: "Copy",
      clickHandler: (i) => onCopy(i)
    },
  ].map((obj, i) => {
    obj.key = i + 1;
    return obj;
  }));

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
          {pageOptions.current.map((button, i) => (
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
                onClick={() => button.clickHandler(i)}
              />
            </Tooltip>
          ))}
        </Layout.Sider>
      </aside>
      <main className="p-3 h-100 w-100">
        <TabsComponent initialItems={initialItems} pageName={"Formatter"} setActiveKey={setActiveKey} activeKey={activeKey}/>
      </main>
    </div>
  );
}

export default Formatter;
