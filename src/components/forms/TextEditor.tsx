import {
  FormatAlignCenter,
  FormatAlignJustify,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatColorFill,
  FormatColorText,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  FormatUnderlined,
  Image as ImageIcon,
  InsertLink,
  Redo,
  StrikethroughS,
  Undo,
} from "@mui/icons-material";
import { Box, Button, Menu, MenuItem, Modal, TextField } from "@mui/material";
import { type Level } from "@tiptap/extension-heading";
import { EditorContent, type Editor } from "@tiptap/react";
import { useRef, useState } from "react";
import ColorSwatches from "../ColorSwatches";

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  const [textColorEl, setTextColorEl] = useState<HTMLElement | null>(null);
  const [textFillEl, setTextFillEl] = useState<HTMLElement | null>(null);
  const textColorOpen = Boolean(textColorEl);
  const textFillOpen = Boolean(textFillEl);
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const hrefTextField = useRef<HTMLInputElement>(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const imgSrcTextField = useRef<HTMLInputElement>(null);

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
      <button onClick={() => editor.chain().focus().setTextAlign("left").run()}>
        <FormatAlignLeft />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        <FormatAlignCenter />
      </button>
      <button>
        <FormatAlignRight
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        />
      </button>
      <button>
        <FormatAlignJustify
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        />
      </button>
      <button onClick={(e) => setTextColorEl(e.currentTarget)}>
        <FormatColorText />
      </button>
      <Menu
        anchorEl={textColorEl}
        open={textColorOpen}
        onClose={() => setTextColorEl(null)}
      >
        <MenuItem
          sx={{
            display: "grid",
            gap: 0.5,
            gridTemplateColumns: 10,
          }}
        >
          <ColorSwatches
            onClick={(color: string) => editor.chain().setColor(color).run()}
          />
        </MenuItem>
      </Menu>
      <button onClick={(e) => setTextFillEl(e.currentTarget)}>
        <FormatColorFill />
      </button>
      <Menu
        anchorEl={textFillEl}
        open={textFillOpen}
        onClose={() => setTextFillEl(null)}
      >
        <MenuItem
          sx={{
            display: "grid",
            gap: 0.5,
            gridTemplateColumns: "repeat(10, 1fr)",
          }}
        >
          <ColorSwatches
            onClick={(color: string) =>
              editor.chain().setHighlight({ color }).run()
            }
          />
        </MenuItem>
      </Menu>
      <button
        onClick={() => {
          setLinkModalOpen(true);
          console.log(
            editor.state.doc.textBetween(
              editor.state.selection.to,
              editor.state.selection.from
            )
          );
        }}
      >
        <InsertLink />
      </button>
      <Modal open={linkModalOpen} onClose={() => setLinkModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            outline: "none",
          }}
        >
          <div className="flex w-full flex-col gap-4">
            <TextField
              InputProps={{ readOnly: true }}
              label="Text"
              defaultValue={editor.state.doc.textBetween(
                editor.state.selection.from,
                editor.state.selection.to
              )}
            />
            <form
              className="flex flex-col justify-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();

                const href = hrefTextField.current?.value ?? "";
                if (!href) {
                  editor.chain().focus().unsetLink().run();
                } else {
                  editor
                    .chain()
                    .focus()
                    .toggleLink({ href: hrefTextField.current?.value ?? "" })
                    .run();
                }

                setLinkModalOpen(false);
              }}
            >
              <TextField
                inputRef={hrefTextField}
                label="Link"
                variant="outlined"
                defaultValue={
                  (editor.getAttributes("link") as { href: string }).href
                }
              />

              <Button type="submit">Submit</Button>
            </form>
          </div>
        </Box>
      </Modal>
      <button onClick={() => setImageModalOpen(true)}>
        <ImageIcon />
      </button>
      <Modal open={imageModalOpen} onClose={() => setImageModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            outline: "none",
          }}
        >
          <form
            className="flex  justify-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();

              const href = imgSrcTextField.current?.value ?? "";
              if (!href) return;

              editor.chain().focus().setImage({ src: href }).run();

              setImageModalOpen(false);
            }}
          >
            <TextField
              inputRef={imgSrcTextField}
              label="Link to Image"
              variant="outlined"
            />
            <Button type="submit">Submit</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

interface ITextEditor {
  editor: Editor | null;
}

export default function TextEditor({ editor }: ITextEditor) {
  if (!editor) {
    return <div>Loading editor...</div>;
  }
  return (
    <div className="flex w-full flex-col items-center">
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="flex w-full items-center justify-center"
      />
    </div>
  );
}
