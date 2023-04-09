const soap = require('soap')

type Feedback = {
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
        resolve(result.return)
      }
    })
  })

  console.log(result)
  return new Response(JSON.stringify(result), { status: 200 })
}

export async function POST(request: Request) {
  const data: Feedback  = await request.json()
  const { nome, cpf } = data

  const url = 'http://127.0.0.1:8080/instrutor-ws?wsdl'

  soap.createClient(url, (err: any, client: any) => {
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
