import { UserDegree } from "../DegreeReviews"
import DynamicSelect from "./DynamicSelect"

const EMPLOYMENT_STATUS_SELECTIONS = ['Employed', 'Unemployed','Further Study', 'Self-Employed', 'Student'];

interface StatusSelectProps {
  empStatus: UserDegree["reviews"]["employment_status"]
  onChange?: (val: UserDegree["reviews"]["employment_status"]) => void
}

const StatusSelect = ({
  empStatus,
  onChange,
} : StatusSelectProps) => {
  return (
    <DynamicSelect
      value={empStatus}
      selections={EMPLOYMENT_STATUS_SELECTIONS}
      onChange={onChange}
      selectionRenderer={(val) => <>{val}</>}
      placeHolder="Employment Status"
    />
  )
}
export default StatusSelect