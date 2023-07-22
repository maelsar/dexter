import { State } from "@radixdlt/radix-dapp-toolkit";
import { createContext } from "react";
import { StaticState, clientState } from "alphadex-sdk-js";
import { Rdt } from "./types";

export const RdtContext = createContext<Rdt | undefined>(undefined);

export const initialStaticState = new StaticState(clientState.internalState);

export const AdexStateContext = createContext<StaticState>(initialStaticState);
