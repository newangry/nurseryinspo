// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Nurseries } from '@/types/nurseries';
import { supabaseAdmin } from '@/utils/server/supabase-admin';
import type { NextApiRequest, NextApiResponse } from 'next'


export const config = {
    api: {
      responseLimit: '8mb',
    },
}

type Data = {
  msg: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const params = req.body;

    try{
        let res: any;
        if(params.type == 'edit'){
            res = await supabaseAdmin.from('nurseries').upsert([params.data]).eq('id', params.id);
        }else{
            res = await supabaseAdmin.from('nurseries').insert([params.data]);
        }
        if(!res.error){
            res.status(200).json({msg: 'Success'})
        } else{
            res.status(200).json({msg: res.error})
        }   
    } catch(e: any){
        res.status(200).json({msg: e})
    }
}
