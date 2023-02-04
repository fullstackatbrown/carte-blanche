import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.scss";
import { FaBars } from "react-icons/fa";
import { signIn, signOut, useSession } from "next-auth/react";
import {
    Avatar,
    Divider,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Tooltip,
} from "@mui/material";
import { PersonAdd, Settings, Logout } from "@mui/icons-material";
import IUser from "../../types/IUser";

export default function Navbar() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        signOut();
    };

    const { data: session, status } = useSession();
    const [user, setUser] = useState<IUser>();
    const [canAccessAdmin, setCanAccessAdmin] = useState(false);
    const [canAccessWriter, setCanAccessWriter] = useState(false);
    useEffect(() => {
        const getUser = async () => {
            const user = await fetch("/api/user/getUser", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const userJson = await user.json();
            setUser(userJson.user);
            if (userJson.user?.role === "admin") {
                setCanAccessAdmin(true);
                setCanAccessWriter(true);
            }
            if (userJson.user?.role === "writer") {
                setCanAccessWriter(true);
            }
        };

        // const updateUserRole = async () => {
        //     const user = await fetch("/api/user/changeRole", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({
        //             role: "admin",
        //         }),
        //     });
        //     const userJson = await user.json();
        //     setUser(userJson.user);
        // };

        getUser();
        // updateUserRole();
    }, []);

    return (
        <div className={styles.topNavigation}>
            <a href="/">
                <img
                    className={styles.logo}
                    alt="logo"
                    src="https://www.tailorbrands.com/wp-content/uploads/2020/07/mcdonalds-logo.jpg"
                />
            </a>
            <div className="space" />
            <div className={styles.navLinks}>
                <a href="pieces">Pieces</a>
                <a href="about">About</a>
                {canAccessAdmin ? <a href="admin">Admin</a> : null}
                {canAccessWriter ? <a href="writer">Upload</a> : null}
                {status === "authenticated" ? (
                    <>
                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 0 }}
                                aria-controls={
                                    open ? "account-menu" : undefined
                                }
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                            >
                                <img
                                    src={session.user!.image!}
                                    alt="profile pic"
                                    className={styles.profilePic}
                                />
                            </IconButton>
                        </Tooltip>
                    </>
                ) : (
                    <div onClick={() => signIn()}>Login</div>
                )}
            </div>
            <div className={styles.navLinksMini} id="navLinksMini">
                <a href="pieces">Pieces</a>
                <a href="about">About</a>
                <a href="login" onClick={() => signIn()}>
                    Login
                </a>
            </div>
            <div
                className={styles.hamburgerIcon}
                onClick={() => {
                    const sidebar = document.querySelector("#navLinksMini");
                    sidebar!.classList.toggle(styles.open);
                }}
            >
                <FaBars className={styles.hamburger} />
            </div>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem onClick={handleClose}>
                    <Avatar /> Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </div>
    );
}
