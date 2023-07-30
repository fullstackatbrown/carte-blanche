import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import FontSize from "tiptap-extension-font-size";

interface ITextEditorView {
  content: string;
}

export default function TextEditorView({ content }: ITextEditorView) {
  const editor = useEditor({
    editable: false,
    extensions: [
      Underline,
      StarterKit,
      FontSize,
      TextStyle,
      Color,
      Image,
      Link.configure({
        HTMLAttributes: { class: "text-blue-500" },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight.configure({ multicolor: true }),
    ],
    editorProps: {
      attributes: {
        class:
          "border-4 p-12 prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none marker:text-black w-full",
      },
    },
    content: content,
  });
  return (
    <div className="flex w-full flex-col items-center">
      <EditorContent
        editor={editor}
        className="flex w-full items-center justify-center"
      />
    </div>
  );
}
