// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Nurseries } from '@/types/nurseries';
import { supabaseAdmin } from '@/utils/server/supabase-admin';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Nurseries[] | null>
  ) {

    const id = req.body.id;
    try{
        const { data, error } = await supabaseAdmin.from('nurseries').select("*").eq("id", id);

        if(!error){
            res.status(200).json(data[0])

        } else{
            res.status(201).json([]);
        }   
    } catch(e){
        res.status(429).json([]);
    }
  }
  