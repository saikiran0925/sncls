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

    const originalContent = props.editorState?.originalEditorContent || "";
    const modifiedContent = props.editorState?.modifiedEditorContent || "";

    originalEditor.setValue(originalContent);
    modifiedEditor.setValue(modifiedContent);

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

  const height = `${window.innerHeight - 120}px`;
  const width = `${window.innerWidth - 90}px`;

  return (
    <ForwardedDiffEditor
      ref={editorRef}
      height={height}
      width={width}
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
