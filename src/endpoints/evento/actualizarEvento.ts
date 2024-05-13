import {
  OpenAPIRoute,
  OpenAPIRouteSchema,
  Path,
} from "@cloudflare/itty-router-openapi";
import { Evento, EventoSchema } from "../../types";
import { EventoService } from "services/evento.service";

export class ActualizarEvento extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Eventos"],
    summary: "Actualizar un evento",
    parameters: {
      id: Path(Number, {
        description: "Id del evento",
      }),
    },
    requestBody: EventoSchema,
    responses: {
      "200": {
        description: "Devuelve el evento actualizado",
        schema: {
          success: Boolean,
          result: {
            evento: EventoSchema,
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
    try {
      const { id } = data.params;
      const eventoToUpdate = data.body as Evento;

      const eventoService = new EventoService();

      // Check if evento exists
      const existingEvento = await eventoService.obtenerEventoPorId(env, id);
      if (existingEvento.idevento == undefined || existingEvento.idevento) {
        return new Response(
          JSON.stringify({
            success: false,
            message: "Evento not found",
          }),
          {
            headers: { "Content-Type": "application/json" },
            status: 404,
          }
        );
      }

      const updatedEvento = await eventoService.actualizarEvento(
        env,
        id,
        eventoToUpdate
      );

      return new Response(
        JSON.stringify({ success: true, result: updatedEvento }),
        {
          headers: { "Content-Type": "application/json" },
          status: 200,
        }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ success: false, message: error.message }),
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
        }
      );
    }
  }
}
