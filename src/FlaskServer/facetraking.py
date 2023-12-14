import face_recognition
import cv2
import sqlite3


def get_user_by_fase(image_path):
    # Создание соединения с базой данных
    conn = sqlite3.connect('dbForUsers.db')
    c = conn.cursor()

    # Создание таблицы, если её нет
    #c.execute("DROP TABLE faces")
    c.execute("""
            CREATE TABLE IF NOT EXISTS User_info (
                user_id INTEGER PRIMARY KEY AUTOINCREMENT,
                full_name TEXT NOT NULL,
                phone_number TEXT UNIQUE,
                about_user TEXT,
                photo_features BLOB
            )
        """)

    # Создание таблицы log_auth
    c.execute("""
            CREATE TABLE IF NOT EXISTS log_auth (
                user_id INTEGER,
                date_auth TEXT,
                time_auth TEXT,
                session_info TEXT,
                FOREIGN KEY (user_id) REFERENCES User_info(user_id)
            )
        """)

    # Загрузка изображения с известными лицами
    # known_image = face_recognition.load_image_file("Nikita.jpg")
    # known_face_encoding_nik = face_recognition.face_encodings(known_image)[0]


    # Вставка данных в базу данных
    # c.execute("INSERT INTO faces (name, encoding) VALUES (?, ?)", ("Nikita Nazarov", str(known_face_encoding_nik)))
    # c.execute("INSERT INTO faces (name, encoding) VALUES (?, ?)", ("Mikhail Borisenko", str(known_face_encoding_mik)))
    # conn.commit()

    # Загрузка видеопотока с веб-камеры
    known_image = face_recognition.load_image_file(image_path)
    known_face_encoding_mik = face_recognition.face_encodings(known_image)[0]
    # Сравнение с лицами в базе данных
    c.execute("SELECT user_id, full_name,  photo_features FROM User_info")
    rows = c.fetchall()
    i = 0
    for row in rows:
        #print(row[2][1:-1].split())
        stored_encoding = list(map(float, row[2][1:-1].split())) # Преобразование строки обратно в список
        matches = face_recognition.compare_faces([stored_encoding], known_face_encoding_mik,tolerance=0.4)
        if matches[0]:
            c.execute("SELECT full_name, phone_number, user_id FROM User_info WHERE user_id = ?",
                      (row[0],))
            ret= c.fetchall()
            try:
                c.execute("SELECT date_auth,time_auth,session_info FROM log_auth WHERE  user_id = ?", (row[0],))
                ret.append(c.fetchall())
            except Exception as e:
                conn.close()
                return ret
            return ret
        i += 1

    conn.close()
    return([[("Unknown")]])

#print(get_user_by_fase("Nikita.jpg"))