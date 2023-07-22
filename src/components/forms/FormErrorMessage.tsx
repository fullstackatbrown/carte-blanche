interface IFormErrorMessage {
  errorMessage: string;
}

export const FormErrorMessage = ({ errorMessage }: IFormErrorMessage) => {
  if (!errorMessage) {
    return null;
  }

  return <p className="text-red-500">{errorMessage}</p>;
};
