import { forwardRef, useImperativeHandle } from "react";
import iconCalculator from "../assets/images/icon-calculator.svg";
import { useForm } from "react-hook-form";

type FormValues = {
  mortgageAmount: number;
  mortgageTerm: number;
  interestRate: number;
  mortgageType: "repayment" | "interestOnly";
};

export type CreateFormHandle = {
  resetForm: () => void;
};

const CreateForm = forwardRef<
  CreateFormHandle,
  { onSubmit: (data: FormValues) => void }
>(function CreateForm({ onSubmit }, ref) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const selectedQuery = watch("mortgageType");

  // Expose reset method to parent
  useImperativeHandle(ref, () => ({
    resetForm: () => reset(),
  }));

  const onValid = (data: FormValues) => {
    onSubmit(data);
    reset(); // You can remove this if you want only parent to control reset
  };

  const onError = () => {
    console.log("error");
  };

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={handleSubmit(onValid, onError)}
    >
      {/* First Row */}
      <div className="flex flex-col gap-2">
        <label>Mortgage Amount</label>
        <div
          className={`flex items-center border border-gray-300 rounded overflow-hidden  w-full ${
            errors.mortgageAmount ? "border-primary-red" : ""
          }`}
        >
          <span
            className={`p-3 text-gray-600 bg-blue-100 text-base h-full flex items-center font-bold ${
              errors.mortgageAmount ? "bg-primary-red text-white" : ""
            }`}
          >
            £
          </span>
          <input
            {...register("mortgageAmount", { required: true })}
            type="text"
            className="w-full py-2 px-3 text-sm focus:outline-none autofill:bg-white"
          />
        </div>
        {errors.mortgageAmount && (
          <p className="hidden md:block text-red-500 text-sm">
            {errors.mortgageAmount.message || "This field is required"}
          </p>
        )}
      </div>

      {/* Second Row */}
      <div className="md:flex gap-5">
        <div className="flex flex-col gap-2">
          <label>Mortgage Term</label>
          <div
            className={`flex items-center border border-gray-300 rounded overflow-hidden bg-white w-full ${
              errors.mortgageTerm ? "border-primary-red" : ""
            }`}
          >
            <input
              {...register("mortgageTerm", { required: true })}
              type="text"
              className="w-full py-2 px-3 text-sm focus:outline-none"
            />
            <span
              className={`p-3 text-gray-600 bg-blue-100 text-base h-full flex items-center font-bold ${
                errors.mortgageTerm ? "bg-primary-red text-white" : ""
              }`}
            >
              years
            </span>
          </div>
          {errors.mortgageTerm && (
            <p className="hidden md:block text-red-500 text-sm ">
              {errors.mortgageTerm.message || "This field is required"}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label>Interest Rate</label>
          <div
            className={`flex items-center border border-gray-300 rounded overflow-hidden bg-white w-full ${
              errors.interestRate ? "border-primary-red" : ""
            }`}
          >
            <input
              {...register("interestRate", { required: true })}
              type="text"
              className="w-full py-2 px-3 text-sm focus:outline-none"
            />
            <span
              className={`p-3 text-gray-600 bg-blue-100 text-base h-full flex items-center font-bold ${
                errors.mortgageTerm ? "bg-primary-red text-white" : ""
              }`}
            >
              %
            </span>
          </div>
          {errors.interestRate && (
            <p className="hidden md:block text-red-500 text-sm ">
              {errors.interestRate.message || "This field is required"}
            </p>
          )}
        </div>
      </div>

      {/* Radio Options */}
      <div className="flex flex-col gap-2">
        <label className="text-md font-md">Mortgage Type</label>

        {/* Repayment */}
        <label
          htmlFor="repayment"
          className={`flex items-center border rounded w-full p-3 cursor-pointer transition 
            hover:border-primary-lime ${
              selectedQuery === "repayment"
                ? "bg-[#f3f4c1] border-primary-lime"
                : "border-gray-300"
            }`}
        >
          <input
            {...register("mortgageType", { required: true })}
            id="repayment"
            type="radio"
            value="repayment"
            className="mr-3 scale-150 accent-primary-lime"
          />
          <span className="font-bold">Repayment</span>
        </label>

        {/* Interest Only */}
        <label
          htmlFor="interestOnly"
          className={`flex items-center border rounded w-full p-3 cursor-pointer transition 
            hover:border-primary-lime ${
              selectedQuery === "interestOnly"
                ? "bg-[#f3f4c1] border-primary-lime"
                : "border-gray-300"
            }`}
        >
          <input
            {...register("mortgageType", { required: true })}
            id="interestOnly"
            type="radio"
            value="interestOnly"
            className="mr-3 scale-150 accent-primary-lime"
          />
          <span className="font-bold">Interest Only</span>
        </label>

        {errors.mortgageType && (
          <p className="hidden md:block text-red-500 text-sm ">
            {errors.mortgageType.message || "This field is required"}
          </p>
        )}
      </div>

      {/* Button */}
      <button
        className="bg-primary-lime rounded-full py-3 px-6 md:max-w-2xs mt-2 cursor-pointer max-w-auto"
        type="submit"
        disabled={isSubmitting}
      >
        <div className="flex gap-3 items-center justify-center">
          <img src={iconCalculator} alt="calculator icon" />
          <span className="font-bold">Calculate Repayments</span>
        </div>
      </button>
    </form>
  );
});

// Optional: name for better dev tools visibility
CreateForm.displayName = "CreateForm";

export default CreateForm;
