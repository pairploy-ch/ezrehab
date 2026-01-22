import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zwtvmxqyqokomblothlo.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3dHZteHF5cW9rb21ibG90aGxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwNjExMDYsImV4cCI6MjA4NDYzNzEwNn0.BMvG5uqJCaW4Wwgrxs4ZClGqHXhxr9Gmmt6NFZ-Md3Y'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)