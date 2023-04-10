const soap = require('soap')

type Curso = {
  cargaHoraria?: number;
  codigo?: number;
  instrutor?: {
    codigo?: number;
    cpf?: string;
    nome?: string;
  };
  nome?: string;
  precoUnitario?: number;
};

export async function GET(request: Request) {
  const url = 'http://127.0.0.1:8080/curso-ws?wsdl'

  const client = await new Promise<any>((resolve, reject) => {
    soap.createClient(url, (err: any, client: any) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(client)
      }
    })
  })

  const result = await new Promise<any>((resolve, reject) => {
    client.listarCurso((err: any, result: any) => {
      if (err) {
        reject(err)
      }
      else {
        try{
          resolve(result.return)
        }
        catch (e) {
          resolve([])
        }
      }
    })
  })

  return new Response(JSON.stringify(result), { status: 200 })
}

export async function POST(request: Request) {
  const data: Curso = await request.json()
  const { cargaHoraria, instrutor, nome, precoUnitario } = data

  const url = 'http://127.0.0.1:8080/curso-ws?wsdl'

  await soap.createClient(url, (err: any, client: any) => {
    if (err) {
      console.log(err)
    }
    else {
      client.salvarCurso({
        curso: {
          cargaHoraria,
          instrutor: {
            codigo: instrutor?.codigo,
            cpf: instrutor?.cpf,
            nome: instrutor?.nome
          },
          nome,
          precoUnitario
        }
      }, (err: any, result: any) => {
        if (err) {
          console.log(err)
        }
      })
    }
  })

  return new Response('Dados enviados com sucesso!', { status: 200 });
}

export async function PUT(request: Request) {
  const data: Curso = await request.json()
  const { cargaHoraria, codigo, instrutor, nome, precoUnitario } = data

  const url = 'http://127.0.0.1:8080/curso-ws?wsdl'

  await soap.createClient(url, (err: any, client: any) => {
    if (err) {
      console.log(err)
    }
    else {
      client.editarCurso({
        curso: {
          codigo,
          cargaHoraria,
          instrutor: {
            codigo: instrutor?.codigo,
            cpf: instrutor?.cpf,
            nome: instrutor?.nome
          },
          nome,
          precoUnitario
        }
      }, (err: any, result: any) => {
        if (err) {
          console.log(err)
        }
      })
    }
  })

  return new Response('Dados enviados com sucesso!', { status: 200 });
}

export async function DELETE(request: Request){
  const codigo = request.url.split('codigo=')[1]
  const url = 'http://127.0.0.1:8080/curso-ws?wsdl'

  await soap.createClient(url, (err: any, client: any) => {
    if (err) {
      console.log(err)
    }
    else {
      client.deleteCurso({
        codigo: codigo
      }, (err: any, result: any) => {
        if (err) {
          console.log(err)
        }
      })
    }
  })

  return new Response('Dados enviados com sucesso!', { status: 200 });
}