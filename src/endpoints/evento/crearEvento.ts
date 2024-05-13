import {
   OpenAPIRoute,
   OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { EventoService } from "services/evento.service";
import { Evento, EventoSchema } from "types";

export class CrearEvento extends OpenAPIRoute {
   static schema: OpenAPIRouteSchema = {
       tags: ["Eventos"],
       summary: "Crear un nuevo evento",
       requestBody: EventoSchema,
       responses: {
           "200": {
               description: "Retorna el evento creado",
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
       
       const eventoToCreate = data.body as Evento;

       // Validar que la capacidad y las entradas disponibles sean coherentes
       if (eventoToCreate.capacidad < eventoToCreate.entradasdisponibles) {
           return {
               success: false,
               error: "La capacidad no puede ser menor que las entradas disponibles",
           };
       }

       const eventoService = new EventoService();
       const evento = await eventoService.crearEvento(env, eventoToCreate);

       return {
           success: true,
           evento
       };
   }
}
