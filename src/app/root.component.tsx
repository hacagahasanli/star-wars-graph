import { withProviders } from "./providers/hocs";

import AppRouting from "../routing/AppRouting";

const Root = withProviders(() => <AppRouting />);

export default Root;
