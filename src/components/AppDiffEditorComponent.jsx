import { DiffEditor } from "@monaco-editor/react";

function AppDiffEditorComponent() {
  function handleEditorMount(editor) {
    const modifiedEditor = editor.getModifiedEditor();
    const originalEditor = editor.getOriginalEditor();
    modifiedEditor.onDidChangeModelContent((_) => {
      console.log(modifiedEditor.getValue());
    });
    originalEditor.onDidChangeModelContent((_) => {
      console.log(originalEditor.getValue());
    });
  }

  return (
    <DiffEditor
      height="90vh"
      original=""
      modified=""
      onMount={handleEditorMount}
      options={{
        readOnly: false,
        originalEditable: true,
      }}
    />
  );
}

export default AppDiffEditorComponent;
