import json
import os

def filtrar_idiomas():
    # Obtener la ruta del directorio donde está este script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    # Construir la ruta al archivo json (subir un nivel y entrar a js/data)
    file_path = os.path.join(script_dir, '..', 'js', 'data', 'movimientos.json')

    print(f"Leyendo archivo: {os.path.abspath(file_path)}")

    if not os.path.exists(file_path):
        print("Error: El archivo no existe en la ruta especificada.")
        return

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            moves = json.load(f)

        for key, move in moves.items():
            # Filtrar traducciones de nombre
            if 'name_translations' in move:
                es_data = move['name_translations'].get('es')
                # Si existe español lo mantenemos, si no, dejamos el objeto vacío
                move['name_translations'] = {'es': es_data} if es_data else {}

            # Filtrar traducciones de efecto
            if 'effect_translations' in move:
                es_data = move['effect_translations'].get('es')
                move['effect_translations'] = {'es': es_data} if es_data else {}

        # Guardar el archivo modificado
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(moves, f, indent=2, ensure_ascii=False)
        
        print("Proceso completado. Se han eliminado todos los idiomas excepto el Castellano (es).")

    except Exception as e:
        print(f"Ocurrió un error: {e}")

if __name__ == "__main__":
    filtrar_idiomas()