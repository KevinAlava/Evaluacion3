import { Proyecto } from '../interfaces/Proyecto';

const API_URL = 'http://localhost:5000/proyectos';

export const obtenerProyectos = async (): Promise<Proyecto[]> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Error al obtener proyectos: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("export const obtenerProyectos dice: ", error);
        throw error;
    }
}

// Petición POST - AGREGAR
export const crearProyecto = async (proyecto: Proyecto): Promise<Proyecto> => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(proyecto)
        });
        if (!response.ok) {
            throw new Error(`Error al crear proyecto: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("export const crearProyecto dice: ", error);
        throw error;
    }
}

// Petición PUT - ACTUALIZAR
export const actualizarProyecto = async (id: number, proyecto: Proyecto): Promise<Proyecto> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(proyecto)
        });
        if (!response.ok) {
            throw new Error(`Error al actualizar proyecto: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("export const actualizarProyecto dice: ", error);
        throw error;
    }
}

// Petición DELETE - ELIMINAR
export const eliminarProyecto = async (id: number): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`Error al eliminar proyecto: ${response.statusText}`);
        }
    } catch (error) {
        console.error("export const eliminarProyecto dice: ", error);
        throw error;
    }
}
