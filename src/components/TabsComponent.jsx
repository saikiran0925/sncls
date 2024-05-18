import { Tabs } from "antd";
import { useState, useRef } from "react";
import AppEditorComponent from "./AppEditorComponent";

function TabsComponent({
  checked,
  pageName = "",
  initialItems = [],
  setActiveKey,
  activeKey,
}) {
  const [items, setItems] = useState(
    initialItems.map((obj) => {
      const editorRef = useRef();
      obj.children = <AppEditorComponent editorRef={editorRef} checked={checked} />;
      obj.pageName = pageName;
      obj.editorRef = editorRef;
      return obj;
    })
  );
  const newTabIndex = useRef(0);
  const onChange = (newActiveKey) => {
    setActiveKey(newActiveKey);
  };

  const add = () => {
    const editorRef = useRef();
    const newPanes = [...items];
    const newActiveKey = newPanes.length + 1 + 1;
    newPanes.push({
      label: `Tab ${newPanes.length + 1}`,
      children: <AppEditorComponent editorRef={editorRef} checked={checked} />,
      editorRef: editorRef,
      key: newActiveKey,
    });
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const remove = (targetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const onEdit = (targetKey, action) => {
    if (action === "add") {
      add();
    } else {
      remove(targetKey);
    }
  };

  return (
    <Tabs
      checked={checked}
      type="editable-card"
      onChange={onChange}
      activeKey={activeKey}
      onEdit={onEdit}
      items={items}
    />
  );
}

export default TabsComponent;
