'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ReactElement } from "react";

interface DynamicSelectProps<T> {
  selections: T[];
  value: T;
  onChange?: (val: T) => void;
  selectionRenderer: (val: T) => ReactElement;
  valueSerializer?: (val: T) => string;
  placeHolder?: string;
}

const DynamicSelect = <T,>({
  value,
  selections,
  onChange,
  selectionRenderer,
  valueSerializer = (val) => JSON.stringify(val),
  placeHolder,
}: DynamicSelectProps<T>) => {
  const handleChange = (stringVal: string) => {
    const original = selections.find((s) => valueSerializer(s) === stringVal);
    if (original !== undefined) onChange?.(original);
  };

  return (
    <Select
      value={valueSerializer(value)}
      onValueChange={handleChange}
    >
      <SelectTrigger className="w-full hover:cursor-pointer shadow-div-effect-sm">
        <SelectValue placeholder={placeHolder} />
      </SelectTrigger>
      <SelectContent position="popper" sideOffset={4}>
        <SelectGroup>
          {selections.map((selection, index) => (
            <SelectItem value={valueSerializer(selection)} key={index}>
              {selectionRenderer(selection)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default DynamicSelect;