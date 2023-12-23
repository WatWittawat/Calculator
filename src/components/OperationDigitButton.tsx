import { ACTION } from "../lib/data";
import { useACTIONname } from "../lib/type";

type Pay_type = {
  type: useACTIONname;
  payload: {
    Operation: string;
  };
};

type DigitButtonProps = {
  dispatch: React.Dispatch<Pay_type>;
  Operation: string;
};
const OperationDigitButton: React.FC<DigitButtonProps> = ({
  dispatch,
  Operation,
}) => {
  return (
    <button
      onClick={() => {
        dispatch({ type: ACTION.CHOOSE_OPEARATION, payload: { Operation } });
      }}
    >
      {Operation}
    </button>
  );
};

export default OperationDigitButton;
