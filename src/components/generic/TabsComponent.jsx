import { Tabs } from "antd";
import { useRef, useEffect } from "react";
import AppMonacoJsonEditorComponent from "../editorComponents/AppMonacoJsonEditorComponent";
import { v4 as uuidv4 } from 'uuid';
import AppDiffEditorComponent from "../editorComponents/AppDiffEditorComponent";
import AppBlankSpaceComponent from "../editorComponents/AppBlankSpaceComponent";

const editorComponents = {
  DiffEditor: AppDiffEditorComponent,
  Formatter: AppMonacoJsonEditorComponent,
  BlankSpace: AppBlankSpaceComponent,
  // Add other types and their corresponding components here
};

function EditorWrapper({
  checked,
  uuid,
  editorState,
  setInitialItems,
  editorType
}) {
  const editorRef = useRef();
  setInitialItems((prev) => {
    prev.find((obj) => obj.key === uuid).editorRef = editorRef;
    return prev;
  })

  const onEditorStateChange = (state) => {
    setInitialItems((prev) => {
      const current = prev.find((obj) => obj.key === uuid);
      if (current) {
        current.editorState = state;
      }

      return prev;
    })
  }

  const EditorComponent = editorComponents[editorType]
  return <EditorComponent editorRef={editorRef} checked={checked} editorState={editorState} onEditorStateChange={onEditorStateChange} />
}

function TabsComponent({
  checked,
  initialItems = [],
  setActiveKey,
  activeKey,
  setInitialItems,
  showNotification,
  editorType,
}) {
  const onChange = (newActiveKey) => {
    setActiveKey(newActiveKey);
  };

  useEffect(() => {
    setInitialItems(initialItems.map((obj, i) => {
      obj.children = <EditorWrapper setInitialItems={setInitialItems} editorState={obj.editorState} uuid={obj.key} checked={checked} editorType={editorType} />;
      return obj;
    }));
  }, [checked])

  const add = () => {
    setInitialItems((prevItems) => {
      const newPanes = [...prevItems];
      const newActiveKey = uuidv4();
      newPanes.push({
        label: `Tab ${newPanes.length + 1}`,
        children: <EditorWrapper setInitialItems={setInitialItems} uuid={newActiveKey} checked={checked} editorType={editorType} />,
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
