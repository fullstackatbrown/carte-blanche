import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    MenuItem,
} from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { NodeType, nodeTypes } from "../../../types/IContent";
import IUser from "../../../types/IUser";
import TipTapWrite from "../TipTapWrite";
import styles from "./CreateContentModal.module.scss";

export interface ICreateContentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

/**
 * Modal for adding a new node; lets the user choose a title, type,
 * and parent node
 */
export const CreateContentModal = (props: ICreateContentModalProps) => {
    // deconstruct props variables
    const { isOpen, onClose } = props;
    // use session to get the user's email
    const { data: session, status } = useSession();

    // state variables
    const [user, setUser] = useState<IUser>();
    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [selectedType, setSelectedType] = useState<NodeType>("" as NodeType);
    const [imageContent, setImageContent] = useState<string>("");
    const [caption, setCaption] = useState<string>("");
    const [textContent, setTextContent] = useState<string>("");
    const [uploading, setUploading] = useState(false);

    // event handlers for the modal inputs and dropdown selects
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };
    const handleSelectedTypeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSelectedType(event.target.value.toLowerCase() as NodeType);
    };
    const handleImageContentChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setImageContent(event.target.value);
    };
    const handleCaptionChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setCaption(event.target.value);
    };
    const handleTextContentChange = (newContent: string) => {
        console.log(newContent);
        setTextContent(newContent);
    };

    // useEffect to get user and list of users
    useEffect(() => {
        const getUser = async () => {
            const userResponse = await fetch("/api/user/getUserByEmail", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const userJson = await userResponse.json();
            setUser(userJson.user);
        };
        getUser();
    }, []);

    // called when the "Create" button is clicked
    const handleSubmit = async () => {
        const newContent = {
            title: title,
            author: user,
            // email: session?.user?.email,
            nodeType: selectedType,
            imageContent: imageContent,
            caption: caption,
            textContent: textContent,
            dateCreated: new Date(),
            lastUpdated: new Date(),
        };
        console.log(newContent);
        console.log(JSON.stringify(newContent));
        // call the API to create the new node
        const response = await fetch("/api/content/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newContent),
        });
        const responseJson = await response.json();
        console.log(responseJson);
        if (!responseJson.success) {
            return;
        }
        console.log("last line of handleSubmit");
        handleClose();
    };

    /** Reset all our state variables and close the modal */
    const handleClose = () => {
        console.log("handle close called");
        onClose();
        setTitle("");
        setAuthor("");
        setSelectedType("" as NodeType);
        setImageContent("");
        setCaption("");
        setTextContent("");
        setUploading(false);
    };

    const handleImageUpload = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const apiKey = "f18e19d8cb9a1f0";
        const formData = new FormData();
        formData.append("image", file);
        setUploading(true);
        fetch("https://api.imgur.com/3/image", {
            method: "POST",
            headers: {
                Authorization: `Client-ID ${apiKey}`,
            },
            body: formData,
        })
            .then((res) => {
                res.json()
                    .then((data) => {
                        setImageContent(
                            (data as { data: { link: string } }).data.link
                        );
                        setUploading(false);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            })
            .catch((err) => console.log(err));
    };

    const isImage: boolean = selectedType === "image";
    const isText: boolean = selectedType === "text";
    const textPlaceholder = `Enter text...`;

    return (
        <Dialog maxWidth="xl" open={isOpen} onClose={handleClose}>
            <DialogTitle>Upload Content</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    We are glad that you want to upload content to our platform.
                    Please fill out the form below to get started.
                </DialogContentText>
                <TextField
                    id="outlined-textarea"
                    label="Title"
                    placeholder="Title"
                    multiline
                    fullWidth
                    style={{ marginTop: "1rem" }}
                    value={title}
                    onChange={handleTitleChange}
                />
                <TextField
                    id="outlined-select-currency"
                    select
                    label="Content Type"
                    style={{ marginTop: "1rem" }}
                    fullWidth
                    value={selectedType}
                    onChange={handleSelectedTypeChange}
                >
                    {nodeTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </TextField>
                {selectedType && isText && (
                    // <TextField
                    //     id="outlined-multiline-static"
                    //     label="Text Content"
                    //     multiline
                    //     fullWidth
                    //     style={{ marginTop: "1rem" }}
                    //     rows={10}
                    //     value={content}
                    //     placeholder={textPlaceholder}
                    //     onChange={handleTextContentChange}
                    // />
                    <div>
                        <div className={styles.tiptapbox}>
                            <TipTapWrite handler={handleTextContentChange} />
                        </div>
                    </div>
                )}
                {/* {selectedType && isImage && ( */}
                <Button
                    variant="contained"
                    style={{ marginTop: "1rem" }}
                    component="label"
                >
                    Upload
                    <input
                        hidden
                        accept="image/*"
                        multiple
                        type="file"
                        onChange={handleImageUpload}
                    />
                </Button>
                <TextField
                    id="outlined-textarea"
                    label="Caption"
                    placeholder="Caption"
                    multiline
                    fullWidth
                    style={{ marginTop: "1rem" }}
                    value={caption}
                    onChange={handleCaptionChange}
                />
                <br />
                {/* )} */}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="contained">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} variant="contained">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};
