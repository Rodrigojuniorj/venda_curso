import Grid from '@mui/material/Grid';
import { ButtonBasic } from '../ButtonBasic';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form';
import { TextField } from '@mui/material'
import axios from 'axios'
import { TableCurso } from '../Table/TableCurso';

type TableInstrutorData = {
  codigo: number;
  nome: string;
  cpf: string;
}

const cursoFormSchema = z.object({
  codigo: z.number().optional(),
  nome: z.string().min(3, { message: 'O nome precisa ter pelomenos 3 letras' }),
  cargaHoraria: z.string(),
  precoUnitario: z.string(),
  instrutor: z.string().nonempty()
})
export type CursoFormData = z.infer<typeof cursoFormSchema>

interface FormCursoProps {
  atualizaCurso: boolean;
  setAtualizaCurso: (state: boolean) => void;
}

export function FormCurso({ setAtualizaCurso, atualizaCurso }: FormCursoProps) {
  const [clickUpdate, setClickUpdate] = useState(false);
  const [instrutor, setInstrutor] = useState<TableInstrutorData[]>([])

  async function dataInstrutor(){
    await axios.get('/api/instrutor')
    .then(function (response) {
      setInstrutor([
        {
          codigo: 0,
          nome: '',
          cpf: ''
        },
        ...response.data
      ])
    })
  }

  useEffect(() => {
    dataInstrutor()
  }, [])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CursoFormData>({
    resolver: zodResolver(cursoFormSchema),
    defaultValues: {
      codigo: undefined,
      nome: '',
      cargaHoraria: '',
      precoUnitario: '',
      instrutor: ''
    }
  })

  const onSubmit = async (data: CursoFormData) => {
    if(clickUpdate){
      await axios.put('/api/curso', {
        codigo: data.codigo,
        nome: data.nome,
        cargaHoraria: parseInt(data.cargaHoraria),
        precoUnitario: parseFloat(data.precoUnitario),
        instrutor: parseInt(data.instrutor)
      })
        .then(function (response) {
          setAtualizaCurso(true)
          setClickUpdate(false)
          reset()
        })
    }else{
      await axios.post('/api/curso', {
        nome: data.nome,
        cargaHoraria: parseInt(data.cargaHoraria),
        precoUnitario: parseFloat(data.precoUnitario),
        instrutor: parseInt(data.instrutor)
      })
        .then(function (response) {
          reset()
          setAtualizaCurso(true)
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
              {...register("cargaHoraria", { required: true })}
              label="Carga Horária"
              variant="outlined"
              color='secondary'
              error={errors.cargaHoraria ? true : false}
              helperText={errors.cargaHoraria && "Campo obrigatório"}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              {...register("precoUnitario", { required: true })}
              label="Preço Unitário"
              variant="outlined"
              color='secondary'
              error={errors.precoUnitario ? true : false}
              helperText={errors.precoUnitario && "Campo obrigatório"}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              {...register("instrutor", { required: true })}
              label="instrutor"
              variant="outlined"
              color='secondary'
              error={errors.instrutor ? true : false}
              helperText={errors.instrutor && "Campo obrigatório"}
              fullWidth
              select
              defaultValue="Escolha um"
              SelectProps={{
                native: true,
              }}
            >
              {instrutor.map((option) => (
                <option key={option.codigo} value={option.codigo}>
                  {option.nome}
                </option>
              ))}
            </TextField>
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
          <TableCurso setClickUpdate={setClickUpdate} resetForm={reset} atualizaCurso={atualizaCurso} setAtualizaCurso={setAtualizaCurso} />
      </Grid>
    </>

  )
}