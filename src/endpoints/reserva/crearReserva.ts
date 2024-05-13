import {
   OpenAPIRoute,
   OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { ReservaService } from "services/reserva.service";
import { Reserva, ReservaSchema } from "types";

export class CrearReserva extends OpenAPIRoute {
   static schema: OpenAPIRouteSchema = {
       tags: ["Reservas"],
       summary: "Crear una nueva reserva",
       requestBody: ReservaSchema,
       responses: {
           "200": {
               description: "Retorna la reserva creada",
               schema: {
                   success: Boolean,
                   result: {
                       reserva: ReservaSchema,
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
       
       const reservaToCreate = data.body as Reserva;

       // Validar la cantidad de entradas a reservar
       if (reservaToCreate.cantidadentradas <= 0) {
           return {
               success: false,
               error: "La cantidad de entradas debe ser mayor que cero",
           };
       }

       const reservaService = new ReservaService();
       const reserva = await reservaService.crearReserva(env, reservaToCreate);

       return {
           success: true,
           reserva
       };
   }
}
