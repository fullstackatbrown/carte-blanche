import {
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  FormatUnderlined,
  Redo,
  StrikethroughS,
  Undo,
} from "@mui/icons-material";
import Underline from "@tiptap/extension-underline";
import FontSize from "tiptap-extension-font-size";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { type Level } from "@tiptap/extension-heading";

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  return (
    <div>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <Undo />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <Redo />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <FormatBold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <FormatItalic />
      </button>
      <button onClick={() => editor.chain().focus().toggleUnderline().run()}>
        <FormatUnderlined />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <StrikethroughS />
      </button>
      <select
        className="bg-inherit"
        onChange={(e) => {
          editor.chain().focus().setFontSize(e.target.value).run();
        }}
      >
        <option>8px</option>
        <option>10px</option>
        <option>12px</option>
        <option>14px</option>
        <option>18px</option>
        <option>24px</option>
        <option>36px</option>
      </select>
      <select
        className="bg-inherit"
        onChange={(e) => {
          if (e.target.value == "paragraph") {
            editor.chain().focus().setParagraph().run();
          } else {
            editor
              .chain()
              .focus()
              .setHeading({
                level: parseInt(e.target.value.split("h")[1] ?? "1") as Level,
              })
              .run();
          }
        }}
      >
        <option value="paragraph">Paragraph</option>
        <option value="h1">Heading 1</option>
        <option value="h2">Heading 2</option>
        <option value="h3">Heading 3</option>
        <option value="h4">Heading 4</option>
        <option value="h5">Heading 5</option>
        <option value="h6">Heading 6</option>
      </select>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <FormatListBulleted />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        <FormatListNumbered />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        <FormatQuote />
      </button>
    </div>
  );
};

export default function TextEditor() {
  const editor = useEditor({
    extensions: [Underline, StarterKit, FontSize, TextStyle],
    editorProps: {
      attributes: {
        class:
          "border-4 p-12 prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none marker:text-black",
      },
    },
    content: ``,
  });

  return (
    <div className="flex w-full flex-col items-center">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
