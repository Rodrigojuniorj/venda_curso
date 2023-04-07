import Grid from '@mui/material/Grid';
import { ButtonBasic } from '../ButtonBasic';
import { use, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form';
import { Button, TextField } from  '@mui/material'
const instrutorFormSchema = z.object({
  nome: z.string().min(3, { message: 'O nome precisa ter pelomenos 3 letras' }),
  cpf: z.string().min(3, { message: 'O cpf precisa ter pelomenos 3 letras' }),
})

type InstrutorFormData = z.infer<typeof instrutorFormSchema>

interface FormInstrutorProps{
  handleSubmitInstrutor: () => void;
}

export function FormIntrutor({ handleSubmitInstrutor }: FormInstrutorProps){
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<InstrutorFormData>({
    resolver: zodResolver(instrutorFormSchema),
  })

  const onSubmit = (data: InstrutorFormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register("nome", { required: true })}
            label="Nome"
            variant="outlined"
            error={errors.nome ? true : false}
            helperText={errors.nome && "Campo obrigatório"}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register("cpf", { required: true })}
            label="cpf"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Enviar
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}