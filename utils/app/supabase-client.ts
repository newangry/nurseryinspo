import { createClient } from '@supabase/supabase-js';
import { SUPABSE_URL, SUPABSE_ANNON_KEY} from '@/utils/app/consts';


import type { Database } from '@/types/types_db';

export const supabaseClient = createClient<Database>(
    SUPABSE_URL || '',
    SUPABSE_ANNON_KEY || ''
 );