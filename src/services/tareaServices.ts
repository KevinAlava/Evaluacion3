import { Tarea } from '../interfaces/Tarea';

const API_URL = 'http://localhost:5000/tareas';

export const obtenerTareas = async (): Promise<Tarea[]> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Error al obtener tareas: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("export const obtenerTareas dice: ", error);
        throw error;
    }
}

// Petición POST - AGREGAR
export const crearTarea = async (tarea: Tarea): Promise<Tarea> => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tarea)
        });
        if (!response.ok) {
            throw new Error(`Error al crear tarea: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("export const crearTarea dice: ", error);
        throw error;
    }
}

// Petición PUT - ACTUALIZAR
export const actualizarTarea = async (id: number, tarea: Tarea): Promise<Tarea> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tarea)
        });
        if (!response.ok) {
            throw new Error(`Error al actualizar tarea: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("export const actualizarTarea dice: ", error);
        throw error;
    }
}

// Petición DELETE - ELIMINAR
export const eliminarTarea = async (id: number): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`Error al eliminar tarea: ${response.statusText}`);
        }
    } catch (error) {
        console.error("export const eliminarTarea dice: ", error);
        throw error;
    }
}
