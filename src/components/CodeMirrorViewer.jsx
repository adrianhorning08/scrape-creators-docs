import React, { useState, useEffect } from "react";

function CodeMirrorViewerInner({
  value,
  readOnly = true,
  height = "100%",
  className = "",
}) {
  const [mod, setMod] = useState(null);

  useEffect(() => {
    Promise.all([
      import("@uiw/react-codemirror"),
      import("@codemirror/lang-json"),
      import("@uiw/codemirror-theme-github"),
    ]).then(([cm, langJson, theme]) => {
      setMod({
        CodeMirror: cm.default,
        json: langJson.json,
        githubDark: theme.githubDark,
      });
    });
  }, []);

  if (!mod) {
    return (
      <pre className={className}>
        <code>{value}</code>
      </pre>
    );
  }

  return (
    <mod.CodeMirror
      value={value}
      height={height}
      theme={mod.githubDark}
      extensions={[mod.json()]}
      readOnly={readOnly}
      className={className}
      basicSetup={{
        lineNumbers: true,
        highlightActiveLineGutter: true,
        highlightSpecialChars: true,
        history: true,
        foldGutter: true,
        drawSelection: true,
        dropCursor: true,
        allowMultipleSelections: true,
        indentOnInput: true,
        syntaxHighlighting: true,
        bracketMatching: true,
        closeBrackets: true,
        autocompletion: true,
        rectangularSelection: true,
        crosshairCursor: true,
        highlightActiveLine: true,
        highlightSelectionMatches: true,
        closeBracketsKeymap: true,
        defaultKeymap: true,
        searchKeymap: true,
        historyKeymap: true,
        foldKeymap: true,
        completionKeymap: true,
        lintKeymap: true,
      }}
    />
  );
}

export default function CodeMirrorViewer(props) {
  if (typeof window === "undefined") {
    return (
      <pre className={props.className || ""}>
        <code>{props.value}</code>
      </pre>
    );
  }

  return <CodeMirrorViewerInner {...props} />;
}
