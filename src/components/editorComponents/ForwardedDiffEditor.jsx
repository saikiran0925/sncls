import React, { forwardRef } from "react";
import { DiffEditor } from "@monaco-editor/react";

const ForwardedDiffEditor = forwardRef((props, ref) => (
  <DiffEditor {...props} editorRef={ref} />
));

ForwardedDiffEditor.displayName = "ForwardedDiffEditor";

export default ForwardedDiffEditor;
