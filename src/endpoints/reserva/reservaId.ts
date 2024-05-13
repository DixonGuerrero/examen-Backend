import {
   OpenAPIRoute,
   OpenAPIRouteSchema,
   Path,
} from "@cloudflare/itty-router-openapi";
import { ReservaService } from "services/reserva.service";
import { Reserva, ReservaSchema } from "types";

export class ReservaId extends OpenAPIRoute {
   static schema: OpenAPIRouteSchema = {
       tags: ["Reservas"],
       summary: "Obtener una reserva por id",
       parameters: {
           id: Path(Number, {
               description: "ID de la reserva",
           }),
       },
       responses: {
           "200": {
               description: "Retorna una reserva si se encuentra",
               schema: {
                   success: Boolean,
                   result: {
                       reserva: ReservaSchema
                   },
               },
           },
           "404": {
               description: "Reserva no encontrada",
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
       const reserva = await reservaService.obtenerReservaPorId(env, id);


       if (reserva.idreserva == undefined || reserva.idreserva) {
           return {
               success: false,
               error: "Reserva no encontrada",
           };
       }

       return {
           success: true,
           reserva
       };
   }
}
