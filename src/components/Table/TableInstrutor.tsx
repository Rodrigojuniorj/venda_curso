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

type TableInstrutorData = {
  codigo: number;
  nome: string;
  cpf: string;
}

interface TableInstrutorProps {
  atualizaInstrutor: boolean;
  setAtualizaInstrutor: (state: boolean) => void;
  resetForm: any,
  setClickUpdate: (props: boolean) => void;
}

export function TableInstrutor({ atualizaInstrutor, setAtualizaInstrutor, setClickUpdate, resetForm }: TableInstrutorProps) {
  const [data, setData] = useState<TableInstrutorData[]>()
  const [msg, setMsg] = useState('Carregando...')

  async function handleData() {
    await axios.get('/api/instrutor')
    .then(function (response) {
      setData(response.data),
      setAtualizaInstrutor(false)
    })
  }

  useEffect(() => {
    handleData()
  },[atualizaInstrutor])

  async function handleDelete(codigo: number){
    await axios.delete(`/api/instrutor?codigo=${codigo}`)
    .then(function (response) {
      setAtualizaInstrutor(true)
    })
  }
  
  async function handleUpdate(codigo: number, nome: string, cpf: string){
    resetForm({
      codigo,
      cpf,
      nome
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
            <TableCell>CPF</TableCell>
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
              <TableCell>CPF</TableCell>
              <TableCell>Ação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data!.map((row: TableInstrutorData) => (
              <TableRow
                key={row.codigo}
              >
                <TableCell component="th" scope="row">
                  {row.codigo}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.nome}
                </TableCell>
                <TableCell>{row.cpf}</TableCell>
                <TableCell>
                  <IconButton aria-label="delete" color='error' onClick={() => handleDelete(row.codigo)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton aria-label="delete" color='success' onClick={() => handleUpdate(row.codigo, row.nome, row.cpf)}>
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