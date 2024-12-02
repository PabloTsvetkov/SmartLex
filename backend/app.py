import os

from flask import Flask, request, send_file
from flask_cors import CORS
from docx import Document

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3001"}})

@app.route('/api/templates', methods=['GET'])
def get_templates():
    # path_str = 'templatesAll'
    # templates_list = [os.path.splitext(filename)[0] for filename in os.listdir(path_str)]
    # return {"templates": templates_list}
    return {"templates" : os.listdir("templatesAll")}

@app.route('/api/downloadTemplate/<template_name>', methods=['GET'])
def download_template(template_name):
    template_path = f'templatesAll/{template_name}'
    return send_file(template_path, as_attachment=True)

@app.route('/api/generate', methods=['POST'])
def generate_contract():
    data = request.json
    template_name = data['template']
    fields = data['fields']

    doc = Document(f"templatesForGenerating/{template_name}")

    for key, value in fields.items():
        for paragraph in doc.paragraphs:
            if f'{{{{ {key} }}}}' in paragraph.text:
                paragraph.text = paragraph.text.replace(f'{{{{ {key} }}}}', value)

    output_path = f"{template_name.replace('.docx', '_filled.docx')}"
    doc.save(output_path)
    return send_file(output_path, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
