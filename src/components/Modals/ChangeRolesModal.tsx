import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    MenuItem,
    Autocomplete,
    Box,
    CircularProgress,
} from "@mui/material";
import { green } from "@mui/material/colors";
import { useSession } from "next-auth/react";
import { title } from "process";
import React, { useEffect, useState } from "react";
import { NodeType, nodeTypes } from "../../../types/IContent";
import IUser from "../../../types/IUser";
import styles from "./CreateContentModal.module.scss";

export interface IChangeRolesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

/**
 * Modal for adding a new node; lets the user choose a title, type,
 * and parent node
 */
export const ChangeRolesModal = (props: IChangeRolesModalProps) => {
    // deconstruct props variables
    const { isOpen, onClose } = props;

    // use session to get the user's email
    const { data: session, status } = useSession();

    const [user, setUser] = useState<IUser>();
    const [listOfUsers, setListOfUsers] = useState<string[]>([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const roles = ["admin", "writer", "reader"];

    // form states
    const [emailValue, setEmailValue] = useState<string | null>(
        listOfUsers![0]
    );
    const [emailInputValue, setEmailInputValue] = useState("");
    const [newRoleValue, setNewRoleValue] = useState<string | null>(roles[2]);
    const [newRoleInputValue, setNewRoleInputValue] = useState("");

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
            if (userJson.user?.role === "admin") {
                setIsAdmin(true);
            }
        };
        const getAllUsers = async () => {
            const users = await fetch("/api/user/getAllUsers", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const usersJson = await users.json();
            const usersList = usersJson.users.map((ele: IUser) => {
                return ele.email;
            });
            console.log(user);
            setListOfUsers(usersList);
        };

        getUser();
        getAllUsers();
    }, []);

    // function to update role for another user
    const updateRole = async () => {
        if (!loading) {
            setLoading(true);
            timer.current = window.setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
        const changeRoleResponse = await fetch("/api/user/changeRole", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: emailValue,
                role: newRoleValue,
            }),
        });
        const changeRoleResponseJson = await changeRoleResponse.json();
        if (!changeRoleResponseJson.success) {
            return;
        }
    };

    const [loading, setLoading] = React.useState(false);
    const timer = React.useRef<number>();

    useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>Upload Content</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    We are glad that you want to upload content to our platform.
                    Please fill out the form below to get started.
                </DialogContentText>
                <Autocomplete
                    value={emailValue}
                    onChange={(event: any, newValue: string | null) => {
                        setEmailValue(newValue);
                    }}
                    inputValue={emailInputValue}
                    onInputChange={(event, newInputValue) => {
                        setEmailInputValue(newInputValue);
                    }}
                    id="controllable-states-demo"
                    options={listOfUsers!}
                    getOptionDisabled={(option) => option === user?.email}
                    sx={{ width: 500 }}
                    renderInput={(params) => (
                        <TextField {...params} label="Users (by email)" />
                    )}
                />
                <Autocomplete
                    value={emailValue}
                    onChange={(event: any, newValue: string | null) => {
                        setNewRoleValue(newValue);
                    }}
                    inputValue={newRoleInputValue}
                    onInputChange={(event, newInputValue) => {
                        setNewRoleInputValue(newInputValue);
                    }}
                    id="controllable-states-demo"
                    options={roles!}
                    sx={{ width: 500 }}
                    renderInput={(params) => (
                        <TextField {...params} label="New Role" />
                    )}
                />
                <Box sx={{ m: 1, position: "relative" }}>
                    <Button
                        variant="contained"
                        disabled={loading}
                        onClick={updateRole}
                    >
                        Submit
                    </Button>
                    {loading && (
                        <CircularProgress
                            size={24}
                            sx={{
                                color: green[500],
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                marginTop: "-8px",
                                marginLeft: "-12px",
                            }}
                        />
                    )}
                </Box>
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
                {selectedType && isImage && (
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
                )}
                {selectedType && isText && (
                    <TextField
                        id="outlined-multiline-static"
                        label="Text Content"
                        multiline
                        fullWidth
                        style={{ marginTop: "1rem" }}
                        rows={10}
                        value={content}
                        placeholder={textPlaceholder}
                        onChange={handleTextContentChange}
                    />
                )}
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
