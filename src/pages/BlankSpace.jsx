import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TabsComponent from "../components/generic/TabsComponent";

function BlankSpace() {
  const pageName = "BlankSpace";
  const [initialItems, setInitialItems] = useState(
    localStorage.getItem(pageName)
      ? JSON.parse(localStorage.getItem(pageName))
      : [
          {
            label: "Tab 1",
            children: "Content of Tab 1",
            key: uuidv4(),
          },
        ]
  );
  const initialItemsRef = useRef(initialItems);

  useEffect(() => {
    const handleBeforeUnload = () => {
      console.log(initialItemsRef.current, "initialItems on destroy");
      const requiredData = initialItemsRef.current.map((obj) => {
        const { editorRef, children, ...rest } = obj;
        return rest;
      });
      localStorage.setItem(pageName, JSON.stringify(requiredData));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      handleBeforeUnload();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    initialItemsRef.current = initialItems;
  }, [initialItems]);

  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  return (
    <div className="content-container">
      <main className="h-100 w-100 bg-white">
        <TabsComponent
          initialItems={initialItems}
          setActiveKey={setActiveKey}
          activeKey={activeKey}
          setInitialItems={setInitialItems}
          editorType={pageName}
        />
      </main>
    </div>
  );
}

export default BlankSpace;
