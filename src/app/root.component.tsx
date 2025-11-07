import { withProviders } from "./providers";

import AppRouting from "../routing/AppRouting";

const Root = withProviders(() => <AppRouting />);

export default Root;
