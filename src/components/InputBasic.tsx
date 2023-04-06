import TextField from '@mui/material/TextField';
import InputMask from 'react-input-mask';

interface InputBaseProps {
  id: string;
  label: string;
  variant?: 'standard' | 'outlined' | 'filled';
  type?: "text", 
  mask?: "cpf" | "telefone"
}

export function InputBasic({ id, label, mask, variant = "outlined", type = "text" }: InputBaseProps){
  
  function maskInput(){
    if(mask === "cpf"){
      return "999.999.999-99"
    }
    return ''
  }
  
  return (
    <InputMask
      mask={maskInput()}
      // value={value}
      // onChange={handleChange}
      // onBlur={handleBlur}
    >
      {(inputProps: any) => {
        return (
          <TextField
            id={id}
            label={label}
            variant={variant}
            type={type}
            color="secondary"
            fullWidth
            {...inputProps} />
        );
      }}
    </InputMask>
    
  )
}