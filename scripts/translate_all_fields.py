import json
import os

# Configuración de rutas
# Se asume que este script está en una carpeta 'scripts/' hermana de 'js/'
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
INPUT_FILE = os.path.join(BASE_DIR, '../js/data/pokedex_es.json')
OUTPUT_FILE = INPUT_FILE  # Sobrescribir el mismo archivo

# --- Diccionarios de Traducción ---
# Todas las claves deben estar en minúsculas para una coincidencia consistente.

MOVES_ES = {
    "absorb": "Absorber", "acid": "Ácido", "acid armor": "Armadura Ácida", "acid spray": "Bomba Ácida",
    "acrobatics": "Acróbata", "acupressure": "Acupresión", "aerial ace": "Golpe Aéreo", "aeroblast": "Aerochorro",
    "after you": "Cede Paso", "agility": "Agilidad", "air cutter": "Aire Afilado", "air slash": "Tajo Aéreo",
    "ally switch": "Cambio Banda", "amnesia": "Amnesia", "ancientpower": "Poder Pasado", "aqua jet": "Acua Jet",
    "aqua ring": "Acua Aro", "aqua tail": "Acua Cola", "arm thrust": "Empujón", "aromatherapy": "Aromaterapia",
    "assist": "Ayuda", "assurance": "Buena Baza", "astonish": "Impresionar", "attack order": "Al Ataque",
    "attract": "Atracción", "aura sphere": "Esfera Aural", "aurora beam": "Rayo Aurora", "autotomize": "Aligerar",
    "avalanche": "Alud", "baby-doll eyes": "Ojitos Tiernos", "barrage": "Presa", "barrier": "Barrera",
    "baton pass": "Relevo", "beat up": "Paliza", "belch": "Eructo", "belly drum": "Tambor", "bestow": "Ofrenda",
    "bide": "Venganza", "bind": "Atadura", "bite": "Mordisco", "blast burn": "Anillo Ígneo", "blaze kick": "Patada Ígnea",
    "blizzard": "Ventisca", "block": "Bloqueo", "body slam": "Golpe Cuerpo", "bolt strike": "Ataque Fulgor",
    "bone club": "Hueso Palo", "bone rush": "Ataque Óseo", "bonemerang": "Huesomerang", "boomburst": "Estruendo",
    "bounce": "Bote", "brave bird": "Pájaro Osado", "brick break": "Demolición", "brine": "Salmuera",
    "bubble": "Burbuja", "bubblebeam": "Rayo Burbuja", "bug bite": "Picadura", "bug buzz": "Zumbido",
    "bulk up": "Corpulencia", "bulldoze": "Terratemblor", "bullet punch": "Puño Bala", "bullet seed": "Recurrente",
    "calm mind": "Paz Mental", "camouflage": "Camuflaje", "captivate": "Seducción", "celebrate": "Celebración",
    "charge": "Carga", "charge beam": "Rayo Carga", "charm": "Encanto", "chatter": "Cháchara",
    "chip away": "Guardia Baja", "circle throw": "Llave Giro", "clamp": "Tenaza", "clear smog": "Niebla Clara",
    "close combat": "A bocajarro", "coil": "Enrosque", "comet punch": "Puño Cometa", "confide": "Confidencia",
    "confuse ray": "Rayo Confuso", "confusion": "Confusión", "constrict": "Restricción", "conversion": "Conversión",
    "conversion 2": "Conversión 2", "copycat": "Copión", "cosmic power": "Masa Cósmica", "cotton guard": "Rizo Algodón",
    "cotton spore": "Espora Algodón", "counter": "Contador", "covet": "Antojo", "crabhammer": "Martillazo",
    "crafty shield": "Truco Defensa", "cross chop": "Tajo Cruzado", "cross poison": "Veneno X", "crunch": "Triturar",
    "crush claw": "Garra Brutal", "crush grip": "Agarre", "curse": "Maldición", "cut": "Corte",
    "dark pulse": "Pulso Umbrío", "dark void": "Brecha Negra", "dazzling gleam": "Brillo Mágico", "defend order": "A Defender",
    "defense curl": "Rizo Defensa", "defog": "Despejar", "destiny bond": "Mismo Destino", "detect": "Detección",
    "diamond storm": "Tormenta de Diamantes", "dig": "Excavar", "disable": "Anulación", "disarming voice": "Voz Cautivadora",
    "discharge": "Chispazo", "dive": "Buceo", "dizzy punch": "Puño Mareo", "doom desire": "Deseo Oculto",
    "double hit": "Doble Golpe", "double kick": "Doble Patada", "double slap": "Doble Bofetón", "double team": "Doble Equipo",
    "double-edge": "Doble Filo", "doubleslap": "Doble Bofetón", "draco meteor": "Cometa Draco", "dragon ascent": "Ascenso Draco",
    "dragon breath": "Dragoaliento", "dragon claw": "Garra Dragón", "dragon dance": "Danza Dragón", "dragon pulse": "Pulso Dragón",
    "dragon rage": "Furia Dragón", "dragon rush": "Carga Dragón", "dragon tail": "Cola Dragón", "dragonbreath": "Dragoaliento",
    "drain punch": "Puño Drenaje", "draining kiss": "Beso Drenaje", "dream eater": "Come Sueños", "drill peck": "Pico Taladro",
    "drill run": "Taladradora", "dual chop": "Golpe Bis", "dynamic punch": "Puño Dinámico", "dynamicpunch": "Puño Dinámico",
    "earth power": "Tierra Viva", "earthquake": "Terremoto", "echoed voice": "Eco Voz", "eerie impulse": "Onda Anómala",
    "egg bomb": "Bomba Huevo", "electric terrain": "Campo Eléctrico", "electrify": "Electrificación", "electro ball": "Bola Voltio",
    "electroweb": "Electrotela", "embargo": "Embargo", "ember": "Ascuas", "encore": "Otra Vez",
    "endeavor": "Esfuerzo", "endure": "Aguante", "energy ball": "Energibola", "entrainment": "Danza Amiga",
    "eruption": "Estallido", "explosion": "Explosión", "extrasensory": "Paranormal", "extreme speed": "Velocidad Extrema",
    "extremespeed": "Velocidad Extrema", "facade": "Imagen", "faint attack": "Finta", "fairy lock": "Cerrojo Feérico",
    "fairy wind": "Viento Feérico", "fake out": "Sorpresa", "fake tears": "Llanto Falso", "false swipe": "Falsotortazo",
    "feather dance": "Danza Pluma", "featherdance": "Danza Pluma", "feint": "Amago", "feint attack": "Finta",
    "fell stinger": "Aguijón Letal", "fiery dance": "Danza Llama", "final gambit": "Sacrificio", "fire blast": "Llamarada",
    "fire fang": "Colmillo Ígneo", "fire pledge": "Voto Fuego", "fire punch": "Puño Fuego", "fire spin": "Giro Fuego",
    "fissure": "Fisura", "flail": "Azote", "flame burst": "Pirotecnia", "flame charge": "Nitrocarga",
    "flame wheel": "Rueda Fuego", "flamethrower": "Lanzallamas", "flare blitz": "Envite Ígneo", "flash": "Destello",
    "flash cannon": "Foco Resplandor", "flatter": "Camelo", "fling": "Lanzamiento", "flower shield": "Defensa Floral",
    "fly": "Vuelo", "flying press": "Plancha Voladora", "focus blast": "Onda Certera", "focus energy": "Foco Energía",
    "focus punch": "Puño Certero", "follow me": "Señuelo", "force palm": "Palmeo", "foresight": "Profecía",
    "forest's curse": "Condena Silvana", "foul play": "Juego Sucio", "freeze-dry": "Liofilización", "frenzy plant": "Planta Feroz",
    "frost breath": "Vaho Gélido", "frustration": "Frustración", "fury attack": "Ataque Furia", "fury cutter": "Corte Furia",
    "fury swipes": "Golpes Furia", "fusion bolt": "Rayo Fusión", "fusion flare": "Llama Fusión", "future sight": "Premonición",
    "gastro acid": "Bilis", "gear grind": "Rueda Doble", "geomancy": "Geocontrol", "giga drain": "Gigadrenado",
    "giga impact": "Gigaimpacto", "glaciate": "Mundo Gélido", "glare": "Mal de Ojo", "grass knot": "Hierba Lazo",
    "grass pledge": "Voto Planta", "grass whistle": "Silbato", "grasswhistle": "Silbato", "grassy terrain": "Campo de Hierba",
    "gravity": "Gravedad", "growl": "Gruñido", "growth": "Crecimiento", "grudge": "Rabia",
    "guard split": "Isoguardia", "guard swap": "Cambia Defensa", "guillotine": "Guillotina", "gunk shot": "Lanza Mugre",
    "gust": "Tornado", "gyro ball": "Giro Bola", "hail": "Granizo", "hammer arm": "Machada",
    "happy hour": "Paga Extra", "harden": "Fortaleza", "haze": "Niebla", "head charge": "Ariete",
    "head smash": "Testarazo", "headbutt": "Golpe Cabeza", "heal bell": "Campana Cura", "heal block": "Anticura",
    "heal order": "Auxilio", "heal pulse": "Pulso Cura", "healing wish": "Deseo Cura", "heart stamp": "Arrumaco",
    "heart swap": "Intercambio", "heat crash": "Golpe Calor", "heat wave": "Onda Ígnea", "heavy slam": "Cuerpo Pesado",
    "helping hand": "Refuerzo", "hex": "Infortunio", "hi jump kick": "Patada Salto Alta", "hidden power": "Poder Oculto",
    "high jump kick": "Patada Salto Alta", "hold back": "Clemencia", "hold hands": "Manos Juntas", "hone claws": "Afilagarras",
    "horn attack": "Cornada", "horn drill": "Perforador", "horn leech": "Asta Drenaje", "howl": "Aullido",
    "hurricane": "Vendaval", "hydro cannon": "Hidrocañón", "hydro pump": "Hidrobomba", "hyper beam": "Hiperrayo",
    "hyper fang": "Hipercolmillo", "hyper voice": "Vozarrón", "hyperspace fury": "Paso Dimensional", "hyperspace hole": "Paso Dimensional",
    "hypnosis": "Hipnosis", "ice ball": "Bola Hielo", "ice beam": "Rayo Hielo", "ice burn": "Llama Gélida",
    "ice fang": "Colmillo Hielo", "ice punch": "Puño Hielo", "ice shard": "Canto Helado", "icicle crash": "Chuzos",
    "icicle spear": "Carámbano", "icy wind": "Viento Hielo", "imprison": "Cerca", "incinerate": "Calcinación",
    "inferno": "Infierno", "infestation": "Acoso", "ingrain": "Arraigo", "ion deluge": "Cortina Plasma",
    "iron defense": "Defensa Férrea", "iron head": "Cabeza de Hierro", "iron tail": "Cola Férrea", "judgment": "Sentencia",
    "jump kick": "Patada Salto", "karate chop": "Golpe Kárate", "kinesis": "Kinético", "king's shield": "Escudo Real",
    "knock off": "Desarme", "land's wrath": "Fuerza Telúrica", "last resort": "Última Baza", "lava plume": "Humareda",
    "leaf blade": "Hoja Aguda", "leaf storm": "Lluevehojas", "leaf tornado": "Ciclón de Hojas", "leech life": "Chupa Vidas",
    "leech seed": "Drenadoras", "leer": "Malicioso", "light of ruin": "Luz Aniquiladora", "light screen": "Pantalla de Luz",
    "lock-on": "Fijar Blanco", "lovely kiss": "Beso Amoroso", "low kick": "Patada Baja", "low sweep": "Puntapié",
    "lucky chant": "Cántico", "lunar dance": "Danza Lunar", "luster purge": "Resplandor", "mach punch": "Ultrapuño",
    "magic coat": "Capa Mágica", "magic room": "Zona Mágica", "magical leaf": "Hoja Mágica", "magma storm": "Lluvia Ígnea",
    "magnet bomb": "Bomba Imán", "magnet rise": "Levimagnetón", "magnetic flux": "Aura Magnética", "magnitude": "Magnitud",
    "mat block": "Escudo Tatami", "me first": "Yo Primero", "mean look": "Mal de Ojo", "meditate": "Meditación",
    "mega drain": "Megaagotar", "mega kick": "Megapatada", "mega punch": "Megapuño", "megahorn": "Megacuerno",
    "memento": "Legado", "metal burst": "Represión Metal", "metal claw": "Garra Metal", "metal sound": "Eco Metálico",
    "meteor mash": "Puño Meteoro", "meteorobola": "Meteorobola", "metronome": "Metrónomo", "milk drink": "Batido",
    "mimic": "Mimético", "mind reader": "Telépata", "minimize": "Reducción", "miracle eye": "Gran Ojo",
    "mirror coat": "Manto Espejo", "mirror move": "Movimiento Espejo", "mirror shot": "Disparo Espejo", "mist": "Neblina",
    "mist ball": "Bola Neblina", "misty terrain": "Campo de Niebla", "moonblast": "Fuerza Lunar", "moonlight": "Luz Lunar",
    "morning sun": "Sol Matinal", "mud bomb": "Bomba Fango", "mud shot": "Disparo Lodo", "mud sport": "Chapoteo Lodo",
    "mud-slap": "Bofetón Lodo", "muddy water": "Agua Lodosa", "mystical fire": "Llama Embrujada", "nasty plot": "Maquinación",
    "natural gift": "Don Natural", "nature power": "Adaptación", "needle arm": "Machada", "night daze": "Brecha Negra",
    "night shade": "Tinieblas", "night slash": "Tajo Umbrío", "nightmare": "Pesadilla", "noble roar": "Rugido de Guerra",
    "nuzzle": "Moflete Estático", "oblivion wing": "Ala Mortífera", "octazooka": "Pulpocañón", "odor sleuth": "Rastreo",
    "ominous wind": "Viento Aciago", "origin pulse": "Pulso Primigenio", "outrage": "Enfado", "overheat": "Sofoco",
    "pain split": "Divide Dolor", "parabolic charge": "Carga Parábola", "parting shot": "Última Palabra", "pay day": "Día de Pago",
    "payback": "Vendetta", "peck": "Picotazo", "perish song": "Canto Mortal", "petal blizzard": "Tormenta Floral",
    "petal dance": "Danza Pétalo", "phantom force": "Golpe Fantasma", "pin missile": "Pin Misil", "play nice": "Camaradería",
    "play rough": "Carantoña", "pluck": "Picoteo", "poison fang": "Colmillo Veneno", "poison gas": "Gas Venenoso",
    "poison jab": "Puya Nociva", "poison powder": "Polvo Veneno", "poison sting": "Picotazo Venenoso", "poison tail": "Cola Veneno",
    "poisonpowder": "Polvo Veneno", "pound": "Destructor", "powder": "Polvo Explosivo", "powder snow": "Nieve Polvo",
    "power gem": "Joya de Luz", "power split": "Isopotencia", "power swap": "Isofuerza", "power trick": "Truco Fuerza",
    "power whip": "Latigazo", "power-up punch": "Puño Incremento", "precipice blades": "Filo del Abismo", "present": "Presente",
    "protect": "Protección", "psybeam": "Psicorrayo", "psych up": "Más Psique", "psychic": "Psíquico",
    "psycho boost": "Psicoataque", "psycho cut": "Psicocorte", "psycho shift": "Psicocambio", "psyshock": "Psicocarga",
    "psystrike": "Onda Mental", "psywave": "Psicoonda", "punishment": "Castigo", "pursuit": "Persecución",
    "quash": "Último Lugar", "quick attack": "Ataque Rápido", "quick guard": "Anticipo", "quiver dance": "Danza Aleteo",
    "rage": "Furia", "rage powder": "Polvo Ira", "rain dance": "Danza Lluvia", "rapid spin": "Giro Rápido",
    "razor leaf": "Hoja Afilada", "razor shell": "Concha Filo", "razor wind": "Viento Cortante", "recover": "Recuperación",
    "recycle": "Reciclaje", "reflect": "Reflejo", "reflect type": "Clonatipo", "refresh": "Alivio",
    "relic song": "Canto Arcaico", "rest": "Descanso", "retaliate": "Represalia", "return": "Retribución",
    "revenge": "Desquite", "reversal": "Inversión", "roar": "Rugido", "roar of time": "Distorsión",
    "rock blast": "Pedrada", "rock climb": "Treparrocas", "rock polish": "Pulimento", "rock slide": "Avalancha",
    "rock smash": "Golpe Roca", "rock throw": "Lanzarrocas", "rock tomb": "Tumba Rocas", "rock wrecker": "Romperrocas",
    "role play": "Imitación", "rolling kick": "Patada Giro", "rollout": "Desenrollar", "roost": "Respiro",
    "rototiller": "Fertilizante", "round": "Canon", "sacred fire": "Fuego Sagrado", "sacred sword": "Espada Santa",
    "safeguard": "Velo Sagrado", "sand tomb": "Bucle Arena", "sand-attack": "Ataque Arena", "sandstorm": "Tormenta Arena",
    "scald": "Escaldar", "scary face": "Cara Susto", "scratch": "Arañazo", "screech": "Chirrido",
    "searing shot": "Bomba Ígnea", "secret power": "Daño Secreto", "secret sword": "Sable Místico", "seed bomb": "Bomba Germen",
    "seed flare": "Fogonazo", "seismic toss": "Movimiento Sísmico", "self-destruct": "Autodestrucción", "selfdestruct": "Autodestrucción",
    "shadow ball": "Bola Sombra", "shadow claw": "Garra Umbría", "shadow force": "Golpe Umbrío", "shadow punch": "Puño Sombra",
    "shadow sneak": "Sombra Vil", "sharpen": "Afilar", "sheer cold": "Frío Polar", "shell smash": "Rompecoraza",
    "shift gear": "Cambio de Marcha", "shock wave": "Onda de Choque", "signal beam": "Doble Rayo", "silver wind": "Viento Plata",
    "simple beam": "Onda Simple", "sing": "Canto", "sketch": "Esquema", "skill swap": "Intercambio",
    "skull bash": "Cabezazo", "sky attack": "Ataque Aéreo", "sky drop": "Caída Libre", "sky uppercut": "Gancho Alto",
    "slack off": "Relajo", "slam": "Atizar", "slash": "Cuchillada", "sleep powder": "Somnífero",
    "sleep talk": "Sonámbulo", "sludge": "Residuos", "sludge bomb": "Bomba Lodo", "sludge wave": "Onda Tóxica",
    "smack down": "Antiaéreo", "smelling salts": "Estímulo", "smellingsalt": "Estímulo", "smog": "Polución",
    "smokescreen": "Pantalla de Humo", "snarl": "Alarido", "snatch": "Robo", "snore": "Ronquido",
    "soak": "Anegar", "soft-boiled": "Amortiguador", "softboiled": "Amortiguador", "solar beam": "Rayo Solar",
    "solarbeam": "Rayo Solar", "sonic boom": "Bomba Sónica", "sonicboom": "Bomba Sónica", "spacial rend": "Corte Vacío",
    "spark": "Chispa", "spider web": "Telaraña", "spike cannon": "Clavo Cañón", "spikes": "Púas",
    "spiky shield": "Barrera Espinosa", "spit up": "Escupir", "spite": "Rencor", "splash": "Salpicadura",
    "spore": "Espora", "stealth rock": "Trampa Rocas", "steam eruption": "Chorro de Vapor", "steamroller": "Rodillo de Púas",
    "steel wing": "Ala de Acero", "sticky web": "Red Viscosa", "stockpile": "Reserva", "stomp": "Pisotón",
    "stone edge": "Roca Afilada", "stored power": "Poder Reserva", "storm throw": "Llave Corsé", "strength": "Fuerza",
    "string shot": "Disparo Demora", "struggle": "Combate", "struggle bug": "Estoicismo", "stun spore": "Paralizador",
    "submission": "Sumisión", "substitute": "Sustituto", "sucker punch": "Golpe Bajo", "sunny day": "Día Soleado",
    "super fang": "Superdiente", "superpower": "Fuerza Bruta", "supersonic": "Supersónico", "surf": "Surf",
    "swagger": "Contoneo", "swallow": "Tragar", "sweet kiss": "Beso Dulce", "sweet scent": "Dulce Aroma",
    "swift": "Rapidez", "switcheroo": "Trapicheo", "swords dance": "Danza Espada", "synchronoise": "Sincrorruido",
    "synthesis": "Síntesis", "tackle": "Placaje", "tail glow": "Ráfaga", "tail slap": "Plumerazo",
    "tail whip": "Látigo", "tailwind": "Viento Afín", "take down": "Derribo", "taunt": "Mofa",
    "techno blast": "Tecno Shock", "teeter dance": "Danza Caos", "telekinesis": "Telequinesis", "teleport": "Teletransporte",
    "thief": "Ladrón", "thousand arrows": "Mil Flechas", "thousand waves": "Mil Temblores", "thrash": "Golpe",
    "thunder": "Trueno", "thunder fang": "Colmillo Rayo", "thunder punch": "Puño Trueno", "thunder shock": "Impactrueno",
    "thunder wave": "Onda Trueno", "thunderbolt": "Rayo", "thunderpunch": "Puño Trueno", "thundershock": "Impactrueno",
    "tickle": "Cosquillas", "topsy-turvy": "Reversión", "torment": "Tormento", "toxic": "Tóxico",
    "toxic spikes": "Púas Tóxicas", "transform": "Transformación", "tri attack": "Triataque", "trick": "Truco",
    "trick room": "Espacio Raro", "trick-or-treat": "Halloween", "triple kick": "Triple Patada", "trump card": "As Oculto",
    "twineedle": "Doble Ataque", "twister": "Ciclón", "u-turn": "Ida y Vuelta", "uproar": "Alboroto",
    "v-create": "V de Fuego", "vacuum wave": "Onda Vacío", "venom drench": "Trampa Venenosa", "venoshock": "Carga Tóxica",
    "vice grip": "Agarre", "vicegrip": "Agarre", "vine whip": "Látigo Cepa", "vital throw": "Tiro Vital",
    "volt switch": "Voltiocambio", "volt tackle": "Placaje Eléctrico", "wake-up slap": "Espabila", "water gun": "Pistola Agua",
    "water pledge": "Voto Agua", "water pulse": "Hidropulso", "water shuriken": "Shuriken de Agua", "water sport": "Hidrochorro",
    "water spout": "Salpicar", "waterfall": "Cascada", "weather ball": "Meteorobola", "whirlpool": "Torbellino",
    "whirlwind": "Remolino", "wide guard": "Vastaguardia", "wild charge": "Voltio Cruel", "will-o-wisp": "Fuego Fatuo",
    "wing attack": "Ataque Ala", "wish": "Deseo", "withdraw": "Refugio", "wonder room": "Zona Extraña",
    "wood hammer": "Mazazo", "work up": "Avivar", "worry seed": "Abatidoras", "wrap": "Constricción",
    "wring out": "Estrujón", "x-scissor": "Tijera X", "yawn": "Bostezo", "zap cannon": "Electrocañón",
    "zen headbutt": "Cabezazo Zen", "snowscape": "Paisaje Nevado" # Added snowscape
}

