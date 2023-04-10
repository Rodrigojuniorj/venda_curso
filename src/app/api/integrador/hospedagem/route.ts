const soap = require('soap');

type Hospedagem = {
  codigo?: number;
  entrada?: string;
  saida?: string;
  funcionario?: {
    codigo?: number;
    nome?: string;
    cpf?: string;
    cargo?: {
      codigo?: number;
      nome?: string;
    }
  }
  hospede?: {
    codigo?: number;
    nome?: string;
    cpf?: string;
    celular?: string;
    email?: string;
    endereco?: string;
  }
  quarto?: {
    codigo?: number;
    numero?: number;
    hotel?: {
      codigo?: number;
      nomeFantasia?: string;
      cnpj?: string;
    }
  }
}

export async function POST(request: Request) {
  const data: Hospedagem = await request.json();
  const { codigo, entrada, saida, funcionario, hospede, quarto } = data;

  const url = 'http://127.0.0.1:8080/hospedagem?wsdl';

  await soap.createClient(url, (err: any, client: any) => {
    if (err) {
      console.log(err);
    } else {
      client.salvarHospedagem({
        hospedagem: {
          codigo,
          entrada,
          saida,
          funcionario: {
            codigo: funcionario?.codigo,
            nome: funcionario?.nome,
            cpf: funcionario?.cpf,
            cargo: {
              codigo: funcionario?.cargo?.codigo,
              nome: funcionario?.cargo?.nome
            }
          },
          hospede: {
            codigo: hospede?.codigo,
            nome: hospede?.nome,
            cpf: hospede?.cpf,
            celular: hospede?.celular,
            email: hospede?.email,
            endereco: hospede?.endereco
          },
          quarto: {
            codigo: quarto?.codigo,
            numero: quarto?.numero,
            hotel: {
              codigo: quarto?.hotel?.codigo,
              nomeFantasia: quarto?.hotel?.nomeFantasia,
              cnpj: quarto?.hotel?.cnpj
            }
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

export async function listarHospedagem(request: Request) {
  const url = 'http://127.0.0.1:8080/hospedagem?wsdl';

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
    client.listarHospedagem((err: any, result: any) => {
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

export async function editarHospedagem(request: Request) {
  const data: Hospedagem = await request.json()
  const { codigo, entrada, saida, funcionario, hospede, quarto } = data

  const url = 'http://127.0.0.1:8080/hospedagem?wsdl'

  await soap.createClient(url, (err: any, client: any) => {
    if (err) {
      console.log(err)
    } else {
      client.editarHospedagem({
        hospedagem: {
          codigo,
          entrada,
          saida,
          funcionario,
          hospede,
          quarto
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

// export async function excluirHospedagem(request: Request){
//   const codigo
