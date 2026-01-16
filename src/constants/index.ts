import { IntroCardProps } from "@/components/IntroCard";
import { Briefcase, MessageSquare, TrendingUp } from "lucide-react";

export const INTROS: IntroCardProps[] = [
  {
    Icon: MessageSquare,
    iconClassName: "",
    className: "bg-gray-200",
    title: "Honest Degree Reviews",
    description: "Read verified reviews from students who have completed or are currently in degree programs.",
  },
  {
    Icon: Briefcase,
    iconClassName: "bg-yellow-400 text-black",
    className: "bg-yellow-100",
    title: "Real Career Data",
    description: "Learn about employment outcomes and career prospects from degree graduates.",
  },
  {
    Icon: TrendingUp,
    iconClassName: "bg-gray-700",
    className: "",
    title: "Detailed Ratings",
    description: "Rate and review degrees on curriculum quality, teaching, facilities, and value.",
  }
]


export const CATEGORIES_DISPLAY_COUNT = 4;