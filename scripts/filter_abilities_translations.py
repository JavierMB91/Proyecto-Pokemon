import json
import os

# Configuración de rutas
# Se asume que este script está en una carpeta 'scripts/' hermana de 'js/'
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
INPUT_FILE = os.path.join(BASE_DIR, '../js/data/habilidades.json')
OUTPUT_FILE = INPUT_FILE  # Sobrescribir el mismo archivo

def main():
    try:
        print(f"Leyendo archivo: {INPUT_FILE}")
        with open(INPUT_FILE, 'r', encoding='utf-8') as f:
            abilities_data = json.load(f)
        
        print(f"Procesando {len(abilities_data)} entradas...")

        for key, ability in abilities_data.items():
            # Filtrar effect_translations
            if 'effect_translations' in ability:
                translations = ability['effect_translations']
                if 'es' in translations:
                    ability['effect_translations'] = {'es': translations['es']}
                else:
                    # Si no hay español, dejamos el objeto vacío
                    ability['effect_translations'] = {}

            # Filtrar name_translations
            if 'name_translations' in ability:
                translations = ability['name_translations']
                if 'es' in translations:
                    ability['name_translations'] = {'es': translations['es']}
                else:
                    # Si no hay español, dejamos el objeto vacío
                    ability['name_translations'] = {}

        # Guardar cambios
        with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
            json.dump(abilities_data, f, indent=2, ensure_ascii=False)
        
        print(f"¡Éxito! Se han eliminado las traducciones sobrantes en: {OUTPUT_FILE}")

    except FileNotFoundError:
        print(f"Error: No se encontró el archivo en {INPUT_FILE}")
    except Exception as e:
        print(f"Ocurrió un error: {e}")

if __name__ == "__main__":
    main()
