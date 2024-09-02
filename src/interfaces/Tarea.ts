export interface Tarea {
    id: number;
    descripcion: string;
    proyecto_id: number;
    estado:'Pendiente'|'En Proceso'|'Completado';
    empleados: number[];
}