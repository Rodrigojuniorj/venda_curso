const soap = require('soap')

type Feedback = {
  codigo?: string;
  nome: string;
  cpf: string
}

export async function GET(request: Request) {
  const url = 'http://127.0.0.1:8080/instrutor-ws?wsdl'

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
    client.listarInstrutor((err: any, result: any) => {
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
  const data: Feedback  = await request.json()
  const { nome, cpf } = data

  const url = 'http://127.0.0.1:8080/instrutor-ws?wsdl'

  await soap.createClient(url, (err: any, client: any) => {
    if (err) {
      console.log(err)
    }
    else {
      client.salvarInstrutor({
        instrutor: {
          nome,
          cpf
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
  console.log(codigo)
  const url = 'http://127.0.0.1:8080/instrutor-ws?wsdl'

  await soap.createClient(url, (err: any, client: any) => {
    if (err) {
      console.log(err)
    }
    else {
      client.deleteInstrutor({
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
  const data: Feedback  = await request.json()
  const { nome, cpf, codigo } = data

  const url = 'http://127.0.0.1:8080/instrutor-ws?wsdl'

  await soap.createClient(url, (err: any, client: any) => {
    if (err) {
      console.log(err)
    }
    else {
      client.editarInstrutor({
        codigo: {
          codigo,
          nome,
          cpf
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