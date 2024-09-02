import React from "react";
import { useNavigate } from "react-router-dom";
import { Menubar } from 'primereact/menubar';
import { FaHome, FaProjectDiagram, FaTasks, FaUsers } from 'react-icons/fa';

export const Navbar: React.FC = () => {
    const navigate = useNavigate();

    const items = [
        {
            label: 'Inicio',
            icon: <FaHome />,
            command: () => navigate('/')
        },
        {
            label: 'Gestión de Proyectos',
            icon: <FaProjectDiagram />,
            command: () => navigate('/gestion-proyectos')
        },
        {
            label: 'Gestión de Tareas',
            icon: <FaTasks />,
            command: () => navigate('/gestion-tareas')
        },
        {
            label: 'Gestión de Empleados',
            icon: <FaUsers />,
            command: () => navigate('/gestion-empleados')
        }
    ];

    return (
        <div className="card">
            <Menubar model={items} />
        </div>
    );
};
