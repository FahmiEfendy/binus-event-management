import { Controller } from "react-hook-form";

const TextForm = (props) => {
  const {
    control,
    name,
    isRequired,
    label,
    placeholder,
    type = "text",
    style,
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={{ required: isRequired }}
      render={({ field }) => {
        return (
          <div className="form-group" style={{ width: "100%", ...style }}>
            <label htmlFor={name} className="mb-2 ms-2">
              {label} 
              { isRequired && 
                (<span style={{color:"red"}}> *</span>)
              }
            </label>
            <input
              {...field}
              type={type}
              className="form-control mb-4 disable-input-focusable-shadow"
              id={name}
              placeholder={placeholder}
              style={{ height: "3rem" }}
            />
          </div>
        );
      }}
    />
  );
};

export default TextForm;
