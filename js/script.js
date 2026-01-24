// --- DATOS DE LOS GIMNASIOS (PokeMMO) ---
const gymsData = [
    {
        name: "Kanto",
        money: "63.700",
        gyms: [
            { city: "Ciudad Plateada", leader: "Brock" },
            { city: "Ciudad Celeste", leader: "Misty" },
            { city: "Ciudad Carmín", leader: "Lt. Surge" },
            { city: "Ciudad Azulona", leader: "Erika" },
            { city: "Ciudad Fucsia", leader: "Koga" },
            { city: "Ciudad Azafrán", leader: "Sabrina" },
            { city: "Isla Canela", leader: "Blaine" }
        ]
    },
    {
        name: "Johto",
        money: "72.800",
        gyms: [
            { city: "Ciudad Malva", leader: "Pegaso" },
            { city: "Pueblo Azalea", leader: "Antón" },
            { city: "Ciudad Trigal", leader: "Blanca" },
            { city: "Ciudad Iris", leader: "Morti" },
            { city: "Ciudad Orquídea", leader: "Aníbal" },
            { city: "Ciudad Olivo", leader: "Yasmina" },
            { city: "Pueblo Caoba", leader: "Fredo" },
            { city: "Ciudad Endrino", leader: "Débora" }
        ]
    },
    {
        name: "Hoenn",
        money: "72.800",
        gyms: [
            { city: "Ciudad Férrica", leader: "Petra" },
            { city: "Pueblo Azuliza", leader: "Marcial" },
            { city: "Ciudad Malvalona", leader: "Erico" },
            { city: "Pueblo Lavacalda", leader: "Candela" },
            { city: "Ciudad Petalia", leader: "Norman" },
            { city: "Ciudad Arborada", leader: "Alana" },
            { city: "Ciudad Algaria", leader: "Vito y Leti" },
            { city: "Ciudad Arrecípolis", leader: "Galano" }
        ]
    },
    {
        name: "Sinnoh",
        money: "72.800",
        gyms: [
            { city: "Ciudad Pirita", leader: "Roco" },
            { city: "Ciudad Vetusta", leader: "Gardenia" },
            { city: "Ciudad Rocavelo", leader: "Brega" },
            { city: "Ciudad Pradera", leader: "Mananti" },
            { city: "Ciudad Corazón", leader: "Fantina" },
            { city: "Ciudad Canal", leader: "Acerón" },
            { city: "Ciudad Puntaneva", leader: "Inverna" },
            { city: "Ciudad Marina", leader: "Lectro" }
        ]
    },
    {
        name: "Teselia",
        money: "72.800",
        gyms: [
            { city: "Ciudad Gres", leader: "Zeo, Maíz y Millo" },
            { city: "Ciudad Esmalte", leader: "Aloe" },
            { city: "Ciudad Porcelana", leader: "Camus" },
            { city: "Ciudad Mayólica", leader: "Camila" },
            { city: "Ciudad Fayenza", leader: "Yakón" },
            { city: "Ciudad Loza", leader: "Gerania" },
            { city: "Ciudad Teja", leader: "Junco" },
            { city: "Ciudad Caolín", leader: "Lirio" }
        ],
        specialTrainers: [
            { city: "Game Freak (Porcelana)", leader: "Morimoto" },
            { city: "Pueblo Arenisca", leader: "Cintia" }
        ]
    }
];

// --- DATOS DEL ALTO MANDO ---
const eliteFourData = [
    {
        name: "Kanto",
        money: "60.000", // Estimado
        gyms: [
            { city: "Liga Pokémon", leader: "Alto Mando", id: "kanto-elite4", cooldown: 24 }
        ]
    },
    {
        name: "Johto",
        money: "60.000",
        gyms: [
            { city: "Liga Pokémon", leader: "Alto Mando", id: "johto-elite4", cooldown: 24 }
        ]
    },
    {
        name: "Hoenn",
        money: "60.000",
        gyms: [
            { city: "Liga Pokémon", leader: "Alto Mando", id: "hoenn-elite4", cooldown: 24 }
        ]
    },
    {
        name: "Sinnoh",
        money: "60.000",
        gyms: [
            { city: "Liga Pokémon", leader: "Alto Mando", id: "sinnoh-elite4", cooldown: 24 }
        ]
    },
    {
        name: "Teselia",
        money: "60.000",
        gyms: [
            { city: "Liga Pokémon", leader: "Alto Mando", id: "teselia-elite4", cooldown: 24 }
        ]
    }
];

// --- DATOS DE SEMILLAS ---
const seedsData = [
    {
        name: "Huerto",
        money: "-",
        gyms: [
            { city: "Seleccionar Baya", leader: "Plantar", id: "spicy-seeds-plant", type: "seed-plant", image: "semilla_picante.png", duration: 5, timerPrefix: "Riego en:", readyLabel: "Regar", nextId: "spicy-seeds-water" },
            { city: "Riego de Semillas", leader: "Regar", id: "spicy-seeds-water", type: "seed-water", prevId: "spicy-seeds-plant", waitHours: 5, duration: 16, timerPrefix: "Recogida en:", readyLabel: "Recoger", nextId: "spicy-seeds-harvest" },
            { city: "Recogida de Semillas", leader: "Recoger", id: "spicy-seeds-harvest", type: "seed-harvest", prevId: "spicy-seeds-water", rootId: "spicy-seeds-plant", waitHours: 16 }
        ]
    }
];

// --- DATOS DE ENCUENTROS ---
const encountersData = [
    {
        name: "Mes Actual",
        money: "-",
        gyms: [] // Se actualizará dinámicamente
    }
];

