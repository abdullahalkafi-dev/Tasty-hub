/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { Quill } from "react-quill";

// Custom Undo and Redo button icon components
const CustomUndo: React.FC = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
    <path
      className="ql-stroke"
      d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
    />
  </svg>
);

const CustomRedo: React.FC = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
    <path
      className="ql-stroke"
      d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
    />
  </svg>
);

// Undo and Redo functions
function undoChange(this: any) {
  this.quill.history.undo();
}
function redoChange(this: any) {
  this.quill.history.redo();
}

// Modules for Quill editor
interface ModulesProps {
  toolbarId: string;
}

export const modules = (props: ModulesProps) => ({
  toolbar: {
    container: `#${props.toolbarId}`,
    handlers: {
      undo: undoChange,
      redo: redoChange,
    },
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
});

// Formats for Quill editor
export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "color",
  "code-block",
];

// Quill Toolbar component
interface QuillToolbarProps {
  toolbarId?: string;
}

export const EditorToolBar: React.FC<QuillToolbarProps> = ({ toolbarId }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const Size = Quill.import("formats/size");
      Size.whitelist = ["extra-small", "small", "medium", "large"];
      Quill.register(Size, true);

      const Font = Quill.import("formats/font");
      Font.whitelist = [
        "arial",
        "comic-sans",
        "courier-new",
        "georgia",
        "helvetica",
        "Inter",
        "lucida",
      ];
      Quill.register(Font, true);
    }
  }, []);

  return (
    <>
      {toolbarId && (
        <div
          id={toolbarId}
          className="flex flex-wrap space-x-2 p-2 bg-gray-100 rounded shadow-md"
        >
          <span className="ql-formats">
            <button className="ql-bold" title="Bold" />
            <button className="ql-italic" title="Italic" />
            <button className="ql-underline" title="Underline" />
            <button className="ql-strike" title="Strike" />
          </span>
          <span className="ql-formats">
            <select className="ql-font" title="Font">
              <option value="arial">Arial</option>
              <option value="comic-sans">Comic Sans</option>
              <option value="courier-new">Courier New</option>
              <option value="georgia">Georgia</option>
              <option value="helvetica">Helvetica</option>
              <option value="Inter" selected>
                Inter
              </option>
              <option value="lucida">Lucida</option>
            </select>
            <select className="ql-size" title="Size">
              <option value="extra-small">Extra Small</option>
              <option value="small">Small</option>
              <option value="medium" selected>
                Medium
              </option>
              <option value="large">Large</option>
            </select>
            <select className="ql-header" title="Header">
              <option value="1">Heading 1</option>
              <option value="2">Heading 2</option>
              <option value="3">Heading 3</option>
              <option value="4">Heading 4</option>
              <option value="5">Heading 5</option>
              <option value="6">Heading 6</option>
              <option value="" selected>
                Normal
              </option>
            </select>
          </span>
          <span className="ql-formats">
            <button className="ql-list" value="ordered" title="Ordered List" />
            <button className="ql-list" value="bullet" title="Bullet List" />
            <button className="ql-indent" value="-1" title="Decrease Indent" />
            <button className="ql-indent" value="+1" title="Increase Indent" />
          </span>
          <span className="ql-formats">
            <button className="ql-script" value="super" title="Superscript" />
            <button className="ql-script" value="sub" title="Subscript" />
            <button className="ql-blockquote" title="Blockquote" />
            <button className="ql-direction" title="Direction" />
          </span>
          <span className="ql-formats">
            <select className="ql-align" title="Align" />
            <select className="ql-color" title="Text Color" />
            <select className="ql-background" title="Background Color" />
          </span>
          <span className="ql-formats">
            <button className="ql-link" title="Link" />
            <button className="ql-video" title="Video" />
          </span>
          <span className="ql-formats">
            <button className="ql-formula" title="Formula" />
            <button className="ql-code-block" title="Code Block" />
            <button className="ql-clean" title="Clear Formatting" />
          </span>
          <span className="ql-formats">
            <button className="ql-undo" title="Undo">
              <CustomUndo />
            </button>
            <button className="ql-redo" title="Redo">
              <CustomRedo />
            </button>
          </span>
        </div>
      )}
    </>
  );
};

export default EditorToolBar;
