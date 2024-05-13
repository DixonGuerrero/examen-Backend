import {
   OpenAPIRoute,
   OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { UsuarioService } from "services/usuario.service";
import { Usuario, UsuarioSchema } from "types";

export class CrearUsuario extends OpenAPIRoute {
   static schema: OpenAPIRouteSchema = {
       tags: ["Usuarios"],
       summary: "Crear un nuevo usuario",
       requestBody: UsuarioSchema,
       responses: {
           "200": {
               description: "Retorna el usuario creado",
               schema: {
                   success: Boolean,
                   result: {
                       usuario: UsuarioSchema,
                   },
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
       
       const usuarioToCreate = data.body as Usuario;

       const usuarioService = new UsuarioService();
       const usuario = await usuarioService.crearUsuario(env, usuarioToCreate);

       return {
           success: true,
           usuario
       };
   }
}
