import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

type TableCursoData = {
  codigo: number;
  nome: string;
  cargaHoraria: number;
  precoUnitario: number;
  instrutor: {
    codigo: number;
    nome: string;
    cpf: string;
  };
}

interface TableCursoProps {
  atualizaCurso: boolean;
  setAtualizaCurso: (state: boolean) => void;
  resetForm: any,
  setClickUpdate: (props: boolean) => void;
}

export function TableCurso({ atualizaCurso, setAtualizaCurso, setClickUpdate, resetForm }: TableCursoProps) {
  const [data, setData] = useState<TableCursoData[]>()
  const [msg, setMsg] = useState('Carregando...')

  async function handleData() {
    await axios.get('/api/curso')
    .then(function (response) {
      console.log(response.data)
      setData(response.data),
      setAtualizaCurso(false)
    })
  }

  useEffect(() => {
    handleData()
  },[atualizaCurso])

  async function handleDelete(codigo: number){
    await axios.delete(`/api/curso?codigo=${codigo}`)
    .then(function (response) {
      setAtualizaCurso(true)
    })
  }
  
  async function handleUpdate({ codigo, cargaHoraria, instrutor , nome, precoUnitario }: TableCursoData){
    resetForm({
      codigo,
      nome,
      cargaHoraria,
      precoUnitario,
    })
    setClickUpdate(true)
  }

  if(!data){
    return (
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Código</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Carga Horária</TableCell>
            <TableCell>Preço Unitário</TableCell>
            <TableCell>Instrutor</TableCell>
            <TableCell>Ação</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              {msg}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>)
  }

  return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Carga Horária</TableCell>
              <TableCell>Preço Unitário</TableCell>
              <TableCell>Instrutor</TableCell>
              <TableCell>Ação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data!.map((row: TableCursoData) => (
              <TableRow
                key={row.codigo}
              >
                <TableCell component="th" scope="row">
                  {row.codigo}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.nome}
                </TableCell>
                <TableCell>{row.cargaHoraria}</TableCell>
                <TableCell>{row.precoUnitario}</TableCell>
                <TableCell>{row.instrutor.nome}</TableCell>
                <TableCell>
                  <IconButton aria-label="delete" color='error' onClick={() => handleDelete(row.codigo)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton aria-label="delete" color='success' onClick={() => handleUpdate(row)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}