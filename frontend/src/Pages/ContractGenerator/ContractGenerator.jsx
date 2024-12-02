import React, { useState } from 'react';
import axios from 'axios';

const ContractGenerator = () => {
    const [formFields, setFormFields] = useState({});
    const selectedTemplate = 'contract_template.docx';

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/api/generate', {
            template: selectedTemplate,
            fields: formFields
        }, { responseType: 'blob' })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${selectedTemplate.replace('.docx', '_filled.docx')}`);
                document.body.appendChild(link);
                link.click();
            });
    };

    return (
        <div>
            <h2>Заполнение договора: {selectedTemplate}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Фамилия:</label>
                    <input type="text" name="surname" onChange={handleInputChange} />
                </div>
                <div>
                    <label>Имя:</label>
                    <input type="text" name="name" onChange={handleInputChange} />
                </div>
                <div>
                    <label>Роль:</label>
                    <input type="text" name="role" onChange={handleInputChange} />
                </div>
                <div>
                    <label>Год:</label>
                    <input type="text" name="year" onChange={handleInputChange} />
                </div>
                <div>
                    <label>Число:</label>
                    <input type="text" name="date" onChange={handleInputChange} />
                </div>
                <div>
                    <label>Месяц:</label>
                    <input type="text" name="month" onChange={handleInputChange} />
                </div>
                <div>
                    <label>Номер договора:</label>
                    <input type="text" name="contract_number" onChange={handleInputChange} />
                </div>
                <button type="submit">Скачать документ</button>
            </form>
        </div>
    );
};

export default ContractGenerator;
