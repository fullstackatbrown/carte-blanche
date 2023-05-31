import styles from "./TipTap.module.scss";
import { useEditor, EditorContent, generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useMemo, useState } from "react";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";

interface TipTapReadProps {
    document: string;
}
const TipTapRead = (props: TipTapReadProps) => {
    // content is NOT editable
    const editable = false;
    const editorContent = useMemo(() => {
        return generateHTML(JSON.parse(props.document), [
            StarterKit,
            Highlight,
            TextAlign,
        ]);
    }, [props.document]);
    const editor = useEditor({
        editable,
        extensions: [StarterKit, Highlight, TextAlign],
        content: editorContent,
    });

    return (
        <>
            <EditorContent editor={editor} />
        </>
    );
};

export default TipTapRead;
