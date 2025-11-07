import withRouter from "./withRouter";
import withReactQuery from "./withReactQuery";

import { compose } from "../../shared/lib/utils/FunctionUtils";

export const withProviders = compose(withRouter, withReactQuery);
