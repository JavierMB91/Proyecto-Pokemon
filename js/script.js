// --- DATOS DE LOS GIMNASIOS (PokeMMO) ---
const datosGimnasios = [
    {
        nombre: "Kanto",
        dinero: "63.700",
        gimnasios: [
            { ciudad: "Ciudad Plateada", lider: "Brock" },
            { ciudad: "Ciudad Celeste", lider: "Misty" },
            { ciudad: "Ciudad Carmín", lider: "Lt. Surge" },
            { ciudad: "Ciudad Azulona", lider: "Erika" },
            { ciudad: "Ciudad Fucsia", lider: "Koga" },
            { ciudad: "Ciudad Azafrán", lider: "Sabrina" },
            { ciudad: "Isla Canela", lider: "Blaine" },
            { ciudad: "Liga Pokémon", lider: "Alto Mando", id: "elite4", enfriamiento: 6 }
        ]
    },
    {
        nombre: "Johto",
        dinero: "72.800",
        gimnasios: [
            { ciudad: "Ciudad Malva", lider: "Pegaso" },
            { ciudad: "Pueblo Azalea", lider: "Antón" },
            { ciudad: "Ciudad Trigal", lider: "Blanca" },
            { ciudad: "Ciudad Iris", lider: "Morti" },
            { ciudad: "Ciudad Orquídea", lider: "Aníbal" },
            { ciudad: "Ciudad Olivo", lider: "Yasmina" },
            { ciudad: "Pueblo Caoba", lider: "Fredo" },
            { ciudad: "Ciudad Endrino", lider: "Débora" },
            { ciudad: "Liga Pokémon", lider: "Alto Mando", id: "elite4", enfriamiento: 6 }
        ]
    },
    {
        nombre: "Hoenn",
        dinero: "72.800",
        gimnasios: [
            { ciudad: "Ciudad Férrica", lider: "Petra" },
            { ciudad: "Pueblo Azuliza", lider: "Marcial" },
            { ciudad: "Ciudad Malvalona", lider: "Erico" },
            { ciudad: "Pueblo Lavacalda", lider: "Candela" },
            { ciudad: "Ciudad Petalia", lider: "Norman" },
            { ciudad: "Ciudad Arborada", lider: "Alana" },
            { ciudad: "Ciudad Algaria", lider: "Vito y Leti" },
            { ciudad: "Ciudad Arrecípolis", lider: "Galano" },
            { ciudad: "Liga Pokémon", lider: "Alto Mando", id: "elite4", enfriamiento: 6 }
        ]
    },
    {
        nombre: "Sinnoh",
        dinero: "72.800",
        gimnasios: [
            { ciudad: "Ciudad Pirita", lider: "Roco" },
            { ciudad: "Ciudad Vetusta", lider: "Gardenia" },
            { ciudad: "Ciudad Rocavelo", lider: "Brega" },
            { ciudad: "Ciudad Pradera", lider: "Mananti" },
            { ciudad: "Ciudad Corazón", lider: "Fantina" },
            { ciudad: "Ciudad Canal", lider: "Acerón" },
            { ciudad: "Ciudad Puntaneva", lider: "Inverna" },
            { ciudad: "Ciudad Marina", lider: "Lectro" },
            { ciudad: "Liga Pokémon", lider: "Alto Mando", id: "elite4", enfriamiento: 6 }
        ]
    },
    {
        nombre: "Teselia",
        dinero: "72.800",
        gimnasios: [
            { ciudad: "Ciudad Gres", lider: "Zeo, Maíz y Millo" },
            { ciudad: "Ciudad Esmalte", lider: "Aloe" },
            { ciudad: "Ciudad Porcelana", lider: "Camus" },
            { ciudad: "Ciudad Mayólica", lider: "Camila" },
            { ciudad: "Ciudad Fayenza", lider: "Yakón" },
            { ciudad: "Ciudad Loza", lider: "Gerania" },
            { ciudad: "Ciudad Teja", lider: "Junco" },
            { ciudad: "Ciudad Caolín", lider: "Lirio" },
            { ciudad: "Liga Pokémon", lider: "Alto Mando", id: "elite4", enfriamiento: 6 }
        ],
        entrenadoresEspeciales: [
            { ciudad: "Ciudad Porcelana", lider: "Morimoto" },
            { ciudad: "Pueblo Arenisca", lider: "Cintia" }
        ]
    }
];

// --- DATOS DEL ALTO MANDO ---
const datosAltoMando = [
    {
        nombre: "Kanto",
        dinero: "60.000", // Estimado
        gimnasios: [
            { ciudad: "Liga Pokémon", lider: "Alto Mando", id: "kanto-elite4", enfriamiento: 24 }
        ]
    },
    {
        nombre: "Johto",
        dinero: "60.000",
        gimnasios: [
            { ciudad: "Liga Pokémon", lider: "Alto Mando", id: "johto-elite4", enfriamiento: 24 }
        ]
    },
    {
        nombre: "Hoenn",
        dinero: "60.000",
        gimnasios: [
            { ciudad: "Liga Pokémon", lider: "Alto Mando", id: "hoenn-elite4", enfriamiento: 24 }
        ]
    },
    {
        nombre: "Sinnoh",
        dinero: "60.000",
        gimnasios: [
            { ciudad: "Liga Pokémon", lider: "Alto Mando", id: "sinnoh-elite4", enfriamiento: 24 }
        ]
    },
    {
        nombre: "Teselia",
        dinero: "60.000",
        gimnasios: [
            { ciudad: "Liga Pokémon", lider: "Alto Mando", id: "teselia-elite4", enfriamiento: 24 }
        ]
    }
];

// --- DATOS DE SEMILLAS ---
const datosSemillas = [
    {
        nombre: "Huerto",
        dinero: "-",
        gimnasios: [
            { ciudad: "Seleccionar Baya", lider: "Plantar", id: "spicy-seeds-plant", tipo: "seed-plant", duracion: 5, prefijoTemporizador: "Riego en:", etiquetaListo: "Regar", siguienteId: "spicy-seeds-water" },
            { ciudad: "Riego de Semillas", lider: "Regar", id: "spicy-seeds-water", tipo: "seed-water", idAnterior: "spicy-seeds-plant", horasEspera: 5, duracion: 16, etiquetaListo: "Regar", siguienteId: "spicy-seeds-harvest", imagen: "bayas/regadera.png" },
            { ciudad: "Recogida de Semillas", lider: "Recoger", id: "spicy-seeds-harvest", tipo: "seed-harvest", idAnterior: "spicy-seeds-water", idRaiz: "spicy-seeds-plant", horasEspera: 16, imagen: "bayas/herramienta_extraccion.png" }
        ]
    }
];

// --- DATOS DE ENCUENTROS ---
const datosEncuentros = [
    {
        nombre: "Mes Actual",
        dinero: "-",
        gimnasios: [] // Se actualizará dinámicamente
    }
];

