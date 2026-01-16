import { createClient } from "@/lib/supabase/client"
import CategoryCard from "./CategoryCard";
import { CATEGORIES_DISPLAY_COUNT } from "@/constants";

const Categories = async () => {
  const supabase = createClient();

  const { data: categories, error } = await supabase
    .from("degree_categories")
    .select("id, name, slug, description")
    .order("display_order", { ascending: true })
    .limit(CATEGORIES_DISPLAY_COUNT);

  return (
    <div className="cards-wrapper">
      {categories?.map(( { id, name, description, slug } ) => (
        <CategoryCard
          key={id}
          title={name}
          description={description}
          src={`/assets/images/categories/${slug}.svg`}
        />
      ))}
    </div>
  )
}
export default Categories