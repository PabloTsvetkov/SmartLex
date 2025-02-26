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
  },
  "receipt_of_financial_funds": {
    "russian_name": "Расписка в получении денежных средств",
    "file_name": "Расписка_в_получении_денежных_средств",
    "fields": [["Date_conclusion_day", "Дата заключения договора"], ["The_place_where_the_receipt_was_written_(region_city)", "Место составления расписки(край, область, город)"],["Borrowers_full_name", "ФИО заемщика"], ["Borrower's_date_of_birth", "Дата рождения заемщика"], ["Borrower's_place_of_birth", "Место рождения заемщика"], ["Passport_data_(series_number)_of_the_borrower", "Паспортные данные (серия, номер) заемщика"], ["Issuing_authority_of_borrower's_passport", "Кем выдан паспорт заемщика"], ["The_subdivision_code_of_the_borrower's_passport", "Код подразделения паспорта заемщика"], ["Borrower's_place_of_registration", "Место регистрации заемщика"],["Lender's_full_name", "ФИО займодателя"], ["Lender's_date_of_birth", "Дата рождения займодателя"], ["Lender's_place_of_birth", "Место рождения займодателя"], ["Passport_data_(series_number)_of_the_lender", "Паспортные данные (серия, номер) займодателя"], ["Issuing_authority_of_lender's_passport", "Кем выдан паспорт займодателя"], ["The_subdivision_code_of_the_lender's_passport", "Код подразделения паспорта займодателя"], ["lender's_place_of_registration", "Место регистрации займодателя"], ["The_currency_of_the_borrowed_money", "Валюта занимаемых денег"], ["The_amount_of_money_borrowed", "Сумма занимаемых денег"]]
  }
};

const getContractInfo = (contract_name) => {
  return templates[contract_name];
}

export default getContractInfo;