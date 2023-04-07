import { FormControl } from '@mui/material';
import Button from '@mui/material/Button';
import { ButtonProps } from '@mui/material/Button/Button';

interface InputBaseProps {
  texto: string;
  variant?: 'contained' | 'outlined' | 'text' ;
  color?: 'error' | "info" | "success" | "primary" | "secondary" | "warning"
  type?: "button" | "submit" | "reset" 
}

export function ButtonBasic({ texto, variant = "contained", color = "primary", type = "button", ...rest }: InputBaseProps){
  return (
    <Button 
      variant={variant}
      color={color}
      fullWidth
      {...rest}
      type={type}
    >
      {texto}
    </Button>
  )
}