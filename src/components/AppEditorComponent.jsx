import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";

function AppEditorComponent() {
  function onChange(newValue) {
    console.log("change", newValue);
  }

  return (
    <AceEditor
      mode="javascript"
      theme="github"
      onChange={onChange}
      height="775px"
      width="1360px"
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: true }}
    />
  );
}

export default AppEditorComponent;
