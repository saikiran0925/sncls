import { useRef, useEffect } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/keybinding-vim";
import "ace-builds/src-noconflict/keybinding-sublime";
import 'ace-builds/src-min-noconflict/ext-searchbox';


function AppEditorComponent(props) {
  const editorRef = props.editorRef;
  const checked = props.checked;
  const previousValueRef = useRef(localStorage.getItem("tab") || "");

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.editor.setValue(previousValueRef.current);
    }
  }, [editorRef]);

  function onChange(newValue) {
    if (newValue !== previousValueRef.current) {
      console.log("change", newValue);
      localStorage.setItem("tab", newValue);
      previousValueRef.current = newValue;
    }
  }

  return (
    <AceEditor
      mode="javascript"
      theme="github"
      keyboardHandler={checked ? "vim" : "sublime"}
      ref={editorRef}
      onChange={onChange}
      height="850px"
      width="1400px"
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: true }}
    />
  );
}

export default AppEditorComponent;
