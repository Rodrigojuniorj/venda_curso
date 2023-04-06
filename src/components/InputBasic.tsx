import { CpfMask } from '@/utils/Mascaras';
import { FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';


interface InputBaseProps {
  id: string;
  label: string;
  variant?: 'standard' | 'outlined' | 'filled';
  type?: "text", 
  mask?: "cpf" | "telefone"
}

export function InputBasic({ id, label, mask, variant = "outlined", type = "text" }: InputBaseProps){
  
  function inputMask(){
    if(mask === "cpf"){
      return CpfMask
    }
  }
  
  return (
    <TextField 
      id={id} 
      label={label}
      variant={variant}
      type={type}
      color="secondary"
      InputProps={{
        inputComponent: inputMask(),
      }}
      fullWidth
    />
  )
}