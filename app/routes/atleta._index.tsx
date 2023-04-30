import type { ActionArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { useNavigate, Form, Link, useActionData } from "@remix-run/react";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const ErrorBoundary = () => {
  return (
    <main className="flex items-center justify-center flex-col">
      <h1 className="my-10 font-bold text-2xl text-white block p-5 bg-red-500">Erro:</h1>
      <p>Não foi possível salvar os dados na api</p>
      <p>Houve um erro, verifique se a api está rodando na porta 5000!</p>
      <p>Ou, de repente, você passou algum parâmetro errado.</p>
      <Link to="/" className="mt-10 nav-link">Retornar para o início</Link>
    </main>
  );
};

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const response = await fetch("http://127.0.0.1:5000/atletas", {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {});

  return response;
}

export default function AtletaRoute() {
  const data = useActionData<typeof action>();
  const navigate = useNavigate();
  useEffect(() => {
    if (data) {
      toast.success("Atleta adicionado com sucesso");
      navigate("/atletas");
    }
  }, [data, navigate]);

  return (
    <main className="flex items-center justify-center flex-col w-7/12 mx-auto">
      <h1 className="my-10 font-bold text-2xl">Cadastrar Atleta</h1>
      <div className="grid gap-6 mb-6 w-full">
        <Form method="post">
          <label htmlFor="nome">Nome do Atleta:</label>
          <input type="text" id="nome" name="nome" required />
          <br />

          <div>
            <label htmlFor="categoria">Categoria:</label>
            <select id="categoria" name="categoria" required>
              <option value="">Selecione uma categoria</option>
              <option value="Profissional">Profissional</option>
              <option value="Amador">Amador</option>
              <option value="Mirim">Mirim</option>
              <option value="Master">Old School - Master</option>
              <option value="Grand Master">Old School - Grand Master</option>
              <option value="Legend">Old School - Legend</option>
              <option value="Grand Legend">Old School - Grand Legend</option>
            </select>
          </div>
          <br />

          <div className="flex text-left">
            <label htmlFor="sexo">Sexo:</label>
            <input
              type="radio"
              id="sexo_m"
              name="sexo"
              value="Masculino"
              required
              className="w-12"
            />
            <label htmlFor="sexo_m">Masculino</label>
            <input
              type="radio"
              className="w-12"
              id="sexo_f"
              name="sexo"
              value="Feminino"
            />
            <label htmlFor="sexo_f">Feminino</label>
          </div>
          <br />

          <label htmlFor="idade">Cidade:</label>
          <input type="text" id="cidade" name="cidade" required />
          <br />
          <label htmlFor="idade">Idade:</label>
          <input type="number" id="idade" name="idade" required />
          <br />

          <button type="submit" className="p-2 transition-all shadow-md hover:shadow-lg hover:text-white bg-green-100 hover:bg-green-600 mt-5 w-full rounded-md">Salvar dados</button>
        </Form>
      </div>

      <nav className="flex w-full justify-between mt-10">
        <Link to="/atletas" className="nav-link">
          Listar Atletas
        </Link>

        <Link to="/" className="nav-link">
          Voltar
        </Link>
      </nav>
    </main>
  );
}
