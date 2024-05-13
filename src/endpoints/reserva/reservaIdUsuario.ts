import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
	Path,
} from "@cloudflare/itty-router-openapi";
import { ReservaService } from "services/reserva.service";
import { Reserva, ReservaSchema } from "types";

export class ReservasDeUsuario extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["Reservas"],
		summary: "Obtiene todas las reservas realizadas por un usuario específico",
		parameters: {
			id: Path(Number, {
				description: "ID del usuario para el que se buscan reservas",
			}),
		},
		responses: {
			"200": {
				description: "Lista de reservas realizadas por el usuario",
				schema: {
					success: Boolean,
					result: {
						reservas: [ReservaSchema],
					},
				},
			},
			"404": {
				description: "No se encontraron reservas para el usuario especificado",
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
		const reservaService = new ReservaService();
		const reservas = await reservaService.obtenerReservaPorIdUsuario(env, id);

      if (reservas.length == 0) {
			return new Response(JSON.stringify({
				success: false,
				error: "No se encontraron reservas para el usuario especificado"
			}), {
				headers: { "Content-Type": "application/json" },
				status: 404
			});
		}

		return new Response(JSON.stringify({
			success: true,
			result: { reservas }
		}), {
			headers: { "Content-Type": "application/json" },
			status: 200
		});
	}
}
