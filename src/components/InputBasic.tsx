import { FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';
import { BaseTextFieldProps } from '@mui/material/TextField';


interface InputBaseProps {
  nome: string;
  label: string;
  variant?: 'standard' | 'outlined' | 'filled';
}

export function InputBasic({ nome, label, variant = "outlined" }: InputBaseProps){
  return (
    <TextField 
      id={nome} 
      label={label}
      variant={variant}
      color="secondary"
      fullWidth
    />
  )
}