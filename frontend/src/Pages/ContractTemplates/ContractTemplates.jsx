import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContractTemplates = () => {
    const [templates, setTemplates] = useState([]);

    const onSelectTemplate = (template) => {
      axios({
        url: `http://localhost:5000/api/downloadTemplate/${template}`,
        method: 'GET',
        responseType: 'blob'
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', template);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }).catch(error => {
        console.error('error in downloading template file', error)
      })
    }

    useEffect(() => {
        axios.get('http://localhost:5000/api/templates')
            .then(response => setTemplates(response.data.templates));
    }, []);

    return (
        <div>
            <h2>Список шаблонов</h2>
            <ul>
                {templates.map(template => (
                    <li key={template} onClick={() => onSelectTemplate(template)}>
                        {template.split('.')[0]}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContractTemplates;
