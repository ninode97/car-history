import { createContext } from "react";
import { createContextualCan } from "@casl/react";
import { AppAbilityType } from "./ability";

export const AbilityContext = createContext<AppAbilityType>(null!);

export default createContextualCan(AbilityContext.Consumer);
