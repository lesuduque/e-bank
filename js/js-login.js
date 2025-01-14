export const usuarios = [
    {
        nombre: "José",
        apellido: "Sosa",
        user: "josesosa",
        pass: "12345",
        saldo: 4000000
    },
    {
        nombre: "Susana",
        apellido: "",
        user: "lennysusana",
        pass: "54321",
        saldo: 3000000
    },
    {
        nombre: "Santiago",
        apellido: "Misas",
        user: "misas_mouse",
        pass: "2468",
        saldo: 2500000
    },
    {
        nombre: "Xiomara",
        apellido: "Guzman",
        user: "XiomiGuzman",
        pass: "2468",
        saldo: 2300000
    },
    {
        nombre: "Natalia",
        apellido: "Mafla",
        user: "NataMafla",
        pass: "2468",
        saldo: 1500000
    },
    {
        nombre: "Juliana",
        apellido: "Rios",
        user: "julirios",
        pass: "abc123",
        saldo: 15000000
    }
];

const expresionRegular = {
    usuario: /^[a-zA-Z0-9\_]{4,16}$/, // Letras, numeros, guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
}

const campos = {
    user: false,
    pass: false,
};

const usuario = document.querySelector('#usuario');
const contrasena = document.querySelector('#contrasena');
let errorIcono;
function mensajeError(mensaje) {
    const mensajeError = document.querySelector("#mensaje-error");
    // errorIcono = document.getElementById("#error-img");
    mensajeError.classList.add('text-white', 'fw-bold');
    mensajeError.textContent = mensaje;
    // errorIcono.src = "../img/icon/incorrecto.png";
}

export function mostrandoCorrecto(campo) {
    campo.classList.remove("border", "border-3", "border-danger");
    campo.classList.add("border", "border-3", "border-success");
}

export function mostrandoIncorrecto(campo) {
    campo.classList.remove("border", "border-3", "border-success");
    campo.classList.add("border", "border-3", "border-danger");
}

export function devolverNombre() {
    // let sw = false;
    let cadena = "";
    for (let i = 0; i < usuarios.length; i++) {
        if (usuario.value === usuarios[i].user) {
            // console.log("Usuario: " + usuario.value + "=" + usuarios[i].user + "Pass:" + contrasena.value + "=" + usuarios[i].pass);
            return usuarios[i].nombre + " " + usuarios[i].apellido;
        } else {
            // console.log("Usuario: " + usuario.value + "!=" + usuarios[i].user + " Pass:" + contrasena.value + "!=" + usuarios[i].pass);
        }
    }
}

function validarExpresiones(event, expresion, campo, nombreCampo) {
    if (expresion.test(event.target.value)) {//Validando la expresión regular
        console.log("Validación exitosa");
        mostrandoCorrecto(campo);
        console.log(devolverNombre());
        campos[nombreCampo] = true;

    } else {
        console.log("Validación errada");
        mostrandoIncorrecto(campo);
        campos[nombreCampo] = false;

    }
}

function limpiarCampos() {
    formulario.reset();
    campos.user = false;
    campos.pass = false;
}

const validarFormulario = (event) => {
    event.preventDefault();
    mensajeError("");
    // event.preventDefault();
    switch (event.target.name) {
        case "usuario":
            validarExpresiones(event, expresionRegular.usuario, usuario, "user");

            break;
        case "contrasena":
            validarExpresiones(event, expresionRegular.password, contrasena, "pass");
            break;
    }
};

const inputs = document.querySelectorAll("#login-form input");
inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);
});

function validarCredenciales() {
    let sw = false;
    for (let i = 0; i < usuarios.length; i++) {
        if (usuario.value === usuarios[i].user && contrasena.value === usuarios[i].pass) {
            // console.log("Usuario: " + usuario.value + "=" + usuarios[i].user + "Pass:" + contrasena.value + "=" + usuarios[i].pass);
            return sw = true;
        } else {
            // console.log("Usuario: " + usuario.value + "!=" + usuarios[i].user + " Pass:" + contrasena.value + "!=" + usuarios[i].pass);
        }
    }
    return sw;
}


const btnIniciar = document.querySelector('#btn-iniciar');
const formulario = document.querySelector('#login-form');
const intentoNuevo = document.querySelector('#intento-nuevo');
function intentosAgotados(contError) {
    let sectionAgotados = document.querySelector('#agotados h1');
    if (parseInt(contError) === 0) {
        formulario.classList.add('invisible');
        document.querySelector('.intentos-agotados').classList.remove('invisible');
        sectionAgotados.textContent = "La aplicación se ha cerrado porque ha agotado sus intentos. :( -Error Capa 8"
        intentoNuevo.textContent = ('Intente de nuevo');
    }
};
function iniciandoSesion() {
    document.querySelector('main').classList.add('invisible','hidden');
    document.querySelector('#contenedor').classList.remove('invisible');
    formulario.action = ('../index.html');
    document.querySelector('#img-cargando').src = '../img/logo_ebank.png';
    document.querySelector('#cargando').textContent = 'Iniciando Sesión...';
    setTimeout(() => {
        document.querySelector('#cargando').textContent = 'Danos un momento...Estamos preparando todo para ti';
        setTimeout(() => {
            document.querySelector('#cargando').textContent = '¡Bienvenido a tu banco ' + devolverNombre() + '! :)';
            setTimeout(() => {
                formulario.submit();
                limpiarCampos();
            }, 2000);
        }, 2500)

    }, 2000);

}

var contarErrores = 3;
btnIniciar.addEventListener('click', (event) => {

    if (campos.user == true && campos.pass == true) {
        event.preventDefault();
        if (validarCredenciales() == true) {
            // formulario.action = ('../index.html');
            // formulario.submit();
            iniciandoSesion();
        } else {
            event.preventDefault();
            contarErrores--;
            intentosAgotados(contarErrores);
            mensajeError("Usuario o Contraseña incorrectos, le quedan " + (contarErrores) + " intentos");
            mostrandoIncorrecto(usuario);
            mostrandoIncorrecto(contrasena);
            limpiarCampos();
        }
    } else {
        event.preventDefault();
        mensajeError("Campos vacíos o incorrectos");
    }

});

