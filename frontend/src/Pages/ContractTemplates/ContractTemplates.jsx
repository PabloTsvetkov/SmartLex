import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import s from "./ContractTemplates.module.css"
import LINK from '../../LINK';

const ContractTemplates = () => {
  const [templates, setTemplates] = useState([]);
  let navigate = useNavigate();

  // const onSelectTemplate = (template) => {
  //   axios({
  //     url: `http://localhost:5000/api/downloadTemplate/${template}`,
  //     method: 'GET',
  //     responseType: 'blob'
  //   }).then((response) => {
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute('download', template);
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   }).catch(error => {
  //     console.error('error in downloading template file', error)
  //   })
  // }
  const handleClick = (template) => {
    navigate(`/contracts/${template[1]}`)
  }

  useEffect(() => {
    axios.get(`${LINK}/api/templates`)
      .then(response => setTemplates(response.data.templates));
  }, []);

  console.log(templates);

  return (
    <div className={s.templatesMainContainer}>
      <div className={s.mainContent}>
        <h2>Список шаблонов</h2>
        <div className={s.headingDescription}>На этой странице собраны шаблоны всех договоров, которые Вам могут понадобиться</div>
        <div className={s.templatesContainer}>
          {templates.map(template => (
            <div key={template[0]} onClick={() => handleClick(template)} className={s.templateItem}>
              {template[0]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContractTemplates;
