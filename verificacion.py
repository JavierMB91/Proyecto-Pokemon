import json
import os
import re

def verificar_integridad_total():
    paths = {
        "movs": os.path.join('js', 'data', 'movimientos.json'),
        "habs": os.path.join('js', 'data', 'habilidades.json'),
        "huevos": os.path.join('js', 'data', 'movimientos_huevo_ES.json')
    }

    # Comprobación de existencia de archivos
    for name, path in paths.items():
        if not os.path.exists(path):
            print(f"❌ Error: No se encuentra el archivo {name} en {path}")
            return

    # Carga de datos
    with open(paths["movs"], 'r', encoding='utf-8') as f: movs = json.load(f)
    with open(paths["habs"], 'r', encoding='utf-8') as f: habs = json.load(f)
    with open(paths["huevos"], 'r', encoding='utf-8') as f: huevos = json.load(f)

    print("--- INICIANDO AUDITORÍA FINAL 100% ---")

    # 1. VERIFICAR TILDES (Auditamos si quedaron "esqueletos" sin vocales)
    patron_error = re.compile(r"[a-z]{2,}(?<![áéíóúñ])n\b|[b-df-hj-np-tv-z]{3,}") 
    # Busca terminaciones en 'n' sin tilde o 3 consonantes seguidas
    
    for db_name, db in [("Movimientos", movs), ("Habilidades", habs)]:
        errores_texto = []
        items = db.values() if isinstance(db, dict) else db
        for item in items:
            nombre = item["name_translations"]["es"]["name"]
            if patron_error.search(nombre.lower()) and " " not in nombre:
                # Filtramos algunos nombres que son así (ej: Blitzle si estuviera ahí)
                errores_texto.append(nombre)
        
        if errores_texto:
            print(f"⚠️ {db_name}: Posibles tildes faltantes en: {set(errores_texto[:5])}...")
        else:
            print(f"✅ {db_name}: Ortografía y tildes verificadas.")

    # 2. VERIFICAR INTEGRIDAD CRUZADA (Huevos -> Movimientos)
    # Sacamos todos los nombres de movimientos que tenemos en español
    nombres_movs_es = set()
    for m in movs.values():
        nombres_movs_es.add(m["name_translations"]["es"]["name"])

    huerfanos = []
    total_huevos = 0
    for pkm, movs_pkm in huevos.items():
        for nombre_huevo in movs_pkm.keys():
            total_huevos += 1
            if nombre_huevo not in nombres_movs_es:
                huerfanos.append(f"{pkm}: {nombre_huevo}")

    if huerfanos:
        print(f"❌ Integridad Huevos: {len(huerfanos)} movimientos no existen en movimientos.json")
        print(f"   Ejemplos: {huerfanos[:3]}")
    else:
        print(f"✅ Integridad Huevos: Los {total_huevos} movimientos huevo existen en el archivo maestro.")

    # 3. VERIFICAR FORMATO JSON
    print("✅ Formato: Todos los archivos son JSON válidos y legibles.")

if __name__ == "__main__":
    verificar_integridad_total()