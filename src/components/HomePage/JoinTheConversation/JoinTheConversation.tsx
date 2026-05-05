import SignInButton from "@/components/Navbar/SignInButton"
import AddReviewDialog from "@/components/Profile/AddReviewDialog"
import ShadowWrapper from "@/components/ShadowWrapper"
import { createClient } from "@/lib/supabase/server"

const JoinTheConversation = async () => {
  const supabase = createClient();
  const { data: user } = 
    await (await supabase).auth.getUser();
  const userId = user.user?.id || "";

  const WriteReviewButton = 
    // userId
    // ? (
      <AddReviewDialog
        userId={userId}
      >
        <ShadowWrapper
          className="bg-yellow-300 h-full px-6 py-3 text-black"
        >
          Write a Review
        </ShadowWrapper>
      </AddReviewDialog>
    // ) : (
    //   <SignInButton
    //     text="Write a Review"
    //     className="bg-yellow-300 h-full px-6 py-3 text-black"
    //     wrapperClassName="bg-gray-700"
    //   />
    // )

  return (
    <section id="join-the-conversation" className="join-the-conversation">
      <div className="join-the-conversation-wrapper">
        <h3>Join the Conversation</h3>

        <p>Help future students make better decisions. Share your university experience today.</p>

        <div className="flex gap-4 max-sm:flex-col max-sm:gap-6">
          {WriteReviewButton}
          <SignInButton
            text="Create Account"
            className="border-gray-300 h-full px-6 py-3"
            wrapperClassName="bg-gray-700"
          />
        </div>
      </div>
    </section>
  )
}
export default JoinTheConversation