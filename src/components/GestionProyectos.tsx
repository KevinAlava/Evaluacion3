import React, { useEffect, useState } from 'react';
import { Proyecto } from '../interfaces/Proyecto';
import { obtenerProyectos, crearProyecto, actualizarProyecto, eliminarProyecto } from '../services/proyectoServices';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

export const GestionProyectos: React.FC = () => {
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [proyecto, setProyecto] = useState<Proyecto | null>(null);
    const [dlgProyecto, setDlgProyecto] = useState<boolean>(false);
    const toast = React.useRef<Toast>(null);

    useEffect(() => {
        const fetchProyectos = async () => {
            try {
                const data = await obtenerProyectos();
                setProyectos(data);
            } catch (error) {
                console.error('Error fetching proyectos:', error);
            }
        };
        fetchProyectos();
    }, []);

    const abrirNuevo = () => {
        setProyecto(null);
        setDlgProyecto(true);
    }

    const guardarProyecto = async () => {
        if (proyecto?.id) {
            await actualizarProyecto(proyecto.id, proyecto);
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Proyecto actualizado exitosamente' });
        } else if (proyecto) {
            await crearProyecto(proyecto);
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Proyecto registrado exitosamente' });
        }
        setDlgProyecto(false);
        setProyecto(null);
        setProyectos(await obtenerProyectos());
    }

    const editarProyecto = (proyectoSel: Proyecto) => {
        setProyecto(proyectoSel);
        setDlgProyecto(true);
    }

    const borrarProyecto = async (proyectoSel: Proyecto) => {
        await eliminarProyecto(proyectoSel.id);
        toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Proyecto eliminado exitosamente' });
        setProyectos(await obtenerProyectos());
    }

    return (
        <div>
            <Toast ref={toast}></Toast>
            <h1>Gestión de Proyectos</h1>
            <Button
                label='Nuevo Proyecto'
                icon='pi pi-plus'
                onClick={abrirNuevo}
            ></Button>
            <DataTable value={proyectos} paginator rows={5} rowsPerPageOptions={[5, 10, 15, 20, 25]} tableStyle={{ minWidth: '50rem' }}>
                <Column field="id" header="ID"></Column>
                <Column field="nombre" header="Nombre"></Column>
                <Column body={(rowData: Proyecto) => (
                    <div>
                        <Button icon="pi pi-pencil" onClick={() => editarProyecto(rowData)} />
                        <Button icon="pi pi-trash" onClick={() => borrarProyecto(rowData)} />
                    </div>
                )} />
            </DataTable>
            <Dialog
                visible={dlgProyecto}
                header="Detalle del Proyecto"
                modal
                onHide={() => setDlgProyecto(false)}
            >
                <div className='p-field'>
                    <label htmlFor="nombre">Nombre</label>
                    <InputText
                        id="nombre"
                        value={proyecto?.nombre || ''}
                        onChange={(e) => setProyecto({ ...proyecto!, nombre: e.target.value })}
                    ></InputText>
                </div>
                <Button label='Guardar'
                    icon='pi pi-save'
                    onClick={guardarProyecto}
                ></Button>
            </Dialog>
        </div>
    );
};