ABILITIES_ES = {
    "overgrow": "Espesura", "chlorophyll": "Clorofila", "blaze": "Mar Llamas", "solar-power": "Poder Solar",
    "torrent": "Torrente", "rain-dish": "Cura Lluvia", "shield-dust": "Polvo Escudo", "run-away": "Fuga",
    "shed-skin": "Mudar", "compound-eyes": "Ojo Compuesto", "tinted-lens": "Cromolente", "keen-eye": "Vista Lince",
    "tangled-feet": "Tumbos", "big-pecks": "Sacapecho", "intimidate": "Intimidación", "sniper": "Francotirador",
    "hustle": "Entusiasmo", "static": "Electricidad Estática", "lightning-rod": "Pararrayos", "sand-veil": "Velo Arena",
    "sand-rush": "Chorro Arena", "poison-point": "Punto Tóxico", "rivalry": "Rivalidad", "sheer-force": "Potencia Bruta",
    "cute-charm": "Gran Encanto", "magic-guard": "Muro Mágico", "friend-guard": "Guardia Amiga", "unaware": "Ignorante",
    "flash-fire": "Absorbe Fuego", "drought": "Sequía", "inner-focus": "Foco Interno", "infiltrator": "Allanamiento",
    "damp": "Humedad", "liquid-ooze": "Lodo Líquido", "effect-spore": "Efecto Espora", "dry-skin": "Piel Seca",
    "thick-fat": "Sebo", "ice-body": "Cuerpo Gélido", "rock-head": "Cabeza Roca", "sturdy": "Robustez",
    "battle-armor": "Armadura Batalla", "pickup": "Recogida", "technician": "Experto", "unnerve": "Nerviosismo",
    "water-absorb": "Absorbe Agua", "cloud-nine": "Aclimatación", "levitate": "Levitación", "cursed-body": "Cuerpo Maldito",
    "mold-breaker": "Rompemoldes", "moxie": "Autoestima", "reckless": "Audaz", "unburden": "Liviano",
    "natural-cure": "Cura Natural", "serene-grace": "Dicha", "healer": "Alma Cura", "leaf-guard": "Defensa Hoja",
    "harvest": "Cosecha"
}

