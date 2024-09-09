// src/context/FormProviderWrapper.js
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const FormProviderWrapper = ({ children }) => {
  const methods = useForm(); // Inicializa o hook-form

  return (
    <FormProvider {...methods}>
      {children}
    </FormProvider>
  );
};

export default FormProviderWrapper;