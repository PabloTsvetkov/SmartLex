import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Pages/Home/Home';
import ContractGenerator from './Pages/ContractGenerator/ContractGenerator';
import ContractTemplates from './Pages/ContractTemplates/ContractTemplates';

const App = () => {
    const [selectedTemplate, setSelectedTemplate] = useState('');

    return (
        <Router>
            <nav>
                <Link to="/">Главная</Link>
                <Link to="/templates">Шаблоны</Link>
                <Link to="/generate-contract">Заполнить Договор</Link>
            </nav>
            <Routes>
                <Route path="/" exact Component={Home} />
                {/* <Route path="/templates">
                    <ContractTemplates onSelectTemplate={setSelectedTemplate} />
                </Route> */}
                <Route path="/templates" Component={ContractTemplates} />
                <Route path="/generate-contract" Component={ContractGenerator}/>
                {/* <Route path="/fill-contract">
                    <ContractGenerator selectedTemplate={selectedTemplate} />
                </Route> */}
            </Routes>
        </Router>
    );
};

export default App;
