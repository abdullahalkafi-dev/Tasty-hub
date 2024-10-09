import dynamic from "next/dynamic";
import React from "react";
import "react-quill/dist/quill.snow.css";
import EditorToolBar, { formats, modules } from "./EditorToolBar";

// Dynamically import ReactQuill with ssr: false
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });



interface ReactQuillEditorProps {
  value: string;
  setValue: (value: string) => void;
  toolbarId: string;
  defaultValue?: string;
}

const ReactQuillEditor: React.FC<ReactQuillEditorProps> = ({
  value,
  setValue,
  toolbarId,
  defaultValue = "",
}) => {
  return (
    <div className="h-44 my-16">
      <EditorToolBar toolbarId={toolbarId} />
      <ReactQuill
      
        className="h-44"
        theme="snow"
        defaultValue={defaultValue}
        value={value}
        onChange={setValue}
        placeholder="Enter Directions and nutrition facts"
        formats={formats}
        modules={modules({ toolbarId })}
      />
    </div>
  );
};

export default ReactQuillEditor;







// import dynamic from "next/dynamic";
// import React from "react";
// import "react-quill/dist/quill.snow.css";

// // Dynamically import ReactQuill with ssr: false
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// import EditorToolBar, { formats, modules } from "./EditorToolBar";

// interface ReactQuillEditorProps {
//   value: string; // Controlled value
//   setValue: (value: string) => void; // Function to update value
//   toolbarId: string; // ID for the toolbar
// }

// const ReactQuillEditor: React.FC<ReactQuillEditorProps> = ({
//   value,
//   setValue,
//   toolbarId,
// }) => {
//   return (
//     <div className="h-44 my-16">
//       <EditorToolBar toolbarId={toolbarId} />
//       <ReactQuill
//         className="h-44"
//         theme="snow"
//         value={value} // Use controlled value
//         onChange={(newValue) => {
//           setValue(newValue); // Update the value on change
//         }}
//         placeholder="Enter Message..."
//         formats={formats}
//         modules={modules({ toolbarId })}
//       />
//     </div>
//   );
// };

// export default ReactQuillEditor;
