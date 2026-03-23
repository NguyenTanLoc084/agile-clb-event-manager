from flask import Flask, jsonify, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app) # Cho phép Frontend gọi API

# Giả lập Middleware kiểm tra quyền Admin (Tiêu chí 4)
def is_admin(request):
    token = request.headers.get('Authorization')
    return token == 'Bearer admin_secret_token'

# Tiêu chí 2: API GET lấy toàn bộ dữ liệu
@app.route('/api/participants', methods=['GET'])
def get_participants():
    # Tiêu chí 4: Chặn nếu không phải Admin
    if not is_admin(request):
        return jsonify({"error": "Unauthorized. Chỉ Admin mới có quyền truy cập."}), 403

    try:
        with open('participants.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)