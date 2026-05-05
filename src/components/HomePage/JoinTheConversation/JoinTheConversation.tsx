import SignInButton from "@/components/Navbar/SignInButton"
import { createClient } from "@/lib/supabase/server"
import WriteReviewButton from "./WriteReviewButton"

const JoinTheConversation = async () => {
  const supabase = createClient();
  const { data: user } = 
    await (await supabase).auth.getUser();
  const userId = user.user?.id || "";

  return (
    <section id="join-the-conversation" className="join-the-conversation">
      <div className="join-the-conversation-wrapper">
        <h3>Join the Conversation</h3>

        <p>Help future students make better decisions. Share your university experience today.</p>

        <div className="flex gap-4 max-sm:flex-col max-sm:gap-6">
          <WriteReviewButton userId={userId} />
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