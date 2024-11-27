import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [formFields, setFormFields] = useState({});
    const [inputFields, setInputFields] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/templates')
            .then(response => {
                setTemplates(response.data.templates);
            });
    }, []);

    const handleTemplateChange = (event) => {
        setSelectedTemplate(event.target.value);
        // Здесь можно динамически устанавливать поля в зависимости от выбранного шаблона
        // Например, для простоты можно добавить статично
        setInputFields([
            { name: 'surname', label: 'Фамилия' },
            { name: 'name', label: 'Имя' },
            { name: 'birth_date', label: 'Дата рождения' }
        ]);
    };

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
            <h1>Сервис Заполнения Договоров</h1>
            <select onChange={handleTemplateChange}>
                <option value="">Выберите шаблон</option>
                {templates.map(template => (
                    <option key={template} value={template}>{template}</option>
                ))}
            </select>
            {selectedTemplate && (
                <form onSubmit={handleSubmit}>
                    {inputFields.map(field => (
                        <div key={field.name}>
                            <label>{field.label}:</label>
                            <input type="text" name={field.name} onChange={handleInputChange} />
                        </div>
                    ))}
                    <button type="submit">Скачать документ</button>
                </form>
            )}
        </div>
    );
}

export default App;
