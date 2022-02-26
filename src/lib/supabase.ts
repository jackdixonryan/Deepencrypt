
import { createClient } from '@supabase/supabase-js'

const supabaseKey = import.meta.env["VITE_SUPABASE_ANON_KEY"];
const supabaseUrl = import.meta.env["VITE_SUPABASE_URL"];

console.log(supabaseUrl, supabaseKey);

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
