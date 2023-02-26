import styles from "./TipTap.module.scss";
import {
    useEditor,
    EditorContent,
    BubbleMenu,
    FloatingMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import * as document from "../../pages/document.json";
import { useState } from "react";

// React.Dispatch<React.SetStateAction<string>>
const TipTapWrite = () => {
    // content is NOT editable
    const [editable, setEditable] = useState(false);
    const editor = useEditor({
        editable,
        extensions: [StarterKit],
        content: document,
    });
    return (
        <>
            <EditorContent editor={editor} />
        </>
    );
};

export default TipTapWrite;
