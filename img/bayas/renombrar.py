import os
import re  # Importamos el módulo de expresiones regulares

# Diccionario completo corregido con guiones bajos
nombres_bayas = {
    "vg1qTcI": "Baya_Acardo", "43dOvzU": "Baya_Alcho", "aT2e0Kn": "Baya_Algama",
    "K7PHyf9": "Baya_Andano", "Wvf3gne": "Baya_Ango", "fOXrF3A": "Baya_Anjiro",
    "RePhduT": "Baya_Aostan", "teYuQAC": "Baya_Arabol", "uvtJ9Ql": "Baya_Aranja",
    "MMVjm8T": "Baya_Aricoc", "Rsb3ayg": "Baya_Aslac", "gHzVYU5": "Baya_Atania",
    "8wx91yY": "Baya_Bariba", "mMsh8k9": "Baya_Caoca", "am2ZZwa": "Baya_Caquic",
    "k7BRxTV": "Baya_Chilan", "pp3Q8TF": "Baya_Chiri", "hlkYuu4": "Baya_Dillo",
    "aqvoipM": "Baya_Drasi", "utMoKPQ": "Baya_Enigma", "ikpyzXv": "Baya_Frambu",
    "otbg0FK": "Baya_Gonlan", "To7N3jE": "Baya_Grana", "vzXQikq": "Baya_Gualot",
    "5tmcQFb": "Baya_Guaya", "mHeBXhb": "Baya_Ispero", "sZZ6PFz": "Baya_Latano",
    "59ds4iV": "Baya_Lichi", "WDLcvfr": "Baya_Meloc", "ofu8k03": "Baya_Meluce",
    "749Sd81": "Baya_Perasi", "eOpnUrs": "Baya_Tamate", "KtkOA9a": "Baya_Wiki",
    "iR2lpqb": "Baya_Ziuela", "JI7o6Wc": "Baya_Zanama", "L8bTkn5": "Baya_Higog",
    "bmHQusm": "Baya_Pabaya", "zdEsYOY": "Baya_Peragu", "h6xoU2r": "Baya_Pinia",
    "I85s7DX": "Baya_Payapa", "Dj9sjKv": "Baya_Monli", "VPl6fCy": "Baya_Magua",
    "UzUXrB4": "Baya_Rautan", "SPU1d7D": "Baya_Rudion", "xqyHzdr": "Baya_Zonlan",
    "Fww5ki2": "Baya_Zreza", "iOpnUrs": "Baya_Tamar", "fAp6OLx": "Baya_Jaboca",
    "maWHEik": "Baya_Kouba", "aCnb1en": "Baya_Oram", "YJb3aaV": "Baya_Sambia",
    "XVsAoSm": "Baya_Uvav",
    # Nuevas añadidas
    "cS5VnLS": "Baya_Kebia",
    "3SxTJ8y": "Baya_Lagro",
    "6x84Ckl": "Baya_Roseli",
    "9Rop3f4": "Baya_Pasio",
    "a6zRXn2": "Baya_Yecana",
    "hFAKlU2": "Baya_Zidra",
    "I51N37c": "Baya_Wikano",
    "ISkYnAA": "Baya_Pomaro",
    "ndezaYd": "Baya_Plama",
    "NDKnSjI": "Baya_Safre",
    "RfnlwNe": "Baya_Yapati",
    "rzghEvQ": "Baya_Mais",
    "YXrUWIg": "Baya_Rimoya"
}

ruta_actual = os.path.dirname(os.path.abspath(__file__))
count = 0
no_reconocidos = []

print(f"📂 Procesando archivos en: {ruta_actual}")

for archivo in os.listdir(ruta_actual):
    # Saltamos el propio script
    if archivo == "renombrar.py":
        continue
        
    nuevo_nombre = archivo
    
    # 1. PASO: Normalización de nombre "Baya"
    # Usamos regex para detectar "baya " (insensible a mayúsculas) y reemplazarlo por "Baya_"
    # Esto arregla casos como "baya aranja.png" o "Baya  Aranja.png"
    if re.search(r'baya\s+', archivo, re.IGNORECASE):
        nuevo_nombre = re.sub(r'baya\s+', 'Baya_', archivo, flags=re.IGNORECASE)
    
    # 2. PASO: Si todavía tiene el ID raro de Imgur, buscamos el nombre real
    archivo_lower = archivo.lower()
    encontrado = False
    
    # Si ya tiene formato correcto (empieza por Baya_), lo marcamos como encontrado
    if nuevo_nombre.lower().startswith("baya_"):
        encontrado = True

    for id_img, nombre_real in nombres_bayas.items():
        if id_img.lower() in archivo_lower:
            extension = os.path.splitext(archivo)[1]
            nuevo_nombre = f"{nombre_real}{extension}"
            encontrado = True
            break
    
    # Convertir a minúsculas para asegurar el formato solicitado
    nuevo_nombre = nuevo_nombre.lower()
            
    if not encontrado and not nuevo_nombre.startswith("baya_"):
        no_reconocidos.append(archivo)

    # Aplicar el cambio si el nombre ha cambiado
    if nuevo_nombre != archivo:
        try:
            os.rename(os.path.join(ruta_actual, archivo), os.path.join(ruta_actual, nuevo_nombre))
            print(f"✅ Actualizado: {archivo} -> {nuevo_nombre}")
            count += 1
        except Exception as e:
            print(f"❌ Error con {archivo}: {e}")

print(f"\n✨ ¡Operación terminada! {count} archivos actualizados.")

if no_reconocidos:
    print("\n⚠️ Archivos no reconocidos (IDs desconocidos):")
    for f in no_reconocidos:
        print(f" - {f}")
