import styles from "./TipTap.module.scss";
import {
    useEditor,
    EditorContent,
    BubbleMenu,
    FloatingMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";

interface TipTapReadProps {
    document?: string;
}
const TipTapRead = (props: TipTapReadProps) => {
    // content is NOT editable
    const [editable, setEditable] = useState(false);
    const editorContent = props.document ? JSON.parse(props.document) : null;
    const editor = useEditor({
        editable,
        extensions: [StarterKit],
        content: editorContent,
    });
    return (
        <>
            <EditorContent editor={editor} />
        </>
    );
};

export default TipTapRead;
