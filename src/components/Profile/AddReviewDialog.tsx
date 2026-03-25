'use client'

import { ReactNode, useMemo, useState } from "react"
import { allRatings, SelectedDegree, snakeCaseToReadable } from "./DegreeReviews/EditReviewsDialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { cn } from "@/lib/utils"
import { Description } from "@radix-ui/react-dialog"
import FormSectionWrapper from "./DegreeReviews/FormSections/FormSectionWrapper"
import DegreeCombobox from "./DegreeReviews/FormSections/DegreeCombobox"
import DegreeGraduation from "./DegreeReviews/FormSections/DegreeGraduation"
import DegreeRatings, { DegreeRatingProps } from "./DegreeReviews/FormSections/DegreeRatings"
import DegreeRecommend from "./DegreeReviews/FormSections/DegreeRecommend"
import StatusSelect from "./DegreeReviews/FormSections/StatusSelect"
import DegreeComment from "./DegreeReviews/FormSections/DegreeComment"
import ShadowWrapper from "../ShadowWrapper"
import { createReview, UpdateReviewPayload } from "@/app/actions/review"
import { toast } from "sonner"
import { useAuth } from "@/hooks/useAuth"

interface AddReviewDialogProps {

  children: ReactNode;
  userId: string;
}

const AddReviewDialog = ({
  children,
  userId,
} : AddReviewDialogProps ) => {
  const { user: currentUser } = useAuth();

  const plainUserDegree: UpdateReviewPayload = useMemo(() => ({
    id: "",
    degree_id: "",
    user_id: userId,

    career_rating: 0,
    curriculum_rating: 0,
    facilities_rating: 0,
    lecturer_rating: 0,
    overall_rating: 0,
    value_rating: 0,

    employment_status: null,

    comment: "",
    graduation_month: undefined,
    graduation_year: undefined,

    would_recommend: null,
  }), [userId])

  const [ open, setOpen ] = useState<boolean>(false);
  const [ isSubmitting, setIsSubmitting  ] = useState<boolean>(false);

  // Form States
  const [ selectedDegree, setSelectedDegree ] = useState<SelectedDegree>(null);
  
  const [ newUserDegree, setNewUserDegree ] = useState<UpdateReviewPayload>(plainUserDegree);


  // Error States
  const [ errors, setErrors ] = useState<(keyof UpdateReviewPayload)[]>([]);
  const yearError = 
    (newUserDegree?.graduation_year ?? 0) < 1000

  const addToErrors = (errorKey: keyof UpdateReviewPayload) => {
    if (errors.includes(errorKey)) {
      return;
    }

    setErrors(prev => [...prev, errorKey]);
  }

  const removeFromErrors = (errorKey: keyof UpdateReviewPayload) => {
    if (!errors.includes(errorKey)) {
      return;
    }

    setErrors(prev => prev.filter(p => p !== errorKey));
  }


  const updateNewUserDegree = <K extends keyof UpdateReviewPayload>(
    key: K,
    value: UpdateReviewPayload[K],
  ) => {
    setNewUserDegree(prev => ({
      ...prev,
      [key]: value,
    }))
  }

  const ratingsParsed: DegreeRatingProps[] = useMemo(() => {
    const keyOfRatings = Object.keys(allRatings);
    
    return Object.entries(newUserDegree)
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
          updateNewUserDegree(key as keyof typeof allRatings, val)
        }
      }))
  }, [newUserDegree])

  const clearOut = () => {
    setTimeout(() => {
      setNewUserDegree(plainUserDegree);
      setSelectedDegree(null);
      setErrors([]);
    }, 200)
  }

  const handleCloseModal = () => {
    setOpen(false);
    clearOut();
  }

  const submit = async () => {
    let flag = false;

    Object.entries(newUserDegree)
      .forEach(([key, value]) => {
        if (
          (!value && !["id", "would_recommend"].includes(key))
          || (key === "would_recommend" && value === undefined )
        ) {
          addToErrors(key as keyof UpdateReviewPayload);
          flag = true;
        } else {
          removeFromErrors(key as keyof UpdateReviewPayload);
        }
      })

    if (flag) {
      toast.error("Incomplete review")
      return;
    }

    const { error, message } = await createReview(newUserDegree, currentUser?.username ?? "");

    if (error) {
      toast.error(error ?? "Error in creating review");
      return;
    }

    handleCloseModal();
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
            Add Review
          </DialogTitle>
        </DialogHeader>

        <div className="py-2 px-4 flex flex-col gap-6 max-h-[70vh] overflow-auto">
          <FormSectionWrapper title="SELECT DEGREE">
            <DegreeCombobox
              value={selectedDegree}
              onValueChange={(v) => {
                setSelectedDegree(v);
                updateNewUserDegree("degree_id", v?.id)
              }}
            />
          </FormSectionWrapper>

          <FormSectionWrapper title="GRADUATION TIME">
            <DegreeGraduation
              year={newUserDegree.graduation_year}
              yearError={yearError}
              onYearChange={(v) => {
                updateNewUserDegree("graduation_year", v);
              }}
              month={newUserDegree.graduation_month}
              onMonthChange={(v) => {
                if (!!v && v >= 1 && v <= 12 ) {
                  updateNewUserDegree("graduation_month", v);
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
              recommend={newUserDegree.would_recommend}
              onChange={(v) => updateNewUserDegree("would_recommend", v)}
            />
          </FormSectionWrapper>

          <FormSectionWrapper title="EMPLOYMENT STATUS">
            <StatusSelect
              empStatus={newUserDegree.employment_status ?? null}
              onChange={(v) => updateNewUserDegree("employment_status", v)}
            />
          </FormSectionWrapper>

          <FormSectionWrapper title="COMMENT">
            <DegreeComment
              comment={newUserDegree.comment}
              onChange={(v) => updateNewUserDegree("comment", v)}
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
export default AddReviewDialog