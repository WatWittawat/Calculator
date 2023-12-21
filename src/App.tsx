import { useReducer } from "react";
import DigitButton from "./components/DigitButton";
import "./App.css";
import { ACTION } from "./lib/data";

type PropsState = {
  CurOperand: string;
  PreOperand: string;
  Operation: string;
};

type Pay_type = {
  type: string;
  payload: {
    digit: string;
  };
};

function reducer(state: PropsState, { type, payload }: Pay_type) {
  switch (type) {
    case ACTION.ADD_DIGIT:
      return {
        ...state,
        CurOperand: `${state.CurOperand || ""}${payload.digit}`,
      };
    default:
      return state;
  }
}

function App() {
  const [{ CurOperand, PreOperand, Operation }, dispatch] = useReducer(
    reducer,
    { CurOperand: "", PreOperand: "", Operation: "" }
  );
  return (
    <div className="container">
      <div className="output">
        <div className="PreOperand">
          {PreOperand} {Operation}
        </div>
        <div className="CurOperand">{CurOperand}</div>
      </div>
      <button className="span-two">AC</button>
      <button>DEL</button>
      <DigitButton digit="/" dispatch={dispatch}></DigitButton>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>*</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>+</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>-</button>
      <button>.</button>
      <button>0</button>
      <button className="span-two">=</button>
    </div>
  );
}

export default App;
