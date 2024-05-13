import { OpenAPIRoute, OpenAPIRouteSchema, Path } from "@cloudflare/itty-router-openapi";
import { UsuarioService } from "services/usuario.service";
import { ReservaSchema, Usuario, UsuarioSchema } from "types";


export class ActualizarUsuario extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["Usuarios"],
    summary: "Actualizar una reserva",
    parameters: {
      id: Path(Number, {
        description: "Id de la reserva",
      }),
    },
    requestBody: UsuarioSchema,                                                       
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
        const usuarioToUpdate = data.body as Usuario;

        const usuarioServicio = new UsuarioService();

        // Check if reserva exists
        const usuarioExiste = await usuarioServicio.obtenerUsuarioPorId(env, id);
        if (usuarioExiste.idusuario == undefined || usuarioExiste.idusuario == null) {
            return new Response(JSON.stringify({
                success: false,
                message: "Reserva not found"
            }), {
                headers: { "Content-Type": "application/json" },
                status: 404
            });
        }

        const usuarioActualizado = await usuarioServicio.actualizarUsuario(env, id, usuarioToUpdate);

        return new Response(JSON.stringify({ success: true, result: usuarioActualizado }), {
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
