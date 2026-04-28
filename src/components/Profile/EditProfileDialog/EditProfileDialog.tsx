'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Description } from "@radix-ui/react-dialog"
import { ReactNode, useEffect, useState } from "react"
import FormSectionWrapper from "../DegreeReviews/FormSections/FormSectionWrapper"
import DynamicTextarea from "@/components/DynamicFormSectionInput/DynamicTextarea"
import DynamicInput from "@/components/DynamicFormSectionInput/DynamicInput"
import GenderSelect from "@/components/DynamicFormSectionInput/GenderSelect"
import { fetchCurrentUserProfileData, updateCurrentUserProfileData } from "@/app/actions/userProfile"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import ShadowWrapper from "@/components/ShadowWrapper"


interface EditProfileDialogProps {
  children: ReactNode
}

const EditProfileDialog = ({
  children
} : EditProfileDialogProps) => {
  const router = useRouter();

  const [ open, setOpen ] = useState<boolean>(false);
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ updating, setUpdating ] = useState<boolean>(false);

  const [ username, setUsername ] = useState<string>("");
  const [ about, setAbout ] = useState<string>("");
  const [ isMale, setIsMale ] = useState<boolean | undefined>(undefined);

  const resetForm = () => {
    setUsername("");
    setAbout("");
    setIsMale(undefined);
  }

  const clearOut = () => {
    setOpen(false);
    setTimeout(() => {
      resetForm();
    }, 300);
  }

  const submitForm = async () => {
    setUpdating(true);

    if (
      isMale === undefined 
      || username.trim() === "" || username.includes(" ")
      || about.trim() === "") 
    {
      toast.error("Validation Error");  
      return;
    }

    try {
      const res = await updateCurrentUserProfileData({
        bio: about,
        is_male: isMale as boolean,
        username: username
      })

      if (res.redirectTo) {
        router.push(res.redirectTo);
      }

      setOpen(false);
      
    } catch (e) {
      toast.error("Error Updating Profile"); 
      console.error(e);
    } finally {
      setUpdating(false);
    }
  }

  useEffect(() => {
    if (open) {
      fetchCurrentUserProfileData()
        .then((data) => {
          setAbout(data?.bio);
          setIsMale(data?.is_male)
          setUsername(data?.username)
        })
        .catch(err => console.error("Error in fetching user profile data: ", err))
        .finally(() => setLoading(false));
    }
  }, [open])

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!!v) setLoading(true);
        if (!v) clearOut();
      }}
    >
    <DialogTrigger asChild>{children}</DialogTrigger>
    <DialogContent
      aria-describedby={"Edit Profile Dialog"}
      className={cn(
        "shadow-div-effect",
        "rounded-none",
        "lg:max-w-[45%]"
      )}
      onOpenAutoFocus={(e) => e.preventDefault()}
    >
      <Description className="hidden"></Description>
      <DialogHeader>
        <DialogTitle
            className="border-b-2 pb-6 border-custom-gray"
          >
            Edit Profile
          </DialogTitle>
      </DialogHeader>

      <div className="py-2 px-4 flex flex-col gap-6 max-h-[70vh] overflow-auto">
        <FormSectionWrapper title="Username" titleClassName="text-sm" loading={loading}>
          <DynamicInput
            value={username}
            placeholder="Username"
            onChange={(val) => setUsername(val.target.value)}
          />
        </FormSectionWrapper>


        <FormSectionWrapper title="Gender" titleClassName="text-sm" loading={loading}>
          <GenderSelect
            isMale={isMale}
            onGenderChange={(isCurrentMale) => setIsMale(isCurrentMale)}
          />
        </FormSectionWrapper>


        <FormSectionWrapper title="About" titleClassName="text-sm" loading={loading}>
          <DynamicTextarea
            value={about}
            placeHolder="About"
            onChange={(val) => setAbout(val)}
            maxLength={500}
          />
        </FormSectionWrapper>


        <div className="mx-auto">
          <ShadowWrapper
            className="px-10"
            spinnerClassname="left-3"
            loading={updating}
            onClick={submitForm}
          >
            Submit
          </ShadowWrapper>
          </div>
      </div>

    </DialogContent>
  </Dialog>
  )
}
export default EditProfileDialog