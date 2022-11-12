import React, { useState } from "react";
import RichTextEditor, { EditorValue } from "react-rte";

export default function TextEditor() {
    const [value, setValue] = useState<EditorValue>(
        RichTextEditor.createEmptyValue()
    );
    const onChange = (newValue: EditorValue) => {
        setValue(newValue);
    };
    return <RichTextEditor value={value} onChange={onChange} />;
}
