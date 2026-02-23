'use server'

import { createClient } from "@/lib/supabase/server"
import { Database } from "@/types/database";

type DegreeSelection = Pick<
  Database["public"]["Tables"]["degrees"]["Row"],
  "id" | "name" 
> & { universities: { name: string, short_name: string } }

export async function fetchDegreeSelections(searchTerm?: string) {
  const supabase = createClient();
  const { data, error } = await (await supabase)
    .from("degrees")
    .select(`
      id,
      name,
      universities (
        short_name,
        name
      )
    `)
    .like("name", `%${searchTerm ?? ""}%`)
    .order("name", { ascending: true })
    .overrideTypes<DegreeSelection[]>();

  if (error) throw error;
  return data;
}