// --- DATOS DE BAYAS ---
const datosBayas = [
    { nombre: "Baya Acardo", uso: "Al estar equipada, baja a la mitad el daño de un ataque super efectivo de tipo tierra.", combinacion: "Sem. Muy picante x1 + Sem. Muy Dulce x1", tiempoCosecha: "44 horas", tiempoRiego: "5 horas", sabor: "Dulce", color: "Rosa" },
    { nombre: "Baya Alcho", uso: "Al estar equipada, baja a la mitad el daño de un ataque super efectivo de tipo roca.", combinacion: "Sem. Muy picante x1 + Sem. Muy seca x1", tiempoCosecha: "44 horas", tiempoRiego: "5 horas", sabor: "Seco", color: "Azul" },
    { nombre: "Baya Algama", uso: "Baja 10 EVs (Puntos de Esfuerzo) de Ataque.", combinacion: "Sem. Muy seca x1 + Sem. Ácida x1", tiempoCosecha: "44 horas", tiempoRiego: "5 horas", sabor: "Seco", color: "Azul" },
    { nombre: "Baya Andano", uso: "Solo sirven para hacer PokeCubos", combinacion: "Sem. Picante x1 + Sem. Muy ácida x1", tiempoCosecha: "44 horas", tiempoRiego: "5 horas", sabor: "Ácido", color: "Amarillo" },
    { nombre: "Baya Ango", uso: "Sirve para subir la felicidad un 9,8% a los pokemon que no les disguste el sabor Dulce.\nSirve para restar la felicidad un 9,8% a los pokemon que les disguste el sabor Dulce\nSe puede equipar en un pokemon para que restaure un 50% de los PS automáticamente al llegar al 25% de los PS maximos. (Advertencia: Confundirá a los Pokemon que no les guste el sabor Dulce! [Vease: Capitulo 3])", combinacion: "Sem. Muy dulce x2", tiempoCosecha: "20 horas", tiempoRiego: "5 horas", sabor: "Dulce", color: "Rosa" },
    { nombre: "Baya Anjiro", uso: "Al estar equipada, baja a la mitad el daño de un ataque super efectivo de tipo dragón.", combinacion: "Sem. Muy dulce x1 + Sem. Muy amarga x1", tiempoCosecha: "44 horas", tiempoRiego: "5 horas", sabor: "Amargo", color: "Verde" },
    { nombre: "Baya Aostan", uso: "Solo sirven para hacer PokeCubos", combinacion: "Sem. Muy dulce x1 + Sem. Amarga x1", tiempoCosecha: "20 horas", tiempoRiego: "5 horas", sabor: "Dulce", color: "Rosa" },
    { nombre: "Baya Arabol", uso: "Al estar equipada, sube 2 niveles una carácterística al azar al llegar al 25% de los PS máximos.", combinacion: "Sem. Muy seca x1 + Sem. Muy dulce x1. + Sem. Muy amarga x1", tiempoCosecha: "67 horas", tiempoRiego: "5 horas", sabor: "-", color: "- (Creará un PokeCubo gris)" },
    { nombre: "Baya Aranja", uso: "Al estar equipada, recuperará 10 PS automáticamente al llegar al 25% de los PS.\nSe puede usar en un Pokemon para que recupere 10 PS dentro o fuera de combate.", combinacion: "Sem. Seca x1 + Sem. Amarga x1 + Sem. Ácida x1", tiempoCosecha: "16 horas", tiempoRiego: "5 horas", sabor: "-", color: "- (Crea un PokeCubo gris)" },
    { nombre: "Baya Aricoc", uso: "Al estar equipada, sube automáticamente 2 niveles la Defensa Especial al llegar al 25% de los PS", combinacion: "Sem. Picante x1 + Sem. Muy seca x1 + Sem. Muy ácida x1", tiempoCosecha: "67 horas", tiempoRiego: "5 horas", sabor: "-", color: "- (Creará un PokeCubo gris)" },
    { nombre: "Baya Aslac", uso: "Al estar equipada, sube automáticamente 2 niveles la Velocidad al llegar al 25% de los PS", combinacion: "Sem. Muy dulce x1 + Sem. Amarga x1 + Sem. Muy ácida x1", tiempoCosecha: "67 horas", tiempoRiego: "5 horas", sabor: "-", color: "- (Creará un PokeCubo gris)" },
    { nombre: "Baya Atania", uso: "Al estar equipada, despierta automáticamente al pokemon apenas se duerma.\nSe puede usar sobre un Pokemon para que despierte dentro o fuera de combate", combinacion: "Sem. Seca x3\nSem. Muy seca x1 + Sem. Seca x1", tiempoCosecha: "16 horas", tiempoRiego: "5 horas", sabor: "Seco", color: "Azul" },
    { nombre: "Baya Baribá", uso: "Al estar equipada, baja a la mitad el daño de un ataque super efectivo de tipo acero.", combinacion: "Sem. Muy picante x1 + Sem. Muy seca x1", tiempoCosecha: "44 horas", tiempoRiego: "5 horas", sabor: "Picante", color: "Rojo" },
    { nombre: "Baya Caoca", uso: "Al estar equipada, baja a la mitad el daño de un ataque super efectivo de tipo fuego.", combinacion: "Sem. Muy picante x1 + Sem. Muy dulce x1", tiempoCosecha: "44 horas", tiempoRiego: "5 horas", sabor: "Picante", color: "Rojo" },
    { nombre: "Baya Caquic", uso: "Al estar equipada, cura automáticamente la confusión al pokemon apenas se lo confunda.\nSe puede usar sobre un Pokemon para que se cure de la confusión dentro de combate", combinacion: "Sem. Picante x1 + Sem. Seca x1 + Sem. Dulce x1", tiempoCosecha: "16 horas", tiempoRiego: "5 horas", sabor: "-", color: "- (Creará un PokeCubo gris)" },
    { nombre: "Baya Chilan", uso: "Al estar equipada, baja a la mitad el daño de un ataque de tipo normal.", combinacion: "Sem. Muy seca x1 + Sem. Muy dulce x1", tiempoCosecha: "44 horas", tiempoRiego: "5 horas", sabor: "Seco", color: "Azul" },
    { nombre: "Baya Chiri", uso: "Al estar equipada, sube automáticamente a +8 la prioridad al efectuar un movimiento teniendo 25% o menos de los PS máximos, pero se va al acabar el turno.", combinacion: "Sem. Muy dulce x1 + Sem. Muy amarga x1", tiempoCosecha: "44 horas", tiempoRiego: "5 horas", sabor: "Dulce", color: "Rosa" },
    { nombre: "Baya Dillo", uso: "Al estar equipada, baja a la mitad el daño de un ataque super efectivo de tipo siniestro.", combinacion: "Sem. Muy picante x1 + Sem. Muy ácida x1", tiempoCosecha: "44 horas", tiempoRiego: "5 horas", sabor: "Ácido", color: "Amarillo" },
    { nombre: "Baya Drasi", uso: "Al estar equipada, baja a la mitad el daño de un ataque super efectivo de tipo fantasma.", combinacion: "Sem. Muy seca x1 + Sem. Muy dulce x1", tiempoCosecha: "44 horas", tiempoRiego: "5 horas", sabor: "Dulce", color: "Rosa" },
    { nombre: "Baya Enigma", uso: "Al estar equipada, restaura un 25% de los PS al recibir un ataque muy efectivo.", combinacion: "Sem. Muy picante x1 + Sem. Muy seca x1", tiempoCosecha: "44 horas", tiempoRiego: "5 horas", sabor: "Picante", color: "Rojo" },
    { nombre: "Baya Frambu", uso: "Solo sirve para hacer Pokecubos.", combinacion: "Sem. Picante x1 + Sem. Muy seca x1", tiempoCosecha: "16 horas", tiempoRiego: "5 horas", sabor: "Seco", color: "Azul" },
    { nombre: "Baya Gonlan", uso: "Al estar equipada, sube automáticamente 2 niveles la Defensa al llegar al 25% de los PS", combinacion: "Sem. Muy seca x1 + Sem. Seca x1 + Sem. Muy amarga x1", tiempoCosecha: "67 horas", tiempoRiego: "5 horas", sabor: "-", color: "- (Creará un PokeCubo gris)" },
    { nombre: "Baya Grana", uso: "Baja 10 EVs (Puntos de Esfuerzo) de PS.", combinacion: "Sem. Muy picante x1 + Sem. Amarga", tiempoCosecha: "44 horas", tiempoRiego: "5 horas", sabor: "Picante", color: "Rojo" },
    { nombre: "Baya Gualot", uso: "Al estar equipada, baja a la mitad el daño de un ataque super efectivo de tipo Eléctrico.", combinacion: "Sem. Muy dulce x1 + Sem. Muy amarga x1", tiempoCosecha: "44 horas", tiempoRiego: "5 horas", sabor: "Dulce", color: "Rosa" },
    { nombre: "Baya Guaya", uso: "Sirve para subir la felicidad un 9,8% a los pokemon que no les disguste el sabor Amargo.\nSirve para restar la felicidad un 9,8% a los pokemon que les disguste el sabor Amargo.\nSe puede equipar en un pokemon para que restaure un 50% de los PS automáticamente al llegar al 25% de los PS maximos. (Advertencia: Confundirá a los Pokemon que no les guste el sabor Amargo! [Vease: Capitulo 3])", combinacion: "Sem. Muy amarga x2", tiempoCosecha: "20 horas", tiempoRiego: "5 horas", sabor: "Amargo", color: "Verde" },
    { nombre: "Baya Higog", uso: "Sirve para subir la felicidad un 9,8% a los pokemon que no les disguste el sabor Picante.\nSirve para restar la felicidad un 9,8% a los pokemon que les disguste el sabor Picante.\nSe puede equipar en un pokemon para que restaure un 50% de los PS automáticamente al llegar al 25% de los PS maximos. (Advertencia: Confundirá a los Pokemon que no les guste el sabor Picante! [Vease: Capitulo 3])", combinacion: "Sem. Muy picante x2", tiempoCosecha: "20 horas", tiempoRiego: "5 horas", sabor: "Picante", color: "Rojo" },
    { nombre: "Baya Ispero", uso: "Baja 10 EVs (Puntos de Esfuerzo) de Defensa.", combinacion: "Sem. Picante x1 + Sem. Muy dulce x1", tiempoCosecha: "44 horas", tiempoRiego: "5 horas", sabor: "Dulce", color: "Rosa" },
    { nombre: "Baya Jaboca", uso: "Al estar equipada, pega un 12,5% de los PS máximos al agresor que le pegue al portador de la baya un ataque físico (No necesariamente de contacto)", combinacion: "Sem. Muy amarga x1 + Sem. Muy ácida x1", tiempoCosecha: "44 horas", tiempoRiego: "5 horas", sabor: "Amargo", color: "Verde" },
    { nombre: "Baya Kebia", uso: "Al estar equipada, baja a la mitad el daño de un ataque super efectivo de tipo Veneno.", combinacion: "Sem. Muy seca x1 + Sem. Muy ácida x1", tiempoCosecha: "44 horas", tiempoRiego: "5 horas", sabor: "Seco", color: "Azul" },
    { nombre: "Baya Kouba", uso: "Al estar equipada, baja a la mitad el daño de un ataque super efectivo de tipo Volador.", combinacion: "Sem. Muy seca x1 + Sem. Muy amarga x1", tiempoCosecha: "44 horas", tiempoRiego: "5 horas", sabor: "Amargo", color: "Verde" },
    { nombre: "Baya Lagro", uso: "Al estar equipada, sube automáticamente 2 niveles la Precisión al llegar al 25% de los PS", combinacion: "Sem. Muy seca x1 + Sem. Muy dulce x1", tiempoCosecha: "44 horas", tiempoRiego: "5 horas", sabor: "Seco", color: "Azul" },
    { nombre: "Baya Latano", uso: "Solo sirve para hacer Pokecubos.", combinacion: "Sem. Amarga x1 + Sem. Muy Dulce x1", tiempoCosecha: "16 horas", tiempoRiego: "5 horas", sabor: "Dulce", color: "Rosa" },
    { nombre: "Baya Lichi", uso: "Al estar equipada, sube automáticamente 2 niveles el Ataque al llegar al 25% de los PS", combinacion: "Sem. Muy picante x1 + Sem. Seca x1 + Sem. Muy dulce x1", tiempoCosecha: "67 horas", tiempoRiego: "5 horas", sabor: "-", color: "- (Creará un PokeCubo gris)" },
    { nombre: "Baya Magua", uso: "Al estar equipada, pega un 12,5% de los PS máximos al agresor que le pegue al portador de la baya un ataque especial.", combinacion: "Sem. Muy picante x1 + Sem. Muy ácida x1", tiempoCosecha: "44 horas", tiempoRiego: "5 horas", sabor: "Ácido", color: "Amarillo" },
    { nombre: "Baya Mais", uso: "Solo sirven para hacer PokeCubos", combinacion: "Sem. Muy seca x1 + Sem. Dulce x1", tiempoCosecha: "20 horas", tiempoRiego: "5 horas", sabor: "Seco", color: "Azul" },
    { nombre: "Baya Meloc", uso: "Al estar equipada, cura automáticamente el envenenamiento al pokemon apenas se envenene.\nSe puede usar sobre un Pokemon para curar el envenenamiento dentro o fuera de combate", combinacion: "Sem. Muy dulce x1 + Sem. Dulce x1\nSem. Dulce x3", tiempoCosecha: "16 horas", tiempoRiego: "5 horas", sabor: "Dulce", color: "Rosa" },
    { nombre: "Baya Meluce", uso: "Baja 10 EVs (Puntos de Esfuerzo) de Ataque Especial.", combinacion: "Sem. Seca x1 + Sem. Muy amarga x1", tiempoCosecha: "44 horas", tiempoRiego: "5 horas", sabor: "Amargo", color: "Verde" },
    { nombre: "Baya Monli", uso: "Solo sirven para hacer PokeCubos", combinacion: "Sem. Picante x1 + Sem. Muy ácida x1", tiempoCosecha: "20 horas", tiempoRiego: "5 horas", sabor: "Ácido", color: "Amarillo" },
    { nombre: "Baya Oram", uso: "Solo sirve para hacer Pokecubos.", combinacion: "Sem. Seca x1 + Sem. Muy dulce x1", tiempoCosecha: "16 horas", tiempoRiego: "5 horas", sabor: "Dulce", color: "Rosa" },
    { nombre: "Baya Pabaya", uso: "Sirve para subir la felicidad un 9,8% a los pokemon que no les disguste el sabor Ácido.\nSirve para restar la felicidad un 9,8% a los pokemon que les disguste el sabor Ácido.\nSe puede equipar en un pokemon para que restaure un 50% de los PS automáticamente al llegar al 25% de los PS maximos. (Advertencia: Confundirá a los Pokemon que no les guste el sabor Ácido! [Vease: Capitulo 3])", combinacion: "Sem. Muy ácida x2", tiempoCosecha: "20 horas", tiempoRiego: "5 horas", sabor: "Ácido", color: "Amarillo" },
    { nombre: "Baya Pasio", uso: "Al estar equipada, baja a la mitad el daño de un ataque super efectivo de tipo Agua.", combinacion: "Sem. Muy seca x1 + Sem. Muy amarga x1", tiempoCosecha: "44 horas", tiempoRiego: "5 horas", sabor: "Seco", color: "Azul" },
    { nombre: "Baya Payapa", uso: "Al estar equipada, baja a la mitad el daño de un ataque super efectivo de tipo Psiquico.", combinacion: "Sem. Muy dulce x1 + Sem. Muy ácida x1", tiempoCosecha: "44 horas", tiempoRiego: "5 horas", sabor: "Ácido", color: "Amarillo" },
    { nombre: "Baya Peragu", uso: "Solo sirve para hacer Pokecubos.", combinacion: "Sem. Amarga x1 + Sem. Muy ácida x1", tiempoCosecha: "16 horas", tiempoRiego: "5 horas", sabor: "Ácido", color: "Amarillo" },
    { nombre: "Baya Perasi", uso: "Al estar equipada, descongela automáticamente al pokemon apenas se congele.\nSe puede usar sobre un Pokemon para que se descongele dentro o fuera de combate", combinacion: "Sem. Muy ácida x1 + Sem. Ácida x1\nSem. Ácida x3", tiempoCosecha: "16 horas", tiempoRiego: "5 horas", sabor: "Ácido", color: "Amarillo" },
    { nombre: "Baya Pinia", uso: "Solo sirve para hacer Pokecubos.", combinacion: "Sem. Picante x1 + Sem. Muy ácida x1", tiempoCosecha: "16 horas", tiempoRiego: "5 horas", sabor: "Ácido", color: "Amarillo" },
    { nombre: "Baya Plama", uso: "Solo sirven para hacer PokeCubos", combinacion: "Sem. Muy seca x1 + Sem. Dulce x1", tiempoCosecha: "44 horas", tiempoRiego: "5 horas", sabor: "Seco", color: "Azul" },
    { nombre: "Baya Pomaro", uso: "Al estar equipada, baja a la mitad el daño de un ataque super efectivo de tipo Lucha.", combinacion: "Sem. Muy picante x1 + Sem. Muy amarga x1", tiempoCosecha: "44 horas", tiempoRiego: "5 horas", sabor: "Picante", color: "Rojo" },
    { nombre: "Baya Rautan", uso: "Solo sirven para hacer PokeCubos", combinacion: "Sem. Muy amarga x1 + Sem. Ácida x1", tiempoCosecha: "20 horas", tiempoRiego: "5 horas", sabor: "Amargo", color: "Verde" },
    { nombre: "Baya Rimoya", uso: "Al estar equipada, baja a la mitad el daño de un ataque super efectivo de tipo Hielo.", combinacion: "Sem. Muy seca x1 + Sem. Muy ácida x1", tiempoCosecha: "44 horas", tiempoRiego: "5 horas", sabor: "Ácido", color: "Amarillo" },
    { nombre: "Baya Rudion", uso: "Solo sirven para hacer PokeCubos", combinacion: "Sem. Muy amarga x1 + Sem. Ácida x1", tiempoCosecha: "44 horas", tiempoRiego: "5 horas", sabor: "Amargo", color: "Verde" },
    { nombre: "Baya Safre", uso: "Al estar equipada, cura de las quemaduras automáticamente al pokemon apenas se queme.\nSe puede usar sobre un Pokemon para curar las quemaduras dentro o fuera de combate", combinacion: "Sem. Muy amarga x1 + Sem. Amarga x1\nSem. Amarga x3", tiempoCosecha: "16 horas", tiempoRiego: "5 horas", sabor: "Amargo", color: "Verde" },
    { nombre: "Baya Sambia", uso: "Solo sirven para hacer PokeCubos", combinacion: "Sem. Muy dulce x1 + Sem. Amarga x1", tiempoCosecha: "44 horas", tiempoRiego: "5 horas", sabor: "Dulce", color: "Rosa" },
    { nombre: "Baya Tamar", uso: "Al estar equipada, baja a la mitad el daño de un ataque super efectivo de tipo Planta.", combinacion: "Sem. Muy picante x1 + Sem. Muy amarga x1", tiempoCosecha: "44 horas", tiempoRiego: "5 horas", sabor: "Amargo", color: "Verde" },
    { nombre: "Baya Tamate", uso: "Baja 10 EVs (Puntos de Esfuerzo) de Velocidad.", combinacion: "Sem. Muy picante x1 + Sem. Seca x1", tiempoCosecha: "44 horas", tiempoRiego: "5 horas", sabor: "Picante", color: "Rojo" },
    { nombre: "Baya Uvav", uso: "Baja 10 EVs (Puntos de Esfuerzo) de Defensa Especial.", combinacion: "Sem. Dulce x1 + Sem. Muy ácida x1", tiempoCosecha: "44 horas", tiempoRiego: "5 horas", sabor: "Ácido", color: "Amarillo" },
    { nombre: "Baya Wikano", uso: "Solo sirven para hacer PokeCubos", combinacion: "Sem. Muy picante x1 + Sem. Seca x1", tiempoCosecha: "44 horas", tiempoRiego: "5 horas", sabor: "Picante", color: "Rojo" },
    { nombre: "Baya Wiki", uso: "Sirve para subir la felicidad un 9,8% a los pokemon que no les disguste el sabor Seco.\nSirve para restar la felicidad un 9,8% a los pokemon que les disguste el sabor Seco.\nSe puede equipar en un pokemon para que restaure un 50% de los PS automáticamente al llegar al 25% de los PS maximos. (Advertencia: Confundirá a los Pokemon que no les guste el sabor Seco! [Vease: Capitulo 3])", combinacion: "Sem. Muy seca x2", tiempoCosecha: "20 horas", tiempoRiego: "5 horas", sabor: "Seco", color: "Azul" },
    { nombre: "Baya Yapati", uso: "Al estar equipada, sube automáticamente 2 niveles el Ataque Especial al llegar al 25% de los PS", combinacion: "Sem. Muy picante x1 + Sem. Muy amarga x1 + Sem. Ácida x1", tiempoCosecha: "67 horas", tiempoRiego: "5 horas", sabor: "-", color: "- (Creará un PokeCubo gris)" },
    { nombre: "Baya Yecana", uso: "Al estar equipada, baja a la mitad el daño de un ataque super efectivo de tipo Bicho.", combinacion: "Sem. Muy picante x1 + Sem. Muy ácida x1", tiempoCosecha: "44 horas", tiempoRiego: "5 horas", sabor: "Picante", color: "Rojo" },
    { nombre: "Baya Zanama", uso: "Al estar equipada, si los PP de un movimiento llegan a 0, restaurará 10 PP de dicho movimiento (o los máximos, en caso de no llegar a 10)\nSe puede usar sobre un movimiento de un Pokemon para restaurar 10 PP de dicho movimiento (O hasta el límite, en caso de no haberse consumido mas de 10 PP o tener un límite inferior a 10PP) dentro o fuera de combate.", combinacion: "Sem. Muy picante x1 + Sem. Dulce x1 + Sem. Amarga x1", tiempoCosecha: "20 horas", tiempoRiego: "5 horas", sabor: "-", color: "- (Creará un PokeCubo gris)" },
    { nombre: "Baya Zidra", uso: "Al estar equipada, restaura 25% de los PS máximos al llegar a los 50% PS o menos de vida.", combinacion: "Sem. Muy dulce x1 + Sem. Muy amarga x1 + Sem. Muy ácida x1", tiempoCosecha: "44 horas", tiempoRiego: "5 horas", sabor: "-", color: "- (Creará un PokeCubo gris)" },
    { nombre: "Baya Ziuela", uso: "Al estar equipada, cura automáticamente de cualquier problema de estado (Quemadura, Parálisis, Envenenamiento normal o grave, Sueño o Congelamiento) al pokemon apenas se le aplique uno.\nSe puede usar sobre un Pokemon para curar cualquier problema de estado (Quemadura, Parálisis, Envenenamiento normal o grave, Sueño o Congelamiento) dentro o fuera de combate", combinacion: "Sem. Muy picante x1 + Sem. Muy seca x1 + Sem. Muy dulce x1", tiempoCosecha: "44 horas", tiempoRiego: "5 horas", sabor: "-", color: "- (Creará un PokeCubo gris)" },
    { nombre: "Baya Zonlan", uso: "Al estar equipada, sube automáticamente dos niveles la probabilidad de golpe crítico por un turno, al bajar su vida a 25% o menos de los PS máximos, pero vuelve a la normalidad al acabar el turno.", combinacion: "Sem. Muy picante x1 + Sem. Muy dulce x1 + Sem. Muy ácida x1", tiempoCosecha: "67 horas", tiempoRiego: "2 horas", sabor: "-", color: "- (Creará un PokeCubo gris)" },
    { nombre: "Baya Zreza", uso: "Al estar equipada, cura de la parálisis automáticamente al pokemon apenas se paralice.\nSe puede usar sobre un Pokemon para curar la parálisis dentro o fuera de combate", combinacion: "Sem. Muy picante x1 + Sem. Picante x1\nSem. Picante x3", tiempoCosecha: "16 horas", tiempoRiego: "5 horas", sabor: "Picante", color: "Rojo" }
];

