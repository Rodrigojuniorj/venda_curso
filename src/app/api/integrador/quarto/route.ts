const soap = require('soap');

type Quarto = {
  codigo?: number;
  numero?: number;
  hotel?: {
    codigo?: number;
    nomefantasia?: string;
    cnpj?: string;
  }
}

export async function POST(request: Request) {
  const data: Quarto = await request.json();
  const { codigo, numero, hotel } = data;

  const url = 'http://127.0.0.1:8080/quarto?wsdl';

  await soap.createClient(url, (err: any, client: any) => {
    if (err) { 
      console.log(err);
    } else {
      client.salvarQuarto({
        quarto: {
          codigo,
          numero,
          hotel: {
            codigo: hotel?.codigo,
            nomefantasia: hotel?.nomefantasia,
            cnpj: hotel?.cnpj,
          }
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
  const url = 'http://127.0.0.1:8080/quarto?wsdl';

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
    client.listarQuarto((err: any, result: any) => {
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
  const data: Quarto = await request.json()
  const { codigo, numero, hotel } = data

  const url = 'http://127.0.0.1:8080/quarto?wsdl'

  await soap.createClient(url, (err: any, client: any) => {
    if (err) {
      console.log(err)
    }
    else {
      client.editarQuarto({
        quarto: {
          codigo,
          numero,
          hotel: {
            codigo: hotel?.codigo,
            nomefantasia: hotel?.nomefantasia,
            cnpj: hotel?.cnpj,
          }
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
  const url = 'http://127.0.0.1:8080/quarto?wsdl';

  await soap.createClient(url, (err: any, client: any) => {
    if (err) {
      console.log(err);
    } else {
      client.deleteQuarto({
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