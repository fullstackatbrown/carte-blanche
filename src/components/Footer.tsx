import Link from "next/link";

import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Box, Container, Divider, Grid } from "@mui/material";

export default function Footer() {
  return (
    <>
      {/* <Divider
        sx={{ borderBottomWidth: 1, borderColor: "black", marginTop: "1rem" }}
      /> */}
      <Box
        sx={{
          width: "100%",
          height: "auto",
          padding: "1rem 0",
          backgroundColor: "black",
        }}
      >
        <Container maxWidth="lg">
          <Grid container direction="column" alignItems="center" gap="0.2rem">
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "10px",
                  color: "white",
                }}
              >
                <Link href="https://www.instagram.com/" target="_blank">
                  <InstagramIcon />
                </Link>
                <Link href="https://www.youtube.com/" target="_blank">
                  <YouTubeIcon />
                </Link>
                <Link href="https://www.linkedin.com/" target="_blank">
                  <LinkedInIcon />
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <span className="text-xs text-white md:text-lg">
                2023 | Partnership with Full Stack at Brown
              </span>
            </Grid>
            <Grid item xs={12}>
              <span className="text-xs text-white md:text-lg">
                Open to submissions at:{" "}
                <Link href="mailto:carte-blanche@brown.edu">
                  carte-blanche@brown.edu
                </Link>
              </span>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
