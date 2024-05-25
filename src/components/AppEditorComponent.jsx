import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/keybinding-vim";
import "ace-builds/src-noconflict/keybinding-sublime";
import "ace-builds/src-min-noconflict/ext-searchbox";

function AppEditorComponent(props) {
  const editorRef = props.editorRef;
  const checked = props.checked;

  function onChange(newValue) {
    console.log("change", newValue);
  }

  const height = `${window.innerHeight - 140}px`;
  const width = `${window.innerWidth - 240}px`;

  return (
    <AceEditor
      mode="javascript"
      theme="github"
      keyboardHandler={checked ? "vim" : "sublime"}
      ref={editorRef}
      onChange={onChange}
      height={height}
      width={width}
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: true }}
    />
  );
}

export default AppEditorComponent;
