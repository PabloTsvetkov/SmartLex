const templates = {
  "basic_employment_contract": {
    "russian_name": "Базовый трудовой контракт",
  },
  "lease_agreement_for_non-residential_premises": {
    "russian_name": "Договор аренды нежилого помещения",
    "file_name": "Договор_аренды_нежилого_помещения",
    "fields": [["nom_dog", "Номер договора"], ["city", "Город"], ["date", "Дата"], ["organisation_name", "Название организации"], ["fio", "ФИО"], ["doc", "Учредительный документ"], ["adress", "Адрес помещения"], ["square", "Площадь помещения"], ["uslugi", "Услуги, для осуществления которых арендуется помещение"], ["kad_nom", "Кадастровый номер помещения"], ["nom_re", "Номер объекта в Едином Государственном реестре недвижимости"], ["nom_ser", "Номер серии"]],
  },
  "sales_contract": {
    "russian_name": "Договор купли-продажи товара"
  }
};

const getContractInfo = (contract_name) => {
  return templates[contract_name];
}

export default getContractInfo;