import { api } from "@CarteBlanche/utils/api";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

import { Create, Logout, ManageAccounts } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { Role } from "@prisma/client";

const navLinks = [
  <Link
    key="about"
    href="/#about"
    scroll={false}
    className="h-full w-full lowercase"
  >
    about
  </Link>,
  <Link key="pieces" href="/pieces" className="h-full w-full lowercase">
    pieces
  </Link>,
  <Link key="podcasts" href="/podcasts" className="h-full w-full lowercase">
    podcasts
  </Link>,
] as const;

export default function TopNav() {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data: session } = useSession();
  const { data: user } = api.user.getUser.useQuery(
    { id: session?.user.id },
    { refetchOnWindowFocus: false }
  );

  const canAccessAdmin = user?.role === Role.ADMIN;
  const canAccessWriter = canAccessAdmin || user?.role === Role.WRITER;
  return (
    <div className="sticky left-0 top-0 z-50 flex h-20 items-center justify-center bg-black px-8 text-lg text-white">
      <Link href="/" className="lowercase">
        C | B
      </Link>
      <div className="flex flex-grow" />
      <div className="md:hidden">
        <IconButton onClick={() => setDrawerOpen(true)}>
          <MenuIcon className="text-white" />
        </IconButton>
        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          anchor="right"
        >
          <Box
            sx={{ width: 200 }}
            role="presentation"
            onClick={() => setDrawerOpen(false)}
            onKeyDown={() => setDrawerOpen(false)}
          >
            <List>
              {navLinks.map((linkComponent) => (
                <ListItem key={linkComponent.key} disablePadding>
                  <ListItemButton>{linkComponent}</ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
          </Box>
        </Drawer>
      </div>
      <ul className="hidden items-center justify-center gap-7 md:flex">
        <Link href="/#about" scroll={false} className="lowercase">
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
              {canAccessWriter && (
                <Link href="/upload">
                  <MenuItem>
                    <ListItemIcon>
                      <Create />
                    </ListItemIcon>
                    Create Content
                  </MenuItem>
                </Link>
              )}
              {canAccessAdmin && (
                <Link href="/accounts">
                  <MenuItem>
                    <ListItemIcon>
                      <ManageAccounts />
                    </ListItemIcon>
                    Manage Accounts
                  </MenuItem>
                </Link>
              )}
              {canAccessWriter && <Divider />}
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
