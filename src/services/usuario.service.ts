import { Usuario } from "types";
import { SupabaseConection } from "./supabase.service";

export class UsuarioService {

   // Obtener todos los usuarios
   async obtenerUsuarios(env: any):Promise<Usuario[]> {
      const supabase = SupabaseConection.getInstance(env).getConection();
      const { data, error } = await supabase.from("usuario").select("*");
  
      if (error) throw error;
      return await new Response(JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      }).json();
    }

    // Crear un nuevo usuario
    async crearUsuario(env: any, usuario: any) {
       const supabase = SupabaseConection.getInstance(env).getConection();
       const { data, error } = await supabase.from("usuario").insert([usuario]);
 
       if (error) throw error;
       return await new Response(JSON.stringify(data), {
       headers: {
          "Content-Type": "application/json",
       },
       }).json();
    }

    // Eliminar un usuario por ID
    async eliminarUsuario(env: any, id: number) {
       const supabase = SupabaseConection.getInstance(env).getConection();
       const { data, error } = await supabase.from("usuario").delete().eq("idusuario", id);
 
       if (error) throw error;
       return await new Response(JSON.stringify(data), {
       headers: {
          "Content-Type": "application/json",
       },
       }).json();
    }

    // Obtener un usuario por ID
    async obtenerUsuarioPorId(env: any, id: number): Promise<Usuario> {
       const supabase = SupabaseConection.getInstance(env).getConection();
       const { data, error } = await supabase.from("usuario").select("*").eq("idusuario", id);
 
       if (error) throw error;
       return await new Response(JSON.stringify(data), {
       headers: {
          "Content-Type": "application/json",
       },
       }).json();
    }

    // Actualizar un usuario por ID
    async actualizarUsuario(env: any, id: number, usuario: any) {
       const supabase = SupabaseConection.getInstance(env).getConection();
       const { data, error } = await supabase.from("usuario").update(usuario).eq("idusuario", id);
 
       if (error) throw error;
       return await new Response(JSON.stringify(data), {
       headers: {
          "Content-Type": "application/json",
       },
       }).json();
    }
}
