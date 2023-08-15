// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Nurseries } from '@/types/nurseries';
import { supabaseAdmin } from '@/utils/server/supabase-admin';
import type { NextApiRequest, NextApiResponse } from 'next'


export const config = {
    api: {
      responseLimit: '8mb',
    },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const params = req.body.data;
    params.items = req.body.items;
    const del = await supabaseAdmin.from('nursery_images').delete().eq("nurseries_id", params.id);
    try{
        let result: any;
        if(req.body.type == 'edit'){
            const id = params.id;
            result = await supabaseAdmin.from('nurseries').upsert([params]).eq('id', id).select("*");
        }else{
            result = await supabaseAdmin.from('nurseries').insert([params]).select("*");
        }

        if(result.data){
            res.status(200).json({msg: 'Success', id: result.data[0].id})
        } else{
            res.status(201).json({msg: result.error})
        }   
    } catch(e: any){
        console.log(e);
        res.status(202).json({msg: e})
    }
}
