import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
	Path,
} from "@cloudflare/itty-router-openapi";
import { ReservaService } from "services/reserva.service";

export class EliminarReserva extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["Reservas"],
		summary: "Eliminar una reserva por id",
		parameters: {
			id: Path(Number, {
				description: "Id de la reserva a eliminar",
			}),
		},
		responses: {
			"200": {
				description: "Retorna la reserva eliminada",
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
		const reservaService = new ReservaService();
		const existingReserva = await reservaService.obtenerReservaPorId(env, id);

		if (existingReserva.idreserva == undefined || existingReserva.idreserva) {
			return new Response(JSON.stringify({
				success: false,
				message: "Reserva no encontrada"
			}), {
				headers: { "Content-Type": "application/json" },
				status: 404
			});
		}

		const reserva = await reservaService.eliminarReserva(env, id);
		
		return new Response(JSON.stringify({
			success: true,
			reserva
		}), {
			headers: { "Content-Type": "application/json" },
			status: 200
		});
	}
}
