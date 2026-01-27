from PIL import Image
import os

# Este script recorta el espacio transparente sobrante de las imágenes.
# Requiere instalar Pillow: pip install Pillow

def recortar_imagen(ruta):
    try:
        img = Image.open(ruta)
        # getbbox() obtiene el rectángulo que contiene la parte visible de la imagen
        bbox = img.getbbox()
        if bbox:
            img = img.crop(bbox)
            img.save(ruta)
            print(f"✅ Recortado correctamente: {ruta}")
    except Exception as e:
        print(f"❌ Error en {ruta}: {e}")

if __name__ == "__main__":
    imagenes = [
        "../img/bulbasaur.png",
        "../img/charmander.png",
        "../img/squirtle.png",
        "../img/chikorita.png",
        "../img/cyndaquil.png",
        "../img/totodile.png",
        "../img/treecko.png",
        "../img/torchic.png",
        "../img/mudkip.png",
        "../img/turtwig.png",
        "../img/chimchar.png",
        "../img/piplup.png",
        "../img/snivy.png",
        "../img/tepig.png",
        "../img/oshawott.png"
    ]
    
    base_dir = os.path.dirname(__file__)
    for img_rel in imagenes:
        ruta_completa = os.path.join(base_dir, img_rel)
        recortar_imagen(ruta_completa)