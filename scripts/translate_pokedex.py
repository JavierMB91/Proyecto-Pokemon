import json
import os

# Configuración de rutas
# Se asume que este script está en una carpeta 'scripts/' hermana de 'js/'
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
INPUT_FILE = os.path.join(BASE_DIR, '../js/data/pokedex.json')
OUTPUT_FILE = os.path.join(BASE_DIR, '../js/data/pokedex_es.json')

# Diccionarios de traducción
DICTIONARIES = {
    "types": {
        "normal": "Normal", "fighting": "Lucha", "flying": "Volador", "poison": "Veneno",
        "ground": "Tierra", "rock": "Roca", "bug": "Bicho", "ghost": "Fantasma",
        "steel": "Acero", "fire": "Fuego", "water": "Agua", "grass": "Planta",
        "electric": "Eléctrico", "psychic": "Psíquico", "ice": "Hielo", "dragon": "Dragón",
        "dark": "Siniestro", "fairy": "Hada"
    },
    "egg_groups": {
        "monster": "Monstruo", "water1": "Agua 1", "watera": "Agua 1",
        "bug": "Bicho", "flying": "Volador", "field": "Campo", "fairy": "Hada",
        "grass": "Planta", "plant": "Planta", "human-like": "Humanoide", "humanoid": "Humanoide",
        "water3": "Agua 3", "waterc": "Agua 3", "mineral": "Mineral",
        "amorphous": "Amorfo", "chaos": "Amorfo", "water2": "Agua 2", "waterb": "Agua 2",
        "ditto": "Ditto", "dragon": "Dragón", "no-eggs": "Sin Huevos",
        "undiscovered": "Desconocido", "gender-unknown": "Desconocido"
    },
    "growth_rate": {
        "slow": "Lento", "medium": "Medio", "fast": "Rápido",
        "medium-slow": "Parabólico", "slow-then-very-fast": "Errático",
        "fast-then-very-slow": "Fluctuante"
    },
    "stats": {
        "hp": "PS", "attack": "Ataque", "defense": "Defensa",
        "special-attack": "At. Esp", "special-defense": "Def. Esp", "speed": "Velocidad"
    },
    "move_learn_method": {
        "level": "Nivel", "egg_moves": "Mov. Huevo", "move_tutor": "Tutor",
        "move_learner_tools": "MT/MO", "special_moves": "Especial",
        "prevo_moves": "Pre-evolución", "on_evolution": "Al evolucionar",
        "special_egg": "Huevo Especial"
    },
    "rarity": {
        "Common": "Común", "Very Common": "Muy Común", "Uncommon": "Poco Común",
        "Rare": "Raro", "Very Rare": "Muy Raro", "Horde": "Horda",
        "Lure": "Cebo", "Special": "Especial", "Shadow": "Sombra"
    },
    "encounter_type": {
        "Grass": "Hierba", "Dark Grass": "Hierba Oscura", "Cave": "Cueva",
        "Water": "Agua", "Surfing": "Surf", "Fishing": "Pesca",
        "Old Rod": "Caña Vieja", "Good Rod": "Caña Buena", "Super Rod": "Supercaña",
        "Headbutt": "Golpe Cabeza", "Rock Smash": "Golpe Roca", "Rocks": "Rocas",
        "Inside": "Interior", "Shadow": "Sombra"
    },
    "evolution_trigger": {
        "level-up": "Subir Nivel", "trade": "Intercambio", "use-item": "Usar Objeto",
        "shed": "Mudar", "spin": "Girar", "tower-of-darkness": "Torre de las Sombras",
        "tower-of-waters": "Torre de las Aguas", "three-critical-hits": "3 Críticos",
        "take-damage": "Recibir Daño", "other": "Otro"
    }
}

def t(category, value):
    """Función auxiliar para traducir."""
    if value is None:
        return value
    
    val_str = str(value).lower()
    
    if category in DICTIONARIES:
        # Intenta coincidencia exacta
        if value in DICTIONARIES[category]:
            return DICTIONARIES[category][value]
        # Intenta coincidencia en minúsculas
        if val_str in DICTIONARIES[category]:
            return DICTIONARIES[category][val_str]
            
    return value

def process_evolution_node(node):
    """Procesa recursivamente la cadena de evolución."""
    if not node:
        return

    # Traducir detalles de evolución
    if 'evolution_details' in node and node['evolution_details']:
        for detail in node['evolution_details']:
            if 'trigger' in detail and detail['trigger'] and 'name' in detail['trigger']:
                detail['trigger']['name'] = t('evolution_trigger', detail['trigger']['name'])
            
            if 'time_of_day' in detail and detail['time_of_day']:
                if detail['time_of_day'] == 'day':
                    detail['time_of_day'] = 'día'
                elif detail['time_of_day'] == 'night':
                    detail['time_of_day'] = 'noche'

    # Recursividad para evoluciones siguientes
    if 'evolves_to' in node and node['evolves_to']:
        for child in node['evolves_to']:
            process_evolution_node(child)

def main():
    try:
        print(f"Leyendo archivo: {INPUT_FILE}")
        with open(INPUT_FILE, 'r', encoding='utf-8') as f:
            pokedex = json.load(f)
        
        print(f"Procesando {len(pokedex)} entradas...")

        for key, pkm in pokedex.items():
            # Listas simples
            if 'egg_groups' in pkm and pkm['egg_groups']:
                pkm['egg_groups'] = [t('egg_groups', g) for g in pkm['egg_groups']]
            
            if 'types' in pkm and pkm['types']:
                pkm['types'] = [t('types', ty) for ty in pkm['types']]

            # Valores simples
            if 'growth_rate' in pkm:
                pkm['growth_rate'] = t('growth_rate', pkm['growth_rate'])

            # Listas de objetos
            if 'stats' in pkm:
                for stat in pkm['stats']:
                    stat['stat_name'] = t('stats', stat.get('stat_name'))
            
            if 'moves' in pkm:
                for move in pkm['moves']:
                    move['type'] = t('move_learn_method', move.get('type'))
            
            if 'location_area_encounters' in pkm:
                for enc in pkm['location_area_encounters']:
                    enc['rarity'] = t('rarity', enc.get('rarity'))
                    enc['type'] = t('encounter_type', enc.get('type'))

            # Estructura recursiva
            if 'evolution_chain' in pkm and 'chain' in pkm['evolution_chain']:
                process_evolution_node(pkm['evolution_chain']['chain'])

        # Guardar
        with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
            json.dump(pokedex, f, indent=2, ensure_ascii=False)
        
        print(f"¡Éxito! Archivo guardado en: {OUTPUT_FILE}")

    except FileNotFoundError:
        print(f"Error: No se encontró el archivo en {INPUT_FILE}")
    except Exception as e:
        print(f"Ocurrió un error inesperado: {e}")

if __name__ == "__main__":
    main()