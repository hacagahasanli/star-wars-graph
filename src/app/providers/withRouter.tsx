import { BrowserRouter } from "react-router-dom";

import Paths from "../../resources/constants/Paths";

import type { HOC } from "./types/HOC";

const withRouter: HOC = (Component) => (props) => {
  return (
    <BrowserRouter basename={Paths.LIST_STARWARS} data-testid="root">
      <Component {...props} />
    </BrowserRouter>
  );
};

export default withRouter;
