import React, { useState } from "react";
import {
  Avatar,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";
import { api } from "@CarteBlanche/utils/api";

export default function TopNav() {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const { data: session } = useSession();
  const { data: user } = api.user.getUser.useQuery(
    { id: session?.user.id },
    { refetchOnWindowFocus: false }
  );

  return (
    <div className="sticky left-0 top-0 flex items-center justify-center bg-black px-4 py-2 text-lg text-white">
      <Link href="/" className="lowercase">
        C | B
      </Link>
      <div className="flex flex-grow" />
      <ul className="flex items-center justify-center gap-7">
        <Link href="#about" scroll={false} className="lowercase">
          about
        </Link>
        <div className="aspect-square w-3 rounded-full bg-white"></div>
        <Link href="/pieces" className="lowercase">
          pieces
        </Link>
        <div className="aspect-square w-3 rounded-full bg-white"></div>
        <Link href="/podcasts" className="lowercase">
          podcasts
        </Link>
        <div className="aspect-square w-3 rounded-full bg-white"></div>
        {user ? (
          <>
            <Tooltip title="Account">
              <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)}>
                <Avatar src={user.image ?? undefined} />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClick={() => setMenuAnchor(null)}
            >
              <MenuItem
                onClick={() => {
                  setMenuAnchor(null);
                  void signOut();
                }}
              >
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <button onClick={() => void signIn("google")}>log in</button>
        )}
      </ul>
    </div>
  );
}