// --- LÓGICA DE LA APLICACIÓN ---

// --- CONFIGURACIÓN LOCAL (SIN SERVIDOR) ---

const CLAVE_ALMACENAMIENTO = 'pokemmo_gym_progress';
let progresoUsuario = {};
let contextoReinicio = null; // Variable para saber qué sección reiniciar
let estadoRegiones = {}; // Estado de colapso de las regiones

// Cargar progreso desde LocalStorage
async function cargarProgreso() {
    progresoUsuario = {};
    const almacenado = localStorage.getItem(CLAVE_ALMACENAMIENTO);
    if (almacenado) progresoUsuario = JSON.parse(almacenado);
}

// Guardar progreso en LocalStorage
async function guardarProgreso() {
    localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(progresoUsuario));
}

// Generar ID único para cada gimnasio
function obtenerIdGimnasio(nombreRegion, nombreLider) {
    return `${nombreRegion}-${nombreLider}`.replace(/\s+/g, '-').toLowerCase();
}

// Helper para extraer horas de los strings de bayas (ej: "44 horas" -> 44)
function analizarHorasBaya(cadenaTiempo) {
    const match = cadenaTiempo && cadenaTiempo.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
}

// Función para calcular qué legendario errante toca según el mes (1-12)
function obtenerLegendariosErrantes(mes) {
    // Rotación Kanto: Zapdos -> Moltres -> Articuno
    const rotacionKanto = ["Zapdos", "Moltres", "Articuno"];
    
    // Rotación Johto: Entei -> Suicune -> Raikou
    const rotacionJohto = ["Entei", "Suicune", "Raikou"];

    // Calculamos el índice (0, 1 o 2) basado en el mes
    // (Mes - 1) % 3 asegura que Enero (1) sea índice 0
    const indice = (mes - 1) % 3;

    return {
        kanto: rotacionKanto[indice],
        johto: rotacionJohto[indice]
    };
}

