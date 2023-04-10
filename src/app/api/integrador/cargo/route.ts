const soap = require('soap');

type Cargo = {
  codigo?: number;
  nome?: string;
}

export async function POST(request: Request) {
  const data: Cargo = await request.json();
  const { codigo, nome } = data;

  const url = 'http://127.0.0.1:8080/cargo?wsdl';

  await soap.createClient(url, (err: any, client: any) => {
    if (err) {
      console.log(err);
    } else {
      client.salvarCargo({
        cargo: {
          codigo,
          nome
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
  const url = 'http://127.0.0.1:8080/cargo?wsdl';

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
    client.listarCargo((err: any, result: any) => {
      if (err) {
        reject(err);
      } else {
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

export async function DELETE(request: Request){
  const codigo = request.url.split('codigo=')[1];
  const url = 'http://127.0.0.1:8080/cargo?wsdl';

  await soap.createClient(url, (err: any, client: any) => {
    if (err) {
      console.log(err);
    } else {
      client.deleteCargo({
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

export async function PUT(request: Request) {
  const data: Cargo = await request.json()
  const { codigo, nome } = data

  const url = 'http://127.0.0.1:8080/cargo?wsdl'

  await soap.createClient(url, (err: any, client: any) => {
    if (err) {
      console.log(err)
    }
    else {
      client.editarCargo({
        cargo: {
          codigo,
          nome
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