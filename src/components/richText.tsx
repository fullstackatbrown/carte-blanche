import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// React.Dispatch<React.SetStateAction<string>>
const Tiptap = (setContent: any) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: "<p>Hello World!</p>",
        onUpdate({ editor }) {
            setContent(JSON.stringify(editor.getJSON()));
        },
    });

    return <EditorContent editor={editor} />;
};

export default Tiptap;