// --- DATOS DE BAYAS ---
const berriesData = [
    { name: "Baya Acardo", usage: "Al estar equipada, baja a la mitad el daño de un ataque super efectivo de tipo tierra.", combination: "Sem. Muy picante x1 + Sem. Muy Dulce x1", times: "42 horas\n8 horas", flavor: "Dulce", color: "Rosa" },
    { name: "Baya Alcho", usage: "Al estar equipada, baja a la mitad el daño de un ataque super efectivo de tipo roca.", combination: "Sem. Muy picante x1 + Sem. Muy seca x1", times: "42 horas\n8 horas", flavor: "Seco", color: "Azul" },
    { name: "Baya Algama", usage: "Baja 10 EVs (Puntos de Esfuerzo) de Ataque.", combination: "Sem. Muy seca x1 + Sem. Ácida x1", times: "44 horas\n8 horas", flavor: "Seco", color: "Azul" },
    { name: "Baya Andano", usage: "Solo sirven para hacer PokeCubos", combination: "Sem. Picante x1 + Sem. Muy ácida x1", times: "42 horas\n8 horas", flavor: "Ácido", color: "Amarillo" },
    { name: "Baya Ango", usage: "Sirve para subir la felicidad un 9,8% a los pokemon que no les disguste el sabor Dulce.\nSirve para restar la felicidad un 9,8% a los pokemon que les disguste el sabor Dulce\nSe puede equipar en un pokemon para que restaure un 50% de los PS automáticamente al llegar al 25% de los PS maximos. (Advertencia: Confundirá a los Pokemon que no les guste el sabor Dulce! [Vease: Capitulo 3])", combination: "Sem. Muy dulce x2", times: "20 horas\n8 horas", flavor: "Dulce", color: "Rosa" },
    { name: "Baya Anjiro", usage: "Al estar equipada, baja a la mitad el daño de un ataque super efectivo de tipo dragón.", combination: "Sem. Muy dulce x1 + Sem. Muy amarga x1", times: "42 horas\n8 horas", flavor: "Amargo", color: "Verde" },
    { name: "Baya Aostan", usage: "Solo sirven para hacer PokeCubos", combination: "Sem. Muy dulce x1 + Sem. Amarga x1", times: "20 horas\n8 horas", flavor: "Dulce", color: "Rosa" },
    { name: "Baya Arabol", usage: "Al estar equipada, sube 2 niveles una carácterística al azar al llegar al 25% de los PS máximos.", combination: "Sem. Muy seca x1 + Sem. Muy dulce x1. + Sem. Muy amarga x1", times: "67 horas\n8 horas", flavor: "-", color: "- (Creará un PokeCubo gris)" },
    { name: "Baya Aranja", usage: "Al estar equipada, recuperará 10 PS automáticamente al llegar al 25% de los PS.\nSe puede usar en un Pokemon para que recupere 10 PS dentro o fuera de combate.", combination: "Sem. Seca x1 + Sem. Amarga x1 + Sem. Ácida x1", times: "16 horas\n8 horas", flavor: "-", color: "- (Crea un PokeCubo gris)" },
    { name: "Baya Aricoc", usage: "Al estar equipada, sube automáticamente 2 niveles la Defensa Especial al llegar al 25% de los PS", combination: "Sem. Picante x1 + Sem. Muy seca x1 + Sem. Muy ácida x1", times: "67 horas\n8 horas", flavor: "-", color: "- (Creará un PokeCubo gris)" },
    { name: "Baya Aslac", usage: "Al estar equipada, sube automáticamente 2 niveles la Velocidad al llegar al 25% de los PS", combination: "Sem. Muy dulce x1 + Sem. Amarga x1 + Sem. Muy ácida x1", times: "67 horas\n8 horas", flavor: "-", color: "- (Creará un PokeCubo gris)" },
    { name: "Baya Atania", usage: "Al estar equipada, despierta automáticamente al pokemon apenas se duerma.\nSe puede usar sobre un Pokemon para que despierte dentro o fuera de combate", combination: "Sem. Seca x3\nSem. Muy seca x1 + Sem. Seca x1", times: "16 horas\n8 horas", flavor: "Seco", color: "Azul" },
    { name: "Baya Baribá", usage: "Al estar equipada, baja a la mitad el daño de un ataque super efectivo de tipo acero.", combination: "Sem. Muy picante x1 + Sem. Muy seca x1", times: "42 horas\n8 horas", flavor: "Picante", color: "Rojo" },
    { name: "Baya Caoca", usage: "Al estar equipada, baja a la mitad el daño de un ataque super efectivo de tipo fuego.", combination: "Sem. Muy picante x1 + Sem. Muy dulce x1", times: "42 horas\n8 horas", flavor: "Picante", color: "Rojo" },
    { name: "Baya Caquic", usage: "Al estar equipada, cura automáticamente la confusión al pokemon apenas se lo confunda.\nSe puede usar sobre un Pokemon para que se cure de la confusión dentro de combate", combination: "Sem. Picante x1 + Sem. Seca x1 + Sem. Dulce x1", times: "16 horas\n8 horas", flavor: "-", color: "- (Creará un PokeCubo gris)" },
    { name: "Baya Chilan", usage: "Al estar equipada, baja a la mitad el daño de un ataque de tipo normal.", combination: "Sem. Muy seca x1 + Sem. Muy dulce x1", times: "42 horas\n8 horas", flavor: "Seco", color: "Azul" },
    { name: "Baya Chiri", usage: "Al estar equipada, sube automáticamente a +8 la prioridad al efectuar un movimiento teniendo 25% o menos de los PS máximos, pero se va al acabar el turno.", combination: "Sem. Muy dulce x1 + Sem. Muy amarga x1", times: "44 horas\n8 horas", flavor: "Dulce", color: "Rosa" },
    { name: "Baya Dillo", usage: "Al estar equipada, baja a la mitad el daño de un ataque super efectivo de tipo siniestro.", combination: "Sem. Muy picante x1 + Sem. Muy ácida x1", times: "42 horas\n8 horas", flavor: "Ácido", color: "Amarillo" },
    { name: "Baya Drasi", usage: "Al estar equipada, baja a la mitad el daño de un ataque super efectivo de tipo fantasma.", combination: "Sem. Muy seca x1 + Sem. Muy dulce x1", times: "42 horas\n8 horas", flavor: "Dulce", color: "Rosa" },
    { name: "Baya Enigma", usage: "Al estar equipada, restaura un 25% de los PS al recibir un ataque muy efectivo.", combination: "Sem. Muy picante x1 + Sem. Muy seca x1", times: "42 horas\n8 horas", flavor: "Picante", color: "Rojo" },
    { name: "Baya Frambu", usage: "Solo sirve para hacer Pokecubos.", combination: "Sem. Picante x1 + Sem. Muy seca x1", times: "16 horas\n8 horas", flavor: "Seco", color: "Azul" },
    { name: "Baya Gonlan", usage: "Al estar equipada, sube automáticamente 2 niveles la Defensa al llegar al 25% de los PS", combination: "Sem. Muy seca x1 + Sem. Seca x1 + Sem. Muy amarga x1", times: "67 horas\n8 horas", flavor: "-", color: "- (Creará un PokeCubo gris)" },
    { name: "Baya Grana", usage: "Baja 10 EVs (Puntos de Esfuerzo) de PS.", combination: "Sem. Muy picante x1 + Sem. Amarga", times: "44 horas\n8 horas", flavor: "Picante", color: "Rojo" },
    { name: "Baya Gualot", usage: "Al estar equipada, baja a la mitad el daño de un ataque super efectivo de tipo Eléctrico.", combination: "Sem. Muy dulce x1 + Sem. Muy amarga x1", times: "42 horas\n8 horas", flavor: "Dulce", color: "Rosa" },
    { name: "Baya Guaya", usage: "Sirve para subir la felicidad un 9,8% a los pokemon que no les disguste el sabor Amargo.\nSirve para restar la felicidad un 9,8% a los pokemon que les disguste el sabor Amargo.\nSe puede equipar en un pokemon para que restaure un 50% de los PS automáticamente al llegar al 25% de los PS maximos. (Advertencia: Confundirá a los Pokemon que no les guste el sabor Amargo! [Vease: Capitulo 3])", combination: "Sem. Muy amarga x2", times: "20 horas\n8 horas", flavor: "Amargo", color: "Verde" },
    { name: "Baya Higog", usage: "Sirve para subir la felicidad un 9,8% a los pokemon que no les disguste el sabor Picante.\nSirve para restar la felicidad un 9,8% a los pokemon que les disguste el sabor Picante.\nSe puede equipar en un pokemon para que restaure un 50% de los PS automáticamente al llegar al 25% de los PS maximos. (Advertencia: Confundirá a los Pokemon que no les guste el sabor Picante! [Vease: Capitulo 3])", combination: "Sem. Muy picante x2", times: "20 horas\n8 horas", flavor: "Picante", color: "Rojo" },
    { name: "Baya Ispero", usage: "Baja 10 EVs (Puntos de Esfuerzo) de Defensa.", combination: "Sem. Picante x1 + Sem. Muy dulce x1", times: "44 horas\n8 horas", flavor: "Dulce", color: "Rosa" },
    { name: "Baya Jaboca", usage: "Al estar equipada, pega un 12,5% de los PS máximos al agresor que le pegue al portador de la baya un ataque físico (No necesariamente de contacto)", combination: "Sem. Muy amarga x1 + Sem. Muy ácida x1", times: "44 horas\n8 horas", flavor: "Amargo", color: "Verde" },
    { name: "Baya Kebia", usage: "Al estar equipada, baja a la mitad el daño de un ataque super efectivo de tipo Veneno.", combination: "Sem. Muy seca x1 + Sem. Muy ácida x1", times: "42 horas\n8 horas", flavor: "Seco", color: "Azul" },
    { name: "Baya Kouba", usage: "Al estar equipada, baja a la mitad el daño de un ataque super efectivo de tipo Volador.", combination: "Sem. Muy seca x1 + Sem. Muy amarga x1", times: "42 horas\n8 horas", flavor: "Amargo", color: "Verde" },
    { name: "Baya Lagro", usage: "Al estar equipada, sube automáticamente 2 niveles la Precisión al llegar al 25% de los PS", combination: "Sem. Muy seca x1 + Sem. Muy dulce x1", times: "44 horas\n8 horas", flavor: "Seco", color: "Azul" },
    { name: "Baya Latano", usage: "Solo sirve para hacer Pokecubos.", combination: "Sem. Amarga x1 + Sem. Muy Dulce x1", times: "16 horas\n8 horas", flavor: "Dulce", color: "Rosa" },
    { name: "Baya Lichi", usage: "Al estar equipada, sube automáticamente 2 niveles el Ataque al llegar al 25% de los PS", combination: "Sem. Muy picante x1 + Sem. Seca x1 + Sem. Muy dulce x1", times: "67 horas\n8 horas", flavor: "-", color: "- (Creará un PokeCubo gris)" },
    { name: "Baya Magua", usage: "Al estar equipada, pega un 12,5% de los PS máximos al agresor que le pegue al portador de la baya un ataque especial.", combination: "Sem. Muy picante x1 + Sem. Muy ácida x1", times: "44 horas\n8 horas", flavor: "Ácido", color: "Amarillo" },
    { name: "Baya Mais", usage: "Solo sirven para hacer PokeCubos", combination: "Sem. Muy seca x1 + Sem. Dulce x1", times: "20 horas\n8 horas", flavor: "Seco", color: "Azul" },
    { name: "Baya Meloc", usage: "Al estar equipada, cura automáticamente el envenenamiento al pokemon apenas se envenene.\nSe puede usar sobre un Pokemon para curar el envenenamiento dentro o fuera de combate", combination: "Sem. Muy dulce x1 + Sem. Dulce x1\nSem. Dulce x3", times: "16 horas\n8 horas", flavor: "Dulce", color: "Rosa" },
    { name: "Baya Meluce", usage: "Baja 10 EVs (Puntos de Esfuerzo) de Ataque Especial.", combination: "Sem. Seca x1 + Sem. Muy amarga x1", times: "44 horas\n8 horas", flavor: "Amargo", color: "Verde" },
    { name: "Baya Monli", usage: "Solo sirven para hacer PokeCubos", combination: "Sem. Picante x1 + Sem. Muy ácida x1", times: "20 horas\n8 horas", flavor: "Ácido", color: "Amarillo" },
    { name: "Baya Oram", usage: "Solo sirve para hacer Pokecubos.", combination: "Sem. Seca x1 + Sem. Muy dulce x1", times: "16 horas\n8 horas", flavor: "Dulce", color: "Rosa" },
    { name: "Baya Pabaya", usage: "Sirve para subir la felicidad un 9,8% a los pokemon que no les disguste el sabor Ácido.\nSirve para restar la felicidad un 9,8% a los pokemon que les disguste el sabor Ácido.\nSe puede equipar en un pokemon para que restaure un 50% de los PS automáticamente al llegar al 25% de los PS maximos. (Advertencia: Confundirá a los Pokemon que no les guste el sabor Ácido! [Vease: Capitulo 3])", combination: "Sem. Muy ácida x2", times: "20 horas\n8 horas", flavor: "Ácido", color: "Amarillo" },
    { name: "Baya Pasio", usage: "Al estar equipada, baja a la mitad el daño de un ataque super efectivo de tipo Agua.", combination: "Sem. Muy seca x1 + Sem. Muy amarga x1", times: "42 horas\n8 horas", flavor: "Seco", color: "Azul" },
    { name: "Baya Payapa", usage: "Al estar equipada, baja a la mitad el daño de un ataque super efectivo de tipo Psiquico.", combination: "Sem. Muy dulce x1 + Sem. Muy ácida x1", times: "42 horas\n8 horas", flavor: "Ácido", color: "Amarillo" },
    { name: "Baya Peragu", usage: "Solo sirve para hacer Pokecubos.", combination: "Sem. Amarga x1 + Sem. Muy ácida x1", times: "16 horas\n8 horas", flavor: "Ácido", color: "Amarillo" },
    { name: "Baya Perasi", usage: "Al estar equipada, descongela automáticamente al pokemon apenas se congele.\nSe puede usar sobre un Pokemon para que se descongele dentro o fuera de combate", combination: "Sem. Muy ácida x1 + Sem. Ácida x1\nSem. Ácida x3", times: "16 horas\n8 horas", flavor: "Ácido", color: "Amarillo" },
    { name: "Baya Pinia", usage: "Solo sirve para hacer Pokecubos.", combination: "Sem. Picante x1 + Sem. Muy ácida x1", times: "16 horas\n8 horas", flavor: "Ácido", color: "Amarillo" },
    { name: "Baya Plama", usage: "Solo sirven para hacer PokeCubos", combination: "Sem. Muy seca x1 + Sem. Dulce x1", times: "42 horas\n8 horas", flavor: "Seco", color: "Azul" },
    { name: "Baya Pomaro", usage: "Al estar equipada, baja a la mitad el daño de un ataque super efectivo de tipo Lucha.", combination: "Sem. Muy picante x1 + Sem. Muy amarga x1", times: "42 horas\n8 horas", flavor: "Picante", color: "Rojo" },
    { name: "Baya Rautan", usage: "Solo sirven para hacer PokeCubos", combination: "Sem. Muy amarga x1 + Sem. Ácida x1", times: "20 horas\n8 horas", flavor: "Amargo", color: "Verde" },
    { name: "Baya Rimoya", usage: "Al estar equipada, baja a la mitad el daño de un ataque super efectivo de tipo Hielo.", combination: "Sem. Muy seca x1 + Sem. Muy ácida x1", times: "42 horas\n8 horas", flavor: "Ácido", color: "Amarillo" },
    { name: "Baya Rudion", usage: "Solo sirven para hacer PokeCubos", combination: "Sem. Muy amarga x1 + Sem. Ácida x1", times: "42 horas\n8 horas", flavor: "Amargo", color: "Verde" },
    { name: "Baya Safre", usage: "Al estar equipada, cura de las quemaduras automáticamente al pokemon apenas se queme.\nSe puede usar sobre un Pokemon para curar las quemaduras dentro o fuera de combate", combination: "Sem. Muy amarga x1 + Sem. Amarga x1\nSem. Amarga x3", times: "16 horas\n8 horas", flavor: "Amargo", color: "Verde" },
    { name: "Baya Sambia", usage: "Solo sirven para hacer PokeCubos", combination: "Sem. Muy dulce x1 + Sem. Amarga x1", times: "42 horas\n8 horas", flavor: "Dulce", color: "Rosa" },
    { name: "Baya Tamar", usage: "Al estar equipada, baja a la mitad el daño de un ataque super efectivo de tipo Planta.", combination: "Sem. Muy picante x1 + Sem. Muy amarga x1", times: "42 horas\n8 horas", flavor: "Amargo", color: "Verde" },
    { name: "Baya Tamate", usage: "Baja 10 EVs (Puntos de Esfuerzo) de Velocidad.", combination: "Sem. Muy picante x1 + Sem. Seca x1", times: "44 horas\n8 horas", flavor: "Picante", color: "Rojo" },
    { name: "Baya Uvav", usage: "Baja 10 EVs (Puntos de Esfuerzo) de Defensa Especial.", combination: "Sem. Dulce x1 + Sem. Muy ácida x1", times: "44 horas\n8 horas", flavor: "Ácido", color: "Amarillo" },
    { name: "Baya Wikano", usage: "Solo sirven para hacer PokeCubos", combination: "Sem. Muy picante x1 + Sem. Seca x1", times: "42 horas\n8 horas", flavor: "Picante", color: "Rojo" },
    { name: "Baya Wiki", usage: "Sirve para subir la felicidad un 9,8% a los pokemon que no les disguste el sabor Seco.\nSirve para restar la felicidad un 9,8% a los pokemon que les disguste el sabor Seco.\nSe puede equipar en un pokemon para que restaure un 50% de los PS automáticamente al llegar al 25% de los PS maximos. (Advertencia: Confundirá a los Pokemon que no les guste el sabor Seco! [Vease: Capitulo 3])", combination: "Sem. Muy seca x2", times: "20 horas\n8 horas", flavor: "Seco", color: "Azul" },
    { name: "Baya Yapati", usage: "Al estar equipada, sube automáticamente 2 niveles el Ataque Especial al llegar al 25% de los PS", combination: "Sem. Muy picante x1 + Sem. Muy amarga x1 + Sem. Ácida x1", times: "67 horas\n8 horas", flavor: "-", color: "- (Creará un PokeCubo gris)" },
    { name: "Baya Yecana", usage: "Al estar equipada, baja a la mitad el daño de un ataque super efectivo de tipo Bicho.", combination: "Sem. Muy picante x1 + Sem. Muy ácida x1", times: "42 horas\n8 horas", flavor: "Picante", color: "Rojo" },
    { name: "Baya Zanama", usage: "Al estar equipada, si los PP de un movimiento llegan a 0, restaurará 10 PP de dicho movimiento (o los máximos, en caso de no llegar a 10)\nSe puede usar sobre un movimiento de un Pokemon para restaurar 10 PP de dicho movimiento (O hasta el límite, en caso de no haberse consumido mas de 10 PP o tener un límite inferior a 10PP) dentro o fuera de combate.", combination: "Sem. Muy picante x1 + Sem. Dulce x1 + Sem. Amarga x1", times: "20 horas\n8 horas", flavor: "-", color: "- (Creará un PokeCubo gris)" },
    { name: "Baya Zidra", usage: "Al estar equipada, restaura 25% de los PS máximos al llegar a los 50% PS o menos de vida.", combination: "Sem. Muy dulce x1 + Sem. Muy amarga x1 + Sem. Muy ácida x1", times: "44 horas\n8 horas", flavor: "-", color: "- (Creará un PokeCubo gris)" },
    { name: "Baya Ziuela", usage: "Al estar equipada, cura automáticamente de cualquier problema de estado (Quemadura, Parálisis, Envenenamiento normal o grave, Sueño o Congelamiento) al pokemon apenas se le aplique uno.\nSe puede usar sobre un Pokemon para curar cualquier problema de estado (Quemadura, Parálisis, Envenenamiento normal o grave, Sueño o Congelamiento) dentro o fuera de combate", combination: "Sem. Muy picante x1 + Sem. Muy seca x1 + Sem. Muy dulce x1", times: "44 horas\n8 horas", flavor: "-", color: "- (Creará un PokeCubo gris)" },
    { name: "Baya Zonlan", usage: "Al estar equipada, sube automáticamente dos niveles la probabilidad de golpe crítico por un turno, al bajar su vida a 25% o menos de los PS máximos, pero vuelve a la normalidad al acabar el turno.", combination: "Sem. Muy picante x1 + Sem. Muy dulce x1 + Sem. Muy ácida x1", times: "67 horas\n3 horas", flavor: "-", color: "- (Creará un PokeCubo gris)" },
    { name: "Baya Zreza", usage: "Al estar equipada, cura de la parálisis automáticamente al pokemon apenas se paralice.\nSe puede usar sobre un Pokemon para curar la parálisis dentro o fuera de combate", combination: "Sem. Muy picante x1 + Sem. Picante x1\nSem. Picante x3", times: "16 horas\n8 horas", flavor: "Picante", color: "Rojo" }
];

