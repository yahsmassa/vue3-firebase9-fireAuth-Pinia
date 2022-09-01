import { BoxSizeTarget, BoxSizeUnit } from "@/types/mytype";

export function generateBoxSize(
  size: number,
  boxSizeUnit: BoxSizeUnit,
  boxSizeTarget: BoxSizeTarget
) {
  return `${boxSizeTarget}: ${size}${boxSizeUnit};`;
}
