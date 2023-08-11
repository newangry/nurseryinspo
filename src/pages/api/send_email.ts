import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/utils/server/supabase-admin';
type Data = {
    msg: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const email = req.body.email;
    const exists = await supabaseAdmin.from('emails').select("*").eq("email", email);
    if(exists.data){
        if(exists.data.length > 0){
            res.status(429).json({ msg: 'You email already exist' });
        }
        const { error } = await supabaseAdmin.from('emails').insert([{email: email}]);
        if(error){
            res.status(429).json({ msg: 'Error' });
        } else{
            res.status(200).json({ msg: 'success' });
        }
    } 
}
