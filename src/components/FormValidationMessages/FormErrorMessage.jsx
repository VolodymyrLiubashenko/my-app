import { ErrorMessage as Message } from "formik";

const FormErrorMessage = ({ name }) => {
  return (
    <Message name={name}>
      {(msg) => (
        <div style={{ color: "#9F0707", fontSize: "20px", fontWeight: 600 }}>
          {msg}
        </div>
      )}
    </Message>
  );
};

export default FormErrorMessage;
