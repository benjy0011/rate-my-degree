'use client'

import { useRouter } from "next/navigation"
import ShadowWrapper from "./ShadowWrapper"

const ViewCategoryButton = () => {
  const router = useRouter();

  const navigateToCategoriesPage = () => {
    router.push("/categories");
  }

  return (
    <ShadowWrapper
      className="view-category-button"
      onClick={navigateToCategoriesPage}
    >
      View All Categories
    </ShadowWrapper>
  )
}
export default ViewCategoryButton