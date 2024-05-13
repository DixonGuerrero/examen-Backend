import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { ReservaService } from "services/reserva.service";
import { Reserva, ReservaSchema } from "types";

export class ListaReservas extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["Reservas"],
		summary: "Lista de reservas",
		
		responses: {
			"200": {
				description: "Retorna una lista de reservas",
				schema: {
					success: Boolean,
					result: {
						reservas: [ReservaSchema],
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
		const reservaService = new ReservaService();
		const reservas = await reservaService.obtenerReservas(env);

		return {
			success: true,
			reservas
		};
	}
}