// Función para actualizar los datos de encuentros con los legendarios del mes actual
function actualizarDatosEncuentros() {
    const fecha = new Date();
    const mesActual = fecha.getMonth() + 1; // Obtener mes actual (1-12)
    const nombreMes = fecha.toLocaleString('es-ES', { month: 'long' });
    const mesCapitalizado = nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1);
    
    const legendarios = obtenerLegendariosErrantes(mesActual);

    // Actualizar la tarjeta del mes (Índice 0 en datosEncuentros)
    datosEncuentros[0].nombre = mesCapitalizado;
    datosEncuentros[0].gimnasios = [
        {
            ciudad: "Kanto",
            lider: legendarios.kanto,
            id: `${legendarios.kanto.toLowerCase()}-kanto`,
            tipo: "encounter"
        },
        {
            ciudad: "Johto",
            lider: legendarios.johto,
            id: `${legendarios.johto.toLowerCase()}-johto`,
            tipo: "encounter"
        }
    ];
}

// Alternar estado del gimnasio
function alternarGimnasio(nombreRegion, datosGimnasio, elemento) {
    const idUnico = datosGimnasio.id || datosGimnasio.lider;
    const id = obtenerIdGimnasio(nombreRegion, idUnico);
    
    if (datosGimnasio.tipo === 'seed-plant') {
        // Si ya está plantado, no permitir desmarcar (solo botón reiniciar)
        // Si no está plantado, se usa el botón inline
        return;
    } else if (datosGimnasio.tipo === 'seed-water') {
        // Si ya está regado, no permitir desmarcar
        // CAMBIO: Permitir regar múltiples veces (actualizar timestamp) si está listo
        // Solo si el elemento tiene la clase 'ready' (manejado visualmente, pero aquí forzamos la lógica)
        // Para simplificar, siempre actualizamos el timestamp al regar, reiniciando el contador
        progresoUsuario[id] = { timestamp: new Date().toISOString() };
    } else if (datosGimnasio.tipo === 'seed-harvest') {
        // Al recoger, reiniciamos todo el ciclo del huerto
        const idRaiz = obtenerIdGimnasio(nombreRegion, datosGimnasio.idRaiz); // ID de Plantar
        const idRiego = obtenerIdGimnasio(nombreRegion, datosGimnasio.idAnterior); // ID de Regar
        
        // Borramos todos los progresos relacionados
        if (progresoUsuario[id]) delete progresoUsuario[id];
        if (progresoUsuario[idRaiz]) delete progresoUsuario[idRaiz];
        if (progresoUsuario[idRiego]) delete progresoUsuario[idRiego];
        
        // Guardamos y renderizamos inmediatamente para mostrar el estado inicial
        guardarProgreso();
        renderizarAplicacion();
        return;
    } else {
        // Lógica normal de gimnasios
        if (progresoUsuario[id]) {
            delete progresoUsuario[id];
        } else {
            progresoUsuario[id] = {
                timestamp: new Date().toISOString()
            };
        }
    }
    
    guardarProgreso();
    renderizarAplicacion(); // Re-renderizamos para mostrar la fecha actualizada
}

// Función para reproducir sonidos de notificación
function reproducirSonido(tipo) {
    let audioPath = '';
    // Se asume que los archivos de audio están en una carpeta 'audio' al mismo nivel que 'img'
    if (tipo === 'water') {
        audioPath = '../audio/water.mp3';
    } else if (tipo === 'harvest') {
        audioPath = '../audio/harvest.mp3';
    }

    if (audioPath) {
        const audio = new Audio(audioPath);
        audio.volume = 0.5;
        audio.play().catch(e => console.log("Error reproduciendo audio (verifica que el archivo exista en la carpeta audio):", e));
    }
}

