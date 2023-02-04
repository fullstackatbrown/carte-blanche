import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Admin.module.scss";
import { FaBars } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import Navbar from "../src/components/Navbar";
import { useSession } from "next-auth/react";
import IUser from "../types/IUser";
import {
    Autocomplete,
    Box,
    Button,
    CircularProgress,
    Fab,
    TextField,
} from "@mui/material";
import { green } from "@mui/material/colors";

const Admin: NextPage = () => {
    const { data: session, status } = useSession({ required: true });
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
        <>
            <Navbar />
            {status === "authenticated" && isAdmin ? (
                <div className={styles.aboutContent}>
                    <h1>Admin Page</h1>
                    <div className={styles.buttonContainer}>
                        {/* <div>{`value: ${
                            emailValue !== null ? `'${emailValue}'` : "null"
                        }`}</div>
                        <div>{`inputValue: '${emailInputValue}'`}</div>
                        <br /> */}
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
                            getOptionDisabled={(option) =>
                                option === user?.email
                            }
                            sx={{ width: 500 }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Users (by email)"
                                />
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
                    </div>
                </div>
            ) : (
                <div className={styles.aboutContent}>
                    <h1>
                        Admin Page. You don't have the right permissions to view
                        this page.
                    </h1>
                </div>
            )}
        </>
    );
};

export default Admin;

// export const getServerSideProps = async (
//     context: GetSessionParams | undefined
// ) => {
//     const session = await getSession(context);
//     return {
//         props: {
//             session,
//         },
//     };
// };
