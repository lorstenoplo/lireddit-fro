import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  type?: string;
  bgColour?: string;
};

const InputField: React.FC<InputFieldProps> = (props) => {
  const [field, { error }] = useField(props);
  return (
    <div className="relative mb-4">
      <label
        htmlFor={field.name}
        className={`leading-7 text-sm ${
          props.bgColour ? "text-gray-600" : "text-gray-400"
        }`}
      >
        {props.label}
      </label>
      <input
        value={field.value}
        onChange={field.onChange}
        name={field.name}
        id={field.name}
        type={props.type || "text"}
        className={`${!!error && "border-red-500"} w-full ${
          props.bgColour || "bg-gray-600"
        } bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-${
          props.bgColour ? "2" : "9"
        }00 rounded border ${
          props.bgColour ? "border-gray-300" : "border-gray-600"
        } focus:border-indigo-500 text-base outline-none text-gray-${
          props.bgColour ? "700" : "100"
        } py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

const TextField: React.FC<InputFieldProps> = (props) => {
  const [field, { error }] = useField(props);
  return (
    <div className="relative mb-4">
      <label htmlFor={field.name} className="leading-7 text-sm text-gray-600">
        {props.label}
      </label>
      <textarea
        id={field.name}
        name={field.name}
        value={field.value}
        onChange={field.onChange}
        className={`${
          !!error && "border-red-500"
        } w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out`}
      />
    </div>
  );
};

export { TextField };

export default InputField;
