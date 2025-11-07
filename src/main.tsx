import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Root from "./app/root.component";

import './styles/_globals.css'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
