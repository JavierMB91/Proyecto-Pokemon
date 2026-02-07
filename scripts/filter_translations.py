import json
import os

# Configuración de rutas
# Se asume que este script está en una carpeta 'scripts/' hermana de 'js/'
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
INPUT_FILE = os.path.join(BASE_DIR, '../js/data/pokedex_es.json')
# Sobrescribimos el mismo archivo
OUTPUT_FILE = INPUT_FILE

def main():
    try:
        print(f"Leyendo archivo: {INPUT_FILE}")
        with open(INPUT_FILE, 'r', encoding='utf-8') as f:
            pokedex = json.load(f)
        
        print(f"Procesando {len(pokedex)} entradas...")

        for key, pkm in pokedex.items():
            if 'name_translations' in pkm:
                translations = pkm['name_translations']
                
                # Si existe la traducción al español, nos quedamos solo con esa
                if 'es' in translations:
                    pkm['name_translations'] = {'es': translations['es']}
                else:
                    # Si no hay español, dejamos el objeto vacío
                    pkm['name_translations'] = {}

        # Guardar cambios
        with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
            json.dump(pokedex, f, indent=2, ensure_ascii=False)
        
        print(f"¡Éxito! Se han eliminado las traducciones sobrantes en: {OUTPUT_FILE}")

    except Exception as e:
        print(f"Ocurrió un error: {e}")

if __name__ == "__main__":
    main()