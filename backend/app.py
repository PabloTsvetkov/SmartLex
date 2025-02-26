#TOdo убрать скобочки из генерации документов
import os

from flask import Flask, request, send_file, send_from_directory, abort
from flask_cors import CORS
from docx import Document

app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
CORS(app)

@app.route('/api/templates', methods=['GET'])
def get_templates():
    # ls = os.listdir("templatesAll")
    toRet = []
    templates_links = ['receipt_of_financial_funds', 'basic_employment_contract', 'lease_agreement_for_non-residential_premises', 'sales_contract', '','','','','','']
    templates_names = ['Расписка в получении денежных средств', 'Базовый трудовой договор', 'Договор аренды нежилого помещения', 'Договор купли-продажи товара']
    for i in range(len(templates_names)):
        toRet += [[templates_names[i], templates_links[i]]]
    return {"templates" : toRet}

# Получение договора по URL для его предварительного отображения
FILE_DIRECTORY = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'templatesAll')
@app.route('/templatesAll/<path:filename>')
def serve_file(filename):
    try:
        return send_from_directory(FILE_DIRECTORY, filename, mimetype='application/pdf', as_attachment=False)
    except FileNotFoundError:
        abort(404)

@app.route('/api/downloadTemplate/<template_name>', methods=['GET'])
def download_template(template_name):
    template_path = f'templatesAll/{template_name}'
    return send_file(template_path, as_attachment=True)

@app.route('/api/generate', methods=['POST'])
def generate_contract():
    data = request.json
    template_name = data['template']
    fields = data['fields']
    doc = Document(f"templatesForGenerating/{template_name}.docx")
    i = 1

    for key, value in fields.items():
        print(' - - - - - ', key)
        for paragraph in doc.paragraphs:
            if f'{{{{ {key} }}}}' in paragraph.text:
                print(i, ' - ', key, value)
                i = i + 1
                paragraph.text = paragraph.text.replace(f'{{{{ {key} }}}}', value)

    output_path = f"{template_name.replace('.docx', '_filled.docx')}"
    doc.save(output_path)
    return send_file(output_path, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