// --- LÓGICA DE LA APLICACIÓN ---

// --- CONFIGURACIÓN LOCAL (SIN SERVIDOR) ---

const STORAGE_KEY = 'pokemmo_gym_progress';
let userProgress = {};
let pendingSeedData = null; // Variable temporal para guardar datos mientras el modal está abierto

// Cargar progreso desde LocalStorage
async function loadProgress() {
    userProgress = {};
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) userProgress = JSON.parse(stored);
}

// Guardar progreso en LocalStorage
async function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userProgress));
}

// Generar ID único para cada gimnasio
function getGymId(regionName, leaderName) {
    return `${regionName}-${leaderName}`.replace(/\s+/g, '-').toLowerCase();
}

// Función para calcular qué legendario errante toca según el mes (1-12)
function getRoamingLegendaries(month) {
    // Rotación Kanto: Zapdos -> Moltres -> Articuno
    const kantoRotation = ["Zapdos", "Moltres", "Articuno"];
    
    // Rotación Johto: Entei -> Suicune -> Raikou
    const johtoRotation = ["Entei", "Suicune", "Raikou"];

    // Calculamos el índice (0, 1 o 2) basado en el mes
    // (Mes - 1) % 3 asegura que Enero (1) sea índice 0
    const index = (month - 1) % 3;

    return {
        kanto: kantoRotation[index],
        johto: johtoRotation[index]
    };
}

