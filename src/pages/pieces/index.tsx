import { api } from "@CarteBlanche/utils/api";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import CircularSpinner from "@CarteBlanche/components/CircularSpinner";
import TopNav from "@CarteBlanche/components/TopNav";
import CreateIcon from "@mui/icons-material/Create";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const Pieces: NextPage = () => {
  const { data: session } = useSession();

  const { data: user } = api.user.getUser.useQuery(
    { id: session?.user.id },
    { refetchOnWindowFocus: false }
  );

  const isWriterOrAdmin = user?.role === "ADMIN" || user?.role === "WRITER";
  const [isEditing, setIsEditing] = useState(false);

  const [colScale, setColScale] = useState(12);
  const maxPiecesPerRow = 3;
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1200) {
        setColScale(12 / maxPiecesPerRow);
      } else if (window.innerWidth > 996) {
        setColScale(10 / maxPiecesPerRow);
      } else if (window.innerWidth > 768) {
        setColScale(6 / maxPiecesPerRow);
      } else if (window.innerWidth > 480) {
        setColScale(4 / maxPiecesPerRow);
      } else {
        setColScale(2 / maxPiecesPerRow);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const router = useRouter();

  const actions = [
    {
      icon: <CreateIcon />,
      name: "Create Content",
      onClick: () => {
        void router.push("/upload");
      },
      roles: ["ADMIN", "WRITER"],
    },
    {
      icon: <ManageAccountsIcon />,
      name: "Manage Accounts",
      onClick: () => {
        void router.push("/accounts");
      },
      roles: ["ADMIN"],
    },
    {
      icon: <DashboardCustomizeIcon />,
      name: "Customize Dashboard",
      onClick: () => setIsEditing(!isEditing),
      roles: ["ADMIN"],
    },
  ];

  /**
   * Handles saving of the grid layout
   */
  const saveGridLayout = () => {
    alert("Not implemented yet!");
    setIsEditing(false);
  };

  const {
    data: pieces,
    isLoading,
    error,
  } = api.content.getAllTextAndImageContent.useQuery(
    {},
    { refetchOnWindowFocus: false }
  );

  if (isLoading || !pieces) {
    return <CircularSpinner />;
  }
  if (error) {
    return <p>Oh no... {error.message}</p>;
  }
  return (
    <>
      <TopNav />
      {isEditing && (
        <div className="bg-cyan-300">
          <h1>EDITING MODE</h1>
          <Button onClick={() => setIsEditing(!isEditing)}>Cancel</Button>
          <Button onClick={saveGridLayout}>Save</Button>
        </div>
      )}
      <div className="m-4 flex">
        <div className="absolute top-1/2">
          <p className="text-transform: lowercase">Vous Avez</p>
          <h1 className="text-transform: uppercase">Carte Blanche</h1>
          {isWriterOrAdmin && (
            <Box
              sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}
            >
              <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{
                  position: "absolute",
                  bottom: 16,
                  right: 16,
                  "& .MuiFab-root": {
                    backgroundColor: "#3576cb",
                  },
                  "& .MuiSpeedDialAction-fab": {
                    backgroundColor: "#fff",
                  },
                }}
                icon={<SpeedDialIcon />}
              >
                {actions.map(
                  (action) =>
                    action.roles.includes(user.role) && (
                      <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={action.onClick}
                      />
                    )
                )}
              </SpeedDial>
            </Box>
          )}
        </div>
        <ResponsiveGridLayout
          key={isEditing.toString()}
          className="layout"
          rowHeight={30}
          width={1200}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        >
          {pieces.map((piece, idx) => {
            return (
              <div
                key={piece.id}
                data-grid={{
                  x: 4 + colScale * (idx % colScale),
                  y: colScale * (idx / colScale),
                  w: 3,
                  h: 8,
                  maxW: 3,
                  maxH: 10,
                  static: !isEditing,
                }}
                className="cursor-pointer transition duration-500 hover:scale-110"
              >
                <Link href={`/pieces/${piece.id}`} key={piece.id}>
                  <img
                    src={piece.imgURL}
                    className="h-full w-full bg-gray-50 object-cover "
                  />
                  {piece.type === "TEXT" && (
                    <p className="absolute bottom-0 right-0">Article</p>
                  )}
                </Link>
              </div>
            );
          })}
        </ResponsiveGridLayout>
      </div>
    </>
  );
};

export default Pieces;
