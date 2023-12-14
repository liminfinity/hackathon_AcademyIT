import sqlite3
from datetime import datetime, timedelta
import random

def start_bd():
    # Подключение к базе данных (если ее нет, она будет автоматически создана)
    connection = sqlite3.connect('dbForUsers.db')  # Изменено имя базы данных

    # Создание курсора для выполнения SQL-запросов
    cursor = connection.cursor()

    # Создание таблицы User_info
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS User_info (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            full_name TEXT NOT NULL,
            phone_number TEXT UNIQUE,
            about_user TEXT,
            photo_features BLOB
        )
    """)

    # Создание таблицы log_auth
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS log_auth (
            user_id INTEGER,
            date_auth TEXT,
            time_auth TEXT,
            session_info TEXT,
            FOREIGN KEY (user_id) REFERENCES User_info(user_id)
        )
    """)

    # Закрытие курсора и сохранение изменений в базе данных
    connection.commit()
    cursor.close()
    connection.close()

def add_data():
    connection = sqlite3.connect('dbForUsers.db')  # Изменено имя базы данных
    cursor = connection.cursor()

    # Добавление данных в таблицу User_info
    user_data = [
        ('Nikita Nazarov', '123456789', 'About Nikitos', '''[-0.01991418  0.07813473  0.01773775 -0.08265266 -0.08737109  0.05277083
        -0.07637841 -0.07594563  0.17858961 -0.12946738  0.24853858  0.03733689
        -0.14469278 -0.08498392 -0.02241035  0.08573408 -0.183171   -0.14214355
        -0.01253473 -0.03733417  0.01461104  0.05589676 -0.08711934  0.02833888
        -0.15053298 -0.33244133 -0.13210483 -0.06298089  0.0453972  -0.07469663
        -0.03052739  0.09165126 -0.10451845 -0.01875749  0.06916754  0.08347698
        -0.02849235 -0.07282346  0.17393261  0.0393568  -0.15583088  0.06232646
        0.04341292  0.28587219  0.19377202  0.00921526 -0.01797984 -0.1020285
        0.13142541 -0.19001168  0.03121063  0.21868017  0.04375456  0.09224063
        0.02811117 -0.05713028 -0.01032478  0.10074496 -0.16450946 -0.01548506
        0.00920145 -0.10255198 -0.07464771 -0.11733016  0.08811049  0.11971682
        -0.07528509 -0.21988685  0.10618608 -0.21072489 -0.16324908  0.05525924
        -0.13085905 -0.16786255 -0.22190198  0.02823104  0.36252758  0.2182823
        -0.16794387  0.08671561 -0.00411089 -0.0835255   0.13240388  0.09224501
        -0.00571145 -0.02710557 -0.02805368  0.04956017  0.24311945  0.00626783
        -0.01017912  0.18990785 -0.00880558  0.08810809  0.05007848  0.01500428
        -0.02204339  0.0361274  -0.14552215 -0.03564037  0.06328746  0.00379957
        0.01595426  0.12149815 -0.17987567  0.20315941  0.03671335 -0.00368894
        0.08221458 -0.01952028 -0.06726906 -0.01086335  0.19727567 -0.23449144
        0.17402712  0.14597243  0.06362662  0.12546366  0.10983171  0.03909089
        -0.03568227 -0.11211743 -0.21771543 -0.0727619   0.02342759 -0.02378439
        0.04588379 -0.05605234]'''),
        ('Mikhail Borisenkov ', '987654321', 'About Miha', '''[1.03566647e-02  7.05365092e-02 -8.62383097e-03 -4.56304699e-02
         -1.27830014e-01 -4.64900583e-02 -6.28816709e-03 -1.03339590e-01
          1.15637802e-01 -1.34527504e-01  3.29179227e-01 -7.31879175e-02
         -2.00465888e-01  6.71994686e-03  7.09213912e-02  4.65311594e-02
         -9.54640359e-02 -1.29817963e-01 -1.03899255e-01 -5.76106980e-02
          7.50734210e-02 -9.55779105e-05  3.31438333e-03  1.18286252e-01
         -1.53227523e-01 -2.14620054e-01 -1.06777370e-01 -9.45788622e-02
          1.00074962e-01 -1.63712054e-01 -9.41038728e-02  2.23468542e-02
         -1.24443635e-01 -9.99803841e-02  5.54155409e-02  3.90639342e-02
         -4.90496308e-02 -9.32023674e-02  2.65541136e-01 -1.54523412e-02
         -2.08225310e-01  3.24260741e-02  8.12817216e-02  2.78690368e-01
          2.30400667e-01  1.65477376e-02 -3.99675220e-03 -3.56678367e-02
          1.38387308e-01 -2.25717872e-01  1.69409215e-01  9.03706849e-02
          2.43152976e-01  8.85971412e-02  9.06084552e-02 -1.76059216e-01
         -4.00122404e-02  2.14453310e-01 -1.95076555e-01  1.05653778e-01
          7.78166652e-02 -7.38891289e-02  1.64135695e-02 -8.13118666e-02
          2.35579595e-01  1.12426594e-01 -1.63248062e-01 -1.19692713e-01
          1.24751955e-01 -1.43325374e-01 -1.56494111e-01  1.22782722e-01
         -1.35195434e-01 -1.82427168e-01 -2.43191600e-01  8.20717961e-02
          4.20450240e-01  1.52895376e-01 -2.36628562e-01  1.60426684e-02
          2.45118216e-02 -9.43249464e-02  4.58339304e-02  1.22866929e-01
         -2.26211697e-02 -3.20533961e-02 -8.79672244e-02  4.06627208e-02
          1.96315706e-01 -1.74228549e-02 -5.94587810e-02  2.34319329e-01
         -3.55543196e-02  3.97199243e-02  6.55594096e-02  1.11423917e-01
         -1.19470917e-01 -9.68370214e-03 -1.17256917e-01 -1.09787211e-02
          8.33468884e-03 -7.97292739e-02 -5.14334440e-02  1.31032288e-01
         -1.79552361e-01  2.01694965e-01 -5.02186120e-02 -5.95369190e-03
         -6.20431975e-02 -2.33652592e-02 -2.97246799e-02  2.10620463e-02
          1.07527226e-01 -3.42009783e-01  1.36383802e-01  1.07412107e-01
          6.71111643e-02  1.21217594e-01  2.10839808e-02  1.42434239e-03
          1.25884354e-01 -3.20065692e-02 -2.49641046e-01 -9.90359783e-02
  6.07922524e-02 -4.53788117e-02  9.73618776e-02  5.88283166e-02]'''),
    ]

    cursor.executemany("""
        INSERT INTO User_info (full_name, phone_number, about_user, photo_features)
        VALUES (?, ?, ?, ?)
    """, user_data)


    # Добавление данных в таблицу log_auth
    log_auth_data = []
    for user_id in range(1, 11):  # Соответствует количеству пользователей
        for _ in range(5):  # Добавляем 5 записей для каждого пользователя
            random_date = datetime(2023, 1, 1) + timedelta(days=random.randint(0, 364))
            random_time = datetime.now().replace(microsecond=0, second=0, minute=random.randint(0, 59),
                                                 hour=random.randint(0, 23))
            log_auth_data.append((user_id, random_date.strftime('%Y-%m-%d'), random_time.strftime('%H:%M:%S'),"Opera"))

    # cursor.executemany("""
    #     INSERT INTO log_auth (user_id, date_auth, time_auth,session_info)
    #     VALUES (?, ?, ?,?)
    # """, log_auth_data)

    # Сохранение изменений и закрытие соединения
    connection.commit()
    cursor.close()
    connection.close()

def clear_database():
    connection = sqlite3.connect('dbForUsers.db')  # Изменено имя базы данных
    cursor = connection.cursor()

    try:
        # Удаление данных из таблицы User_info
        cursor.execute("DELETE FROM User_info")

        # Удаление данных из таблицы log_auth
        cursor.execute("DELETE FROM log_auth")

        # Сохранение изменений и закрытие соединения
        connection.commit()

        print("Данные успешно удалены из базы данных.")

    except Exception as e:
        print(f"Произошла ошибка: {str(e)}")

    finally:
        cursor.close()
        connection.close()

# Вызов функции для вывода данных из базы данных в консоль
clear_database()
start_bd()
add_data()
#display_database()
