"use client";
import { InputBasic } from "@/components/InputBasic";
import { Button, Grid, Stack } from "@mui/material";
export default function Home() {
  return (
    <Grid sx={{
      marginTop: "1rem !important",
      maxWidth: '85.375rem',
      margin: '0 auto',
      width: '100%'
    }} container height="100vh" spacing={2}>
      <Grid
        item 
        xs={8}
        component="form"
      >
        <InputBasic 
          nome="nome"
          label="Nome"
        />
      </Grid>
    </Grid>
  );
}