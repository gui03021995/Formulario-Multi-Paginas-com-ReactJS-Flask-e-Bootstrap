from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Adiciona suporte a CORS

@app.route('/getAlimentacao', methods=['GET'])
def get_alimentacao():
    alimentacao_data = {
        "Vegetariano": [
            "Vegetais (legumes e verduras em geral)",
            "Frutas",
            "Carne magra (aves, peixes, carne sem gordura)",
            "Ovos",
            "Doces (doces de qualquer tipo, bolos recheados com cobertura, biscoitos doces, refrigerantes e sucos industrializados)",
            "Grãos (arroz, milho e outros grãos)",
            "Massas",
            "Leite e seus derivados (iogurte, bebida láctea, coalhada, requeijão, queijo)",
            "Pães"
        ],
        "Vegano": [
            "Vegetais (legumes e verduras em geral)",
            "Frutas",
            "Grãos (arroz, milho e outros grãos)",
            "Massas",
            "Pães"
        ],
        "Sem Restrição": [
            "Vegetais (legumes e verduras em geral)",
            "Frutas",
            "Carne gordurosa (porco, carne bovina com gordura, pele de frango)",
            "Carne magra (aves, peixes, carne sem gordura)",
            "Frituras ou embutidos (salgadinho frito, hambúrguer, carne salgada, presunto, salsicha, mortadela, salame, linguiça e outros)",
            "Ovos",
            "Doces (doces de qualquer tipo, bolos recheados com cobertura, biscoitos doces, refrigerantes e sucos industrializados)",
            "Grãos (arroz, milho e outros grãos)",
            "Massas",
            "Leite e seus derivados (iogurte, bebida láctea, coalhada, requeijão, queijo)",
            "Pães"
        ]
    }
    return jsonify(alimentacao_data)


@app.route('/submitFormulario', methods=['POST'])
def submit_formulario():
    try:
        # Obtendo dados JSON enviados no corpo da requisição
        data = request.json
        
        # Imprimindo os dados recebidos para verificação
        print('Dados recebidos:', data)
        
        # Respondendo com uma mensagem de sucesso e os dados recebidos
        return jsonify({
            "message": "Formulário recebido com sucesso!",
            "dadosRecebidos": data
        }), 200
    except Exception as e:
        # Respondendo com uma mensagem de erro em caso de exceção
        return jsonify({
            "message": "Erro ao processar o formulário.",
            "error": str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