// Actualizar temporizadores
function actualizarTemporizadores() {
    const temporizadores = document.querySelectorAll('.gym-timer[data-timestamp]');
    const ahora = new Date().getTime();
    const idsParaReiniciar = [];

    temporizadores.forEach(temporizador => {
        const timestamp = temporizador.getAttribute('data-timestamp');
        const enfriamiento = parseFloat(temporizador.getAttribute('data-cooldown') || 18);
        if (!timestamp) return;

        const fecha = new Date(timestamp);
        const tiempoReinicio = fecha.getTime() + (enfriamiento * 60 * 60 * 1000);
        const tiempoRestante = tiempoReinicio - ahora;

        if (tiempoRestante > 0) {
            const horas = Math.floor(tiempoRestante / (1000 * 60 * 60)).toString().padStart(2, '0');
            const minutos = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
            const segundos = Math.floor((tiempoRestante % (1000 * 60)) / 1000).toString().padStart(2, '0');
            const prefijo = temporizador.getAttribute('data-prefix') || '⏳';
            temporizador.innerHTML = `${prefijo} ${horas}h ${minutos}m ${segundos}s`;
            temporizador.classList.remove('ready');
        } else {
            // Auto-reset para Gimnasios y Alto Mando
            if (temporizador.getAttribute('data-auto-reset') === 'true') {
                idsParaReiniciar.push(temporizador.getAttribute('data-gym-id'));
            } else {
                // Solo actuar si el temporizador acaba de terminar (para semillas u otros sin auto-reset)
                if (!temporizador.classList.contains('ready')) {
                    const etiquetaListo = temporizador.getAttribute('data-ready-label') || 'Disponible';
                    temporizador.innerHTML = `✅ ${etiquetaListo}`;
                    temporizador.classList.add('ready');
                    
                    // Habilitar el siguiente paso visualmente si existe
                    const idGimnasioActual = temporizador.getAttribute('data-gym-id');
                    if (idGimnasioActual) {
                        const itemSiguienteEtapa = document.querySelector(`.gym-item[data-prev-id="${idGimnasioActual}"]`);
                        if (itemSiguienteEtapa) {
                            itemSiguienteEtapa.classList.remove('disabled');
                        }

                        // Reproducir sonido de aviso
                        if (idGimnasioActual.includes('spicy-seeds-water')) {
                            reproducirSonido('water');
                        } else if (idGimnasioActual.includes('spicy-seeds-harvest')) {
                            reproducirSonido('harvest');
                        }
                    }
                }
            }
        }
    });

    // Procesar resets automáticos
    if (idsParaReiniciar.length > 0) {
        let cambiado = false;
        idsParaReiniciar.forEach(id => {
            if (progresoUsuario[id]) {
                delete progresoUsuario[id];
                cambiado = true;
            }
        });
        if (cambiado) {
            guardarProgreso();
            renderizarAplicacion();
        }
    }
}

// Helper para formatear fecha
function formatearFecha(fecha) {
    return fecha.toLocaleString('es-ES', {
        timeZone: 'Europe/Madrid',
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });
}

// Helper para crear el elemento HTML de un gimnasio/entrenador
function crearElementoGimnasio(nombreRegion, gimnasio) {
    const idUnico = gimnasio.id || gimnasio.lider;
    const idGimnasio = obtenerIdGimnasio(nombreRegion, idUnico);
    const datosProgreso = progresoUsuario[idGimnasio];
    const estaCompletado = !!datosProgreso;
    
    let enfriamiento = gimnasio.duracion || gimnasio.enfriamiento || 18;
    let timestampAUsar = datosProgreso ? datosProgreso.timestamp : null;

    // Lógica dinámica para Semillas
    if (gimnasio.tipo === 'seed-water') {
        // El tiempo de riego depende de la baya plantada
        const idPlantado = obtenerIdGimnasio(nombreRegion, gimnasio.idAnterior);
        const progresoPlantado = progresoUsuario[idPlantado];
        if (progresoPlantado && progresoPlantado.intervaloRiego) {
            enfriamiento = progresoPlantado.intervaloRiego;
            // Si nunca se ha regado, usamos la fecha de plantado como base
            if (!timestampAUsar) {
                timestampAUsar = progresoPlantado.timestamp;
            }
        }
    } else if (gimnasio.tipo === 'seed-harvest') {
        // El tiempo de cosecha depende de la baya plantada
        const idPlantado = obtenerIdGimnasio(nombreRegion, gimnasio.idRaiz);
        const progresoPlantado = progresoUsuario[idPlantado];
        if (progresoPlantado && progresoPlantado.intervaloCosecha) {
            enfriamiento = progresoPlantado.intervaloCosecha;
            // La cosecha siempre cuenta desde que se plantó
            timestampAUsar = progresoPlantado.timestamp;
        }
    } else if (estaCompletado && datosProgreso.duracionPersonalizada) {
        // Fallback para gimnasios normales con duración custom
        enfriamiento = datosProgreso.duracionPersonalizada;
    }
    let prefijo = gimnasio.prefijoTemporizador || '⏳';
    let etiquetaListo = gimnasio.etiquetaListo || 'Disponible';
    let estaDeshabilitado = false;

    // Lógica de dependencias para semillas (Deshabilitar si no es el momento)
    if (gimnasio.idAnterior) {
        const idGimnasioAnterior = obtenerIdGimnasio(nombreRegion, gimnasio.idAnterior);
        const progresoAnterior = progresoUsuario[idGimnasioAnterior];
        
        if (!progresoAnterior) {
            estaDeshabilitado = true;
        } else if (gimnasio.horasEspera) {
            // Verificar si ha pasado el tiempo necesario desde el paso anterior
            const fechaAnterior = new Date(progresoAnterior.timestamp);
            const ahora = new Date();
            // Usar duración personalizada si existe en el paso anterior, sino la por defecto
            let esperaRequerida = progresoAnterior.duracionPersonalizada || gimnasio.horasEspera;
            
            // Si es cosecha, no esperamos al "waitHours" del riego, sino que dependemos del tiempo total
            // Pero visualmente, si ya plantamos, queremos ver el timer de cosecha activo.
            if (gimnasio.tipo === 'seed-harvest') esperaRequerida = 0; 

            const horasTranscurridas = (ahora - fechaAnterior) / (1000 * 60 * 60);
            if (horasTranscurridas < esperaRequerida) {
                estaDeshabilitado = true;
            }
        }
    }

    const elementoLista = document.createElement('li');
    
    // Determinar si la fila debe tener cursor de mano (solo si es clicable a nivel de fila)
    let esFilaClicable = true;
    if (gimnasio.tipo === 'seed-plant') {
        esFilaClicable = false; // Plantar usa controles inline o está bloqueado
    } else if ((gimnasio.tipo === 'seed-water' || gimnasio.tipo === 'seed-harvest') && estaCompletado) {
        esFilaClicable = false; // Pasos completados no se pueden desmarcar con clic
    }
    elementoLista.className = `gym-item ${estaCompletado ? 'completed' : ''} ${estaDeshabilitado ? 'disabled' : ''} ${!esFilaClicable ? 'no-pointer' : ''}`;
    
    // Evento Click
    elementoLista.onclick = (e) => {
        alternarGimnasio(nombreRegion, gimnasio, elementoLista);
    };
    
    // Atributos para encadenamiento
    const idCompleto = obtenerIdGimnasio(nombreRegion, idUnico);
    elementoLista.setAttribute('data-gym-id', idCompleto);
    if (gimnasio.idAnterior) {
        const idAnteriorCompleto = obtenerIdGimnasio(nombreRegion, gimnasio.idAnterior);
        elementoLista.setAttribute('data-prev-id', idAnteriorCompleto);
    }

    // Formatear fecha si existe (Hora Española)
    let htmlFecha = '';
    // Para semillas, mostramos timer incluso si no está "completado" (ej. esperando riego)
    // siempre que tengamos un timestamp base válido (definido arriba)
    if ((estaCompletado && datosProgreso.timestamp) || (timestampAUsar && (gimnasio.tipo === 'seed-water' || gimnasio.tipo === 'seed-harvest'))) {
        const fecha = new Date(timestampAUsar);
        
        // Calcular hora final
        const horaFin = new Date(fecha.getTime() + (enfriamiento * 60 * 60 * 1000));
        
        // Determinar si debe reiniciarse automáticamente (Gimnasios y Alto Mando no tienen 'type')
        const debeReiniciarseAuto = !gimnasio.tipo;

        if (gimnasio.tipo === 'seed-plant') {
            // CAMBIO: Quitar timer y fecha del apartado donde sale el nombre de la baya
            htmlFecha = '';
        } else if (gimnasio.tipo === 'seed-water' || gimnasio.tipo === 'seed-harvest') {
            // CAMBIO: Mostrar fecha de fin del timer en lugar de fecha de inicio
            const cadenaHoraFin = formatearFecha(horaFin);

            htmlFecha = `
                <div class="gym-status-right">
                    <p class="gym-timer" data-timestamp="${timestampAUsar}" data-cooldown="${enfriamiento}" data-gym-id="${idGimnasio}"
                       data-prefix="${prefijo}" data-ready-label="${etiquetaListo}" ${debeReiniciarseAuto ? 'data-auto-reset="true"' : ''}></p>
                    <p class="gym-end-time large-date">${cadenaHoraFin}</p>
                </div>`;
        } else {
            // Formato estándar para gimnasios
            const cadenaHoraFin = formatearFecha(horaFin);

            htmlFecha = `
                <div class="gym-status-right">
                    <p class="gym-timer" data-timestamp="${timestampAUsar}" data-cooldown="${enfriamiento}" data-gym-id="${idGimnasio}"
                       data-prefix="${prefijo}" data-ready-label="${etiquetaListo}" ${debeReiniciarseAuto ? 'data-auto-reset="true"' : ''}></p>
                    <p class="gym-end-time large-date">${cadenaHoraFin}</p>
                </div>`;
        }
    }

    // Determinar qué mostrar en la info (Líder o Cantidad de semillas)
    let textoInfo = `<p>Líder: ${gimnasio.lider}</p>`;
    if (gimnasio.tipo === 'seed-plant') {
        if (estaCompletado) {
            // If planted, show the berry name and count
            const nombreBaya = datosProgreso.nombreBaya || "Semilla";
            textoInfo = `
                <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
                    <p class="planted-berry-title" style="margin-bottom: 0;">${nombreBaya}</p>
                    <button class="btn-reset" onclick="window.mostrarModalReinicio()" style="font-size: 0.85rem; padding: 6px 12px; margin-left: 10px; text-transform: none; line-height: 1;">Reiniciar Huerto</button>
                </div>
                <p>Semillas: ${datosProgreso.cantidad}</p>`;
        } else {
            // If not planted, show dropdown
            // Sort berries alphabetically
            const bayasOrdenadas = [...datosBayas].sort((a, b) => a.nombre.localeCompare(b.nombre));
            let opciones = `<option value="">-- Elegir Baya --</option>`;
            bayasOrdenadas.forEach(b => {
                opciones += `<option value="${b.nombre}">${b.nombre}</option>`;
            });
            
            textoInfo = `
                <div class="seed-plant-controls" onclick="event.stopPropagation()">
                    <div class="control-group">
                        <label class="input-label">Seleccionar Baya</label>
                        <select class="gym-berry-select">${opciones}</select>
                    </div>
                    <div class="control-group">
                        <label class="input-label">Nº Semillas</label>
                        <input type="number" class="seed-count-input" placeholder="Cantidad" min="1">
                    </div>
                    <button class="btn-plant-confirm" onclick="window.manejarPlantadoEnLinea('${nombreRegion}', '${idUnico}', this)">✔</button>
                </div>
            `;
        }
    } else if (gimnasio.tipo === 'seed-water' || gimnasio.tipo === 'seed-harvest') {
        textoInfo = ''; // Ocultar texto de líder para pasos intermedios
    }

    // Lógica de imagen (si existe la propiedad 'image' en los datos)
    let htmlImagen = '';
    // Si es una semilla plantada, mostramos la imagen de la baya específica
    if (gimnasio.tipo === 'seed-plant' && estaCompletado && datosProgreso.nombreBaya) {
        const nombreImgBaya = datosProgreso.nombreBaya.toLowerCase().replace('baya ', 'baya_').replace(/\s+/g, '_') + '.png';
        const fallback = gimnasio.imagen ? `this.src='../img/${gimnasio.imagen}'` : "this.style.display='none'";
        htmlImagen = `<img src="../img/bayas/${nombreImgBaya}" alt="${datosProgreso.nombreBaya}" class="gym-image" onerror="${fallback}">`;
    } else if (gimnasio.imagen) {
        htmlImagen = `<img src="../img/${gimnasio.imagen}" alt="${gimnasio.ciudad}" class="gym-image">`;
    }

    // Botón Puzzle para Sabrina
    let botonPuzzle = '';
    if (gimnasio.lider === 'Sabrina') {
        botonPuzzle = ` <button onclick="event.stopPropagation(); mostrarModalImagen('../img/Sabrina_puzzle.jpg')" style="border: none; background: none; cursor: pointer; font-size: 1.1rem; vertical-align: middle;" title="Ver solución">🧩</button>`;
    }

    // Lógica para mostrar u ocultar el título (h3)
    let htmlTitulo = `<h3>${gimnasio.ciudad}${botonPuzzle}</h3>`;

    // Ajuste para alinear el checkbox con el dropdown (--Elegir Baya--) cuando toca plantar
    let estiloCheckbox = '';
    if (gimnasio.tipo === 'seed-plant') {
        htmlTitulo = ''; // Siempre ocultar título (h3) para semillas
        if (!estaCompletado) {
            estiloCheckbox = 'style="align-self: flex-start; margin-top: 38px;"';
        }
    }

    // CAMBIO: Quitar el checkbox del apartado huerto
    let htmlCheckbox = '';
    if (nombreRegion !== 'Huerto') {
        htmlCheckbox = `
        <div class="checkbox-wrapper" ${estiloCheckbox}>
            <div class="custom-checkbox"></div>
        </div>`;
    }

    // HTML interno del item
    elementoLista.innerHTML = `
        ${htmlCheckbox}
        ${htmlImagen}
        <div class="gym-info">
            ${htmlTitulo}
            ${textoInfo}
        </div>
        ${htmlFecha}
    `;
    
    return elementoLista;
}

