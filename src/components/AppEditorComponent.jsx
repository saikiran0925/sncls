import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/keybinding-vim";
import "ace-builds/src-noconflict/keybinding-sublime";

function AppEditorComponent(props) {
  const editorRef = props.editorRef;
  const checked = props.checked;

  function onChange(newValue) {
    console.log("change", newValue);
  }

  return (
    <AceEditor
      mode="javascript"
      theme="github"
      keyboardHandler={checked ? "vim" : "sublime"}
      ref={editorRef}
      onChange={onChange}
      height="775px"
      width="1360px"
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: true }}
    />
  );
}

export default AppEditorComponent;
