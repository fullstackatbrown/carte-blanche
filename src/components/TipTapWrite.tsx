import styles from "./TipTap.module.scss";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";

import {
    useEditor,
    EditorContent,
    BubbleMenu,
    FloatingMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface RichTextProps {
    handler: (newContent: string) => void;
}

// React.Dispatch<React.SetStateAction<string>>
const TipTapWrite = (props: RichTextProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Highlight,
        ],
        content: "<p>start writing your article...</p><br><br><br><br><br>",
        onUpdate({ editor }) {
            props.handler(JSON.stringify(editor.getJSON()));
        },
    });

    return (
        <>
            {editor && (
                <>
                    <div className={styles.buttonContainer}>
                        <button
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .toggleHeading({ level: 1 })
                                    .run()
                            }
                            className={
                                editor.isActive("heading", { level: 1 })
                                    ? "is-active"
                                    : ""
                            }
                        >
                            h1
                        </button>
                        <button
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .toggleHeading({ level: 2 })
                                    .run()
                            }
                            className={
                                editor.isActive("heading", { level: 2 })
                                    ? "is-active"
                                    : ""
                            }
                        >
                            h2
                        </button>
                        <button
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .toggleHeading({ level: 3 })
                                    .run()
                            }
                            className={
                                editor.isActive("heading", { level: 3 })
                                    ? "is-active"
                                    : ""
                            }
                        >
                            h3
                        </button>
                        <button
                            onClick={() =>
                                editor.chain().focus().setParagraph().run()
                            }
                            className={
                                editor.isActive("paragraph") ? "is-active" : ""
                            }
                        >
                            paragraph
                        </button>
                        <button
                            onClick={() =>
                                editor.chain().focus().toggleBold().run()
                            }
                            className={
                                editor.isActive("bold") ? "is-active" : ""
                            }
                        >
                            bold
                        </button>
                        <button
                            onClick={() =>
                                editor.chain().focus().toggleItalic().run()
                            }
                            className={
                                editor.isActive("italic") ? "is-active" : ""
                            }
                        >
                            italic
                        </button>
                        <button
                            onClick={() =>
                                editor.chain().focus().toggleStrike().run()
                            }
                            className={
                                editor.isActive("strike") ? "is-active" : ""
                            }
                        >
                            strike
                        </button>
                        <button
                            onClick={() =>
                                editor.chain().focus().toggleHighlight().run()
                            }
                            className={
                                editor.isActive("highlight") ? "is-active" : ""
                            }
                        >
                            highlight
                        </button>
                        <button
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .setTextAlign("left")
                                    .run()
                            }
                            className={
                                editor.isActive({ textAlign: "left" })
                                    ? "is-active"
                                    : ""
                            }
                        >
                            left
                        </button>
                        <button
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .setTextAlign("center")
                                    .run()
                            }
                            className={
                                editor.isActive({ textAlign: "center" })
                                    ? "is-active"
                                    : ""
                            }
                        >
                            center
                        </button>
                        <button
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .setTextAlign("right")
                                    .run()
                            }
                            className={
                                editor.isActive({ textAlign: "right" })
                                    ? "is-active"
                                    : ""
                            }
                        >
                            right
                        </button>
                        <button
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .setTextAlign("justify")
                                    .run()
                            }
                            className={
                                editor.isActive({ textAlign: "justify" })
                                    ? "is-active"
                                    : ""
                            }
                        >
                            justify
                        </button>
                    </div>
                    <EditorContent editor={editor} />
                </>
            )}
        </>
    );
};

export default TipTapWrite;
