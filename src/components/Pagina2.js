// src/components/Pagina2.js
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form'; 
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import './Pagina2.css'; 

function Pagina2() {
  const { formData, setFormData } = useFormContext();
  const { control, handleSubmit, setValue, getValues } = useForm({
    defaultValues: formData.pagina2 || {}
  });
  const navigate = useNavigate();

  const [otherFields, setOtherFields] = useState({});
  const [livreInput, setLivreInput] = useState('');

  const opcoes = {
    diabetes: ['Tenho', 'Não Tenho', 'Não sei', 'Outros'],
    problemasCardiacos: ['Tenho', 'Não Tenho', 'Já tive, mas me curei', 'Outros'],
    pressaoAlta: ['Tenho', 'Não Tenho', 'Não sei', 'Outros'],
    asma: ['Tenho', 'Não Tenho', 'Outros'],
    depressao: ['Tenho', 'Não Tenho', 'Outros'],
    ansiedade: ['Tenho', 'Não Tenho', 'Outros'],
    colesterolAlto: ['Tenho', 'Não Tenho', 'Não sei', 'Outros'],
    doresNasCostas: ['Tenho', 'Não Tenho', 'Já tive, mas me curei', 'Outros'],
    doresNasArticulacoes: ['Tenho', 'Não Tenho', 'Já tive, mas me curei', 'Outros'],
    doresDeCabeca: ['Tenho', 'Não Tenho', 'Já tive, mas me curei', 'Outros'],
    cancer: ['Tenho', 'Não Tenho', 'Já tive, mas me curei', 'Outros'],
    infeccoesSexuaisTransmissiveis: ['Tenho', 'Não Tenho', 'Já tive, mas me curei', 'Outros']
  };

  const formatLabel = (label) => {
    const labels = {
      problemasCardiacos: 'Problemas Cardíacos',
      pressaoAlta: 'Pressão Alta',
      colesterolAlto: 'Colesterol Alto',
      doresNasCostas: 'Dores nas Costas',
      doresNasArticulacoes: 'Dores nas Articulações',
      doresDeCabeca: 'Dores de Cabeça',
      infeccoesSexuaisTransmissiveis: 'Infecções Sexuais Transmissíveis',
      diabetes: 'Diabetes',
      asma: 'Asma',
      depressao: 'Depressão',
      ansiedade: 'Ansiedade',
      cancer: 'Câncer'
    };
    return labels[label] || label
      .replace(/([A-Z])/g, ' $1') 
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  const handleOptionChange = (campo, value) => {
    setValue(campo, value);
    if (value === 'Outros') {
      setOtherFields(prev => ({ ...prev, [campo]: '' }));
    } else {
      setOtherFields(prev => ({ ...prev, [campo]: undefined }));
    }
  };

  const handleOtherChange = (campo, value) => {
    setOtherFields(prev => ({ ...prev, [campo]: value }));
  };

  const handleLivreInputChange = (e) => {
    setLivreInput(e.target.value);
  };

  const onSubmit = (data) => {
    const valores = getValues(); 

    const camposObrigatorios = Object.keys(opcoes);
    const todosPreenchidos = camposObrigatorios.every(campo => valores[campo] || otherFields[campo]);

    if (!todosPreenchidos) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setFormData(prevData => ({
      ...prevData,
      pagina2: { ...data, outros: otherFields, livre: livreInput }
    }));

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
                      {formatLabel(campo)}
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
                                onChange={() => handleOptionChange(campo, opcao)}
                              />
                              <label className="form-check-label">{opcao}</label>
                            </div>
                          ))}
                          {field.value === 'Outros' && (
                            <input
                              type="text"
                              className="form-control mt-2"
                              placeholder="Especifique"
                              value={otherFields[campo] || ''}
                              onChange={(e) => handleOtherChange(campo, e.target.value)}
                            />
                          )}
                        </>
                      )}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="form-group mt-4">
            <label htmlFor="livreInput">Outros :</label>
            <input
              id="livreInput"
              type="text"
              className="form-control"
              placeholder="Digite aqui..."
              value={livreInput}
              onChange={handleLivreInputChange}
            />
          </div>

          <button className="btn btn-primary mt-4" type="submit">Próxima Página</button>
        </form>
      </div>
    </main>
  );
}

export default Pagina2;
