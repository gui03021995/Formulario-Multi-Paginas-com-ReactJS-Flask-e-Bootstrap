// src/components/Pagina2.js
import React from 'react';
import { useForm, Controller } from 'react-hook-form'; // Certifique-se de importar o Controller aqui
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import './Pagina2.css'; // Importe seu CSS aqui

function Pagina2() {
  const { formData, setFormData } = useFormContext();
  const { control, handleSubmit, setValue, getValues } = useForm({
    defaultValues: formData.pagina2 || {}
  });
  const navigate = useNavigate();

  // Opções de respostas
  const opcoes = {
    diabetes: ['Tenho', 'Não Tenho', 'Não sei'],
    problemasCardiacos: ['Tenho', 'Não Tenho', 'Já tive, mas me curei'],
    pressaoAlta: ['Tenho', 'Não Tenho', 'Não sei'],
    asma: ['Tenho', 'Não Tenho'],
    depressao: ['Tenho', 'Não Tenho'],
    ansiedade: ['Tenho', 'Não Tenho'],
    colesterolAlto: ['Tenho', 'Não Tenho', 'Não sei'],
    doresNasCostas: ['Tenho', 'Não Tenho', 'Já tive, mas me curei'],
    doresNasArticulacoes: ['Tenho', 'Não Tenho', 'Já tive, mas me curei'],
    doresDeCabeca: ['Tenho', 'Não Tenho', 'Já tive, mas me curei'],
    cancer: ['Tenho', 'Não Tenho', 'Já tive, mas me curei'],
    infeccoesSexuaisTransmissiveis: ['Tenho', 'Não Tenho', 'Já tive, mas me curei']
  };

  const onSubmit = (data) => {
    const valores = getValues(); // Obtendo os dados diretamente do contexto

    // Verificar se todos os campos obrigatórios foram preenchidos
    const camposObrigatorios = Object.keys(opcoes);
    const todosPreenchidos = camposObrigatorios.every(campo => valores[campo]);

    if (!todosPreenchidos) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Se tudo estiver correto, salvar dados no contexto e navegar para a próxima página
    setFormData(prevData => ({
      ...prevData,
      pagina2: data
    }));

    // Navegar para a próxima página
    navigate('/pagina3');
  };

  return (
    <main>
      <div className="container pagina-container">
        <h2 className="my-4">Informações Adicionais de Saúde</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            {Object.keys(opcoes).map((campo, index) => (
              <div className="col-md-4" key={index}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title card-title-bold">
                      {campo
                        .replace(/([A-Z])/g, ' ') // Adiciona espaço antes de letras maiúsculas
                        .replace(/^./, str => str.toUpperCase()) // Capitaliza a primeira letra
                        .trim()}
                    </h5>
                    <Controller
                      control={control}
                      name={campo}
                      render={({ field }) => (
                        <>
                          {opcoes[campo].map(opcao => (
                            <div key={opcao} className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                value={opcao}
                                checked={field.value === opcao}
                                onChange={() => field.onChange(opcao)}
                              />
                              <label className="form-check-label">{opcao}</label>
                            </div>
                          ))}
                        </>
                      )}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="btn btn-primary mt-4" type="submit">Próxima Página</button>
        </form>
      </div>
    </main>
  );
}

export default Pagina2;
