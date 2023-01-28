import { Controller } from "react-hook-form";
import { preferenceListOptions } from "../../constants/option";
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
            <div className="row ms-1">
              {options.map((data) => {
                return (
                  <div className="form-check pt-2 col-4" key={data.value}>
                    <input
                      {...field}
                      className="form-check-input"
                      type="checkbox"
                      value={data.value}
                      id={data.id}
                      onChange={(e) => {
                        preferenceListOptions[data.id].status = e.target.checked
                      }}
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
