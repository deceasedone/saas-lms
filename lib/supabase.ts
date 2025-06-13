import {createClient} from "@supabase/supabase-js";
import {auth} from "@clerk/nextjs/server";

export const createSupabaseClient = () => {
    return createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!, {
            async accessToken() {
                return ((await auth()).getToken());
            }
        }
    )
}