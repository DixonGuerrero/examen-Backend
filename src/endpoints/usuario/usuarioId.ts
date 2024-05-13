import {
   OpenAPIRoute,
   OpenAPIRouteSchema,
   Path,
} from "@cloudflare/itty-router-openapi";
import { UsuarioService } from "services/usuario.service";
import { UsuarioSchema } from "types";

export class UsuarioId extends OpenAPIRoute {
   static schema: OpenAPIRouteSchema = {
       tags: ["Usuarios"],
       summary: "Obtener un usuario por id",
       parameters: {
           id: Path(String, {
               description: "ID del usuario",
           }),
       },
       responses: {
           "200": {
               description: "Retorna un usuario si se encuentra",
               schema: {
                   success: Boolean,
                   result: {
                       usuario: UsuarioSchema
                   },
               },
           },
           "404": {
               description: "Usuario no encontrado",
               schema: {
                   success: Boolean,
                   error: String,
               },
           },
       },
   };

   async handle(
       request: Request,
       env: any,
       context: any,
       data: Record<string, any>
   ) {
       
       const { id } = data.params;

       const usuarioService = new UsuarioService();
       const usuario = await usuarioService.obtenerUsuarioPorId(env, id);

       if (usuario.idusuario == undefined || usuario.idusuario) {
           return {
               success: false,
               error: "Usuario no encontrado",
           };
       }

       return {
           success: true,
           usuario
       };
   }
}
