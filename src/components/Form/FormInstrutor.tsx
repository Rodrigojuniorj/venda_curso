import Grid from '@mui/material/Grid';
import { ButtonBasic } from '../ButtonBasic';
import { use, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material'
import axios from 'axios'
import { TableInstrutor } from '../Table/TableInstrutor';

const instrutorFormSchema = z.object({
  codigo: z.number().optional(),
  nome: z.string().min(3, { message: 'O nome precisa ter pelomenos 3 letras' }),
  cpf: z.string().min(3, { message: 'O cpf inválido' }),
})
export type InstrutorFormData = z.infer<typeof instrutorFormSchema>

interface FormInstrutorProps {
  atualizaInstrutor: boolean;
  setAtualizaInstrutor: (state: boolean) => void;
}

export function FormIntrutor({ setAtualizaInstrutor, atualizaInstrutor }: FormInstrutorProps) {
  const [clickUpdate, setClickUpdate] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InstrutorFormData>({
    resolver: zodResolver(instrutorFormSchema),
    defaultValues: {
      nome: '',
      cpf: '',
      codigo: undefined
    }
  })

  const onSubmit = async (data: InstrutorFormData) => {
    if(clickUpdate){
      await axios.put('/api/instrutor', {
        codigo: data!.codigo,
        nome: data.nome,
        cpf: data.cpf
      })
        .then(function (response) {
          setAtualizaInstrutor(true)
          setClickUpdate(false)
          reset({
            nome: '',
            cpf: '',
            codigo: undefined
          })
        })
    }else{
      await axios.post('/api/instrutor', {
        nome: data.nome,
        cpf: data.cpf
      })
        .then(function (response) {
          reset()
          setAtualizaInstrutor(true)
        })
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={4} sm={4}>
            <TextField
              {...register("nome", { required: true })}
              label="Nome"
              variant="outlined"
              error={errors.nome ? true : false}
              helperText={errors.nome && "Campo obrigatório"}
              color='secondary'
              fullWidth
            />
          </Grid>
          <Grid item xs={4} sm={4}>
            <TextField
              {...register("cpf", { required: true })}
              label="cpf"
              variant="outlined"
              color='secondary'
              error={errors.cpf ? true : false}
              helperText={errors.cpf && "Campo obrigatório"}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <ButtonBasic
              type="submit"
              variant="contained"
              color="secondary"
              texto='Enviar'
              sx={{
                height: '3.4rem'
              }}
            />
          </Grid>
        </Grid>
      </form>
      <Grid container sx={{
          marginTop: '5rem'
        }} >
          <TableInstrutor setClickUpdate={setClickUpdate} resetForm={reset} atualizaInstrutor={atualizaInstrutor} setAtualizaInstrutor={setAtualizaInstrutor} />
      </Grid>
    </>

  )
}