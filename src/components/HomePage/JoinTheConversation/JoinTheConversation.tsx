import SignInButton from "@/components/Navbar/SignInButton"
import RedirectButton from "@/components/RedirectButton"

const JoinTheConversation = () => {
  return (
    <section id="join-the-conversation" className="join-the-conversation">
      <div className="join-the-conversation-wrapper">
        <h3>Join the Conversation</h3>

        <p>Help future students make better decisions. Share your university experience today.</p>

        <div className="flex gap-4 max-sm:flex-col max-sm:gap-6">
          <RedirectButton
            text="Write a Review"
            path="reviews"
            className="bg-yellow-300 h-full px-6 py-3 text-black"
          />
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