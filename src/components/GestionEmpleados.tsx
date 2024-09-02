import React, { useEffect, useState } from 'react';
import { Empleado } from '../interfaces/Empleado';
import { obtenerEmpleados, crearEmpleado, actualizarEmpleado, eliminarEmpleado } from '../services/empleadoServices';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

const opCargos = [
    { label: 'Gerente', value: 'Gerente' },
    { label: 'Asistente', value: 'Asistente' },
    { label: 'Analista', value: 'Analista' },
    { label: 'Desarrollador', value: 'Desarrollador' }
];

export const GestionEmpleados: React.FC = () => {
    const [empleados, setEmpleados] = useState<Empleado[]>([]);
    const [empleado, setEmpleado] = useState<Empleado | null>(null);
    const [dlgEmpleado, setDlgEmpleado] = useState<boolean>(false);
    const toast = React.useRef<Toast>(null);

    useEffect(() => {
        const fetchEmpleados = async () => {
            try {
                const data = await obtenerEmpleados();
                setEmpleados(data);
            } catch (error) {
                console.error('Error fetching empleados:', error);
            }
        };
        fetchEmpleados();
    }, []);

    const abrirNuevo = () => {
        setEmpleado(null);
        setDlgEmpleado(true);
    }

    const guardarEmpleado = async () => {
        if (empleado?.id) {
            await actualizarEmpleado(empleado.id, empleado);
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Empleado actualizado exitosamente' });
        } else if (empleado) {
            await crearEmpleado(empleado);
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Empleado registrado exitosamente' });
        }
        setDlgEmpleado(false);
        setEmpleado(null);
        setEmpleados(await obtenerEmpleados());
    }

    const editarEmpleado = (empleadoSel: Empleado) => {
        setEmpleado(empleadoSel);
        setDlgEmpleado(true);
    }

    const borrarEmpleado = async (empleadoSel: Empleado) => {
        await eliminarEmpleado(empleadoSel.id);
        toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Empleado eliminado exitosamente' });
        setEmpleados(await obtenerEmpleados());
    }

    return (
        <div>
            <Toast ref={toast}></Toast>
            <h1>Gestión de Empleados</h1>
            <Button
                label='Nuevo Empleado'
                icon='pi pi-plus'
                onClick={abrirNuevo}
            ></Button>
            <DataTable value={empleados} paginator rows={5} rowsPerPageOptions={[5, 10, 15, 20, 25]} tableStyle={{ minWidth: '50rem' }}>
                <Column field="id" header="ID"></Column>
                <Column field="nombre" header="Nombre"></Column>
                <Column field="cargo" header="Cargo"></Column>
                <Column body={(rowData: Empleado) => (
                    <div>
                        <Button icon="pi pi-pencil" onClick={() => editarEmpleado(rowData)} />
                        <Button icon="pi pi-trash" onClick={() => borrarEmpleado(rowData)} />
                    </div>
                )} />
            </DataTable>
            <Dialog
                visible={dlgEmpleado}
                header="Detalle del Empleado"
                modal
                onHide={() => setDlgEmpleado(false)}
            >
                <div className='p-field'>
                    <label htmlFor="nombre">Nombre</label>
                    <InputText
                        id="nombre"
                        value={empleado?.nombre || ''}
                        onChange={(e) => setEmpleado({ ...empleado!, nombre: e.target.value })}
                    ></InputText>
                </div>
                <div className='p-field'>
                    <label htmlFor="cargo">Cargo</label>
                    <Dropdown
                        id='cargo'
                        value={empleado?.cargo || ''}
                        options={opCargos}
                        optionLabel='label'
                        optionValue='value'
                        placeholder='Seleccione un cargo'
                        onChange={(e) => setEmpleado({ ...empleado!, cargo: e.value })}
                    ></Dropdown>
                </div>
                <Button label='Guardar'
                    icon='pi pi-save'
                    onClick={guardarEmpleado}
                ></Button>
            </Dialog>
        </div>
    );
};
