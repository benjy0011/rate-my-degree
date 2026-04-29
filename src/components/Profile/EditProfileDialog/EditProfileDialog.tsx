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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


interface EditProfileDialogProps {
  children: ReactNode
}

const EditProfileDialog = ({
  children
} : EditProfileDialogProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [ open, setOpen ] = useState<boolean>(false);
  // const [ loading, setLoading ] = useState<boolean>(false);
  // const [ updating, setUpdating ] = useState<boolean>(false);

  const [ username, setUsername ] = useState<string>("");
  const [ about, setAbout ] = useState<string>("");
  const [ isMale, setIsMale ] = useState<boolean | undefined>(undefined);

  const [ usernameError, setUsernameError ] = useState<boolean>(false);
  const [ aboutError, setAboutError ] = useState<boolean>(false);
  const [ isMaleError, setIsMaleError ] = useState<boolean>(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchCurrentUserProfileData,
    enabled: open, // only fetch when dialog opens
    staleTime: Infinity, // cache forever until invalidated
  })

  const mutation = useMutation({
    mutationFn: updateCurrentUserProfileData,
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ['userProfile'],
      });

      if (res.redirectTo) {
        router.push(res.redirectTo);
      }

      setOpen(false);
    },

    onError: (error) => {
      if (error.message.toLowerCase().includes('username')) { setUsernameError(true) }
      toast.error(error.message ?? "Error Updating Profile");
    }
  })

  const resetForm = () => {
    setUsername("");
    setAbout("");
    setIsMale(undefined);
    setUsernameError(false);
    setAboutError(false);
    setIsMaleError(false);
  }

  const clearOut = () => {
    setOpen(false);
    setTimeout(() => {
      resetForm();
    }, 300);
  }

  const submitForm = async () => {
    // setUpdating(true);

    const isMaleWrong = isMale === undefined;
    const usernameWrong = username.trim() === "" || username.includes(" ");
    const aboutWrong = about.trim() === "";

    if (isMaleWrong || usernameWrong || aboutWrong)
    {
      setIsMaleError(isMaleWrong);
      setUsernameError(usernameWrong);
      setAboutError(aboutWrong);

      // toast.error("Validation Error");
      // setUpdating(false);
      return;
    }

    mutation.mutate({
      bio: about,
      is_male: isMale,
      username
    })

    // try {
    //   const res = await updateCurrentUserProfileData({
    //     bio: about,
    //     is_male: isMale as boolean,
    //     username: username
    //   })

    //   if (res.redirectTo) {
    //     router.push(res.redirectTo);
    //   }

    //   setOpen(false);
      
    // } catch (e) {
    //   toast.error("Error Updating Profile"); 
    //   console.error(e);
    // } finally {
    //   setUpdating(false);
    // }
  }

  useEffect(() => {
    if (!open || !data) return;
    /* eslint-disable-next-line  */
    setUsername(data.username ?? "");
    setAbout(data.bio ?? "");
    setIsMale(data.is_male ?? undefined);

  }, [open, data]);

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        // if (!!v) setLoading(true);
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
      <Description className="sr-only">Edit Profile Dialog</Description>
      <DialogHeader>
        <DialogTitle
            className="border-b-2 pb-6 border-custom-gray"
          >
            Edit Profile
          </DialogTitle>
      </DialogHeader>

      <div className="py-2 px-4 flex flex-col gap-6 max-h-[70vh] overflow-auto">
        <FormSectionWrapper title="Username" titleClassName="text-sm" loading={isLoading}>
          <DynamicInput
            value={username}
            placeholder="Username"
            onChange={(val) => {
              setUsernameError(false);
              setUsername(val.target.value);
            }}
            error={usernameError}
          />
        </FormSectionWrapper>


        <FormSectionWrapper title="Gender" titleClassName="text-sm" loading={isLoading}>
          <GenderSelect
            isMale={isMale}
            onGenderChange={(isCurrentMale) => {
              setIsMaleError(false);
              setIsMale(isCurrentMale);
            }}
            error={isMaleError}
          />
        </FormSectionWrapper>


        <FormSectionWrapper title="About" titleClassName="text-sm" loading={isLoading}>
          <DynamicTextarea
            value={about}
            placeHolder="About"
            onChange={(val) => {
              setAboutError(false);
              setAbout(val);
            }}
            maxLength={500}
            error={aboutError}
          />
        </FormSectionWrapper>


        <div className="mx-auto">
          <ShadowWrapper
            className="px-10"
            spinnerClassname="left-3"
            loading={mutation.isPending}
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