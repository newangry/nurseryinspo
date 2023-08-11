// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { supabaseAdmin } from '@/utils/server/supabase-admin';
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const params = req.body;
    const { error } = await supabaseAdmin.from("send_requests").insert([{
        name: params.name,
        email: params.email,
        twitter: params.twitter,
    }])    
    if(error){
        res.status(429).json({ msg: 'error' })
    } else {
        res.status(200).json({ msg: 'sccess' })
    }
}
