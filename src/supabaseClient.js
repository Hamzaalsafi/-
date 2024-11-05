import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://bssmxtuirzzedaanfbsq.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzc214dHVpcnp6ZWRhYW5mYnNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA4MTI0ODgsImV4cCI6MjA0NjM4ODQ4OH0.o0znbdQOJ0Jwdi96O7OWzXOiJ5g6dLBwICGZFdbFgYc";

if (!supabaseUrl || !supabaseKey) {
    console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Key:", supabaseKey);
    throw new Error("Supabase URL and Key must be defined in the .env file");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;