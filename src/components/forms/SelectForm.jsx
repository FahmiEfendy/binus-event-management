import { Controller } from "react-hook-form";

const SelectForm = (props) => {
  const { control, name, isRequired, label, options, placeholder, style } =
    props;

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
            <select
              {...field}
              className="form-control custom-select disable-input-focusable-shadow"
              style={{ height: "3rem", cursor:"pointer" }}
            >
              <option value="">{placeholder}</option>
              {options.map((data) => {
                return (
                  <option key={data.value} value={data.value}>
                    {data.label}
                  </option>
                );
              })}
            </select>
          </div>
        );
      }}
    />
  );
};

export default SelectForm;
