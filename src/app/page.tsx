"use client";
import { Banner } from "@/components/Banner";
import { Button, Grid, Stack } from "@mui/material";
export default function Home() {
  return (
    <Grid sx={{
      marginTop: "1rem !important",
      maxWidth: '85.375rem',
      margin: '0 auto',
      width: '100%'
    }} container height="100vh" direction="column" spacing={2}>
      <Banner />
    </Grid>
  );
}