// Función para actualizar los datos de encuentros con los legendarios del mes actual
function updateEncountersData() {
    const date = new Date();
    const currentMonth = date.getMonth() + 1; // Obtener mes actual (1-12)
    const monthName = date.toLocaleString('es-ES', { month: 'long' });
    const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);
    
    const legendaries = getRoamingLegendaries(currentMonth);

    // Actualizar la tarjeta del mes (Índice 0 en encountersData)
    encountersData[0].name = capitalizedMonth;
    encountersData[0].gyms = [
        {
            city: "Kanto",
            leader: legendaries.kanto,
            id: `${legendaries.kanto.toLowerCase()}-kanto`,
            type: "encounter"
        },
        {
            city: "Johto",
            leader: legendaries.johto,
            id: `${legendaries.johto.toLowerCase()}-johto`,
            type: "encounter"
        }
    ];
}

// Alternar estado del gimnasio
function toggleGym(regionName, gymData, element) {
    const uniqueId = gymData.id || gymData.leader;
    const id = getGymId(regionName, uniqueId);
    
    if (gymData.type === 'seed-plant') {
        if (!userProgress[id]) {
            // Capture selected berry from dropdown
            const select = element.querySelector('.gym-berry-select');
            let selectedBerry = "Semilla Genérica";
            if (select) {
                if (select.value === "") {
                    alert("Por favor, selecciona una baya primero.");
                    return; // Stop if no berry selected
                }
                selectedBerry = select.value;
            }
            pendingSeedData = { regionName, gymData, berryName: selectedBerry };
            openSeedModal();
        } else {
            // Si se desmarca plantar, borramos todo el ciclo
            delete userProgress[id];
            if (gymData.nextId) {
                // Limpieza dinámica de pasos siguientes basada en nextId
                let currentNextId = gymData.nextId;
                const regionData = seedsData.find(r => r.name === regionName);
                
                while (currentNextId && regionData) {
                    const nextGym = regionData.gyms.find(g => g.id === currentNextId);
                    if (nextGym) {
                        const nextFullId = getGymId(regionName, nextGym.id);
                        delete userProgress[nextFullId];
                        currentNextId = nextGym.nextId;
                    } else {
                        break;
                    }
                }
            }
        }
    } else if (gymData.type === 'seed-water') {
        if (userProgress[id]) {
            delete userProgress[id];
            // Si se desmarca riego, borramos cosecha
            const harvestId = getGymId(regionName, "spicy-seeds-harvest");
            delete userProgress[harvestId];
        } else {
            userProgress[id] = { timestamp: new Date().toISOString() };
        }
    } else if (gymData.type === 'seed-harvest') {
        // Al recoger, reiniciamos todo el ciclo
        const plantId = getGymId(regionName, gymData.rootId);
        const waterId = getGymId(regionName, gymData.prevId);
        delete userProgress[id];
        delete userProgress[waterId];
        delete userProgress[plantId];
    } else {
        // Lógica normal de gimnasios
        if (userProgress[id]) {
            delete userProgress[id];
        } else {
            userProgress[id] = {
                timestamp: new Date().toISOString()
            };
        }
    }
    
    saveProgress();
    renderApp(); // Re-renderizamos para mostrar la fecha actualizada
}

