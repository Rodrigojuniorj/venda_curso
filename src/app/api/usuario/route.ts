const soap = require('soap')

type Usuario = {
  codigo?: number;
  cpf?: string;
  email?: string;
  nome?: string;
  senha?: string;
};

export async function GET(request: Request) {
  const url = 'http://127.0.0.1:8080/usuario-ws?wsdl'

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
    client.listarUsuario((err: any, result: any) => {
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
  const data: Usuario  = await request.json()
  const { nome, cpf, email, senha } = data

  const url = 'http://127.0.0.1:8080/usuario-ws?wsdl'

  await soap.createClient(url, (err: any, client: any) => {
    if (err) {
      console.log(err)
    }
    else {
      client.salvarUsuario({
        usuario: {
          cpf,
          email,
          nome,
          senha
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
  const url = 'http://127.0.0.1:8080/usuario-ws?wsdl'

  await soap.createClient(url, (err: any, client: any) => {
    if (err) {
      console.log(err)
    }
    else {
      client.deleteUsuario({
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

export async function PUT(request: Request) {
  const data: Usuario  = await request.json()
  const { codigo, nome, cpf, email, senha } = data

  const url = 'http://127.0.0.1:8080/usuario-ws?wsdl'

  await soap.createClient(url, (err: any, client: any) => {
    if (err) {
      console.log(err)
    }
    else {
      client.editarUsuario({
        usuario: {
          codigo,
          cpf,
          email,
          nome,
          senha
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