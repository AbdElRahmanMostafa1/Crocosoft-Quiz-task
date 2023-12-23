import { Typography } from "@mui/material";

interface Props {
  text?: string;
}

const ErrorText = (props: Props) => {
  return (
    <Typography
      className="error-text"
      fontWeight={"700"}
      color={"crimson"}
      textAlign={"center"}
    >
      {props.text}
    </Typography>
  );
};

export default ErrorText;
