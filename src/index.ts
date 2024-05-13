import { OpenAPIRouter } from "@cloudflare/itty-router-openapi";
import { ActualizarEvento } from "endpoints/evento/actualizarEvento";
import { CrearEvento } from "endpoints/evento/crearEvento";
import { EliminarEvento } from "endpoints/evento/eliminarEvento";
import { EventoId } from "endpoints/evento/eventoId";
import { ListaEventos } from "endpoints/evento/listaEvento";
import { ActualizarReserva } from "endpoints/reserva/actualizarReserva";
import { CrearReserva } from "endpoints/reserva/crearReserva";
import { EliminarReserva } from "endpoints/reserva/eliminarReserva";
import { ListaReservas } from "endpoints/reserva/listaReservas";
import { ReservaId } from "endpoints/reserva/reservaId";
import { ReservasDeUsuario } from "endpoints/reserva/reservaIdUsuario";
import { ReservasDeEvento } from "endpoints/reserva/reservasIdEvento";
import { ActualizarUsuario } from "endpoints/usuario/actualizarUsuario";
import { CrearUsuario } from "endpoints/usuario/crearUsuario";
import { EliminarUsuario } from "endpoints/usuario/eliminarUsuario";
import { ListaUsuarios } from "endpoints/usuario/listaUsuarios";
import { UsuarioId } from "endpoints/usuario/usuarioId";


export const router = OpenAPIRouter({
	docs_url: "/",
});

// Rutas de la API

// -> Usuario
router.get("/api/usuarios/", ListaUsuarios);
router.get("/api/usuario/:id", UsuarioId);
router.post("/api/usuario/crear/", CrearUsuario);
router.put("/api/usuario/actualizar/:id", ActualizarUsuario);
router.delete("/api/usuario/eliminar/:id", EliminarUsuario);

// -> Evento
router.get("/api/eventos/", ListaEventos);
router.get("/api/evento/:id",EventoId);
router.post("/api/evento/crear/", CrearEvento);
router.put("/api/evento/actualizar/:id", ActualizarEvento);
router.delete("/api/evento/eliminar/:id", EliminarEvento);


// -> Reserva
router.get("/api/reservas/", ListaReservas);
router.get("/api/reserva/:id",ReservaId);
router.get("/api/reserva/usuario/:id",ReservasDeUsuario);
router.get("/api/reserva/evento/:id", ReservasDeEvento);
router.post("/api/reserva/crear/", CrearReserva);
router.put("/api/reserva/actualizar/:id",ActualizarReserva );
router.delete("/api/reserva/eliminar/:id", EliminarReserva);



// 404 for everything else
router.all("*", () =>
	Response.json(
		{
			success: false,
			error: "Route not found",
		},
		{ status: 404 }
	)
);

export default {
	fetch: router.handle,
};
