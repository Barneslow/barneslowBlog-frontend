import { css } from "@emotion/react";
import RiseLoader from "react-spinners/CircleLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const LoadingSpinner = () => {
  return <RiseLoader color="blue" loading={true} cssOverride={override} />;
};

export default LoadingSpinner;
