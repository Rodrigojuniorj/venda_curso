"use client";
import { ReactNode } from "react";
import { theme } from "./theme/themes";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Header } from "@/components/Header";
import './global.css'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <ThemeProvider theme={theme}>
        
        <CssBaseline />
        <body>
          <Header/>
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}