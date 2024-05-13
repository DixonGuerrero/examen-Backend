import { OpenAPIRoute, OpenAPIRouteSchema, Path } from "@cloudflare/itty-router-openapi";
import { Reserva, ReservaSchema } from "../../types";
import { ReservaService } from "services/reserva.service";

export class ActualizarReserva extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Reservas"],
    summary: "Actualizar una reserva",
    parameters: {
      id: Path(Number, {
        description: "Id de la reserva",
      }),
    },
    requestBody: ReservaSchema,                                                       
    responses: {
      "200": {
        description: "Devuelve la reserva actualizada",
        schema: {
          success: Boolean,
          result: {
            reserva: ReservaSchema,
          },
        },
      },
    },
  };

  async handle(request: Request, env: any, context: any, data: Record<string, any>) {
    try {
        const { id } = data.params;
        const reservaToUpdate = data.body as Reserva;

        const reservaService = new ReservaService();

        // Check if reserva exists
        const existingReserva = await reservaService.obtenerReservaPorId(env, id);
        if (existingReserva.idreserva == undefined || existingReserva.idreserva == null) {
            return new Response(JSON.stringify({
                success: false,
                message: "Reserva no encontrada"
            }), {
                headers: { "Content-Type": "application/json" },
                status: 404
            });
        }

        const updatedReserva = await reservaService.actualizarReserva(env, id, reservaToUpdate);

        return new Response(JSON.stringify({ success: true, result: updatedReserva }), {
            headers: { "Content-Type": "application/json" },
            status: 200
        });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, message: error.message }), {
            headers: { "Content-Type": "application/json" },
            status: 400
        });
    }
  }
}
