import { Tabs } from "antd";
import { useState, useRef, useEffect } from "react";
import AppEditorComponent from "./AppEditorComponent";
import { v4 as uuidv4 } from 'uuid';

function EditorWrapper({
  checked,
  uuid,
  setInitialItems
}) {
  const editorRef = useRef();
  setInitialItems((prev) => {
    prev.find((obj) => obj.key === uuid).editorRef = editorRef;
    return prev;
  })
  return <AppEditorComponent editorRef={editorRef} checked={checked} />
}

function TabsComponent({
  checked,
  pageName = "",
  initialItems = [],
  setActiveKey,
  activeKey,
  setInitialItems,
  showNotification
}) {
  const newTabIndex = useRef(0);
  const onChange = (newActiveKey) => {
    setActiveKey(newActiveKey);
  };

  useEffect(() => {
    setInitialItems(initialItems.map((obj, i) => {
      obj.children = <EditorWrapper setInitialItems={setInitialItems} uuid={obj.key} checked={checked} />;
      obj.pageName = pageName;
      return obj;
    }));
  }, [checked])

  const add = () => {
    setInitialItems((prevItems) => {
      const newPanes = [...prevItems];
      const newActiveKey = uuidv4();
      newPanes.push({
        label: `Tab ${newPanes.length + 1}`,
        children: <EditorWrapper setInitialItems={setInitialItems} uuid={newActiveKey} checked={checked} />,
        key: newActiveKey,
      });
      setActiveKey(newActiveKey);
      return newPanes;
    });
  };


  const remove = (targetKey) => {

    if (initialItems.length === 1) {
      showNotification("Removing the last tab is not allowed", 3, "warning");
      return;
    }

    let newActiveKey = activeKey;
    let lastIndex = -1;
    initialItems.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = initialItems.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setInitialItems(newPanes.map((obj, i) => { obj.label = `Tab ${i + 1}`; return obj }));
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
      items={initialItems}
    />
  );
}

export default TabsComponent;
