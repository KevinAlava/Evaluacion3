import { Empleado } from '../interfaces/Empleado';

const API_URL = 'http://localhost:5000/empleados';

export const obtenerEmpleados = async (): Promise<Empleado[]> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Error al obtener empleados: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("export const obtenerEmpleados dice: ", error);
        throw error;
    }
}

// Petición POST - AGREGAR
export const crearEmpleado = async (empleado: Empleado): Promise<Empleado> => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(empleado)
        });
        if (!response.ok) {
            throw new Error(`Error al crear empleado: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("export const crearEmpleado dice: ", error);
        throw error;
    }
}

// Petición PUT - ACTUALIZAR
export const actualizarEmpleado = async (id: number, empleado: Empleado): Promise<Empleado> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(empleado)
        });
        if (!response.ok) {
            throw new Error(`Error al actualizar empleado: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("export const actualizarEmpleado dice: ", error);
        throw error;
    }
}

// Petición DELETE - ELIMINAR
export const eliminarEmpleado = async (id: number): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`Error al eliminar empleado: ${response.statusText}`);
        }
    } catch (error) {
        console.error("export const eliminarEmpleado dice: ", error);
        throw error;
    }
}