// Helper para crear el elemento de Encuentros
function crearElementoEncuentro(nombreRegion, gimnasio) {
    const elementoLista = document.createElement('li');
    elementoLista.className = 'gym-item';
    
    // Imagen personalizada para Legendarios
    let gifPokemon = '';
    const legendarios = ['Zapdos', 'Moltres', 'Articuno', 'Entei', 'Suicune', 'Raikou'];
    if (legendarios.includes(gimnasio.lider)) {
        gifPokemon = `<div style="margin-top: 5px;"><img src="../img/${gimnasio.lider.toLowerCase()}.gif" alt="${gimnasio.lider}" style="height: 90px;" onerror="this.style.display='none'"></div>`;
    }

    elementoLista.innerHTML = `
        <div class="gym-info">
            <h3>${gimnasio.lider}</h3>
            ${gifPokemon}
            <p>Región: ${gimnasio.ciudad}</p>
        </div>
    `;
    
    return elementoLista;
}

// Renderizar la interfaz
function renderizarAplicacion() {
    const contenedorApp = document.getElementById('app');
    if (!contenedorApp) return; // Evitar error en index.html

    contenedorApp.innerHTML = ''; // Limpiar

    // Determinar qué datos mostrar según la URL
    const ruta = window.location.pathname.toLowerCase();
    let secciones = [];

    if (ruta.includes('rotacionlegendarios')) {
        secciones.push({ datos: datosEncuentros, maxSlots: 2, ancho: true });
    } else if (ruta.includes('altomandotracker')) {
        secciones.push({ datos: datosAltoMando, maxSlots: 1, elite: true });
    } else if (ruta.includes('semillas')) {
        secciones.push({ datos: datosSemillas, maxSlots: 1 });
    } else if (ruta.includes('battletracker')) {
        // --- LÓGICA BATTLE TRACKER (NUEVA IMPLEMENTACIÓN) ---
        const tablero = document.createElement('div');
        tablero.className = 'battle-dashboard';

        // Renderizar cada región de datosGimnasios como una tarjeta independiente
        datosGimnasios.forEach(region => {
            const tarjeta = document.createElement('div');
            tarjeta.className = 'battle-region-card'; // Clase específica para Battle Tracker

            // Restaurar estado colapsado
            let estaColapsado = true; // Por defecto cerrado en Battle Tracker
            if (estadoRegiones.hasOwnProperty(region.nombre)) {
                estaColapsado = estadoRegiones[region.nombre];
            } else {
                estadoRegiones[region.nombre] = true;
            }

            if (estaColapsado) {
                tarjeta.classList.add('collapsed');
            }

            // Header de la región (Título + Toggle)
            const cabecera = document.createElement('div');
            cabecera.className = 'battle-region-header';
            cabecera.innerHTML = `
                <span>${region.nombre}</span>
                <span class="toggle-icon">▼</span>
            `;
            
            // Evento para colapsar/expandir
            cabecera.onclick = () => {
                tarjeta.classList.toggle('collapsed');
                estadoRegiones[region.nombre] = tarjeta.classList.contains('collapsed');
            };

            tarjeta.appendChild(cabecera);

            // Contenedor de la lista (Grid)
            const lista = document.createElement('ul');
            lista.className = 'battle-gym-list';

            // Generar los gimnasios
            region.gimnasios.forEach(gimnasio => {
                const itemGimnasio = crearElementoGimnasio(region.nombre, gimnasio);
                // Añadir clase específica para items dentro del battle tracker si es necesario
                itemGimnasio.classList.add('battle-gym-item');
                lista.appendChild(itemGimnasio);
            });

            // Si hay entrenadores especiales (como en Teselia), añadirlos también
            if (region.entrenadoresEspeciales) {
                region.entrenadoresEspeciales.forEach(entrenador => {
                    const itemEntrenador = crearElementoGimnasio(region.nombre, entrenador);
                    itemEntrenador.classList.add('battle-gym-item');
                    itemEntrenador.classList.add('special-trainer'); // Para diferenciar visualmente si se desea
                    lista.appendChild(itemEntrenador);
                });
            }

            tarjeta.appendChild(lista);
            tablero.appendChild(tarjeta);
        });

        contenedorApp.appendChild(tablero);
        actualizarTemporizadores();
        return; // Salimos aquí porque ya hemos renderizado todo para Battle Tracker
    } else {
        // Por defecto (si estamos en gymTracker.html antiguo o similar)
        secciones.push({ datos: datosGimnasios, maxSlots: 8 });
    }

    secciones.forEach(seccion => {
        renderizarConjuntoRegiones(seccion.datos, contenedorApp, seccion.maxSlots, seccion.ancho, seccion.elite);
    });

    // Actualizar timers inmediatamente tras renderizar
    actualizarTemporizadores();
}

