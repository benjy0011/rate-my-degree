'use client'

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ReactElement } from "react";

interface DegreeRecommendProps<T> {
  selections: T[];
  value: T;
  onChange?: (val: T) => void;
  selectionRenderer: (val: T) => ReactElement;
  placeHolder?: string;
}

const DynamicSelect = <T, >({
  value,
  selections,
  onChange,
  selectionRenderer,
  placeHolder,
}  : DegreeRecommendProps<T>) => {
  return (
    <Select
      value={value !== null && value !== undefined ? String(value) : ""}
      onValueChange={(val: string) => {
        const original = selections.find(s => String(s) === val);
        if (original !== undefined) {
          onChange?.(original);
        }
      }}
    >
      <SelectTrigger className="w-full hover:cursor-pointer shadow-div-effect-sm">
        <SelectValue placeholder={placeHolder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* <SelectLabel>Fruits</SelectLabel> */}
          {
            selections.map(( selection, index ) => (
              <SelectItem value={String(selection)} key={index}>
                {selectionRenderer(selection)}
              </SelectItem>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
export default DynamicSelect