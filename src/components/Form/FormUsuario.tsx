import Grid from '@mui/material/Grid';
import { ButtonBasic } from '../ButtonBasic';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form';
import { TextField } from '@mui/material'
import axios from 'axios'
import { TableInstrutor } from '../Table/TableInstrutor';
import { TableCurso } from '../Table/TableCurso';
import { TableUsuario } from '../Table/TableUsuario';

const usuarioFormSchema = z.object({
  codigo: z.number().optional(),
  nome: z.string().min(3, { message: 'O nome precisa ter pelomenos 3 letras' }),
  cpf: z.string().min(3, { message: 'O cpf inválido' }),
  email: z.string().email({message: "E-mail inválido"}),
  senha: z.string().min(3, { message: 'A senha precisa ter pelomenos 3 letras' }),
})
export type UsuarioFormData = z.infer<typeof usuarioFormSchema>

interface FormInstrutorProps {
  atualizaUsuario: boolean;
  setAtualizaUsuario: (state: boolean) => void;
}

export function FormUsuario({ setAtualizaUsuario, atualizaUsuario }: FormInstrutorProps) {
  const [clickUpdate, setClickUpdate] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UsuarioFormData>({
    resolver: zodResolver(usuarioFormSchema),
    defaultValues: {
      nome: '',
      cpf: '',
      codigo: undefined,
      email: '',
      senha: ''
    }
  })

  const onSubmit = async (data: UsuarioFormData) => {
    if(clickUpdate){
      await axios.put('/api/usuario', {
        codigo: data!.codigo,
        nome: data.nome,
        cpf: data.cpf,
        email: data.email,
        senha: data.senha
      })
        .then(function (response) {
          setAtualizaUsuario(true)
          setClickUpdate(false)
          reset({
            nome: '',
            cpf: '',
            codigo: undefined,
            email: '',
            senha: ''
          })
        })
    }else{
      await axios.post('/api/usuario', {
        nome: data.nome,
        cpf: data.cpf,
        email: data.email,
        senha: data.senha
      })
        .then(function (response) {
          reset()
          setAtualizaUsuario(true)
        })
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6}>
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
          <Grid item xs={6} sm={6}>
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
          <Grid item xs={6} sm={6}>
            <TextField
              {...register("email", { required: true })}
              label="E-mail"
              variant="outlined"
              color='secondary'
              error={errors.email ? true : false}
              helperText={errors.email && "Campo obrigatório"}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              {...register("senha", { required: true })}
              label="Senha"
              variant="outlined"
              color='secondary'
              type="password"
              error={errors.senha ? true : false}
              helperText={errors.senha && "Campo obrigatório"}
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
          <TableUsuario setClickUpdate={setClickUpdate} resetForm={reset} atualizaUsuario={atualizaUsuario} setAtualizaUsuario={setAtualizaUsuario} />
      </Grid>
    </>

  )
}