// Función auxiliar para renderizar un conjunto de regiones
function renderizarConjuntoRegiones(datos, contenedor, maxSlots, esAncho, esElite) {
    const ruta = window.location.pathname.toLowerCase();

    datos.forEach(region => {
        // Crear tarjeta de región
        const tarjeta = document.createElement('div');
        tarjeta.className = 'region-card';

        // Restaurar estado colapsado
        if (estadoRegiones[region.nombre]) {
            tarjeta.classList.add('collapsed');
        }

        // Header de la región
        const cabecera = document.createElement('div');
        cabecera.className = 'region-header';
        
        if (region.nombre === "Huerto") {
            cabecera.innerHTML = `<span style="flex-grow: 1; text-align: center;">${region.nombre}</span>`;
            cabecera.style.cursor = 'default';
        } else {
            cabecera.innerHTML = `<span style="flex-grow: 1; text-align: center;">${region.nombre}</span><span class="toggle-icon" style="transition: transform 0.3s;">▼</span>`;
            cabecera.onclick = () => {
                tarjeta.classList.toggle('collapsed');
                estadoRegiones[region.nombre] = tarjeta.classList.contains('collapsed');
            };
        }
        tarjeta.appendChild(cabecera);

        // Lista de gimnasios
        const lista = document.createElement('ul');
        lista.className = 'gym-list';
        
        if (esAncho) {
            lista.classList.add('horizontal-layout');
            tarjeta.classList.add('wide-card');
        } else if (esElite) {
            tarjeta.classList.add('elite-four-card');
        }

        region.gimnasios.forEach(gimnasio => {
            if (gimnasio.tipo === 'encounter') {
                lista.appendChild(crearElementoEncuentro(region.nombre, gimnasio));
            } else {
                lista.appendChild(crearElementoGimnasio(region.nombre, gimnasio));
            }
        });

        // Rellenar huecos visuales para mantener la altura homogénea
        if (region.gimnasios.length < maxSlots) {
            for (let i = region.gimnasios.length; i < maxSlots; i++) {
                const marcadorPosicion = document.createElement('li');
                marcadorPosicion.className = 'gym-item placeholder';
                marcadorPosicion.innerHTML = `
                    <div class="checkbox-wrapper" style="visibility: hidden;"></div>
                    <div class="gym-info"><h3 style="color: #ddd;">---</h3></div>
                `;
                lista.appendChild(marcadorPosicion);
            }
        }

        tarjeta.appendChild(lista);

        // Renderizar Entrenadores Especiales (si existen)
        if (region.entrenadoresEspeciales && region.entrenadoresEspeciales.length > 0) {
            const cajaEspecial = document.createElement('div');
            cajaEspecial.className = 'special-trainers-box';
            
            const cabeceraEspecial = document.createElement('div');
            cabeceraEspecial.className = 'special-trainers-header';
            cabeceraEspecial.innerHTML = `Combates Especiales`;
            cajaEspecial.appendChild(cabeceraEspecial);
            
            const listaEspecial = document.createElement('ul');
            listaEspecial.className = 'gym-list';
            
            region.entrenadoresEspeciales.forEach(entrenador => {
                listaEspecial.appendChild(crearElementoGimnasio(region.nombre, entrenador));
            });
            
            cajaEspecial.appendChild(listaEspecial);
            tarjeta.appendChild(cajaEspecial);
        }

        contenedor.appendChild(tarjeta);
    });
}

// Renderizar la información de las bayas
function renderizarInfoBayas() {
    const contenedor = document.getElementById('berry-info-container');
    if (!contenedor) return;

    contenedor.innerHTML = ''; // Limpiar contenido previo
 
    const tarjeta = document.createElement('div');
    tarjeta.className = 'region-card';
 
    const cabecera = document.createElement('div');
    cabecera.className = 'region-header';
    cabecera.innerHTML = `<span style="flex-grow: 1; text-align: center;">Información sobre Bayas</span>`;
    cabecera.style.cursor = 'default';
    tarjeta.appendChild(cabecera);
 
    // Wrapper for select and result
    const envoltorio = document.createElement('div');
    envoltorio.className = 'berry-selector-wrapper';
 
    // Create select dropdown
    const selector = document.createElement('select');
    selector.className = 'berry-select';
    selector.innerHTML = `<option value="">Seleccione una baya...</option>`;
 
    // Sort berries alphabetically by name
    const bayasOrdenadas = [...datosBayas].sort((a, b) => a.nombre.localeCompare(b.nombre));
 
    bayasOrdenadas.forEach(baya => {
        selector.innerHTML += `<option value="${baya.nombre}">${baya.nombre}</option>`;
    });
 
    // Create container for the selected berry's info
    const contenedorInfo = document.createElement('div');
    contenedorInfo.id = 'selected-berry-info';
    contenedorInfo.className = 'berry-content-display';
    // Ensure it has content initially to respect min-height
    contenedorInfo.innerHTML = '<p class="berry-placeholder">Selecciona una baya para ver su información</p>';
 
    const generarNombreImagen = (nombre) => {
        return nombre.toLowerCase().replace('baya ', 'baya_').replace(/\s+/g, '_') + '.png';
    };
 
    // Event listener for the select
    selector.addEventListener('change', (evento) => {
        const nombreSeleccionado = evento.target.value;
 
        if (nombreSeleccionado) {
            const baya = datosBayas.find(b => b.nombre === nombreSeleccionado);
            if (baya) {
                const nombreImagenFinal = generarNombreImagen(baya.nombre);
 
                let htmlContenido = `
                    <div class="selected-berry-header">
                        <img src="../img/bayas/${nombreImagenFinal}" alt="${baya.nombre}" class="berry-image" onerror="this.src='../img/semilla_picante.png'; this.style.filter='grayscale(1)';">
                        <span class="berry-name">${baya.nombre}</span>
                    </div>
                    <div class="selected-berry-details">
                        <table class="berry-info-table">
                            <tbody>
                                <tr><th>Uso</th><td>${baya.uso}</td></tr>
                                <tr><th>Combinación</th><td>${baya.combinacion}</td></tr>
                                <tr><th>Riego</th><td>Cada ${baya.tiempoRiego}</td></tr>
                                <tr><th>Cosecha</th><td>${baya.tiempoCosecha}</td></tr>
                                <tr><th>Sabor</th><td>${baya.sabor}</td></tr>
                                <tr><th>Color</th><td>${baya.color}</td></tr>
                            </tbody>
                        </table>
                    </div>`;
                
                contenedorInfo.innerHTML = htmlContenido;
                // infoContainer.style.display = 'block'; // Already block via CSS
            }
        } else {
            // Reset to placeholder
            contenedorInfo.innerHTML = '<p class="berry-placeholder">Selecciona una baya para ver su información</p>';
        }
    });
 
    envoltorio.appendChild(selector);
    envoltorio.appendChild(contenedorInfo);
    tarjeta.appendChild(envoltorio);
    contenedor.appendChild(tarjeta);
}

// --- NAVEGACIÓN ---
async function cargarNavegacion() {
    const marcadorPosicion = document.getElementById('nav-placeholder');
    if (!marcadorPosicion) return;

    try {
        const respuesta = await fetch('nav.html');
        if (respuesta.ok) {
            marcadorPosicion.innerHTML = await respuesta.text();
        } else {
            console.error(`Error cargando nav.html: ${respuesta.status}. Verifica si el archivo en Git se llama 'Nav.html' (mayúscula) en lugar de 'nav.html'.`);
        }
    } catch (error) {
        console.error("Error cargando navegación (posiblemente por protocolo file://):", error);
        // Fallback visual si falla la carga local
        marcadorPosicion.innerHTML = '<div style="text-align:center; padding:10px; background:#eee;">Menú no cargado (requiere servidor local)</div>';
    }
}

// Funciones del Modal
function mostrarModalReinicio(contexto) {
    // Si context es un string (ej: 'gyms'), lo guardamos. Si es un evento, lo ignoramos (null).
    if (typeof contexto === 'string') {
        contextoReinicio = contexto;
    } else {
        contextoReinicio = null;
    }

    document.getElementById('modal-overlay').classList.add('active');
    const modal = document.getElementById('modal-overlay');
    
    const ruta = window.location.pathname.toLowerCase();
    // Lógica específica para la página de encuentros
    if (ruta.includes('rotacionlegendarios')) {
        const contenido = modal.querySelector('.modal-content');
        
        // Generar botones dinámicamente según las regiones disponibles en datosEncuentros
        let htmlBotones = '';
        datosEncuentros.forEach(region => {
            const idSeguro = region.nombre.replace(/\s+/g, '-').toLowerCase();
            htmlBotones += `<button class="btn-modal btn-confirm" id="reset-${idSeguro}">${region.nombre}</button>`;
        });

        contenido.innerHTML = `
            <h3>Reiniciar Encuentros</h3>
            <p>Selecciona la región a reiniciar:</p>
            <div class="modal-actions" style="flex-wrap: wrap; gap: 10px;">
                <button class="btn-modal btn-cancel" id="modal-cancel-dynamic">Cancelar</button>
                ${htmlBotones}
            </div>
        `;
        
        // Asignar eventos a los nuevos botones
        document.getElementById('modal-cancel-dynamic').onclick = ocultarModalReinicio;
        datosEncuentros.forEach(region => {
            const idSeguro = region.nombre.replace(/\s+/g, '-').toLowerCase();
            const boton = document.getElementById(`reset-${idSeguro}`);
            if (boton) boton.onclick = () => reiniciarRegionEspecifica(region.nombre);
        });
    }
    
    modal.classList.add('active');
}
window.mostrarModalReinicio = mostrarModalReinicio;

