import React, { useState, useRef, useEffect } from "react";
import { Button, Layout, Tooltip, theme, message } from "antd";
import { IoClipboardOutline } from "react-icons/io5";
import { MdFormatAlignJustify, MdFormatAlignLeft } from "react-icons/md";
import { SiVim } from "react-icons/si";
import TabsComponent from "../components/TabsComponent";

const initialItems = [
  {
    label: "Tab 1",
    children: "Content of Tab 1",
    key: "1",
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
  },
];

function Formatter(props) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [messageApi, contextHolder] = message.useMessage();
  const showNotification = (message, duration, type) => {
    messageApi.open({
      type: type,
      content: message,
      duration: duration,
    });
  };

  const [checked, setChecked] = React.useState(false);
  const [vimModeEnabled, setVimModeEnabled] = React.useState(null);
  const [buttonType, setbuttonType] = React.useState("default");
  // const isMounted = useRef(false);

  useEffect(() => {
    if (vimModeEnabled !== null) {
      showNotification(`Vim mode ${vimModeEnabled ? 'enabled' : 'disabled'}`, 3);
      setbuttonType(`${vimModeEnabled ? 'primary' : 'default'}`)
    }
  }, [vimModeEnabled]);

  const [activeKey, setActiveKey] = useState(initialItems[0].key);

  const onPrettify = (i) => {
    let activeK;
    setActiveKey((prev) => {
      activeK = prev;
      console.log("on prettify", initialItems, activeK);
      const editor = initialItems[activeK - 1].editorRef.current.editor;
      try {
        const jsonData = editor.getValue();
        if (jsonData) {
          const parsedData = JSON.parse(jsonData);

          if (parsedData && typeof parsedData === "object") {
            const jsonString = JSON.stringify(parsedData, null, 2);
            editor.setValue(jsonString);
          } else {
            const warningContent = "Error occured! ";
            showNotification(warningContent, 3, "warning");
            console.error("Invalid JSON data: JSON data is not an object.");
          }
        } else {
          const warningContent = "Please enter something! ";
          showNotification(warningContent, 3, "warning");
          console.error("Empty JSON data: No data to prettify.");
        }
      } catch (error) {
        const warningContent = "Please check the JSON you have entered! ";
        showNotification(warningContent, 3, "warning");
        console.error("An error occurred while prettifying the code:", error);
      }
      return prev;
    });
  };

  const onVim = () => {
    console.log("on vim triggered");
    setChecked((prevChecked) => !prevChecked);
    setVimModeEnabled((prevMode) => !prevMode);
    // setVimModeEnabled((prevMode) => {
    //   console.log(prevMode)
    //   showNotification(`Vim mode ${prevMode ? 'disabled' : 'enabled'}`, 3);
    //   return !prevMode;
    // });
  };

  const onStringify = () => {
    console.log("on stringify");
    let activeK;
    setActiveKey((prev) => {
      activeK = prev;
      console.log("on prettify", initialItems, activeK);
      const editor = initialItems[activeK].editorRef.current.editor;
      const jsonData = editor.getValue();
      try {
        if (jsonData !== "") {
          const jsonString = JSON.stringify(JSON.parse(jsonData));
          editor.setValue(jsonString);
        } else {
          const warningContent = "Please enter something!";
          showNotification(warningContent, 3, "warning");
          console.error("Empty JSON data: No data to stringify.");
        }
      } catch (parseError) {
        const warningContent = "Please check the JSON you have entered!";
        showNotification(warningContent, 3, "warning");
        console.error(
          "An error occurred while parsing the JSON data:",
          parseError
        );
      }
      return prev;
    });
  };
  const onCopy = () => {
    console.log("on copy");
    let activeK;
    setActiveKey((prev) => {
      activeK = prev;
      console.log("on prettify", initialItems, activeK);
      const selectedEditor = initialItems[activeK - 1].editorRef.current.editor;
      const editorContent = selectedEditor.getValue();
      const textarea = document.createElement("textarea");
      textarea.value = editorContent;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      showNotification("Content copied to clipboard", 3, "info");
      return prev;
    });
  };

  const pageOptions = useRef(
    [
      {
        icon: <MdFormatAlignLeft />,
        tooltip: "Prettify",
        clickHandler: (i) => onPrettify(i),
      },
      {
        icon: <MdFormatAlignJustify />,
        tooltip: "Stringify",
        clickHandler: (i) => onStringify(i),
      },
      {
        icon: <SiVim />,
        tooltip: "Vim",
        type: buttonType,
        clickHandler: (i) => onVim(i),
      },
      {
        icon: <IoClipboardOutline />,
        tooltip: "Copy",
        clickHandler: (i) => onCopy(i),
      },
    ].map((obj, i) => {
      obj.key = i + 1;
      return obj;
    })
  );

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
            <Tooltip title={button.tooltip} key={button.key} placement="right">
              <Button
                type={button.type ? buttonType : 'default'}
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
        {contextHolder}
        <TabsComponent
          checked={checked}
          initialItems={initialItems}
          pageName={"Formatter"}
          setActiveKey={setActiveKey}
          activeKey={activeKey}
        />
      </main>
    </div>
  );
}

export default Formatter;
