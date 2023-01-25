import { Controller } from "react-hook-form";

const CheckForm = (props) => {
  const { control, name, label, options, style } = props;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => {
        return (
          <div className="form-check ps-1" style={{ width: "48%", ...style }}>
            <label htmlFor={name} className="mb-2 ms-2">
              {label}
            </label>
            <div className="d-flex">
              {options.map((data) => {
                return (
                  <div className="form-check pt-2 mx-3" key={data.value}>
                    <input
                      {...field}
                      className="form-check-input"
                      type="checkbox"
                      value={data.value}
                      id={data.value}
                    />
                    <label className="form-check-label" htmlFor={data.value}>
                      {data.label}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }}
    />
  );
};

export default CheckForm;
