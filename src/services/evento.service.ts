import { Evento } from "types";
import { SupabaseConection } from "./supabase.service";

export class EventoService {

   // Obtener todos los eventos
   async obtenerEventos(env: any):Promise<Evento[]> {
      const supabase = SupabaseConection.getInstance(env).getConection();
      const { data, error } = await supabase.from("evento").select("*");
  
      if (error) throw error;
      return await new Response(JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      }).json();
    }

    // Obtener un evento por ID
    async obtenerEventoPorId(env: any, id: number):Promise<Evento> {
       const supabase = SupabaseConection.getInstance(env).getConection();
       const { data, error } = await supabase.from("evento").select("*").eq("idevento", id);
 
       if (error) throw error;
       return await new Response(JSON.stringify(data), {
       headers: {
          "Content-Type": "application/json",
       },
       }).json();
    }

    // Crear un nuevo evento
    async crearEvento(env: any, evento: any):Promise<Response> {
       const supabase = SupabaseConection.getInstance(env).getConection();
       const { data, error } = await supabase.from("evento").insert([evento]);
 
       if (error) throw error;
       return await new Response(JSON.stringify(data), {
       headers: {
          "Content-Type": "application/json",
       },
       }).json();
    }

    // Eliminar un evento
    async eliminarEvento(env: any, id: number):Promise<Response> {
       const supabase = SupabaseConection.getInstance(env).getConection();
       const { data, error } = await supabase.from("evento").delete().eq("idevento", id);
 
       if (error) throw error;
       return await new Response(JSON.stringify(data), {
       headers: {
          "Content-Type": "application/json",
       },
       }).json();
    }

    // Actualizar un evento
    async actualizarEvento(env: any, id: number, evento: any) {
       const supabase = SupabaseConection.getInstance(env).getConection();
       const { data, error } = await supabase.from("evento").update(evento).eq("idevento", id);
 
       if (error) throw error;
       return await new Response(JSON.stringify(data), {
       headers: {
          "Content-Type": "application/json",
       },
       }).json();
    }
}