function ocultarModalReinicio() {
    document.getElementById('modal-overlay').classList.remove('active');
}

function reiniciarRegionEspecifica(nombreRegion) {
    const region = datosEncuentros.find(r => r.nombre === nombreRegion);
    if (region) {
        region.gimnasios.forEach(item => {
            const idUnico = item.id || item.lider;
            const id = obtenerIdGimnasio(region.nombre, idUnico);
            delete progresoUsuario[id];
        });
        guardarProgreso();
        renderizarAplicacion();
    }
    ocultarModalReinicio();
}

function confirmarReinicio() {
    // Determinar qué datos corresponden a la página actual para borrar solo esos
    let conjuntosDatosAReiniciar = [];
    const ruta = window.location.pathname.toLowerCase();
    
    // Verificar si venimos de un botón específico del Battle Tracker
    if (contextoReinicio === 'gyms') {
        conjuntosDatosAReiniciar = [datosGimnasios];
    } else if (contextoReinicio === 'elite') {
        conjuntosDatosAReiniciar = [datosAltoMando];
    } else if (ruta.includes('altomandotracker')) {
        conjuntosDatosAReiniciar = [datosAltoMando];
    } else if (ruta.includes('semillas')) {
        conjuntosDatosAReiniciar = [datosSemillas];
    } else if (ruta.includes('rotacionlegendarios')) {
        conjuntosDatosAReiniciar = [datosEncuentros];
    } else {
        conjuntosDatosAReiniciar = [datosGimnasios];
    }

    // Borrar solo las claves asociadas a los datos de la página actual
    conjuntosDatosAReiniciar.forEach(conjuntoDatos => {
        conjuntoDatos.forEach(region => {
            region.gimnasios.forEach(item => {
                const idUnico = item.id || item.lider;
                const id = obtenerIdGimnasio(region.nombre, idUnico);
                delete progresoUsuario[id];
            });

            if (region.entrenadoresEspeciales) {
                region.entrenadoresEspeciales.forEach(entrenador => {
                    const idUnico = entrenador.id || entrenador.lider;
                    const id = obtenerIdGimnasio(region.nombre, idUnico);
                    delete progresoUsuario[id];
                });
            }
        });
    });

    guardarProgreso();
    renderizarAplicacion();
    ocultarModalReinicio();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- MODAL DE IMAGEN ---
function configurarModalImagen() {
    if (!document.getElementById('img-modal-overlay')) {
        const modal = document.createElement('div');
        modal.id = 'img-modal-overlay';
        modal.className = 'modal-overlay';
        modal.onclick = (e) => {
            if(e.target === modal) modal.classList.remove('active');
        };
        modal.innerHTML = `
            <div class="modal-content" style="background: transparent; border: none; box-shadow: none; max-width: 95%; width: auto; padding: 0; display: flex; flex-direction: column; align-items: center;">
                <img id="img-modal-target" src="" style="max-width: 100%; max-height: 85vh; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                <button onclick="document.getElementById('img-modal-overlay').classList.remove('active')" style="margin-top: 15px; padding: 8px 20px; background: white; border: none; border-radius: 20px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">Cerrar</button>
            </div>
        `;
        document.body.appendChild(modal);
    }
}

window.mostrarModalImagen = function(src) {
    const modal = document.getElementById('img-modal-overlay');
    const img = document.getElementById('img-modal-target');
    if (modal && img) {
        img.src = src;
        modal.classList.add('active');
    }
};

// --- FUNCIÓN PLANTAR EN LÍNEA ---
window.manejarPlantadoEnLinea = function(nombreRegion, idUnico, elementoBoton) {
    const contenedor = elementoBoton.parentElement;
    const selector = contenedor.querySelector('.gym-berry-select');
    const inputCantidad = contenedor.querySelector('.seed-count-input');

    const nombreBaya = selector.value;
    const cantidad = parseInt(inputCantidad.value);

    if (!nombreBaya) {
        alert("Por favor, selecciona una baya.");
        return;
    }
    if (!cantidad || cantidad <= 0) {
        alert("Por favor, introduce una cantidad válida.");
        return;
    }

    // Obtener datos de la baya seleccionada
    const baya = datosBayas.find(b => b.nombre === nombreBaya);
    const horasCosecha = analizarHorasBaya(baya.tiempoCosecha);
    const horasRiego = analizarHorasBaya(baya.tiempoRiego);

    const id = obtenerIdGimnasio(nombreRegion, idUnico);
    progresoUsuario[id] = {
        timestamp: new Date().toISOString(),
        cantidad: cantidad,
        nombreBaya: nombreBaya,
        intervaloCosecha: horasCosecha,
        intervaloRiego: horasRiego
    };

    guardarProgreso();
    renderizarAplicacion();
};

// --- GESTIÓN DE DATOS (EXPORTAR/IMPORTAR) ---
function configurarInterfazAuth() {
    const cabecera = document.querySelector('header');
    if (!cabecera) return;

    let contenedorUsuario = document.getElementById('user-auth-container');
    if (!contenedorUsuario) {
        contenedorUsuario = document.createElement('div');
        contenedorUsuario.id = 'user-auth-container';
        contenedorUsuario.style.position = 'absolute';
        contenedorUsuario.style.top = '50%';
        contenedorUsuario.style.right = '20px';
        contenedorUsuario.style.transform = 'translateY(-50%)';
        contenedorUsuario.style.display = 'flex';
        contenedorUsuario.style.gap = '10px';
        cabecera.appendChild(contenedorUsuario);
        cabecera.style.position = 'relative';
    }

    contenedorUsuario.innerHTML = '';

    // Botón Exportar
    const botonExportar = document.createElement('button');
    botonExportar.textContent = '💾 Guardar Archivo';
    botonExportar.className = 'btn-data';
    botonExportar.style.padding = '5px 10px';
    botonExportar.style.fontSize = '0.8rem';
    botonExportar.onclick = exportarDatos;

    // Botón Importar
    const botonImportar = document.createElement('button');
    botonImportar.textContent = '📂 Cargar Archivo';
    botonImportar.className = 'btn-data';
    botonImportar.style.padding = '5px 10px';
    botonImportar.style.fontSize = '0.8rem';
    botonImportar.onclick = () => document.getElementById('import-file').click();

    // Input oculto para importar
    const inputArchivo = document.createElement('input');
    inputArchivo.type = 'file';
    inputArchivo.id = 'import-file';
    inputArchivo.accept = '.json';
    inputArchivo.style.display = 'none';
    inputArchivo.onchange = importarDatos;

    contenedorUsuario.appendChild(botonExportar);
    contenedorUsuario.appendChild(botonImportar);
    contenedorUsuario.appendChild(inputArchivo);
}

function exportarDatos() {
    const cadenaDatos = JSON.stringify(progresoUsuario, null, 2);
    const blob = new Blob([cadenaDatos], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `pokemmo_tracker_backup_${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function importarDatos(evento) {
    const archivo = evento.target.files[0];
    if (!archivo) return;

    const lector = new FileReader();
    lector.onload = function(e) {
        try {
            const datos = JSON.parse(e.target.result);
            progresoUsuario = datos;
            guardarProgreso();
            renderizarAplicacion();
            alert('Datos cargados correctamente.');
        } catch (error) {
            console.error("Error al leer el archivo:", error);
            alert('Error al leer el archivo. Asegúrate de que es un JSON válido.');
        }
    };
    lector.readAsText(archivo);
    evento.target.value = '';
}

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', async () => {
    // Añadir favicon dinámicamente para todas las páginas
    const faviconLink = document.createElement('link');
    faviconLink.rel = 'icon';
    faviconLink.type = 'image/png';
    faviconLink.href = '../img/favicon.png'; // Ruta al favicon
    document.head.appendChild(faviconLink);

    cargarNavegacion();
    configurarModalImagen();
    
    // Actualizar datos de encuentros solo una vez al cargar
    const ruta = window.location.pathname.toLowerCase();
    if (ruta.includes('semillas')) {
        document.body.classList.add('page-semillas');
    }
    if (ruta.includes('rotacionlegendarios')) {
        actualizarDatosEncuentros();
    }

    // Iniciar aplicación local
    configurarInterfazAuth();
    await cargarProgreso();
    renderizarAplicacion();
    
    // Renderizar información de bayas si estamos en la página de semillas
    if (ruta.includes('semillas')) {
        renderizarInfoBayas();
    }

    // Actualizar temporizadores cada segundo (1000 ms)
    setInterval(actualizarTemporizadores, 1000);
    
    // Asignar evento al botón de reset
    const botonReinicio = document.getElementById('btn-reset');
    if(botonReinicio) {
        botonReinicio.addEventListener('click', mostrarModalReinicio);
    }

    // Eventos del modal
    const cancelarModal = document.getElementById('modal-cancel');
    if (cancelarModal) {
        cancelarModal.addEventListener('click', ocultarModalReinicio);
    }
    const confirmarModal = document.getElementById('modal-confirm');
    if (confirmarModal) {
        confirmarModal.addEventListener('click', confirmarReinicio);
    }
});
