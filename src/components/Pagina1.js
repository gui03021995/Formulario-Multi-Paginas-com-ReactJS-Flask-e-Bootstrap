// src/components/Pagina1.js

import React from 'react';
import './Pagina1.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';


const estados = [
  'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT',
  'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'
];

const dias = Array.from({ length: 31 }, (_, i) => i + 1);
const meses = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];
const anos = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

const pressaoOptions = [
  'Nenhum', 'Menor que 120', 'De 120 a 129', 'De 130 a 139', 'De 140 a 159',
  'De 160 a 179', '180 ou maior'
];

function Pagina1() {
  const { formData, setFormData } = useFormContext();
  const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm({
    defaultValues: {
      nome: formData.pagina1?.nome || '',
      cpf: formData.pagina1?.cpf || '',
      cargo: formData.pagina1?.cargo || '',
      cidade: formData.pagina1?.cidade || '',
      estado: formData.pagina1?.estado || '',
      verificado: formData.pagina1?.verificado || '',
      titularidade: formData.pagina1?.titularidade || '',
      telefone: formData.pagina1?.telefone || '',
      email: formData.pagina1?.email || '',
      diaNascimento: formData.pagina1?.diaNascimento || '',
      mesNascimento: formData.pagina1?.mesNascimento || '',
      anoNascimento: formData.pagina1?.anoNascimento || '',
      sexo: formData.pagina1?.sexo || '',
      peso: formData.pagina1?.peso || '',
      altura: formData.pagina1?.altura || '',
      pressaoSistolica: formData.pagina1?.pressaoSistolica || 'Nenhum',
      pressaoDiastolica: formData.pagina1?.pressaoDiastolica || 'Nenhum'
    }
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { verificado } = data;

    // Validação dos dados
    if (verificado !== 'Sim') {
      setError('verificado', { type: 'manual', message: 'Os dados não estão corretos. Corrija antes de prosseguir.' });
      return;
    }

    // Validar se todos os campos obrigatórios estão preenchidos corretamente
    if (!data.nome || !data.cpf || !data.cargo || !data.cidade || !data.estado ||
        !data.telefone || !data.email || !data.peso || !data.altura ||
        data.pressaoSistolica === 'Nenhum' || data.pressaoDiastolica === 'Nenhum') {
      setError('formulario', { type: 'manual', message: 'Todos os campos devem estar preenchidos corretamente.' });
      return;
    }

    // Validar se o email contém @
    if (!/\S+@\S+\.\S+/.test(data.email)) {
      setError('email', { type: 'manual', message: 'Email inválido.' });
      return;
    }

    // Validar estado
    if (!estados.includes(data.estado)) {
      setError('estado', { type: 'manual', message: 'Estado inválido.' });
      return;
    }

    // Validar peso e altura como números inteiros
    if (!Number.isInteger(Number(data.peso)) || !Number.isInteger(Number(data.altura))) {
      setError('peso', { type: 'manual', message: 'Peso e altura devem ser números inteiros.' });
      return;
    }

    // Se tudo estiver correto, salvar dados no contexto e navegar para a próxima página
    setFormData(prevData => ({
      ...prevData,
      pagina1: data
    }));
    navigate('/pagina2');
  };

  return (
    <main>
      <div className="container pagina-container">
        <h2 className="my-4">Cadastro de Dados</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Seção de Dados Pessoais */}
          <div className="mb-3">
            <label className="form-label">Nome:</label>
            <input className="form-control" {...register('nome', { required: 'Campo obrigatório' })} />
            {errors.nome && <div className="text-danger">{errors.nome.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Matrícula / CPF:</label>
            <input className="form-control" {...register('cpf', { required: 'Campo obrigatório' })} />
            {errors.cpf && <div className="text-danger">{errors.cpf.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Cargo:</label>
            <input className="form-control" {...register('cargo', { required: 'Campo obrigatório' })} />
            {errors.cargo && <div className="text-danger">{errors.cargo.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Cidade:</label>
            <input className="form-control" {...register('cidade', { required: 'Campo obrigatório' })} />
            {errors.cidade && <div className="text-danger">{errors.cidade.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Estado:</label>
            <select className="form-select" {...register('estado', { required: 'Campo obrigatório' })}>
              <option value="">Selecione...</option>
              {estados.map(estado => (
                <option key={estado} value={estado}>{estado}</option>
              ))}
            </select>
            {errors.estado && <div className="text-danger">{errors.estado.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Os dados acima estão corretos?</label>
            <div>
              <label className="form-check-label me-3">
                <input
                  className="form-check-input"
                  type="radio"
                  value="Sim"
                  {...register('verificado', { required: 'Campo obrigatório' })}
                />
                Sim
              </label>
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="radio"
                  value="Não"
                  {...register('verificado', { required: 'Campo obrigatório' })}
                />
                Não
              </label>
            </div>
            {errors.verificado && <div className="text-danger">{errors.verificado.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Titularidade:</label>
            <div>
              <label className="form-check-label me-3">
                <input
                  className="form-check-input"
                  type="radio"
                  value="Titular"
                  {...register('titularidade', { required: 'Campo obrigatório' })}
                />
                Titular
              </label>
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="radio"
                  value="Dependente"
                  {...register('titularidade', { required: 'Campo obrigatório' })}
                />
                Dependente
              </label>
            </div>
            {errors.titularidade && <div className="text-danger">{errors.titularidade.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Telefone com DDD:</label>
            <input className="form-control" {...register('telefone', { required: 'Campo obrigatório' })} />
            {errors.telefone && <div className="text-danger">{errors.telefone.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              className="form-control"
              type="email"
              {...register('email', { required: 'Campo obrigatório' })}
            />
            {errors.email && <div className="text-danger">{errors.email.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Data de Nascimento:</label>
            <div className="d-flex gap-2">
              <select className="form-select" {...register('diaNascimento', { required: 'Campo obrigatório' })}>
                <option value="">Dia</option>
                {dias.map(dia => (
                  <option key={dia} value={dia}>{dia}</option>
                ))}
              </select>
              <select className="form-select" {...register('mesNascimento', { required: 'Campo obrigatório' })}>
                <option value="">Mês</option>
                {meses.map((mes, i) => (
                  <option key={i} value={i + 1}>{mes}</option>
                ))}
              </select>
              <select className="form-select" {...register('anoNascimento', { required: 'Campo obrigatório' })}>
                <option value="">Ano</option>
                {anos.map(ano => (
                  <option key={ano} value={ano}>{ano}</option>
                ))}
              </select>
            </div>
            {errors.diaNascimento && <div className="text-danger">{errors.diaNascimento.message}</div>}
            {errors.mesNascimento && <div className="text-danger">{errors.mesNascimento.message}</div>}
            {errors.anoNascimento && <div className="text-danger">{errors.anoNascimento.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Sexo Biológico:</label>
            <div>
              <label className="form-check-label me-3">
                <input
                  className="form-check-input"
                  type="radio"
                  value="Feminino"
                  {...register('sexo', { required: 'Campo obrigatório' })}
                />
                Feminino
              </label>
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="radio"
                  value="Masculino"
                  {...register('sexo', { required: 'Campo obrigatório' })}
                />
                Masculino
              </label>
            </div>
            {errors.sexo && <div className="text-danger">{errors.sexo.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Peso:</label>
            <input
              className="form-control"
              type="number"
              {...register('peso', { 
                required: 'Campo obrigatório',
                valueAsNumber: true,
                validate: value => Number.isInteger(value) || 'Peso deve ser um número inteiro'
              })}
            />
            {errors.peso && <div className="text-danger">{errors.peso.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Altura (em cm):</label>
            <input
              className="form-control"
              type="number"
              {...register('altura', { 
                required: 'Campo obrigatório',
                valueAsNumber: true,
                validate: value => Number.isInteger(value) || 'Altura deve ser um número inteiro'
              })}
            />
            {errors.altura && <div className="text-danger">{errors.altura.message}</div>}
          </div>

          {/* Divisor */}
          <hr className="my-4" />

          {/* Seção de Pressão Arterial */}
          <h3 className="my-4">Pressão Arterial</h3>
          <p className="text-muted mb-2">
            Por favor, selecione a pressão arterial sistólica e diastólica de acordo com sua medição.
            Se você não souber os valores, marque a opção "Não sei".
          </p>
          <p className="text-muted mb-4">
            Lembre-se de que a pressão arterial sistólica é o número superior e a pressão diastólica é o número inferior.
          </p>

          <div className="mb-3">
            <label className="form-label">Pressão Sistólica (Máxima):</label>
            <select className="form-select" {...register('pressaoSistolica', { required: 'Campo obrigatório' })}>
              {pressaoOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {errors.pressaoSistolica && <div className="text-danger">{errors.pressaoSistolica.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Pressão Diastólica (Mínima):</label>
            <select className="form-select" {...register('pressaoDiastolica', { required: 'Campo obrigatório' })}>
              {pressaoOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {errors.pressaoDiastolica && <div className="text-danger">{errors.pressaoDiastolica.message}</div>}
          </div>

          <div className="mb-3">
            <div className="form-check">
              <input
                className="form-check-input me-2"
                type="checkbox"
                {...register('pressaoNaoSei')}
              />
              <label className="form-check-label">
                Não sei
              </label>
            </div>
          </div>

          {/* Mensagem de erro do formulário */}
          {errors.formulario && <div className="text-danger mb-3">{errors.formulario.message}</div>}
          {errors.verificado && <div className="text-danger mb-3">{errors.verificado.message}</div>}

          <button className="btn btn-primary" type="submit">Próxima Página</button>
        </form>
      </div>
    </main>
  );
}

export default Pagina1;
