import { DiffEditor } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import ForwardedDiffEditor from "./ForwardedDiffEditor";

function AppDiffEditorComponent(props) {
  const editorRef = props.editorRef;
  let modifiedEditorContent;
  let originalEditorContent;
  let currentEditorState;
  if (editorRef.current) {
    currentEditorState = editorRef.current.editorState;
  }

  console.log("Current editorRef is: ", editorRef.current);

  function handleEditorMount(editor, monaco) {
    console.log("Editor instance: ", editor);
    const modifiedEditor = editor.getModifiedEditor();
    const originalEditor = editor.getOriginalEditor();
    originalEditor.setValue(props.editorState.originalEditorContent);
    modifiedEditor.setValue(props.editorState.modifiedEditorContent);
    console.log(
      "Setting the values after mount and the values are: ",
      props.editorState.modifiedEditorContent,
      props.editorState.originalEditorContent
    );
    modifiedEditor.onDidChangeModelContent((_) => {
      console.log(modifiedEditor.getValue());
      modifiedEditorContent = modifiedEditor.getValue();
      const editorState = {
        originalEditorContent,
        modifiedEditorContent,
      };
      currentEditorState = editorState;
      console.log("Editor State: ", currentEditorState);
      props.onEditorStateChange(currentEditorState);
    });
    originalEditor.onDidChangeModelContent((_) => {
      console.log(originalEditor.getValue());
      originalEditorContent = originalEditor.getValue();
      const editorState = {
        originalEditorContent,
        modifiedEditorContent,
      };
      currentEditorState = editorState;
      console.log("Editor State: ", currentEditorState);
      props.onEditorStateChange(currentEditorState);
    });
  }

  return (
    <ForwardedDiffEditor
      ref={editorRef}
      height="90vh"
      onMount={handleEditorMount}
      options={{
        readOnly: false,
        originalEditable: true,
      }}
    />
  );
}
AppDiffEditorComponent.displayName = "AppDiffEditorComponent";
export default AppDiffEditorComponent;
