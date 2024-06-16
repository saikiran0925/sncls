import Editor from "@monaco-editor/react";

function AppMonacoJsonEditorComponent(props) {
  const editorRef = props.editorRef;
  let content;
  let currentEditorState;
  if (editorRef.current) {
    currentEditorState = editorRef.current.editorState;
  }

  console.log("Current editorRef is: ", editorRef.current);
  const height = `${window.innerHeight - 120}px`;
  const width = `${window.innerWidth - 90}px`;

  function handleEditorMount(editor, monaco) {
    console.log("Editor instance: ", editor);
    console.log("Editor value: ", editor.getValue());
    // const originalEditor = editor.getModifiedEditor();
    // const originalEditor = editor.getOriginalEditor();

    const originalContent = props.editorState?.content || "";

    editor.setValue(originalContent);

    editor.onDidChangeModelContent((_) => {
      console.log(editor.getValue());
      content = editor.getValue();
      const editorState = {
        content,
      };
      currentEditorState = editorState;
      console.log("Editor State: ", currentEditorState);
      props.onEditorStateChange(currentEditorState);
    });
  }

  return <Editor height={height} width={width} onMount={handleEditorMount} language="json" />;
}
export default AppMonacoJsonEditorComponent;