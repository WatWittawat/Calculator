import { useReducer } from "react";
import DigitButton from "./components/DigitButton";
import "./App.css";
import { ACTION } from "./lib/data";
import OperationDigitButton from "./components/OperationDigitButton";
import { useACTIONname } from "./lib/type";

type PropsState = {
  CurOperand: string | undefined;
  PreOperand: string;
  Operation: string | undefined;
  overwrite: boolean;
};

type Pay_type = {
  type: useACTIONname;
  payload: {
    digit?: string;
    Operation?: string;
  };
};

function reducer(state: PropsState, { type, payload }: Pay_type) {
  switch (type) {
    case ACTION.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          CurOperand: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === "0" && state.CurOperand === "0") {
        return state;
      }
      if (
        payload.digit === "." &&
        state.CurOperand &&
        state.CurOperand.includes(".")
      ) {
        return state;
      }
      return {
        ...state,
        CurOperand: `${state.CurOperand || ""}${payload.digit}`,
      };
    case ACTION.CHOOSE_OPEARATION:
      if (!state.CurOperand && !state.PreOperand) {
        return state;
      }
      if (!state.CurOperand) {
        return {
          ...state,
          Operation: payload.Operation,
        };
      }
      if (!state.PreOperand) {
        return {
          ...state,
          Operation: payload.Operation,
          PreOperand: state.CurOperand,
          CurOperand: "",
        };
      }

      return {
        ...state,
        PreOperand: evaluate(state),
        Operation: payload.Operation,
        CurOperand: "",
      };
    case ACTION.CLEAR:
      return {
        CurOperand: "",
        PreOperand: "",
        Operation: "",
        overwrite: false,
      };
    case ACTION.EVALUATE:
      if (!state.Operation || !state.CurOperand || !state.PreOperand) {
        return state;
      }
      return {
        ...state,
        Operation: undefined,
        overwrite: true,
        PreOperand: "",
        CurOperand: evaluate(state),
      };
    case ACTION.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          CurOperand: "",
          overwrite: false,
        };
      }
      if (state.CurOperand && state.CurOperand.length === 1) {
        return {
          ...state,
          CurOperand: "",
        };
      }
      return {
        ...state,
        CurOperand: state.CurOperand ? state.CurOperand.slice(0, -1) : "",
      };
    default:
      return state;
  }
}

const evaluate = ({ CurOperand, PreOperand, Operation }: PropsState) => {
  const prev = parseFloat(PreOperand);
  const current = parseFloat(CurOperand ? CurOperand : "");
  if (isNaN(prev) || isNaN(current)) {
    return "";
  }
  let computation = 0;
  switch (Operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "/":
      computation = prev / current;
      break;
  }
  return computation.toString();
};

const INTEGER_FORMATER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

const forMatnumber = (operand: string): string | undefined => {
  if (!operand) {
    return undefined;
  }
  const [integer, decimal] = operand.split(".");
  if (!decimal) {
    return INTEGER_FORMATER.format(Number(integer));
  }
  return `${INTEGER_FORMATER.format(Number(integer))}.${decimal}`;
};

function App() {
  const [{ CurOperand, PreOperand, Operation }, dispatch] = useReducer(
    reducer,
    { CurOperand: "", PreOperand: "", Operation: "", overwrite: false }
  );
  return (
    <div className="container">
      <div className="output">
        <div className="PreOperand">
          {forMatnumber(PreOperand)} {Operation}
        </div>
        <div className="CurOperand">
          {forMatnumber(CurOperand ? CurOperand : "")}
        </div>
      </div>
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTION.CLEAR, payload: {} })}
      >
        AC
      </button>
      <button
        onClick={() => dispatch({ type: ACTION.DELETE_DIGIT, payload: {} })}
      >
        DEL
      </button>
      <OperationDigitButton
        Operation="/"
        dispatch={dispatch}
      ></OperationDigitButton>
      <DigitButton digit="1" dispatch={dispatch}></DigitButton>
      <DigitButton digit="2" dispatch={dispatch}></DigitButton>
      <DigitButton digit="3" dispatch={dispatch}></DigitButton>
      <OperationDigitButton
        Operation="*"
        dispatch={dispatch}
      ></OperationDigitButton>
      <DigitButton digit="4" dispatch={dispatch}></DigitButton>
      <DigitButton digit="5" dispatch={dispatch}></DigitButton>
      <DigitButton digit="6" dispatch={dispatch}></DigitButton>
      <OperationDigitButton
        Operation="+"
        dispatch={dispatch}
      ></OperationDigitButton>
      <DigitButton digit="7" dispatch={dispatch}></DigitButton>
      <DigitButton digit="8" dispatch={dispatch}></DigitButton>
      <DigitButton digit="9" dispatch={dispatch}></DigitButton>
      <OperationDigitButton
        Operation="-"
        dispatch={dispatch}
      ></OperationDigitButton>
      <DigitButton digit="." dispatch={dispatch}></DigitButton>
      <DigitButton digit="0" dispatch={dispatch}></DigitButton>
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTION.EVALUATE, payload: {} })}
      >
        =
      </button>
    </div>
  );
}

export default App;
