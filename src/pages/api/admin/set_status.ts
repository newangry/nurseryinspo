// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Nurseries } from '@/types/nurseries';
import { supabaseAdmin } from '@/utils/server/supabase-admin';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    msg: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const params = req.body;
    try{
        const { error } = await supabaseAdmin.from('nurseries').update([{status: params.status}]).eq('id', params.id);
        console.log(error);
        if(!error){
            res.status(200).json({msg: 'Success'})
        } else{
            res.status(201).json({msg: 'Error'})
        }   
    } catch(e: any){
        res.status(202).json({msg: e})
    }
}
