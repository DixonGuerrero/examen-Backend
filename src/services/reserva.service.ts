import { Reserva } from "types";
import { SupabaseConection } from "./supabase.service";

export class ReservaService {

    // Obtener todas las reservas
    async obtenerReservas(env: any):Promise<Reserva[]> {
       const supabase = SupabaseConection.getInstance(env).getConection();
       const { data, error } = await supabase.from("reserva").select("*");
 
       if (error) throw error;
       return await new Response(JSON.stringify(data), {
       headers: {
          "Content-Type": "application/json",
       },
       }).json();
    }

   // Obtener reserva por ID de evento
   async obtenerReservaPorIdEvento(env: any, idEvento: number):Promise<Reserva[]> {
      const supabase = SupabaseConection.getInstance(env).getConection();
      const { data, error } = await supabase
        .from("reserva")
        .select("*")
        .eq("idevento", idEvento);
  
      if (error) throw error;
      return await new Response(JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      }).json();
    }

    // Obtener reserva por ID de usuario
    async obtenerReservaPorIdUsuario(env: any, idUsuario: number):Promise<Reserva[]> {
      const supabase = SupabaseConection.getInstance(env).getConection();
      const { data, error } = await supabase
        .from("reserva")
        .select("*")
        .eq("idusuario", idUsuario);
  
      if (error) throw error;
      return await new Response(JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      }).json();
    }

    // Obtener reserva por ID
    async obtenerReservaPorId(env: any, id: number):Promise<Reserva> {
      const supabase = SupabaseConection.getInstance(env).getConection();
      const { data, error } = await supabase
        .from("reserva")
        .select("*")
        .eq("idreserva", id);
  
      if (error) throw error;
      return await new Response(JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      }).json();
    }

    // Crear una nueva reserva
    async crearReserva(env: any, reserva: any) {
       const supabase = SupabaseConection.getInstance(env).getConection();
       const { data, error } = await supabase
         .from("reserva")
         .insert([reserva]);
 
       if (error) throw error;
       return await new Response(JSON.stringify(data), {
       headers: {
          "Content-Type": "application/json",
       },
       }).json();
    }

    // Eliminar una reserva
    async eliminarReserva(env: any, id: number) {
       const supabase = SupabaseConection.getInstance(env).getConection();
       const { data, error } = await supabase
         .from("reserva")
         .delete()
         .eq("idreserva", id);
 
       if (error) throw error;
       return await new Response(JSON.stringify(data), {
       headers: {
          "Content-Type": "application/json",
       },
       }).json();
    }

    // Actualizar una reserva
    async actualizarReserva(env: any, id: number, reserva: any) {
       const supabase = SupabaseConection.getInstance(env).getConection();
       const { data, error } = await supabase
         .from("reserva")
         .update(reserva)
         .eq("idreserva", id);
 
       if (error) throw error;
       return await new Response(JSON.stringify(data), {
       headers: {
          "Content-Type": "application/json",
       },
       }).json();
    }
}
