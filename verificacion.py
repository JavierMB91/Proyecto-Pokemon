import json
import os

def auditoria_final_estricta():
    ruta_habs = os.path.join('js', 'data', 'habilidades.json')
    if not os.path.exists(ruta_habs): return

    with open(ruta_habs, 'r', encoding='utf-8') as f:
        habs = json.load(f)

    # Lista de "Test de estrés": Habilidades que suelen romperse
    test_control = {
        "toxico": "Tóxico",
        "impetu": "Ímpetu",
        "iman": "Imán",
        "presion": "Presión",
        "sincronia": "Sincronía",
        "prevision": "Previsión",
        "adaptable": "Adaptable",
        "caparazon": "Caparazón",
        "intimidacion": "Intimidación"
    }

    errores_encontrados = 0
    items = habs.values() if isinstance(habs, dict) else habs

    print("--- INVESTIGACIÓN DETALLADA DE HABILIDADES ---")
    
    # Comprobamos cada habilidad del archivo
    for h in items:
        nombre = h["name_translations"]["es"]["name"]
        nombre_min = nombre.lower()

        # Comprobación de tildes críticas
        for clave, correcto in test_control.items():
            if clave in nombre_min.replace("ó", "o").replace("í", "i").replace("á", "a"):
                # Si encontramos la palabra pero no tiene la tilde donde debe
                if correcto.lower() not in nombre_min:
                    print(f"❌ ERROR DETECTADO: '{nombre}' debería ser '{correcto}' (o contenerlo)")
                    errores_encontrados += 1

    if errores_encontrados == 0:
        print("✅ COMPROBACIÓN SUPERADA: No se encuentran 'esqueletos' ni faltas de ortografía en los puntos críticos.")
    else:
        print(f"\n⚠️ Se han encontrado {errores_encontrados} fallos que el otro script ignoró.")

if __name__ == "__main__":
    auditoria_final_estricta()