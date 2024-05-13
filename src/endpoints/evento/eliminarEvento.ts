import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
	Path,
} from "@cloudflare/itty-router-openapi";
import { EventoService } from "services/evento.service";

export class EliminarEvento extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["Eventos"],
		summary: "Eliminar un evento por id",
		parameters: {
			id: Path(Number, {
				description: "Id del evento a eliminar",
			}),
		},
		responses: {
			"200": {
				description: "Retorna el evento eliminado",
				schema: {
					success: Boolean,
					result: {
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
		
		const { id } = data.params;
		const eventoService = new EventoService();
		const existingEvento = await eventoService.obtenerEventoPorId(env, id);

		if (existingEvento.idevento == undefined || existingEvento.idevento) {
			return new Response(JSON.stringify({
				success: false,
				message: "Evento not found"
			}), {
				headers: { "Content-Type": "application/json" },
				status: 404
			});
		}

		const evento = await eventoService.eliminarEvento(env, id);
		
		return new Response(JSON.stringify({
			success: true,
			evento
		}), {
			headers: { "Content-Type": "application/json" },
			status: 200
		});
	}
}
