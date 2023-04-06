import Grid from '@mui/material/Grid';
import { InputBasic } from "@/components/InputBasic"
import { ButtonBasic } from '../ButtonBasic';

export function FormIntrutor(){
  return (
    <Grid container spacing={2} component="form">
      <Grid sx={{ width: '100%' }} item xs={12} >
        <Grid xs={4}>
          <InputBasic 
            id="nome"
            label="Nome"
          />
        </Grid>
      </Grid>
      <Grid sx={{ width: '100%' }} item xs={12} >
        <Grid xs={4}>
          <InputBasic 
            id="cpf"
            label="CPF"
            mask='cpf'
          />
        </Grid>
      </Grid>
      <Grid sx={{ width: '100%' }} item xs={12} >
        <Grid xs={4}>
          <ButtonBasic 
            texto='Enviar'
            color='secondary'
          />
        </Grid>
      </Grid>
    </Grid>
  )
}