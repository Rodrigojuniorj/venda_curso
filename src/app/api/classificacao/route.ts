const soap = require('soap')

type Classificacao = {
  codigo?: number;
  curso?: {
    codigo?: number;
  };
  descricao?: string;
  horario?: string;
  nota?: number;
  titulo?: string;
  usuario?: {
    codigo?: number;
  };
};

export async function GET(request: Request) {
  const url = 'http://127.0.0.1:8080/classificacao-ws?wsdl';

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
    client.listarClassificacao((err: any, result: any) => {
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
  const data: Classificacao = await request.json();
  const { curso, horario, nota, descricao, titulo, usuario } = data;

  const url = 'http://127.0.0.1:8080/classificacao-ws?wsdl';

  await soap.createClient(url, (err: any, client: any) => {
    if (err) {
      console.log(err);
    } else {
      client.salvarClassificacao(
        {
          classificacao: {
            curso: {
              codigo: curso?.codigo,
            },
            descricao,
            horario,
            nota,
            titulo,
            usuario: {
              codigo: usuario?.codigo,
            },
          },
        },
        (err: any, result: any) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }
  });

  return new Response('Dados enviados com sucesso!', { status: 200 });
}

export async function PUT(request: Request) {
  const data: Classificacao = await request.json();
  const { codigo,curso, horario, nota, descricao, titulo, usuario } = data;

  const url = 'http://127.0.0.1:8080/classificacao-ws?wsdl';

  await soap.createClient(url, (err: any, client: any) => {
    if (err) {
      console.log(err);
    } else {
      client.editarClassificacao(
        {
          classificacao: {
            codigo,
            curso: {
              codigo: curso?.codigo,
            },
            descricao,
            horario,
            nota,
            titulo,
            usuario: {
              codigo: usuario?.codigo,
            },
          },
        },
        (err: any, result: any) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }
  });

  return new Response('Dados enviados com sucesso!', { status: 200 });
}

export async function DELETE(request: Request){
  const codigo = request.url.split('codigo=')[1]
  const url = 'http://127.0.0.1:8080/classificacao-ws?wsdl';

  await soap.createClient(url, (err: any, client: any) => {
    if (err) {
      console.log(err)
    }
    else {
      client.deleteClassificacao({
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