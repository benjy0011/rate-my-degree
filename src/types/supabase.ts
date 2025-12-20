import { Database } from './database'

export type Tables<T extends keyof Database['public']['Tables']> = 
  Database['public']['Tables'][T]['Row']

export type Inserts<T extends keyof Database['public']['Tables']> = 
  Database['public']['Tables'][T]['Insert']

export type Updates<T extends keyof Database['public']['Tables']> = 
  Database['public']['Tables'][T]['Update']

export type Country = Tables<'countries'>
export type State = Tables<'states'>
export type City = Tables<'cities'>
export type University = Tables<'universities'>
export type Profile = Tables<'profiles'>
export type UserDegree = Tables<'user_degrees'>
export type DegreeCategory = Tables<'degree_categories'>
export type DegreeField = Tables<'degree_fields'>
export type Degree = Tables<'degrees'>
export type Review = Tables<'reviews'>
export type ReviewVote = Tables<'review_votes'>
export type AISummary = Tables<'ai_summaries'>