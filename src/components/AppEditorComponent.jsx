import AceEditor from "react-ace";
import { useState } from "react";

import "ace-builds/src-noconflict/mode-json5";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/keybinding-vim";
import "ace-builds/src-noconflict/keybinding-sublime";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/json5";

import Ajv from "ajv";

const ajv = new Ajv({ allErrors: true });

function AppEditorComponent(props) {
  const editorRef = props.editorRef;
  const checked = props.checked;
  const [annotations, setAnnotations] = useState([]);

  const onChange = (newValue) => {
    console.log(newValue);
    try {
      const validate = ajv.compile({});
      validate(JSON.parse(newValue));
      if (validate.errors) {
        setAnnotations(
          validate.errors.map((error) => ({
            row: error.instancePath ? error.instancePath.split("/").pop() : 0,
            column: 0,
            text: error.message,
            type: "error",
          }))
        );
      } else {
        setAnnotations([]);
      }
    } catch (e) {
      const errorLine = e.message.match(/position (\d+)/);
      const position = errorLine ? parseInt(errorLine[1], 10) : 0;
      const lines = newValue.substring(0, position).split("\n");
      const lineNumber = lines.length - 1;
      setAnnotations([
        {
          row: lineNumber,
          column: 0,
          text: e.message,
          type: "error",
        },
      ]);
    }
  };

  const height = `${window.innerHeight - 140}px`;
  const width = `${window.innerWidth - 240}px`;

  return (
    <AceEditor
      mode="json5"
      theme="github"
      keyboardHandler={checked ? "vim" : "sublime"}
      ref={editorRef}
      onChange={onChange}
      height={height}
      width={width}
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: true }}
      annotations={annotations}
      wrapEnabled={true}
      showGutter={true}
      setOptions={{
        tabSize: 2,
        enableSnippets: true,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        showLineNumbers: true,
      }}
    />
  );
}

export default AppEditorComponent;
