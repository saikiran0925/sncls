import Editor from "@monaco-editor/react";

function AppBlankSpaceComponent(props) {
  const editorRef = props.editorRef;
  let editorContent;
  let currentEditorState;
  if (editorRef.current) {
    currentEditorState = editorRef.current.editorState;
  }

  console.log("Current editorRef is: ", editorRef.current);

  function handleEditorMount(editor, monaco) {
    console.log("Editor instance: ", editor);
    console.log("Editor value: ", editor.getValue());
    // const originalEditor = editor.getModifiedEditor();
    // const originalEditor = editor.getOriginalEditor();

    const originalContent = props.editorState?.editorContent || "";

    editor.setValue(originalContent);

    editor.onDidChangeModelContent((_) => {
      console.log(editor.getValue());
      editorContent = editor.getValue();
      const editorState = {
        editorContent,
      };
      currentEditorState = editorState;
      console.log("Editor State: ", currentEditorState);
      props.onEditorStateChange(currentEditorState);
    });
  }

  return <Editor height="90vh" onMount={handleEditorMount} />;
}
export default AppBlankSpaceComponent;
