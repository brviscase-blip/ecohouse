
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iavtghseginghdxunzmz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhdnRnaHNlZ2luZ2hkeHVuem16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5MzcxNzcsImV4cCI6MjA4MTUxMzE3N30.2tIEpqCo4LZ-6rDzTcaKocU_76q1AkMFfFOhpvMQyBg';

export const supabase = createClient(supabaseUrl, supabaseKey);
