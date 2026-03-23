from flask import Flask, jsonify, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

@app.route('/api/change-password', methods=['POST'])
def change_password():
    data = request.json
    old_password = data.get('oldPassword')
    new_password = data.get('newPassword')

    # Tiêu chí 4 (Validation ở Backend để đảm bảo an toàn kép)
    if len(new_password) < 6:
        return jsonify({"error": "Mật khẩu mới phải có tối thiểu 6 ký tự."}), 400

    try:
        # Đọc dữ liệu admin hiện tại
        with open('admin.json', 'r', encoding='utf-8') as f:
            admin_data = json.load(f)

        # Tiêu chí 2: Kiểm tra mật khẩu cũ
        if admin_data['password'] != old_password:
            return jsonify({"error": "Mật khẩu cũ không chính xác!"}), 400

        # Tiêu chí 5: Cập nhật file dữ liệu
        admin_data['password'] = new_password
        with open('admin.json', 'w', encoding='utf-8') as f:
            json.dump(admin_data, f, indent=4)

        return jsonify({"message": "Đổi mật khẩu thành công"}), 200

    except Exception as e:
        return jsonify({"error": f"Lỗi hệ thống: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)