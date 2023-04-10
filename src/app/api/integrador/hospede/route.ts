const soap = require('soap');

type Hospede = {
  codigo?: number;
  nome?: string;
  cpf?: string;
  celular?: string;
  email?: string;
  endereco?: string;
}

export async function POST(request: Request) {
  const data: Hospede = await request.json();
  const { codigo, nome, cpf, celular, email, endereco } = data;

  const url = 'http://127.0.0.1:8080/hospede?wsdl';

  await soap.createClient(url, (err: any, client: any) => {
    if (err) { 
      console.log(err);
    } else {
      client.salvarHospede({
        hospede: {
          codigo,
          nome,
          cpf,
          celular,
          email,
          endereco
        }
      }, (err: any, result: any) => {
        if (err) {
          console.log(err);
        }
      })
    }
  })

  return new Response('Dados enviados com sucesso!', { status: 200 });
}

export async function GET(request: Request) {
  const url = 'http://127.0.0.1:8080/hospede?wsdl';

  const client = await new Promise<any>((resolve, reject) => {
    soap.createClient(url, (err: any, client: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(client);
      }
    })
  })

  const result = await new Promise<any>((resolve, reject) => {
    client.listarHospede((err: any, result: any) => {
      if (err) {
        reject(err);
      } else {
        console.log(result)
        try {
          resolve(result.return);
        } catch (e) {
          resolve([]);
        }
      }
    })
  })

  return new Response(JSON.stringify(result), { status: 200 });
}

export async function PUT(request: Request) {
  const data: Hospede = await request.json()
  const { codigo, nome, cpf, celular, email, endereco } = data

  const url = 'http://127.0.0.1:8080/hospede?wsdl'

  await soap.createClient(url, (err: any, client: any) => {
    if (err) {
      console.log(err)
    }
    else {
      client.editarHospede({
        hospede: {
          codigo,
          nome,
          cpf,
          celular,
          email,
          endereco
        }
      }, (err: any, result: any) => {
        if (err) {
          console.log(err)
        }
        console.log(result)
      })
    }
  })

  return new Response('Dados enviados com sucesso!', { status: 200 });
}

export async function DELETE(request: Request){
  const codigo = request.url.split('codigo=')[1];
  const url = 'http://127.0.0.1:8080/hospede?wsdl';

  await soap.createClient(url, (err: any, client: any) => {
    if (err) {
      console.log(err);
    } else {
      client.deleteHospede({
        codigo: codigo
      }, (err: any, result: any) => {
        if (err) {
          console.log(err);
        }
      })
    }
  })

  return new Response('Dados enviados com sucesso!', { status: 200 });
}