import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { UsuarioService } from "services/usuario.service";
import { Usuario, UsuarioSchema } from "types";

export class ListaUsuarios extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["Usuarios"],
		summary: "Lista de usuarios",
		
		responses: {
			"200": {
				description: "Retorna una lista de usuarios",
				schema: {
					success: Boolean,
					result: {
						usuarios: [UsuarioSchema],
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
		const usuarioService = new UsuarioService();
		const usuarios = await usuarioService.obtenerUsuarios(env);

      if(usuarios.length == 0) return {
         success: false,
         error: "No hay usuarios registrados"
      };

		return {
			success: true,
			usuarios
		};
	}
}
