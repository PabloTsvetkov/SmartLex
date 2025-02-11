import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Home from './Pages/Home/Home';
import ContractGenerator from './Pages/ContractGenerator/ContractGenerator';
import ContractTemplates from './Pages/ContractTemplates/ContractTemplates';
import Contracts from './Pages/Contracts/Contracts';

import s from "./App.module.css";

const App = () => {
    const [selectedTemplate, setSelectedTemplate] = useState('');

    return (
        <Router>
            <div className={s.contentContainer}>
                <nav className={s.mainNavigation}>
                    <Link to="/" className={s.logo}>SL</Link>
                    <Link to="/">Главная</Link>
                    <Link to="/templates">Шаблоны</Link>
                    <Link to="/generate-contract">Заполнить договор</Link>
                </nav>

                <Routes>
                    <Route path="/" exact Component={Home} />
                    <Route path="/templates" Component={ContractTemplates} />
                    <Route path="/contracts/*" Component={Contracts} />
                    <Route path="/generate/*" Component={ContractGenerator} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
