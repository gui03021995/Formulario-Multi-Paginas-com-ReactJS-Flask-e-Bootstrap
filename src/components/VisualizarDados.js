// src/components/VisualizarDados.js

import React from 'react';
import { useFormContext } from '../context/FormContext';

const VisualizarDados = () => {
  const { formData } = useFormContext();

  // Dados das páginas
  const { pagina1, pagina2, pagina3 } = formData;

  return (
    <main>
      <div className="container">
        <h2 className="my-4">Visualização dos Dados</h2>
        
        {/* Dados da Página 1 */}
        <section>
          <h3>Dados Pessoais</h3>
          <p><strong>Nome:</strong> {pagina1?.nome}</p>
          <p><strong>CPF:</strong> {pagina1?.cpf}</p>
          <p><strong>Cargo:</strong> {pagina1?.cargo}</p>
          <p><strong>Cidade:</strong> {pagina1?.cidade}</p>
          <p><strong>Estado:</strong> {pagina1?.estado}</p>
          <p><strong>Verificado:</strong> {pagina1?.verificado}</p>
          <p><strong>Titularidade:</strong> {pagina1?.titularidade}</p>
          <p><strong>Telefone:</strong> {pagina1?.telefone}</p>
          <p><strong>Email:</strong> {pagina1?.email}</p>
          <p><strong>Data de Nascimento:</strong> {pagina1?.diaNascimento}/{pagina1?.mesNascimento}/{pagina1?.anoNascimento}</p>
          <p><strong>Sexo:</strong> {pagina1?.sexo}</p>
          <p><strong>Peso:</strong> {pagina1?.peso}</p>
          <p><strong>Altura:</strong> {pagina1?.altura}</p>
          <p><strong>Pressão Sistólica:</strong> {pagina1?.pressaoSistolica}</p>
          <p><strong>Pressão Diastólica:</strong> {pagina1?.pressaoDiastolica}</p>
        </section>

        {/* Dados da Página 2 */}
        <section>
          <h3>Informações Adicionais de Saúde</h3>
          <p><strong>Diabetes:</strong> {pagina2?.diabetes}</p>
          <p><strong>Problemas Cardíacos:</strong> {pagina2?.problemasCardiacos}</p>
          <p><strong>Pressão Alta:</strong> {pagina2?.pressaoAlta}</p>
          <p><strong>Asma:</strong> {pagina2?.asma}</p>
          <p><strong>Depressão:</strong> {pagina2?.depressao}</p>
          <p><strong>Ansiedade:</strong> {pagina2?.ansiedade}</p>
          <p><strong>Colesterol Alto:</strong> {pagina2?.colesterolAlto}</p>
          <p><strong>Dores nas Costas:</strong> {pagina2?.doresNasCostas}</p>
          <p><strong>Dores nas Articulações:</strong> {pagina2?.doresNasArticulacoes}</p>
          <p><strong>Dores de Cabeça:</strong> {pagina2?.doresDeCabeca}</p>
          <p><strong>Câncer:</strong> {pagina2?.cancer}</p>
          <p><strong>Infecções Sexuais Transmissíveis:</strong> {pagina2?.infeccoesSexuaisTransmissiveis}</p>
        </section>

        {/* Dados da Página 3 */}
        <section>
          <h3>Resumo Final</h3>
          {/* Aqui você pode adicionar o que for necessário para a página 3 */}
          <p><strong>Resumo:</strong> {pagina3 ? JSON.stringify(pagina3) : 'Nenhum dado disponível'}</p>
        </section>
      </div>
    </main>
  );
};

export default VisualizarDados;
