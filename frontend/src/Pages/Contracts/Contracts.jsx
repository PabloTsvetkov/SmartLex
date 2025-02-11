import React, { useEffect, useState } from "react";
import axios from 'axios';

import s from './Contracts.module.css'
import getContractInfo from "../../templates";

import { useLocation, useNavigate } from "react-router-dom";

export default function Contracts() {
  const location = useLocation();
  const current_pathname = location.pathname.split('/').pop();
  const contract_info = getContractInfo(current_pathname);
  const navigate = useNavigate();

  const onDownloadButtonClick = (file_type) => {
    const full_file_name = contract_info.russian_name.split(' ').join('_') + "." + file_type;
    const url_to = `http://localhost:5000/api/downloadTemplate/${full_file_name}`;
    axios({
      url: url_to,
      method: 'GET',
      responseType: 'blob'
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', full_file_name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }).catch(error => {
      console.error('error in downloading template file', error)
    })
  }

  const onGenerateButtonClick = () => {
    navigate(`/generate/${current_pathname}`)
  }

  return (
    <div className={s.generatingMainContainer}>
      <div className={s.mainContent}>
        <h2>{contract_info.russian_name}</h2>
        <div className={s.buttonContainer}>
          <button className={`${s.buttonDOCX} ${s.button}`} onClick={() => onDownloadButtonClick("docx")} type={"button"}>Скачать .docx</button>
          <button className={s.button} onClick={() => onDownloadButtonClick("pdf")} type={"button"}>Скачать .pdf</button>
          <button className={s.button} onClick={() => onGenerateButtonClick()}>Сгенерировать договор</button>
        </div>
        <div className={s.previewContainer}>

        </div>
      </div>
    </div>
  );
}