TYPES_ES = {
    "normal": "Normal", "fire": "Fuego", "water": "Agua", "grass": "Planta", "electric": "Eléctrico",
    "ice": "Hielo", "fighting": "Lucha", "poison": "Veneno", "ground": "Tierra", "flying": "Volador",
    "psychic": "Psíquico", "bug": "Bicho", "rock": "Roca", "ghost": "Fantasma", "dragon": "Dragón",
    "steel": "Acero", "fairy": "Hada"
}

EGG_GROUPS_ES = {
    "monster": "Monstruo", "grass": "Planta", "dragon": "Dragón", "water 1": "Agua 1", "bug": "Bicho",
    "flying": "Volador", "field": "Campo", "water 3": "Agua 3", "human-like": "Humanoide", "mineral": "Mineral",
    "amorphous": "Amorfo", "water 2": "Agua 2", "fairy": "Hada", "ditto": "Ditto", "undiscovered": "Desconocido"
}

GROWTH_RATES_ES = {
    "slow": "Lento", "medium": "Medio", "fast": "Rápido", "parabolic": "Parabólico",
    "fast-then-very-slow": "Rápido y luego muy lento", "slow-then-very-fast": "Lento y luego muy rápido"
}

LOCATION_TYPES_ES = {
    "grass": "Hierba", "cave": "Cueva", "indoor": "Interior", "rock smash": "Rocas", "water": "Agua",
    "super rod": "Supercaña", "old rod": "Caña Vieja", "good rod": "Caña Buena", "dark grass": "Hierba Oscura",
    "headbutt": "Golpe Cabeza", "fishing": "Pesca", "shadow": "Sombra"
}

