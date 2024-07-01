'use client';

import { FormikHandlers } from 'formik';
import { Label } from './ui/label';

import { Textarea } from './ui/textarea';

interface FormTextAreaProps {
  name: string;
  label: string;
  value: string;
  placeholder: string;
  isError: boolean;
  error: string | undefined;
  handleChange: FormikHandlers['handleChange'];
  handleBlur: FormikHandlers['handleBlur'];
}

const FormTextArea: React.FC<FormTextAreaProps> = ({
  name,
  label,
  isError,
  placeholder,
  value,
  error,
  handleChange,
  handleBlur,
}) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={name} className={isError ? 'text-red-500' : 'text-black'}>
        {label}
      </Label>

      <Textarea
        name={name}
        placeholder={placeholder}
        onBlur={handleBlur}
        onChange={handleChange}
        value={value}
        style={{ resize: 'none' }}
        rows={4}
        className={isError ? 'border-red-500' : ''}
      />

      {isError ? <div className="text-xs text-red-500">{error}</div> : null}
    </div>
  );
};

export default FormTextArea;
