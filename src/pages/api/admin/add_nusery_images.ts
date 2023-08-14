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
        
        const { data, error } = await supabaseAdmin.from('nursery_images').insert([{
            nurseries_id: params.nurseries_id,
            image: params.image
        }]);
        
        if(error){
            console.log(error);
            res.status(201).json({msg: 'error'})
        } else{
            res.status(200).json({msg: 'success'})
        }   
    } catch(e: any){
        res.status(200).json({msg: e})
    }
}