LOCATION_RARITY_ES = {
    "common": "Común", "uncommon": "Poco Común", "rare": "Raro", "very rare": "Muy Raro", "horde": "Horda",
    "special": "Especial", "bait": "Cebo"
}

EVOLUTION_TRIGGERS_ES = {
    "level-up": "Subir Nivel", "use-item": "Usar Objeto", "trade": "Intercambio",
    "shed": "Mudar", "spin": "Girar", "take-damage": "Recibir Daño", "other": "Otro"
}

ITEMS_ES = {
    "thunder-stone": "Piedra Trueno", "moon-stone": "Piedra Lunar", "leaf-stone": "Piedra Hoja",
    "fire-stone": "Piedra Fuego", "water-stone": "Piedra Agua", "ice-stone": "Piedra Hielo",
    "kings-rock": "Roca del Rey", "metal-coat": "Revestimiento Metálico", "dragon-scale": "Escama Dragón",
    "electirizer": "Electrizador", "magmarizer": "Magmarizador", "oval-stone": "Piedra Oval",
    "luck-incense": "Incienso Suerte", "odd-incense": "Incienso Raro", "protector": "Protector",
    "galarica-cuff": "Brazalete Galárica", "galarica-wreath": "Corona Galárica", "silverpowder": "Polvo Plata",
    "poison-barb": "Púas Tóxicas", "chilan-berry": "Baya Chilan", "oran-berry": "Baya Aranja",
    "sharp-beak": "Pico Agudo", "soft-sand": "Arena Fina", "grip-claw": "Garra Garfio",
    "quick-claw": "Garra Rápida", "focus-band": "Cinta Focus", "payapa-berry": "Baya Payapa",
    "thick-club": "Hueso Grueso", "rare-bone": "Hueso Raro", "stardust": "Polvo Estelar",
    "star-piece": "Trozo Estrella", "lucky-egg": "Huevo Suerte", "lucky-punch": "Puño Suerte",
    "smoke-ball": "Bola Humo", "black-sludge": "Lodo Negro", "toxic-orb": "Toxiesfera",
    "mystic-water": "Agua Mística"
}


