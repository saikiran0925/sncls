import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const useTabManager = (pageName) => {
  const [initialItems, setInitialItems] = useState(() => {
    const savedItems = localStorage.getItem(pageName);
    return savedItems ? JSON.parse(savedItems) : [{ label: "Tab 1", children: "Content of Tab 1", key: uuidv4() }];
  });

  useEffect(() => {
    const handleBeforeUnload = () => {
      const requiredData = initialItemsRef.current.map(({ editorRef, children, ...rest }) => rest);
      localStorage.setItem(pageName, JSON.stringify(requiredData));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [pageName]);


  return [initialItems, setInitialItems];
};

export default useTabManager;
