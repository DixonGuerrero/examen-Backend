import { OpenAPIRoute, OpenAPIRouteSchema, Path } from "@cloudflare/itty-router-openapi";
import { EventoService } from "services/evento.service";
import { EventoSchema } from "types";

export class EventoId extends OpenAPIRoute {
    static schema: OpenAPIRouteSchema = {
        tags: ["Eventos"],
        summary: "Obtener un evento por id",
        parameters: {
            id: Path(String, {
                description: "ID del evento",
            }),
        },
        responses: {
            "200": {
                description: "Retorna un evento si se encuentra",
                schema: {
                    success: Boolean,
                    result: {
                        evento: EventoSchema
                    },
                },
            },
            "404": {
                description: "Evento no encontrado",
                schema: {
                    success: Boolean,
                    error: String,
                },
            },
        },
    };

    async handle(request: Request, env: any, context: any, data: Record<string, any>) {
        const { id } = data.params;
        const eventoService = new EventoService();
        const evento = await eventoService.obtenerEventoPorId(env, id);

        if (!evento) {
            return new Response(JSON.stringify({ success: false, error: "Evento no encontrado" }), { status: 404 });
        }

        return {
            success: true,
            evento
        };
    }
}