// Actualizar temporizadores
function updateTimers() {
    const timers = document.querySelectorAll('.gym-timer[data-timestamp]');
    const now = new Date().getTime();
    const idsToReset = [];

    timers.forEach(timer => {
        const timestamp = timer.getAttribute('data-timestamp');
        const cooldown = parseInt(timer.getAttribute('data-cooldown') || 18);
        if (!timestamp) return;

        const date = new Date(timestamp);
        const resetTime = date.getTime() + (cooldown * 60 * 60 * 1000);
        const timeLeft = resetTime - now;

        if (timeLeft > 0) {
            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            const prefix = timer.getAttribute('data-prefix') || '⏳';
            timer.innerHTML = `${prefix} ${hours}h ${minutes}m ${seconds}s`;
            timer.classList.remove('ready');
        } else {
            // Auto-reset para Gimnasios y Alto Mando
            if (timer.getAttribute('data-auto-reset') === 'true') {
                idsToReset.push(timer.getAttribute('data-gym-id'));
            } else {
                // Solo actuar si el temporizador acaba de terminar (para semillas u otros sin auto-reset)
                if (!timer.classList.contains('ready')) {
                    const readyLabel = timer.getAttribute('data-ready-label') || 'Disponible';
                    timer.innerHTML = `✅ ${readyLabel}`;
                    timer.classList.add('ready');
                    
                    // Habilitar el siguiente paso visualmente si existe
                    const currentGymId = timer.getAttribute('data-gym-id');
                    if (currentGymId) {
                        const nextStageItem = document.querySelector(`.gym-item[data-prev-id="${currentGymId}"]`);
                        if (nextStageItem) {
                            nextStageItem.classList.remove('disabled');
                        }
                    }
                }
            }
        }
    });

    // Procesar resets automáticos
    if (idsToReset.length > 0) {
        let changed = false;
        idsToReset.forEach(id => {
            if (userProgress[id]) {
                delete userProgress[id];
                changed = true;
            }
        });
        if (changed) {
            saveProgress();
            renderApp();
        }
    }
}

