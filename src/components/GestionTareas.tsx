import React, { useEffect, useState } from 'react';
import { Tarea } from '../interfaces/Tarea';
import { obtenerTareas, crearTarea, actualizarTarea, eliminarTarea } from '../services/tareaServices';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

const estadosTarea = [
    { label: 'Pendiente', value: 'Pendiente' },
    { label: 'En Progreso', value: 'En Progreso' },
    { label: 'Completada', value: 'Completada' }
];

export const GestionTareas: React.FC = () => {
    const [tareas, setTareas] = useState<Tarea[]>([]);
    const [tarea, setTarea] = useState<Tarea | null>(null);
    const [dlgTarea, setDlgTarea] = useState<boolean>(false);
    const toast = React.useRef<Toast>(null);

    useEffect(() => {
        const fetchTareas = async () => {
            try {
                const data = await obtenerTareas();
                setTareas(data);
            } catch (error) {
                console.error('Error fetching tareas:', error);
            }
        };
        fetchTareas();
    }, []);

    const abrirNueva = () => {
        setTarea(null);
        setDlgTarea(true);
    }

    const guardarTarea = async () => {
        if (tarea?.id) {
            await actualizarTarea(tarea.id, tarea);
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Tarea actualizada exitosamente' });
        } else if (tarea) {
            await crearTarea(tarea);
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Tarea registrada exitosamente' });
        }
        setDlgTarea(false);
        setTarea(null);
        setTareas(await obtenerTareas());
    }

    const editarTarea = (tareaSel: Tarea) => {
        setTarea(tareaSel);
        setDlgTarea(true);
    }

    const borrarTarea = async (tareaSel: Tarea) => {
        await eliminarTarea(tareaSel.id);
        toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Tarea eliminada exitosamente' });
        setTareas(await obtenerTareas());
    }

    return (
        <div>
            <Toast ref={toast}></Toast>
            <h1>Gestión de Tareas</h1>
            <Button
                label='Nueva Tarea'
                icon='pi pi-plus'
                onClick={abrirNueva}
            ></Button>
            <DataTable value={tareas} paginator rows={5} rowsPerPageOptions={[5, 10, 15, 20, 25]} tableStyle={{ minWidth: '50rem' }}>
                <Column field="id" header="ID"></Column>
                <Column field="descripcion" header="Descripción"></Column>
                <Column field="proyecto_id" header="Proyecto"></Column>
                <Column field="estado" header="Estado"></Column>
                <Column body={(rowData: Tarea) => (
                    <div>
                        <Button icon="pi pi-pencil" onClick={() => editarTarea(rowData)} />
                        <Button icon="pi pi-trash" onClick={() => borrarTarea(rowData)} />
                    </div>
                )} />
            </DataTable>
            <Dialog
                visible={dlgTarea}
                header="Detalle de la Tarea"
                modal
                onHide={() => setDlgTarea(false)}
            >
                <div className='p-field'>
                    <label htmlFor="descripcion">Descripción</label>
                    <InputText
                        id="descripcion"
                        value={tarea?.descripcion || ''}
                        onChange={(e) => setTarea({ ...tarea!, descripcion: e.target.value })}
                    ></InputText>
                </div>
                <div className='p-field'>
                    <label htmlFor="proyecto_id">Proyecto</label>
                    <InputText
                        id="proyecto_id"
                        value={tarea?.proyecto_id?.toString() || ''}
                        onChange={(e) => setTarea({ ...tarea!, proyecto_id: parseInt(e.target.value) })}
                    ></InputText>
                </div>
                <div className='p-field'>
                    <label htmlFor="estado">Estado</label>
                    <Dropdown
                        id='estado'
                        value={tarea?.estado || ''}
                        options={estadosTarea}
                        optionLabel='label'
                        optionValue='value'
                        placeholder='Seleccione un estado'
                        onChange={(e) => setTarea({ ...tarea!, estado: e.value })}
                    ></Dropdown>
                </div>
                <Button label='Guardar'
                    icon='pi pi-save'
                    onClick={guardarTarea}
                ></Button>
            </Dialog>
        </div>
    );
};
