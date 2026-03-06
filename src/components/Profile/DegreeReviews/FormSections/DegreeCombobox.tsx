'use client'
import OverflowTooltip from "@/components/OverflowTooltip";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox";
import { Spinner } from "@/components/ui/spinner";
import useDegreeSelections from "@/hooks/useDegreeSelections";

const Selection = ({name, uni} : {name: string, uni: string}) => (
  <div className="flex gap-2 items-center">
    <OverflowTooltip>{name}</OverflowTooltip>
    <p className="text-[11px] text-gray-400 pt-[1.5px]">{uni}</p>
  </div>
)

const DegreeCombobox = <T,>({
  value,
  onValueChange,
} : {
  value?: T,
  onValueChange?: (value: T | null) => void
}) => {
  const { data: selections, loading } = useDegreeSelections();


  return (
    <Combobox
      items={selections ?? []}
      value={value}
      onValueChange={(val) => onValueChange?.(val) }
      //@ts-expect-error lazy to fix type
      itemToStringLabel={(selection) => selection?.name}
      // itemToStringValue={(selection) => selection?.name }
    >
      <ComboboxInput className="rounded-[5px]" placeholder="Select a selection" />
      <ComboboxContent onWheel={(e) => e.stopPropagation()}>
        <ComboboxEmpty>
          {loading
            ? <Spinner />
            : "No items found."
          }
        </ComboboxEmpty>
        <ComboboxList>
          {(selection) => (
            <ComboboxItem key={selection.id} value={selection}>
              <Selection
                name={selection.name}
                uni={selection.universities.short_name}
              />
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
export default DegreeCombobox