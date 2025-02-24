import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";

import getContractInfo from "../../templates";
import s from "./ContractGenerator.module.css";
import LINK from '../../LINK';

const ContractGenerator = () => {
    const [formFields, setFormFields] = useState({});

    const location = useLocation();
    const current_pathname = location.pathname.split('/').pop();
    const contract_info = getContractInfo(current_pathname);
    const selectedTemplate = contract_info.russian_name;

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = (event) => {
        console.log("hadle submit");
        event.preventDefault();
        axios.post(`${LINK}/api/generate`, {
            template: current_pathname,
            fields: formFields
        }, { responseType: 'blob' })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${selectedTemplate}.docx`);
                document.body.appendChild(link);
                link.click();
            });
    };

    // useEffect(() => {
    //     axios.get(`http://localhost:5000/api/fields_for_generation/${contract_info}`)
    //         .then(response => setFields(response.data.fields));
    // }, []);

    const fields = contract_info.fields;
    console.log(fields);

    return (
        <div className={s.generationMainContainer}>
            <div className={s.mainContent}>
                <h2>Заполнение договора</h2>
                <h3>{selectedTemplate}</h3>
                <form onSubmit={handleSubmit}>
                    {fields.map(([name, label]) => {
                        return (
                            <div className={s.inputItem}>
                                <label>{label}:</label>
                                <input type="text" name={name} onChange={handleInputChange}></input>
                            </div>
                        );
                    })}
                    {/* <div>
                    <label>Фамилия:</label>
                    <input type="text" name="surname" onChange={handleInputChange} />
                </div>
                */}
                    <button type="submit">Скачать документ</button>
                </form>
            </div>
        </div>
    );
};

export default ContractGenerator;