// Helper para crear el elemento HTML de un gimnasio/entrenador
function createGymItem(regionName, gym) {
    const uniqueId = gym.id || gym.leader;
    const gymId = getGymId(regionName, uniqueId);
    const progressData = userProgress[gymId];
    const isCompleted = !!progressData;
    
    let cooldown = gym.duration || gym.cooldown || 18;
    let prefix = gym.timerPrefix || '⏳';
    let readyLabel = gym.readyLabel || 'Disponible';
    let isDisabled = false;

    // Lógica de dependencias para semillas (Deshabilitar si no es el momento)
    if (gym.prevId) {
        const prevGymId = getGymId(regionName, gym.prevId);
        const prevProgress = userProgress[prevGymId];
        
        if (!prevProgress) {
            isDisabled = true;
        } else if (gym.waitHours) {
            // Verificar si ha pasado el tiempo necesario desde el paso anterior
            const prevDate = new Date(prevProgress.timestamp);
            const now = new Date();
            const elapsedHours = (now - prevDate) / (1000 * 60 * 60);
            if (elapsedHours < gym.waitHours) {
                isDisabled = true;
            }
        }
    }

    const item = document.createElement('li');
    item.className = `gym-item ${isCompleted ? 'completed' : ''} ${isDisabled ? 'disabled' : ''}`;
    
    // Evento Click
    item.onclick = (e) => {
        toggleGym(regionName, gym, item);
    };
    
    // Atributos para encadenamiento
    const fullId = getGymId(regionName, uniqueId);
    item.setAttribute('data-gym-id', fullId);
    if (gym.prevId) {
        const prevFullId = getGymId(regionName, gym.prevId);
        item.setAttribute('data-prev-id', prevFullId);
    }

    // Formatear fecha si existe (Hora Española)
    let dateHtml = '';
    if (isCompleted && progressData.timestamp) {
        const date = new Date(progressData.timestamp);
        const dateStr = date.toLocaleString('es-ES', {
            timeZone: 'Europe/Madrid',
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });

        // Calcular hora final
        const endTime = new Date(date.getTime() + (cooldown * 60 * 60 * 1000));
        const endTimeStr = endTime.toLocaleString('es-ES', {
            timeZone: 'Europe/Madrid',
            hour: '2-digit', minute: '2-digit'
        });

        // Determinar si debe reiniciarse automáticamente (Gimnasios y Alto Mando no tienen 'type')
        const shouldAutoReset = !gym.type;

        dateHtml = `
            <div class="gym-status-right">
                <p class="gym-timer" data-timestamp="${progressData.timestamp}" data-cooldown="${cooldown}" data-gym-id="${gymId}"
                   data-prefix="${prefix}" data-ready-label="${readyLabel}" ${shouldAutoReset ? 'data-auto-reset="true"' : ''}></p>
                <p class="gym-date">📅 ${dateStr}</p>
                <p class="gym-end-time">🏁 Fin: ${endTimeStr}</p>
            </div>`;
    }

    // Determinar qué mostrar en la info (Líder o Cantidad de semillas)
    let infoText = `<p>Líder: ${gym.leader}</p>`;
    if (gym.type === 'seed-plant') {
        if (isCompleted) {
            // If planted, show the berry name and count
            const berryName = progressData.berryName || "Semilla";
            infoText = `<p><strong>${berryName}</strong></p><p>Semillas: ${progressData.count}</p>`;
        } else {
            // If not planted, show dropdown
            // Sort berries alphabetically
            const sortedBerries = [...berriesData].sort((a, b) => a.name.localeCompare(b.name));
            let options = `<option value="">-- Elegir Baya --</option>`;
            sortedBerries.forEach(b => {
                options += `<option value="${b.name}">${b.name}</option>`;
            });
            
            infoText = `
                <select class="gym-berry-select" onclick="event.stopPropagation()">
                    ${options}
                </select>
            `;
        }
    } else if (gym.type === 'seed-water' || gym.type === 'seed-harvest') {
        infoText = ''; // Ocultar texto de líder para pasos intermedios
    }

    // Lógica de imagen (si existe la propiedad 'image' en los datos)
    let imageHtml = '';
    if (gym.image) {
        imageHtml = `<img src="../img/${gym.image}" alt="${gym.city}" class="gym-image">`;
    }

    // Botón Puzzle para Sabrina
    let puzzleBtn = '';
    if (gym.leader === 'Sabrina') {
        puzzleBtn = ` <button onclick="event.stopPropagation(); showImageModal('../img/Sabrina_puzzle.jpg')" style="border: none; background: none; cursor: pointer; font-size: 1.1rem; vertical-align: middle;" title="Ver solución">🧩</button>`;
    }

    // HTML interno del item
    item.innerHTML = `
        <div class="checkbox-wrapper">
            <div class="custom-checkbox"></div>
        </div>
        ${imageHtml}
        <div class="gym-info">
            <h3>${gym.city}${puzzleBtn}</h3>
            ${infoText}
        </div>
        ${dateHtml}
    `;
    
    return item;
}

// Helper para crear el elemento de Encuentros
function createEncounterItem(regionName, gym) {
    const item = document.createElement('li');
    item.className = 'gym-item';
    
    // Imagen personalizada para Legendarios
    let pokemonGif = '';
    const legendaries = ['Zapdos', 'Moltres', 'Articuno', 'Entei', 'Suicune', 'Raikou'];
    if (legendaries.includes(gym.leader)) {
        pokemonGif = `<div style="margin-top: 5px;"><img src="../img/${gym.leader.toLowerCase()}.gif" alt="${gym.leader}" style="height: 90px;" onerror="this.style.display='none'"></div>`;
    }

    item.innerHTML = `
        <div class="gym-info">
            <h3>${gym.leader}</h3>
            ${pokemonGif}
            <p>Región: ${gym.city}</p>
        </div>
    `;
    
    return item;
}

// Renderizar la interfaz
function renderApp() {
    const appContainer = document.getElementById('app');
    if (!appContainer) return; // Evitar error en index.html

    appContainer.innerHTML = ''; // Limpiar

    // Determinar qué datos mostrar según la URL
    let currentData = [];
    let maxSlots = 8; // Por defecto para gimnasios
    const path = window.location.pathname.toLowerCase();

    if (path.includes('rotacionlegendarios')) {
        currentData = encountersData;
        maxSlots = 2; // Igualar altura (2 slots para legendarios, 1+1 para shiny)
    } else if (path.includes('altomandotracker')) {
        currentData = eliteFourData;
        maxSlots = 1; // El Alto Mando es 1 combate (run completa)
    } else if (path.includes('semillas')) {
        currentData = seedsData;
        maxSlots = 1; 
    } else {
        currentData = gymsData;
    }

    currentData.forEach(region => {
        // Crear tarjeta de región
        const card = document.createElement('div');
        card.className = 'region-card';

        // Header de la región
        const header = document.createElement('div');
        header.className = 'region-header';
        
        header.innerHTML = `${region.name}`;
        card.appendChild(header);

        // Lista de gimnasios
        const list = document.createElement('ul');
        list.className = 'gym-list';
        
        if (path.includes('rotacionlegendarios')) {
            list.classList.add('horizontal-layout');
            card.classList.add('wide-card');
        }

        region.gyms.forEach(gym => {
            if (gym.type === 'encounter') {
                list.appendChild(createEncounterItem(region.name, gym));
            } else {
                list.appendChild(createGymItem(region.name, gym));
            }
        });

        // Rellenar huecos visuales para mantener la altura homogénea
        if (region.gyms.length < maxSlots) {
            for (let i = region.gyms.length; i < maxSlots; i++) {
                const placeholder = document.createElement('li');
                placeholder.className = 'gym-item placeholder';
                placeholder.innerHTML = `
                    <div class="checkbox-wrapper" style="visibility: hidden;"></div>
                    <div class="gym-info"><h3 style="color: #ddd;">---</h3></div>
                `;
                list.appendChild(placeholder);
            }
        }

        card.appendChild(list);

        // Añadir el botón de reinicio dentro de la tarjeta del Huerto en la página de semillas
        if (path.includes('semillas') && region.name === "Huerto") {
            const footer = document.createElement('div');
            footer.className = 'region-card-footer';
            
            const resetButton = document.createElement('button');
            resetButton.className = 'btn-reset'; // Reutilizamos la clase para el estilo
            resetButton.textContent = 'Reiniciar Huerto';
            // La función showResetModal ya sabe qué borrar según la página
            resetButton.addEventListener('click', showResetModal);
            
            footer.appendChild(resetButton);
            card.appendChild(footer);
        }

        // Renderizar Entrenadores Especiales (si existen)
        if (region.specialTrainers && region.specialTrainers.length > 0) {
            appContainer.appendChild(card);

            const specialBox = document.createElement('div');
            specialBox.className = 'special-trainers-box standalone';
            
            const specialHeader = document.createElement('div');
            specialHeader.className = 'region-header';
            specialHeader.innerHTML = `Combates Especiales`;
            specialBox.appendChild(specialHeader);
            
            const specialList = document.createElement('ul');
            specialList.className = 'gym-list';
            
            region.specialTrainers.forEach(trainer => {
                specialList.appendChild(createGymItem(region.name, trainer));
            });
            
            specialBox.appendChild(specialList);
            appContainer.appendChild(specialBox);
        } else {
            appContainer.appendChild(card);
        }
    });

    // Actualizar timers inmediatamente tras renderizar
    updateTimers();
}

