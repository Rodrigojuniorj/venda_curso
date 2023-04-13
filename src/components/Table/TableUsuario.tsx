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

type TableUsuarioData = {
  codigo: number;
  nome: string;
  cpf: string;
  email: string;
  senha: string;
}

interface TableUsuarioProps {
  atualizaUsuario: boolean;
  setAtualizaUsuario: (state: boolean) => void;
  resetForm: any,
  setClickUpdate: (props: boolean) => void;
}

export function TableUsuario({ atualizaUsuario, setAtualizaUsuario, setClickUpdate, resetForm }: TableUsuarioProps) {
  const [data, setData] = useState<TableUsuarioData[]>()
  const [msg, setMsg] = useState('Carregando...')

  async function handleData() {
    await axios.get('/api/usuario')
    .then(function (response) {
      setData(response.data),
      setAtualizaUsuario(false)
    })
  }

  useEffect(() => {
    handleData()
  },[atualizaUsuario])

  async function handleDelete(codigo: number){
    await axios.delete(`/api/usuario?codigo=${codigo}`)
    .then(function (response) {
      setAtualizaUsuario(true)
    })
  }
  
  async function handleUpdate(codigo: number, nome: string, cpf: string, email: string, senha: string){
    resetForm({
      codigo,
      cpf,
      nome,
      email,
      senha
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
            <TableCell>E-mail</TableCell>
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
              <TableCell>E-mail</TableCell>
              <TableCell>Ação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data!.map((row: TableUsuarioData) => (
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
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  <IconButton aria-label="delete" color='error' onClick={() => handleDelete(row.codigo)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton aria-label="delete" color='success' onClick={() => handleUpdate(row.codigo, row.nome, row.cpf, row.email, row.senha)}>
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