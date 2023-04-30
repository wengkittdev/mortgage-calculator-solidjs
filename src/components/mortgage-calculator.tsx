import { Component, Show, createSignal } from "solid-js";
import RangeInput from "./range-input";

const MortgageCalculator: Component = () => {
  const [purchasePrice, setPurchasePrice] = createSignal(0);
  const [downPayment, setDownPayment] = createSignal(0);
  const [repaymentTime, setRepaymentTime] = createSignal(1);
  const [interestRate, setInterestRate] = createSignal(0);
  const [loanAmount, setLoanAmount] = createSignal(0);
  const [paymentPerMonth, setPaymentPerMonth] = createSignal(0);

  function getMortgageQuote() {
    setLoanAmount(purchasePrice() - downPayment());
    setPaymentPerMonth(loanAmount() / repaymentTime());
  }

  function resetQuote() {
    setLoanAmount(0);
    setPaymentPerMonth(0);
  }

  function formatNumberWithCommas(num: number): string {
    if (isNaN(num) || !isFinite(num)) {
      return "0";
    }
    return num.toLocaleString();
  }

  return (
    <div class="flex items-center justify-center h-screen border-2 border-black border-solid">
      <div class="h-96 w-10/12 border-white border-8 border-solid rounded-lg p-10">
        <p class="font-sans font-semibold text-xl text-white">
          Mortgage Calculator
        </p>
        <div class="flex flex-col gap-5 mt-9">
          <div class="grid grid-cols-3 gap-4">
            <div>
              <RangeInput
                label="Purchase price"
                value={purchasePrice()}
                setValue={setPurchasePrice}
                type="currency"
              />
            </div>
            <div>
              <RangeInput
                label="Down payment"
                value={downPayment()}
                setValue={setDownPayment}
                type="currency"
              />
            </div>
            <div>
              <RangeInput
                label="Repayment time"
                value={repaymentTime()}
                setValue={setRepaymentTime}
                type="year"
              />
            </div>
            <div>
              <RangeInput
                label="Interest rate"
                value={interestRate()}
                setValue={setInterestRate}
                type="percent"
              />
            </div>
            <div>
              <label class="mb-2 inline-block text-neutral-700 dark:text-neutral-200">
                Loan amount
              </label>
              <p class="text-white text-lg">
                $ {formatNumberWithCommas(loanAmount())}
              </p>
            </div>
            <div>
              <label class="mb-2 inline-block text-neutral-700 dark:text-neutral-200">
                Estimated pr.month:
              </label>
              <p class="text-white text-lg">
                $ {formatNumberWithCommas(paymentPerMonth())}
              </p>
            </div>
          </div>

          <div class="flex flex-row justify-end gap-3">
            <button
              onClick={getMortgageQuote}
              type="button"
              class="text-white bg-black p-2 rounded-lg border-white border-solid border-2 hover:bg-gray-900 active:bg-gray-900">
              <span class="font-semibold">Get Mortgage Quote</span>
            </button>
            <Show when={loanAmount() != 0 || paymentPerMonth() != 0}>
              <button
                onClick={resetQuote}
                type="button"
                class="text-white bg-black p-2 rounded-lg border-white border-solid border-2 hover:bg-gray-900 active:bg-gray-900">
                <span class="font-semibold">Reset</span>
              </button>
            </Show>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;
