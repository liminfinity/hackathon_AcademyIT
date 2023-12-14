from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import face_recognition
import facetraking
import numpy as np
import mysql.connector
from datetime import datetime, timedelta
import sqlite3
import blob_parsr

app = Flask(__name__)

CORS(app, resources={r"/add_user": {"origins": "192.168.230.21:3000"}})

# Подключение к базе данных MySQL

# Функция для извлечения признаков из фотографии
# Ручка для добавления пользователя
@app.route('/add_user', methods=['POST'])
def add_user():
    print("add_user function called")
    try:
        connection = sqlite3.connect('dbForUsers.db')
        cursor = connection.cursor()

        data = request.form
        full_name = data['full_name']
        phone_number = data['phone_number']
        about_user = data['about_me']
        date_auth=datetime.now().strftime('%Y-%m-%d')
        time_auth =datetime.now().strftime('%H:%M:%S')
        session_info=data['session_info']
        blob_parsr.blob_to_image(data["photo"])
        photo_path = 'ths.jpg'

        # Извлечение признаков из фотографии
        known_image = face_recognition.load_image_file(photo_path)
        photo_features = face_recognition.face_encodings(known_image)[0]

        cursor.execute("""
                INSERT INTO User_info (full_name, phone_number, about_user, photo_features)
                VALUES (?, ?, ?, ?)
            """, (full_name,phone_number,about_user,str(photo_features)))
        new_user_id = cursor.lastrowid

        cursor.execute("""
        INSERT INTO log_auth (user_id, date_auth, time_auth,session_info)
        VALUES (?, ?, ?,?)
         """, (new_user_id,date_auth,time_auth,session_info))
        connection.commit()

        cursor.close()
        connection.close()

        return jsonify({'success': True, 'message': 'Пользователь успешно добавлен в базу данных.'})

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})



@app.route('/check_person', methods=['POST'])
def check_person():
    print("check function called")
    data = request.form
    blob_parsr.blob_to_image(data["photo"])
    try:
        photo_path="ths.jpg"
        user_id = facetraking.get_user_by_fase(photo_path)
        if user_id[0][0] != "Unknown":
            connection = sqlite3.connect('dbForUsers.db')
            cursor = connection.cursor()


            cursor.execute("""
                   INSERT INTO log_auth (user_id, date_auth, time_auth,session_info)
                   VALUES (?, ?, ?,?)
               """, (user_id[0][2],str(datetime.now().strftime('%Y-%m-%d')),str(datetime.now().strftime('%H:%M:%S')),data['session_info']))

            connection.commit()
            cursor.close()
            connection.close()

            help=(str(user_id[1]).replace(",",';').replace('(',"").replace(")","").replace("'","").replace(" ",""))
            cnt  = 0
            for i in range(len(help)):
                if help[i]== ';':
                    cnt+=1
                if cnt == 3:
                    help = help[:i]+ "&"+ help[i+1:]
                    cnt=0
            return jsonify({"result": "Человек найден","name":user_id[0][0],"phone":user_id[0][1],"array":(help)})
        else:
            return jsonify({"error": "Not found"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='192.168.0.127', port=5000, debug=True)
