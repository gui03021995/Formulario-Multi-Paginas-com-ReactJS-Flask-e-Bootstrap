// src/context/FormContext.js
import React, { createContext, useState, useContext } from 'react';

const FormContext = createContext();

export function FormProvider({ children }) {
  const [formData, setFormData] = useState({ pagina1: {}, pagina2: {} });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext deve ser usado dentro do FormProvider');
  }
  return context;
}