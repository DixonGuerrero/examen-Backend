import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
	Path,
} from "@cloudflare/itty-router-openapi";
import { UsuarioService } from "services/usuario.service";

export class EliminarUsuario extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["Usuarios"],
		summary: "Eliminar un usuario por id",
		parameters: {
			id: Path(Number, {
				description: "Id del usuario a eliminar",
			}),
		},
		responses: {
			"200": {
				description: "Retorna el usuario eliminado",
				schema: {
					success: Boolean,
					result: {
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
		const existingUsuario = await usuarioService.obtenerUsuarioPorId(env, id);

		if (existingUsuario.idusuario == undefined || existingUsuario.idusuario) {
			return new Response(JSON.stringify({
				success: false,
				message: "Usuario no encontrado"
			}), {
				headers: { "Content-Type": "application/json" },
				status: 404
			});
		}

		const usuario = await usuarioService.eliminarUsuario(env, id);
		
		return new Response(JSON.stringify({
			success: true,
			usuario
		}), {
			headers: { "Content-Type": "application/json" },
			status: 200
		});
	}
}
