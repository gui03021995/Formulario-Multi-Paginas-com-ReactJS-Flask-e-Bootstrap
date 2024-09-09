// src/components/Pagina3.js

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext'; // Certifique-se de que o caminho está correto
import axios from 'axios';
import './Pagina3.css'; // Arquivo CSS opcional

function Pagina3() {
  const { formData } = useFormContext(); // Obtém os dados do contexto
  const { register, handleSubmit, control, setError, clearErrors, formState: { errors } } = useForm({
    defaultValues: {
      campoPagina3: formData.pagina3?.campoPagina3 || '',
    }
  });

  const [alimentacao, setAlimentacao] = React.useState({});
  const [selectedTipo, setSelectedTipo] = React.useState('');
  const [alimentosDiarios, setAlimentosDiarios] = React.useState({});
  const [tipoAlimentacaoOptions, setTipoAlimentacaoOptions] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    axios.get('http://localhost:5000/getAlimentacao')
      .then(response => {
        setAlimentacao(response.data);
        setTipoAlimentacaoOptions(Object.keys(response.data));
      })
      .catch(error => console.error('Erro ao buscar alimentação:', error));
  }, []);

  const handleTipoAlimentacaoChange = (e) => {
    setSelectedTipo(e.target.value);
    clearErrors('tipoAlimentacao');
    if (e.target.value) {
      setAlimentosDiarios({});
    }
  };

  const handleAlimentosChange = (e) => {
    const { value, checked } = e.target;
    setAlimentosDiarios(prevState => ({
      ...prevState,
      [value]: checked
    }));
  };

  const onSubmit = async (data) => {
    if (!formData.pagina1 || !formData.pagina2) {
      alert('Dados das páginas anteriores não estão disponíveis.');
      return;
    }

    if (!selectedTipo) {
      setError('tipoAlimentacao', { type: 'manual', message: 'Selecione um tipo de alimentação.' });
      return;
    }

    if (Object.values(alimentosDiarios).every(value => !value)) {
      setError('alimentosDiarios', { type: 'manual', message: 'Selecione pelo menos um alimento diário.' });
      return;
    }

    const formDataToSubmit = {
      tipoAlimentacao: selectedTipo,
      alimentosDiarios,
      campoPagina3: data.campoPagina3,
    };

    try {
      await fetch('http://localhost:5000/submitFormulario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pagina1: formData.pagina1,
          pagina2: formData.pagina2, // Certifique-se de incluir os dados da página 2 aqui
          pagina3: formDataToSubmit,
        }),
      });

      alert('Formulário enviado com sucesso!');
      navigate('/sucesso');
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
      alert('Erro ao enviar o formulário.');
    }
  };

  return (
    <main>
      <div className="container pagina-container">
        <h2 className="my-4">Página 3</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Selecione o tipo de alimentação */}
          <div className="mb-3">
            <label className="form-label card-title-bold">Selecione seu tipo de alimentação:</label>
            <Controller
              name="tipoAlimentacao"
              control={control}
              render={({ field }) => (
                <select
                  className="form-select"
                  {...field}
                  value={selectedTipo}
                  onChange={(e) => {
                    field.onChange(e);
                    handleTipoAlimentacaoChange(e);
                  }}
                >
                  <option value="">Selecione...</option>
                  {tipoAlimentacaoOptions.map(tipo => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                  ))}
                </select>
              )}
            />
            {errors.tipoAlimentacao && <p className="text-danger">{errors.tipoAlimentacao.message}</p>}
          </div>

          {/* Selecione alimentos diários */}
          {selectedTipo && alimentacao[selectedTipo] && (
            <div className="mb-3">
              <label className="form-label card-title-bold">Preencha os tipos de alimento que você consome diariamente:</label>
              {alimentacao[selectedTipo].map(alimento => (
                <div className="form-check" key={alimento}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={alimento}
                    checked={alimentosDiarios[alimento] || false}
                    onChange={handleAlimentosChange}
                  />
                  <label className="form-check-label">{alimento}</label>
                </div>
              ))}
              {errors.alimentosDiarios && <p className="text-danger">{errors.alimentosDiarios.message}</p>}
            </div>
          )}
    

          <button className="btn btn-primary mt-4" type="submit">Enviar</button>
        </form>
      </div>
    </main>
  );
}

export default Pagina3;
