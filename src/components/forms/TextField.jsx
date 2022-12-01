import { Controller } from "react-hook-form";

const TextField = (props) => {
  const {
    control,
    name,
    isRequired,
    label,
    placeholder,
    type = "text",
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={{ required: isRequired }}
      render={({ field }) => {
        return (
          <>
            <div className="form-group">
              <label htmlFor={name} className="mb-2 ms-2">
                {label}
              </label>
              <input
                {...field}
                type={type}
                className="form-control mb-4"
                id={name}
                placeholder={placeholder}
                style={{ height: "4rem" }}
              />
            </div>
          </>
        );
      }}
    />
  );
};

export default TextField;