// Renderizar la información de las bayas
function renderBerryInfo() {
    const container = document.getElementById('berry-info-container');
    if (!container) return;

    container.innerHTML = ''; // Limpiar contenido previo
 
    const card = document.createElement('div');
    card.className = 'region-card';
 
    const header = document.createElement('div');
    header.className = 'region-header';
    header.textContent = 'Información sobre Bayas';
    card.appendChild(header);
 
    // Wrapper for select and result
    const wrapper = document.createElement('div');
    wrapper.className = 'berry-selector-wrapper';
 
    // Create select dropdown
    const select = document.createElement('select');
    select.className = 'berry-select';
    select.innerHTML = `<option value="">Seleccione una baya...</option>`;
 
    // Sort berries alphabetically by name
    const sortedBerries = [...berriesData].sort((a, b) => a.name.localeCompare(b.name));
 
    sortedBerries.forEach(berry => {
        select.innerHTML += `<option value="${berry.name}">${berry.name}</option>`;
    });
 
    // Create container for the selected berry's info
    const infoContainer = document.createElement('div');
    infoContainer.id = 'selected-berry-info';
    infoContainer.className = 'berry-content-display';
    // Ensure it has content initially to respect min-height
    infoContainer.innerHTML = '<p style="text-align:center; color:#999; margin-top: 100px;">Selecciona una baya para ver su información</p>';
 
    const generateImageName = (name) => {
        return name.toLowerCase().replace('baya ', 'baya_').replace(/\s+/g, '_') + '.png';
    };
 
    // Event listener for the select
    select.addEventListener('change', (event) => {
        const selectedName = event.target.value;
 
        if (selectedName) {
            const berry = berriesData.find(b => b.name === selectedName);
            if (berry) {
                const finalImageName = generateImageName(berry.name);
 
                let contentHTML = `
                    <div class="selected-berry-header">
                        <img src="../img/${finalImageName}" alt="${berry.name}" class="berry-image" onerror="this.src='../img/semilla_picante.png'; this.style.filter='grayscale(1)';">
                        <span class="berry-name">${berry.name}</span>
                    </div>
                    <div class="selected-berry-details">
                `;
                if (berry.usage) contentHTML += `<h4>Uso/Efecto directo</h4><p>${berry.usage}</p>`;
                if (berry.combination) contentHTML += `<h4>Combinación</h4><p>${berry.combination}</p>`;
                if (berry.times) contentHTML += `<h4>Tiempos</h4><p>${berry.times}</p>`;
                if (berry.flavor) contentHTML += `<h4>Sabor</h4><p>${berry.flavor}</p>`;
                if (berry.color) contentHTML += `<h4>Color</h4><p>${berry.color}</p>`;
                contentHTML += `</div>`;
                
                infoContainer.innerHTML = contentHTML;
                // infoContainer.style.display = 'block'; // Already block via CSS
            }
        } else {
            // Reset to placeholder
            infoContainer.innerHTML = '<p style="text-align:center; color:#999; margin-top: 100px;">Selecciona una baya para ver su información</p>';
        }
    });
 
    wrapper.appendChild(select);
    wrapper.appendChild(infoContainer);
    card.appendChild(wrapper);
    container.appendChild(card);
}

// --- NAVEGACIÓN ---
async function loadNav() {
    const placeholder = document.getElementById('nav-placeholder');
    if (!placeholder) return;

    try {
        const response = await fetch('nav.html');
        if (response.ok) {
            placeholder.innerHTML = await response.text();
        } else {
            console.error(`Error cargando nav.html: ${response.status}. Verifica si el archivo en Git se llama 'Nav.html' (mayúscula) en lugar de 'nav.html'.`);
        }
    } catch (error) {
        console.error("Error cargando navegación (posiblemente por protocolo file://):", error);
        // Fallback visual si falla la carga local
        placeholder.innerHTML = '<div style="text-align:center; padding:10px; background:#eee;">Menú no cargado (requiere servidor local)</div>';
    }
}

// Funciones del Modal
function showResetModal() {
    document.getElementById('modal-overlay').classList.add('active');
    const modal = document.getElementById('modal-overlay');
    
    const path = window.location.pathname.toLowerCase();
    // Lógica específica para la página de encuentros
    if (path.includes('rotacionlegendarios')) {
        const content = modal.querySelector('.modal-content');
        
        // Generar botones dinámicamente según las regiones disponibles en encountersData
        let buttonsHtml = '';
        encountersData.forEach(region => {
            const safeId = region.name.replace(/\s+/g, '-').toLowerCase();
            buttonsHtml += `<button class="btn-modal btn-confirm" id="reset-${safeId}">${region.name}</button>`;
        });

        content.innerHTML = `
            <h3>Reiniciar Encuentros</h3>
            <p>Selecciona la región a reiniciar:</p>
            <div class="modal-actions" style="flex-wrap: wrap; gap: 10px;">
                <button class="btn-modal btn-cancel" id="modal-cancel-dynamic">Cancelar</button>
                ${buttonsHtml}
            </div>
        `;
        
        // Asignar eventos a los nuevos botones
        document.getElementById('modal-cancel-dynamic').onclick = hideResetModal;
        encountersData.forEach(region => {
            const safeId = region.name.replace(/\s+/g, '-').toLowerCase();
            const btn = document.getElementById(`reset-${safeId}`);
            if (btn) btn.onclick = () => resetSpecificRegion(region.name);
        });
    }
    
    modal.classList.add('active');
}

function hideResetModal() {
    document.getElementById('modal-overlay').classList.remove('active');
}

