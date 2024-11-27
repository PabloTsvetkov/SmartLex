from flask import Flask, request, send_file
from flask_cors import CORS
from docx import Document
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

@app.route('/api/templates', methods=['GET'])
def get_templates():
    # Это временные шаблоны, добавьте свои файлы шаблонов в папку templates
    return {"templates": os.listdir("templates")}

@app.route('/api/generate', methods=['POST'])
def generate_contract():
    data = request.json
    template_name = data['template']
    fields = data['fields']

    # Загрузка шаблона
    doc = Document(f"templates/{template_name}")

    # Заполнение шаблона
    for key, value in fields.items():
        for paragraph in doc.paragraphs:
            if f'{{{{ {key} }}}}' in paragraph.text:
                paragraph.text = paragraph.text.replace(f'{{{{ {key} }}}}', value)

    # Сохранение нового документа
    output_path = f"{template_name.replace('.docx', '_filled.docx')}"
    doc.save(output_path)
    return send_file(output_path, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
