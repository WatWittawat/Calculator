import { ACTION } from "../lib/data";
import { useACTIONname } from "../lib/type";

type Pay_type = {
  type: useACTIONname;
  payload: {
    digit: string;
  };
};

type DigitButtonProps = {
  dispatch: React.Dispatch<Pay_type>;
  digit: string;
};
const DigitButton: React.FC<DigitButtonProps> = ({ dispatch, digit }) => {
  return (
    <button
      onClick={() => {
        dispatch({ type: ACTION.ADD_DIGIT, payload: { digit } });
      }}
    >
      {digit}
    </button>
  );
};

export default DigitButton;
