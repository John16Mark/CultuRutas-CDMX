import json
import pymysql  # Puedes usar también sqlite3 si trabajas con SQLite
import re

# Este script lo usé para generar los registros de lugares para la base de datos

def to_sql(val):
    if val is None:
        return 'NULL'
    else:
        return repr(val)  # lo envuelve entre comillas y escapa caracteres


# Conexión a tu base de datos MySQL
conn = pymysql.connect(host='localhost', user='root', password='', database='appturismo')
cursor = conn.cursor()

# Lista de categorías que SÍ quieres incluir
tipos_incluir = {
    "museum",
    "historical_landmark",
    "cultural_landmark",
    "historical_place",
    "sculpture",
    "performing_arts_theater",
    "historical_landmark",
    "planetarium",
    "monument",
    "library",
    "zoo",
    "aquarium",
    "art_gallery",
}

# Abre un archivo SQL donde se guardarán los INSERTS generados
with open("3_Inserciones_sitios.sql", "w", encoding="utf-8") as f:
    f.write("-- Inserciones para la tabla Sitio_turistico_historico\n\n")
    f.write("DELETE FROM Sitio_turistico_historico;\n")

    # Obtener todos los registros de la tabla Lugar
    cursor.execute("SELECT * FROM Lugar")
    columnas = [desc[0] for desc in cursor.description]  # Lista con los nombres de las columnas
    
    contador = 0
    # Iterar sobre cada registro
    for row in cursor.fetchall():
        data = dict(zip(columnas, row))  # Convertir fila a diccionario: {columna: valor}

        # Leer el campo "tipos" (string con formato de arreglo JSON)
        try:
            tipos = json.loads(data["tipos"] or "[]")  # Asegurar que sea una lista
            # Verificar si alguno de los tipos está en la lista de tipos que sí queremos incluir
            if not any(tipo in tipos_incluir for tipo in tipos):
                continue  # Saltar el registro si no tiene ningún tipo válido
        except json.JSONDecodeError:
            continue  # Saltar si el campo tipos está malformado
        
        contador += 1


        # ----------------------------------------------------------------
        #         Nombre, municipio, delegación, código postal
        # ----------------------------------------------------------------

        # Dirección: dividir por comas para intentar obtener partes
        direccion = data["direccion"] or ""
        partes = direccion.split(",")
        
        # Municipio
        municipio = partes[-3].strip()
        # Calle
        calle = ", ".join(p.strip() for p in partes[0:-3])
        # Código postal
        cp_str = partes[-2].strip()  # '06010 Ciudad de México'
        codigo_postal_match = re.search(r"\b\d{5}\b", cp_str)
        codigo_postal = codigo_postal_match.group() if codigo_postal_match else ""

        # ----------------------------------------------------------------
        #                              Horarios
        # ----------------------------------------------------------------

        # Inicializa campos vacíos
        horarios = {
            "h_lunes": None, "h_martes": None, "h_miercoles": None,
            "h_jueves": None, "h_viernes": None, "h_sabado": None, "h_domingo": None
        }

        # Mapeo de día en español a campos de la base de datos
        mapeo_dias = {
            "lunes": "h_lunes",
            "martes": "h_martes",
            "miércoles": "h_miercoles",
            "jueves": "h_jueves",
            "viernes": "h_viernes",
            "sábado": "h_sabado",
            "domingo": "h_domingo"
        }

        # Intenta cargar el JSON solo si no es vacío ni '[]'
        raw = data["regularOpeningHours"]
        if raw and raw.strip() not in ["[]", "null", "None"]:
            try:
                horarios_json = json.loads(raw)
                print("\033[94m", contador, ": \033[0m", horarios_json)

                weekday_descs = horarios_json.get("weekdayDescriptions", [])

                for desc in weekday_descs:
                    if ":" in desc:
                        dia_str, valor = desc.split(":", 1)
                        dia_str = dia_str.strip().lower()
                        valor = valor.strip()

                        campo = mapeo_dias.get(dia_str)
                        if campo:
                            if valor.lower() == "abierto 24 horas":
                                horarios[campo] = "00:00 23:59"
                            else:
                                horarios[campo] = valor  # Puedes hacer más parsing aquí si lo deseas

            except json.JSONDecodeError:
                pass  # Si no se puede parsear, dejamos los valores como None

        # ----------------------------------------------------------------
        #                          Calificaciones
        # ----------------------------------------------------------------

        # Convertir calificación a entero (por ejemplo 4.6 → 4)
        try:
            calificacion = int(float(data["rating"]))
        except (ValueError, TypeError):
            calificacion = 0

        # Convertir total de calificaciones a entero
        try:
            total = int(data["userRatingCount"])
        except (ValueError, TypeError):
            total = 0

        # Preparar la instrucción INSERT con los campos requeridos
        insert_sql = f"""
INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    {repr(data["nombre"])}, {float(data["latitud"])}, {float(data["longitud"])},
    {repr(municipio)}, {repr(calle)}, {repr(codigo_postal)},
    {to_sql(horarios["h_lunes"])}, {to_sql(horarios["h_martes"])}, {to_sql(horarios["h_miercoles"])}, {to_sql(horarios["h_jueves"])}, {to_sql(horarios["h_viernes"])}, {to_sql(horarios["h_sabado"])}, {to_sql(horarios["h_domingo"])},
    \"{repr(tipos if tipos else "")}\", {repr(data["descripcion"] or "")},
    {int(bool(data["accesibilidadParking"]))}, {int(bool(data["accesibilidadEntrance"]))},
    {int(bool(data["accesibilidadRestroom"]))}, {int(bool(data["accesibilidadSeating"]))}, {int(bool(data["allowsDogs"]))},
    {repr(data["precioRango"])}, {int(float(data["rating"]))}, {total}
);
"""
        # Escribir el INSERT en el archivo
        f.write(insert_sql)

print("Archivo insert_sitios.sql generado correctamente.")
print("Se generaron ", contador, "registros")