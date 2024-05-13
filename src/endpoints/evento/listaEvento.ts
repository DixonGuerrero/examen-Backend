import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { EventoService } from "services/evento.service";
import { Evento, EventoSchema } from "types";

export class ListaEventos extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["Eventos"],
		summary: "Lista de eventos",
		
		responses: {
			"200": {
				description: "Retorna una lista de eventos",
				schema: {
					success: Boolean,
					result: {
						eventos: [EventoSchema],
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
		const eventoService = new EventoService();
		const eventos = await eventoService.obtenerEventos(env);

		return {
			success: true,
			eventos
		};
	}
}
