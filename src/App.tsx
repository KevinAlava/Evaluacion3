import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { GestionProyectos } from './components/GestionProyectos';
import { GestionTareas } from './components/GestionTareas';
import { GestionEmpleados } from './components/GestionEmpleados';


const App: React.FC = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={
                    <div>
                        <p>Inicio - Información Personal</p>
                        <p>Integrantes: Alava Kevin, Quimi Lizeth</p>
                        <p>NRC: 16495</p>
                        <p>Tema: Evaluacion Conjunta</p>
                    </div>
                } />
                <Route path="/gestion-proyectos" element={<GestionProyectos />} />
                <Route path="/gestion-tareas" element={<GestionTareas />} />
                <Route path="/gestion-empleados" element={<GestionEmpleados />} />
            </Routes>
        </Router>
    );
};

export default App;