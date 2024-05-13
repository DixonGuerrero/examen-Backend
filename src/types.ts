import { DateTime, Num, Str } from "@cloudflare/itty-router-openapi";

// Enums para representar los estados específicos del evento
export enum EstadoEvento {
    Planificado = "Planificado",
    Activo = "Activo",
    Completado = "Completado",
    Cancelado = "Cancelado"
}

// Esquemas para la API
export const EventoSchema = {
    nombre: new Str({ example: "Concierto de Rock" }),
    descripcion: new Str({ example: "Gran concierto de rock con bandas internacionales." }),
    fechaevento: new DateTime(),
    ubicacion: new Str({ example: "Estadio Nacional" }),
    capacidad: new Num({ example: 10000 }),
    entradasdisponibles: new Num({ example: 10000 }),
    estadoevento: new Str({ example: EstadoEvento.Planificado }),
};

export const UsuarioSchema = {
    nombre: new Str({ example: "Ana Ruiz" }),
    correoelectronico: new Str({ example: "ana.ruiz@example.com" }),
    telefono: new Str({ example: "1234567890" }),
};

export const ReservaSchema = {
    idevento: new Num({ example: 1 }),
    idusuario: new Num({ example: 1 }),
    cantidadentradas: new Num({ example: 2 }),
    fechareserva: new DateTime(),
};

// Tipos de datos TypeScript
export type Evento = {
    idevento?: number;
    nombre: string;
    descripcion: string;
    fechaevento: Date | string;
    ubicacion: string;
    capacidad: number;
    entradasdisponibles: number;
    estadoEvento: EstadoEvento;
}

export type Usuario = {
    idusuario?: number;
    nombre: string;
    correoelectronico: string;
    telefono: string;
}

export type Reserva = {
    idreserva?: number;
    idevento: number;
    idusuario: number;
    cantidadentradas: number;
    fechareserva: Date | string;
}
