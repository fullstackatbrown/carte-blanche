import {
    Autocomplete,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import IUser from "../../../types/IUser";

export interface IChangeRolesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ChangeRolesModal = (props: IChangeRolesModalProps) => {
    // deconstruct props variables
    const { isOpen, onClose } = props;
    // use session to get the user's email
    const { data: session, status } = useSession();

    // form states
    const [user, setUser] = useState<IUser>();
    const [listOfUsers, setListOfUsers] = useState<string[]>();
    const [emailValue, setEmailValue] = useState<string | null>();
    const [emailInputValue, setEmailInputValue] = useState("");
    const roles = ["admin", "writer", "reader"];
    const [newRoleValue, setNewRoleValue] = useState<string | null>();
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
            setListOfUsers(usersList);
        };

        getUser();
        getAllUsers();
    }, []);

    // function to update role for another user
    const updateRole = async () => {
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

    // called when the "Create" button is clicked
    const handleSubmit = async () => {
        updateRole();
        handleClose();
    };

    /** Reset all our state variables and close the modal */
    const handleClose = () => {
        onClose();
        setEmailValue("");
        setEmailInputValue("");
        setNewRoleValue("");
        setNewRoleInputValue("");
    };

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>Change Roles</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This is the administration page for changing user roles. Any
                    user with admin access can change the roles of other users,
                    including other admins.
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
                    style={{ marginTop: "1rem" }}
                    id="controllable-states-demo"
                    options={listOfUsers!}
                    getOptionDisabled={(option) => option === user?.email}
                    renderInput={(params) => (
                        <TextField {...params} label="Users (by email)" />
                    )}
                    fullWidth
                />
                <Autocomplete
                    value={newRoleValue}
                    onChange={(event: any, newValue: string | null) => {
                        setNewRoleValue(newValue);
                    }}
                    inputValue={newRoleInputValue}
                    onInputChange={(event, newInputValue) => {
                        setNewRoleInputValue(newInputValue);
                    }}
                    id="controllable-states-demo"
                    options={roles}
                    style={{ marginTop: "1rem" }}
                    renderInput={(params) => (
                        <TextField {...params} label="New Role" />
                    )}
                    fullWidth
                />
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
