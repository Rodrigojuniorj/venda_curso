import Box from "@mui/material/Box/Box"
import { ReactNode } from 'react';

interface FormsProps {
  children: ReactNode;
}

export function Forms({ children }: FormsProps){
  return (
    <Box sx={{ 
      flexGrow: 1,
      marginTop: "1rem !important",
      maxWidth: '85.375rem',
      margin: '0 auto',
      width: '100%'
    }}>
      {children}
    </Box>
  )
}