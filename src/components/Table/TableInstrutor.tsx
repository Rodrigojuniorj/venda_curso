import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import axios from 'axios'

type TableInstrutorData = {
  codigo: number;
  nome: string;
  cpf: string;
}

interface TableInstrutorProps {
  atualizaInstrutor: boolean;
  setAtualizaInstrutor: (state: boolean) => void;
}

export function TableInstrutor({ atualizaInstrutor, setAtualizaInstrutor }: TableInstrutorProps) {
  const [data, setData] = useState<TableInstrutorData[]>()

  useEffect(() => {
    axios.get('/api/instrutor')
    .then(function (response) {
      setData(response.data),
      setAtualizaInstrutor(false)
    })
  },[atualizaInstrutor])

  if(!data){
    return <p>Carregando...</p>
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Código</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>CPF</TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}