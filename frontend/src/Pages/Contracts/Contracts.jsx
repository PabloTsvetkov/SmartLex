import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Document, Page, pdfjs } from 'react-pdf';

import s from './Contracts.module.css'
import getContractInfo from "../../templates";

import { useLocation, useNavigate } from "react-router-dom";
import LINK from "../../LINK";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function Contracts() {
  const location = useLocation();
  const current_pathname = location.pathname.split('/').pop();
  const contract_info = getContractInfo(current_pathname);
  const navigate = useNavigate();

  const onDownloadButtonClick = (file_type) => {
    const full_file_name = contract_info.russian_name.split(' ').join('_') + "." + file_type;
    const url_to = `${LINK}/api/downloadTemplate/${full_file_name}`;
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

  const onError = (error) => {
    console.log("error in file viewing: ", error)
  }

  let fileName = contract_info.russian_name.split(' ').join('_');

  const [filePath, setFilePath] = useState(`${LINK}/templatesAll/${fileName}.pdf`);

  const [numPages, setNumPages] = useState(null);
  const [viewMode, setViewMode] = useState('template');

  return (
    <div className={s.generatingMainContainer}>
      <div className={s.mainContent}>
        <h2>{contract_info.russian_name}</h2>
        <div className={s.buttonContainer}>
          <button className={`${s.buttonDOCX} ${s.button}`} onClick={() => onDownloadButtonClick("docx")} type={"button"}>Скачать .docx</button>
          <button className={s.button} onClick={() => onDownloadButtonClick("pdf")} type={"button"}>Скачать .pdf</button>
          <button className={s.button} onClick={() => onGenerateButtonClick()}>Сгенерировать договор</button>
        </div>
        <div className={s.switchButtonContainer}>
          <button className={viewMode === "template" ? `${s.switchButton} ${s.active}` : `${s.switchButton}`} onClick={() => {setViewMode("template"); setFilePath(`${LINK}/templatesAll/${fileName}.pdf`)}}>Шаблон</button>
          <button className={viewMode === "example" ? `${s.switchButton} ${s.active}` : `${s.switchButton}`} onClick={() => {setViewMode("example"); setFilePath(`${LINK}/templatesAll/${fileName}_пример.pdf`)}}>Пример заполнения</button>
        </div>
        <div className={s.previewContainer} style={{ overflowY: 'auto' }}>
          <Document file={filePath} onLoadSuccess={(obj) => setNumPages(obj._pdfInfo.numPages)}>
            {numPages &&
              Array.from(new Array(numPages), (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  style={{ marginBottom: '20px' }}
                  
                />
              ))}
          </Document>
        </div>
      </div>
    </div>
  );
}