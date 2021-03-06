import { ChangeEvent } from "react";

export interface SelectCurrencyType {
  onChange: (e: ChangeEvent<{ value: unknown }>) => void;
  label?:string
  value: string;
}

export type ChangeEventHandlerType = ChangeEvent<{ value: unknown }>;
