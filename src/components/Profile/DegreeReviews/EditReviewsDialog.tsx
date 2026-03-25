'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { ReactNode, useMemo, useState } from "react"
import DegreeCombobox from "./FormSections/DegreeCombobox"
import DegreeRatings, { DegreeRatingProps } from "./FormSections/DegreeRatings"
import FormSectionWrapper from "./FormSections/FormSectionWrapper"
import { Description } from "@radix-ui/react-dialog"
import { updateReview, UpdateReviewPayload } from "@/app/actions/review"
import { UserDegree } from "./DegreeReviews"
import DegreeRecommend from "./FormSections/DegreeRecommend"
import StatusSelect from "./FormSections/StatusSelect"
import DegreeComment from "./FormSections/DegreeComment"
import DegreeGraduation from "./FormSections/DegreeGraduation"
import { toast } from "sonner"
import ShadowWrapper from "@/components/ShadowWrapper"

export type SelectedDegree = Pick<
    UserDegree["degrees"],
    "id" | "name"
  > | null;


interface EditReviewsDialogProps {
  children: ReactNode;
  userDegree: UserDegree;
  username: string;
}

export const allRatings = {
  "overall_rating": 0,
  "career_rating": 1,
  "curriculum_rating": 2,
  "facilities_rating": 3,
  "lecturer_rating": 4,
  "value_rating": 5,
}

export const snakeCaseToReadable = (snake: string) => {
  const texts = snake.split("_");

  if (texts.length <= 1) return snake;

  return texts
    .map((text) => `${text.toUpperCase()}`)
    .join(" ");
}

const EditReviewsDialog = ({
  children,
  userDegree,
  username,
} : EditReviewsDialogProps) => {
  const [open, setOpen] = useState(false);
  
  // Form States
  const [ selectedDegree, setSelectedDegree ] = useState<SelectedDegree>(userDegree.degrees);
  const [ ratings, setRatings ] = useState<UserDegree["reviews"]>(userDegree.reviews);
  const [ wouldRecommend, setWouldRecommend ] = useState<UserDegree["reviews"]["would_recommend"]>(userDegree.reviews.would_recommend);
  const [ employmentStatus, setEmploymentStatus ] = useState<UserDegree["reviews"]["employment_status"]>(userDegree.reviews.employment_status);
  const [ comment, setComment ] = useState<UserDegree["reviews"]["comment"]>(userDegree.reviews.comment);
  const [ month, setMonth ] = useState<UserDegree["graduation_month"] | undefined>(userDegree.graduation_month);
  const [ year, setYear ] = useState<UserDegree["graduation_year"] | undefined>(userDegree.graduation_year);

  // Error states
  const yearError = !(!!year && year > 1000 && year <= 9999);

  // Loading states
  const [ isSubmitting, setIsSubmitting ] = useState<boolean>(false);

  const anyError = yearError;

  const ratingsParsed: DegreeRatingProps[] = useMemo(() => {
    const keyOfRatings = Object.keys(allRatings);
    
    return Object.entries(ratings)
      .filter(([key]) => keyOfRatings.includes(key))
      .sort(([keyA], [keyB]) => {
        const valA = allRatings[keyA as keyof typeof allRatings];
        const valB = allRatings[keyB as keyof typeof allRatings];
        return valA - valB;
      })
      .map(([key, value]) => ({
        label: snakeCaseToReadable(key),
        value: value as number ?? 0,
        onChange: (val) => {
          setRatings((prev) => {
            return {
              ...prev,
              [key]: val
            }
          })
        }
      }
    ))
  }, [ratings])

  const clearOut = () => {
    setTimeout(() => {
      setSelectedDegree(userDegree.degrees);
      setRatings(userDegree.reviews);
      setWouldRecommend(userDegree.reviews.would_recommend);
      setEmploymentStatus(userDegree.reviews.employment_status);
      setComment(userDegree.reviews.comment);
      setYear(userDegree.graduation_year);
      setMonth(userDegree.graduation_month);
    }, 150)
  }

  const payload: UpdateReviewPayload  = {
    degree_id: selectedDegree?.id,
    career_rating: ratings.career_rating,
    curriculum_rating: ratings.curriculum_rating,
    employment_status: ratings.employment_status,
    facilities_rating: ratings.facilities_rating,
    lecturer_rating: ratings.lecturer_rating,
    overall_rating: ratings.overall_rating,
    value_rating: ratings.value_rating,
    comment: comment,
    id: userDegree.id,
    would_recommend: wouldRecommend,
    graduation_month: month,
    graduation_year: year,
    user_id: userDegree.user_id,
  }

  const submit = async () => {
    if (anyError) toast.error("Error in review, please check");

    setIsSubmitting(true);

    const id = userDegree.reviews.id;
    const { error } = await updateReview ( id, payload, username );

    if (error) {
      toast.error(error);
    } else {
      toast.success("Review updated!");
      setOpen(false);
    }

    setIsSubmitting(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) clearOut();
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        aria-describedby={"Edit Review Dialog"}
        className={cn(
          "shadow-div-effect",
          "rounded-none",
          "lg:max-w-[45%]"
        )}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Description className="hidden"></Description>
        <DialogHeader className="">
          <DialogTitle
            className="border-b-2 pb-6 border-custom-gray"
          >
            Edit Your Review
          </DialogTitle>
        </DialogHeader>

        <div className="py-2 px-4 flex flex-col gap-6 max-h-[70vh] overflow-auto">
          <FormSectionWrapper title="SELECT DEGREE">
            <DegreeCombobox
              value={selectedDegree}
              onValueChange={(v) => setSelectedDegree(v)}
            />
          </FormSectionWrapper>

          <FormSectionWrapper title="GRADUATION TIME">
            <DegreeGraduation
              year={year}
              yearError={yearError}
              onYearChange={(v) => {
                setYear(v);
              }}
              month={month}
              onMonthChange={(v) => {
                if (!!v && v >= 1 && v <= 12 ) {
                  setMonth(v)
                }
              }}
            />
          </FormSectionWrapper>


          <FormSectionWrapper title="RATINGS">
            <DegreeRatings
              ratings={ratingsParsed}
            />
          </FormSectionWrapper>

          <FormSectionWrapper title="WOULD RECOMMEND">
            <DegreeRecommend
              recommend={wouldRecommend}
              onChange={(v) => setWouldRecommend(v)}
            />
          </FormSectionWrapper>

          <FormSectionWrapper title="EMPLOYMENT STATUS">
            <StatusSelect
              empStatus={employmentStatus}
              onChange={(v) => setEmploymentStatus(v)}
            />
          </FormSectionWrapper>

          <FormSectionWrapper title="COMMENT">
            <DegreeComment
              comment={comment}
              onChange={(v) => setComment(v)}
            />
          </FormSectionWrapper>

          <div className="mx-auto">
            <ShadowWrapper
              className="px-10"
              spinnerClassname="left-3"
              loading={isSubmitting}
              onClick={() => submit()}
            >
              Submit
            </ShadowWrapper>
          </div>
        </div>


      </DialogContent>
    </Dialog>
  )
}
export default EditReviewsDialog