function resetSpecificRegion(regionName) {
    const region = encountersData.find(r => r.name === regionName);
    if (region) {
        region.gyms.forEach(item => {
            const uniqueId = item.id || item.leader;
            const id = getGymId(region.name, uniqueId);
            delete userProgress[id];
        });
        saveProgress();
        renderApp();
    }
    hideResetModal();
}

function confirmReset() {
    // Determinar qué datos corresponden a la página actual para borrar solo esos
    let currentData = [];
    const path = window.location.pathname.toLowerCase();
    if (path.includes('altomandotracker')) {
        currentData = eliteFourData;
    } else if (path.includes('semillas')) {
        currentData = seedsData;
    } else if (path.includes('rotacionlegendarios')) {
        currentData = encountersData;
    } else {
        currentData = gymsData;
    }

    // Borrar solo las claves asociadas a los datos de la página actual
    currentData.forEach(region => {
        region.gyms.forEach(item => {
            const uniqueId = item.id || item.leader;
            const id = getGymId(region.name, uniqueId);
            delete userProgress[id];
        });

        if (region.specialTrainers) {
            region.specialTrainers.forEach(trainer => {
                const uniqueId = trainer.id || trainer.leader;
                const id = getGymId(region.name, uniqueId);
                delete userProgress[id];
            });
        }
    });

    saveProgress();
    renderApp();
    hideResetModal();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- MODAL DE IMAGEN ---
function setupImageModal() {
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

window.showImageModal = function(src) {
    const modal = document.getElementById('img-modal-overlay');
    const img = document.getElementById('img-modal-target');
    if (modal && img) {
        img.src = src;
        modal.classList.add('active');
    }
};

// --- FUNCIONES MODAL SEMILLAS ---
function openSeedModal() {
    const modal = document.getElementById('seed-modal');
    if (modal) modal.classList.add('active');
    // Enfocar el input
    const input = document.getElementById('seed-input');
    if (input) setTimeout(() => input.focus(), 100);
}

function closeSeedModal() {
    const modal = document.getElementById('seed-modal');
    if (modal) modal.classList.remove('active');
    // Limpiar
    const input = document.getElementById('seed-input');
    if (input) input.value = '';
    const error = document.getElementById('seed-error');
    if (error) error.style.display = 'none';
    pendingSeedData = null;
}

function handleSeedSubmit() {
    const input = document.getElementById('seed-input');
    if (!input) return;

    // validateSeedInput está en validations.js
    let validation = { valid: false, message: "Error de validación" };
    
    if (typeof validateSeedInput === 'function') {
        validation = validateSeedInput(input.value);
    } else {
        console.error("Error: validateSeedInput no existe. Verifica que 'validaciones.js' se haya cargado correctamente.");
        validation = { valid: false, message: "Error interno: No se pudo cargar el validador." };
    }

    if (!validation.valid) {
        const error = document.getElementById('seed-error');
        if (error) {
            error.textContent = validation.message;
            error.style.display = 'block';
        }
        return;
    }

    // Si es válido, procedemos a guardar
    if (pendingSeedData) {
        const { regionName, gymData, berryName } = pendingSeedData;
        const uniqueId = gymData.id || gymData.leader;
        const id = getGymId(regionName, uniqueId);
        
        userProgress[id] = {
            timestamp: new Date().toISOString(),
            count: parseInt(input.value),
            berryName: berryName // Save the berry name
        };
        
        saveProgress();
        renderApp();
    }
    
    closeSeedModal();
}

// --- GESTIÓN DE DATOS (EXPORTAR/IMPORTAR) ---
function setupAuthUI() {
    const header = document.querySelector('header');
    if (!header) return;

    let userContainer = document.getElementById('user-auth-container');
    if (!userContainer) {
        userContainer = document.createElement('div');
        userContainer.id = 'user-auth-container';
        userContainer.style.position = 'absolute';
        userContainer.style.top = '50%';
        userContainer.style.right = '20px';
        userContainer.style.transform = 'translateY(-50%)';
        userContainer.style.display = 'flex';
        userContainer.style.gap = '10px';
        header.appendChild(userContainer);
        header.style.position = 'relative';
    }

    userContainer.innerHTML = '';

    // Botón Exportar
    const btnExport = document.createElement('button');
    btnExport.textContent = '💾 Guardar Archivo';
    btnExport.className = 'btn-data';
    btnExport.style.padding = '5px 10px';
    btnExport.style.fontSize = '0.8rem';
    btnExport.onclick = exportData;

    // Botón Importar
    const btnImport = document.createElement('button');
    btnImport.textContent = '📂 Cargar Archivo';
    btnImport.className = 'btn-data';
    btnImport.style.padding = '5px 10px';
    btnImport.style.fontSize = '0.8rem';
    btnImport.style.backgroundColor = '#4CAF50';
    btnImport.onclick = () => document.getElementById('import-file').click();

    // Input oculto para importar
    const inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.id = 'import-file';
    inputFile.accept = '.json';
    inputFile.style.display = 'none';
    inputFile.onchange = importData;

    userContainer.appendChild(btnExport);
    userContainer.appendChild(btnImport);
    userContainer.appendChild(inputFile);
}

function exportData() {
    const dataStr = JSON.stringify(userProgress, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `pokemmo_tracker_backup_${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            userProgress = data;
            saveProgress();
            renderApp();
            alert('Datos cargados correctamente.');
        } catch (error) {
            console.error("Error al leer el archivo:", error);
            alert('Error al leer el archivo. Asegúrate de que es un JSON válido.');
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', async () => {
    loadNav();
    setupImageModal();
    
    // Actualizar datos de encuentros solo una vez al cargar
    const path = window.location.pathname.toLowerCase();
    if (path.includes('rotacionlegendarios')) {
        updateEncountersData();
    }

    // Iniciar aplicación local
    setupAuthUI();
    await loadProgress();
    renderApp();
    
    // Renderizar información de bayas si estamos en la página de semillas
    if (path.includes('semillas')) {
        renderBerryInfo();
    }

    // Actualizar temporizadores cada segundo (1000 ms)
    setInterval(updateTimers, 1000);
    
    // Asignar evento al botón de reset
    const resetBtn = document.getElementById('btn-reset');
    if(resetBtn) {
        resetBtn.addEventListener('click', showResetModal);
    }

    // Eventos del modal
    const modalCancel = document.getElementById('modal-cancel');
    if (modalCancel) {
        modalCancel.addEventListener('click', hideResetModal);
    }
    const modalConfirm = document.getElementById('modal-confirm');
    if (modalConfirm) {
        modalConfirm.addEventListener('click', confirmReset);
    }

    // Eventos del modal de semillas (solo si existe en la página)
    const seedConfirmBtn = document.getElementById('seed-confirm');
    if (seedConfirmBtn) {
        seedConfirmBtn.addEventListener('click', handleSeedSubmit);
        const seedCancelBtn = document.getElementById('seed-cancel');
        if (seedCancelBtn) {
            seedCancelBtn.addEventListener('click', closeSeedModal);
        }
    }
});
