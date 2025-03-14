import { useState, useCallback } from 'react';
import { ZodError } from 'zod';

export function useForm(schema, onSubmit) {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = useCallback((data) => {
    try {
      schema.parse(data);
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = {};
        error.errors.forEach((err) => {
          formattedErrors[err.path[0]] = err.message;
        });
        setErrors(formattedErrors);
      }
      return false;
    }
  }, [schema]);

  const handleSubmit = useCallback(async (data) => {
    setErrors({});
    
    if (!validate(data)) {
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit(data);
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  }, [validate, onSubmit]);

  return {
    errors,
    isSubmitting,
    handleSubmit
  };
}