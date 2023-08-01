import CreateIcon from "@mui/icons-material/Create";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import type { User } from "@prisma/client";

interface PiecesSidebarProps {
  user?: User;
  backArrow?: boolean;
  setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PiecesSidebar({
  user,
  backArrow,
  setIsEditing,
}: PiecesSidebarProps) {
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
      onClick: () =>
        setIsEditing ? setIsEditing((isEditing) => !isEditing) : null,
      roles: ["ADMIN"],
    },
  ];

  return (
    <div className="relative hidden basis-1/4 justify-end bg-black p-10 text-right text-white md:flex">
      <div className="sticky top-1/3 h-min w-full">
        <p className="text-xl lowercase">Vous Avez</p>
        <h1 className="text-3xl font-extrabold uppercase">Carte Blanche</h1>
        <div className="h-20" />
        {user && user.role != "READER" && (
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
                      onClick={action.onClick}
                    />
                  )
              )}
            </SpeedDial>
            <div className="flex-1" />
          </Box>
        )}
      </div>
      {backArrow && (
        <Link className="fixed bottom-10 h-min" href="//pieces">
          <ArrowBackIcon
            style={{
              height: "50px",
              width: "50px",
            }}
          />
        </Link>
      )}
    </div>
  );
}
