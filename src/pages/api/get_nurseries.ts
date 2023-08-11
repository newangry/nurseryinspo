// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Nurseries } from '@/types/nurseries';
import { supabaseAdmin } from '@/utils/server/supabase-admin';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Nurseries[] | null>
) {
    const search = req.body.search;
    try{
        const { data, error } = await supabaseAdmin.from('nurseries')
                        .select("*")
                        .or(`name.ilike.%${search}%`)
                        .or(`description.ilike.%${search}%`)
                        .or(`email.ilike.%${search}%`)
                        .or(`phone_number.ilike.%${search}%`)
                        .or(`name.ilike.%${search}%`)

                        
        if(!error){
            res.status(200).json(data)
        } else{
            res.status(429).json([])
        }   
    } catch(e){
        res.status(429).json([])
    }
}

export  async function getNurseryNames() {
    try{
        const { data, error } = await supabaseAdmin.from('nurseries').select("*");
        if(!error){
            return data;
        } else{
            return [];
        }   
    } catch(e){
        return[]
    }
}

export async function getNursery(id: number) {
    try{
        const { data, error } = await supabaseAdmin.from('nurseries').select("*").eq("id", 5);

        if(!error){
            return data[0];
        } else{
            return [];
        }   
    } catch(e){
        return[]
    }
}
