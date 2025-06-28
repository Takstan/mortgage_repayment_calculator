import { useState, useRef } from "react";
import emptyImg from "../assets/images/illustration-empty.svg";
import CreateForm, { type CreateFormHandle } from "./CreateForm";

function AppLayout() {
  const formRef = useRef<CreateFormHandle>(null);
  const [result, setResult] = useState<null | {
    monthlyPayment: number;
    totalRepayment: number;
    data: {
      mortgageAmount: number;
      mortgageTerm: number;
      interestRate: number;
      mortgageType: string;
    };
  }>(null);

  const handleFormSubmit = (formData: {
    mortgageAmount: number;
    mortgageTerm: number;
    interestRate: number;
    mortgageType: string;
  }) => {
    const { mortgageAmount, mortgageTerm, interestRate, mortgageType } =
      formData;

    const principal = mortgageAmount;
    const totalMonths = mortgageTerm * 12;
    const monthlyRate = interestRate / 100 / 12;

    let monthlyPayment = 0;
    let totalRepayment = 0;

    if (mortgageType === "repayment") {
      const compoundRate = Math.pow(1 + monthlyRate, totalMonths);
      monthlyPayment =
        (principal * monthlyRate * compoundRate) / (compoundRate - 1);
    } else if (mortgageType === "interestOnly") {
      monthlyPayment = principal * monthlyRate;
    }

    totalRepayment = monthlyPayment * totalMonths;

    monthlyPayment = parseFloat(monthlyPayment.toFixed(2));
    totalRepayment = parseFloat(totalRepayment.toFixed(2));

    setResult({
      monthlyPayment,
      totalRepayment,
      data: formData,
    });
  };

  const handleClear = () => {
    formRef.current?.resetForm();
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col md:items-center justify-center bg-blue-50 md:px-4">
      <div className="bg-white md:rounded-[1rem] shadow-lg max-w-4xl w-full grid md:grid-cols-2 overflow-hidden h-screen md:flex-0">
        {/* Left: Form */}
        <div className="p-8 flex flex-col md:gap-8 gap-2 justify-center ">
          <div className="md:flex  justify-between align-center items-center">
            <h2 className="text-xl font-bold mb-2 m:mb-0">
              Mortgage Calculator
            </h2>
            <button
              onClick={handleClear}
              className="text-primary-lime font-semibold hover:underline cursor-pointer"
            >
              Clear All
            </button>
          </div>
          <CreateForm onSubmit={handleFormSubmit} ref={formRef} />
        </div>

        {/* Right: Results */}
        <div
          className={`bg-neutral-slate-900 md:rounded-bl-[90px]  flex flex-col  px-10 py-10 text-neutral-white  flex-1 md:flex-0
  ${
    result
      ? "justify-start items-start text-left"
      : "justify-center items-center text-center"
  }`}
        >
          {!result ? (
            <>
              <img src={emptyImg} alt="" />
              <div className="flex flex-col justify-center items-center gap-3">
                <h2 className="text-2xl font-bold">Results shown here</h2>
                <p className="text-sm text-center">
                  Complete the form and click "Calculate Repayments" to see what
                  your monthly repayments would be.
                </p>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-primary-lime text-start">
                Your results
              </h2>
              <p className="text-start mb-4">
                Your results are shown below based on the information you
                provided. To adjust the results, edit the form and click
                "calculate repayments" again.
              </p>
              <div className="bg-[#0d212c] p-4 border-t-4 border-primary-lime rounded-lg flex flex-col gap-4">
                <p className="text-sm opacity-80 text-start">
                  Your monthly{" "}
                  {result.data.mortgageType === "repayment"
                    ? "repayment"
                    : "interest Only"}{" "}
                  mortgage:
                </p>
                <p className="text-5xl font-extrabold text-start text-primary-lime">
                  {new Intl.NumberFormat("en-GB", {
                    style: "currency",
                    currency: "GBP",
                    minimumFractionDigits: 2,
                  }).format(result.monthlyPayment)}
                </p>

                <div className="border-t-1 border-lime-100 mt-3">
                  <p className="text-sm opacity-70 text-start flex flex-col gap-2 mt-5 text-white">
                    Total you'll repay over the term:
                    <span className="font-medium text-2xl">
                      {new Intl.NumberFormat("en-GB", {
                        style: "currency",
                        currency: "GBP",
                        minimumFractionDigits: 2,
                      }).format(result.totalRepayment)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
