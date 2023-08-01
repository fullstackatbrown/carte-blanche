import CreateIcon from "@mui/icons-material/Create";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Link from "next/link";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import type { User } from "@prisma/client";

interface PiecesSidebarProps {
  user?: User;
}

const actions = [
  {
    icon: (
      <Link href="/upload">
        <CreateIcon />
      </Link>
    ),
    name: "Create Content",
    roles: ["ADMIN", "WRITER"],
  },
  {
    icon: (
      <Link href="/accounts">
        <ManageAccountsIcon />
      </Link>
    ),
    name: "Manage Accounts",
    roles: ["ADMIN"],
  },
  {
    icon: <DashboardCustomizeIcon />,
    name: "Customize Dashboard",
    // onClick: () => setIsEditing(!isEditing),
    roles: ["ADMIN"],
  },
];

export default function PiecesSidebar({ user }: PiecesSidebarProps) {
  return (
    <div className="relative flex basis-1/4 justify-end bg-black p-10 text-right text-white">
      <div className="sticky top-1/3 h-min w-full">
        <p className="text-xl lowercase">Vous Avez</p>
        <h1 className="text-3xl font-extrabold uppercase">Carte Blanche</h1>
        {user?.role != "READER" && (
          <Box sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
            <div className="flex-1" />
            <SpeedDial
              ariaLabel="SpeedDial basic example"
              sx={{
                "& .MuiFab-root": {
                  backgroundColor: "#fff",
                },
                "& .MuiFab-root:hover": {
                  backgroundColor: "#a5a5a5",
                },
                "& .MuiSpeedDialAction-fab": {
                  backgroundColor: "#fff",
                },
              }}
              icon={<SpeedDialIcon style={{ color: "black" }} />}
            >
              {actions.map(
                (action) =>
                  action.roles.includes(user?.role ?? "READER") && (
                    <SpeedDialAction
                      key={action.name}
                      icon={action.icon}
                      tooltipTitle={action.name}
                      // onClick={action.onClick}
                    />
                  )
              )}
            </SpeedDial>
            <div className="flex-1" />
          </Box>
        )}
      </div>
    </div>
  );
}
