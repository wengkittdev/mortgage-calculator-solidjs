import { Match, Switch, createEffect, createSignal } from "solid-js";

/* eslint-disable no-unused-vars */
interface RangeInputProps {
  label: string;
  value: number;
  type: string;
  setValue: (newValue: number) => void;
}

const RangeInput = (props: RangeInputProps) => {
  const [min, setMin] = createSignal(0);
  const [max, setMax] = createSignal(0);

  createEffect(() => {
    switch (props.type) {
      case "year": {
        setMin(0);
        setMax(100);
        break;
      }
      case "percent": {
        setMin(0);
        setMax(100);
        break;
      }
      default: {
        setMin(0);
        setMax(10000000);
      }
    }
  });

  const handleRangeChange = (event: Event) => {
    const newValue = (event.target as HTMLInputElement).value;
    props.setValue(parseInt(newValue));
  };

  function formatNumberWithCommas(num: number): string {
    if (isNaN(num) || !isFinite(num)) {
      return "0";
    }
    return num.toLocaleString();
  }
  return (
    <>
      <label
        for="rangeInput"
        class="mb-2 inline-block text-neutral-700 dark:text-neutral-200">
        {props.label}:{" "}
        <Switch fallback={<span class="text-red-600">Missing Type Props</span>}>
          <Match when={props.type === "currency"}>
            <span>${formatNumberWithCommas(props.value)}</span>
          </Match>
          <Match when={props.type === "year"}>
            <span>{props.value} years</span>
          </Match>
          <Match when={props.type === "percent"}>
            <span>{props.value}%</span>
          </Match>
        </Switch>
      </label>
      <input
        type="range"
        min={min()}
        max={max()}
        value={props.value}
        class="transparent h-1.5 w-full cursor-pointer appearance-none rounded-lg border-transparent bg-neutral-200"
        id="rangeInput"
        onInput={handleRangeChange}
      />
    </>
  );
};

export default RangeInput;