def translate_value(value, dictionary):
    """Traduce un valor de cadena si existe en el diccionario (insensible a mayúsculas/minúsculas)."""
    if isinstance(value, str):
        return dictionary.get(value.lower(), value)
    return value

def translate_list_of_strings(data_list, dictionary):
    """Traduce una lista de cadenas."""
    if not isinstance(data_list, list):
        return data_list
    translated_list = []
    changed = False
    for item in data_list:
        translated_item = translate_value(item, dictionary)
        if item != translated_item:
            changed = True
        translated_list.append(translated_item)
    return translated_list, changed

def translate_pokemon_data(pokedex_data):
    """Traduce varios campos dentro de los datos de un Pokémon."""
    total_translated_terms = 0

    for key, pkm in pokedex_data.items():
        # Traducir movimientos
        if 'moves' in pkm:
            for move_entry in pkm['moves']:
                original_name = move_entry.get('name')
                translated_name = translate_value(original_name, MOVES_ES)
                if original_name != translated_name:
                    move_entry['name'] = translated_name
                    total_translated_terms += 1

        # Traducir habilidades
        if 'abilities' in pkm:
            for ability_entry in pkm['abilities']:
                original_name = ability_entry.get('ability_name')
                translated_name = translate_value(original_name, ABILITIES_ES)
                if original_name != translated_name:
                    ability_entry['ability_name'] = translated_name
                    total_translated_terms += 1
        
        # Traducir egg_groups
        if 'egg_groups' in pkm:
            translated_list, changed = translate_list_of_strings(pkm['egg_groups'], EGG_GROUPS_ES)
            if changed:
                pkm['egg_groups'] = translated_list
                total_translated_terms += sum(1 for orig, new in zip(pkm['egg_groups'], translated_list) if orig != new)

        # Traducir growth_rate
        if 'growth_rate' in pkm:
            original_growth_rate = pkm['growth_rate']
            pkm['growth_rate'] = translate_value(pkm['growth_rate'], GROWTH_RATES_ES)
            if original_growth_rate != pkm['growth_rate']:
                total_translated_terms += 1

        # Traducir types
        if 'types' in pkm:
            translated_list, changed = translate_list_of_strings(pkm['types'], TYPES_ES)
            if changed:
                pkm['types'] = translated_list
                total_translated_terms += sum(1 for orig, new in zip(pkm['types'], translated_list) if orig != new)

        # Traducir location_area_encounters
        if 'location_area_encounters' in pkm:
            for encounter in pkm['location_area_encounters']:
                if 'type' in encounter:
                    original_type = encounter['type']
                    encounter['type'] = translate_value(encounter['type'], LOCATION_TYPES_ES)
                    if original_type != encounter['type']:
                        total_translated_terms += 1
                if 'rarity' in encounter:
                    original_rarity = encounter['rarity']
                    encounter['rarity'] = translate_value(encounter['rarity'], LOCATION_RARITY_ES)
                    if original_rarity != encounter['rarity']:
                        total_translated_terms += 1
                # 'region_name' y 'location' se dejan como están (nombres propios)

        # Traducir held_items
        if 'held_items' in pkm:
            for held_item in pkm['held_items']:
                if 'item_name' in held_item:
                    original_item_name = held_item['item_name']
                    held_item['item_name'] = translate_value(held_item['item_name'], ITEMS_ES)
                    if original_item_name != held_item['item_name']:
                        total_translated_terms += 1

        # Traducir detalles de evolution_chain
        if 'evolution_chain' in pkm and pkm['evolution_chain'] and 'chain' in pkm['evolution_chain']:
            chain = pkm['evolution_chain']['chain']
            # Función recursiva para recorrer la cadena de evolución
            def traverse_evolution(evo_node):
                nonlocal total_translated_terms # Permite modificar la variable del ámbito exterior
                if 'evolution_details' in evo_node and evo_node['evolution_details']:
                    for detail in evo_node['evolution_details']:
                        if 'trigger' in detail and 'name' in detail['trigger']:
                            original_trigger_name = detail['trigger']['name']
                            detail['trigger']['name'] = translate_value(detail['trigger']['name'], EVOLUTION_TRIGGERS_ES)
                            if original_trigger_name != detail['trigger']['name']:
                                total_translated_terms += 1
                        if 'held_item' in detail and detail['held_item'] and 'name' in detail['held_item']:
                            original_held_item_name = detail['held_item']['name']
                            detail['held_item']['name'] = translate_value(detail['held_item']['name'], ITEMS_ES)
                            if original_held_item_name != detail['held_item']['name']:
                                total_translated_terms += 1
                        if 'item' in detail and detail['item'] and 'name' in detail['item']:
                            original_item_name = detail['item']['name']
                            detail['item']['name'] = translate_value(detail['item']['name'], ITEMS_ES)
                            if original_item_name != detail['item']['name']:
                                total_translated_terms += 1
                        # 'location' name se deja como está (nombre propio)
                if 'evolves_to' in evo_node:
                    for next_evo in evo_node['evolves_to']:
                        traverse_evolution(next_evo)
            
            traverse_evolution(chain)

    return pokedex_data, total_translated_terms

def main():
    try:
        print(f"Leyendo archivo: {INPUT_FILE}")
        with open(INPUT_FILE, 'r', encoding='utf-8') as f:
            pokedex = json.load(f)
        
        print(f"Procesando {len(pokedex)} entradas...")

        # Realizar traducciones
        pokedex, translated_count = translate_pokemon_data(pokedex)

        # Guardar cambios
        with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
            json.dump(pokedex, f, indent=2, ensure_ascii=False)
        
        print(f"¡Éxito! Se han traducido {translated_count} términos en el archivo.")
        print(f"Archivo guardado en: {OUTPUT_FILE}")

    except FileNotFoundError:
        print(f"Error: No se encontró el archivo en {INPUT_FILE}")
    except Exception as e:
        print(f"Ocurrió un error: {e}")

if __name__ == "__main__":
    main()
