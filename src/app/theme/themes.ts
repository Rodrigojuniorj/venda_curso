import { Roboto } from 'next/font/google'
import { createTheme } from '@mui/material'
import { red } from '@mui/material/colors'

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
})

declare module '@mui/material/styles' {
  interface Palette {
    custom: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    custom?: PaletteOptions['primary'];
  }
}

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: '#ccc',
    },
    secondary: {
      main: '#F39302',
    },
    custom: {
      main: '#fff'
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
})
