import React from "react";

import CodeMirror from "@uiw/react-codemirror";
import { okaidia } from "@uiw/codemirror-theme-okaidia";
import { cpp } from "@codemirror/lang-cpp";

const CodeEditorv2 = (props) => {
  const { code, setCode } = props;
  return (
    <CodeMirror
      value={code}
      height="85vh"
      theme={okaidia}
      extensions={[cpp()]}
      onChange={(value) => {
        setCode(value);
      }}
      style={{ textAlign: "justify" }}
    />
  );
};

export default CodeEditorv2;
