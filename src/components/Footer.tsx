import Link from "next/link";

import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Box, Container, Divider, Grid } from "@mui/material";

export default function Footer() {
  return (
    <>
      <Divider
        sx={{ borderBottomWidth: 1, borderColor: "black", marginTop: "1rem" }}
      />
      <Box
        sx={{
          width: "100%",
          height: "auto",
          padding: "1rem 0",
        }}
      >
        <Container maxWidth="lg">
          <Grid container direction="column" alignItems="center">
            <Grid
              item
              xs={12}
              style={{
                fontSize: "1.5rem",
              }}
            >
              Carte Blanche
            </Grid>
            <Grid item xs={12}>
              Open to submissions at:{" "}
              <Link href="mailto:carte-blanche@brown.edu">
                carte-blanche@brown.edu
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "10px",
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
              2023 | Partnership with Full Stack at Brown
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
