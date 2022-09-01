export type Provider = "Github" | "Google";
export type Nullable<T> = T | null | undefined;

export interface Content {
  title?: string;
  text?: string;
}

export interface IDialog {
  title: string;
  text: string;
  closeDelay: number;
  isConfirm: boolean;
  resolve: (v?: boolean) => void;
}

export type BoxSizeUnit = "px" | "pt" | "pc" | "in" | "Q" | "mm" | "cm" | "%";
export type BoxSizeTarget = "width" | "max-width" | "height" | "max-height";

export interface Todo {
  text: string;
  level: number;
  done?: boolean;
  createdAt?: Date;
  id?: string;
}
