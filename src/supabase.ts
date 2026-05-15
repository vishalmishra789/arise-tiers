import { createClient } from '@supabase/supabase-js';

const SB_URL = "https://zsdtlcyzhcfgcwqucdjd.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzZHRsY3l6aGNmZ2N3cXVjZGpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1NDY2MDYsImV4cCI6MjA5MDEyMjYwNn0.IgjMXn3NbVw5nt8CvrJksD4NTEr26nLGwdytUgWFLe0";

export const supabase = createClient(SB_URL, SB_KEY);
