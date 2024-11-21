class Usuario {
  constructor(nombre, contraseña) {
    this.nombre = nombre;
    this.contraseña = contraseña;
  }
}

class Juego {
  constructor() {
    this.usuarios = [];
    this.usuarioActual = null;
    this.puntajeUsuario = 0;
    this.puntajeMaquina = 0;
  }

  registrarUsuario(nombre, contraseña) {
    const existe = this.usuarios.some((usuario) => usuario.nombre === nombre);
    if (existe) {
      alert("El usuario ya existe. Intenta con otro nombre.");
      return false;
    }
    this.usuarios.push(new Usuario(nombre, contraseña));
    alert("Usuario registrado con éxito.");
    return true;
  }

  iniciarSesion(nombre, contraseña) {
    const usuario = this.usuarios.find((usuario) => usuario.nombre === nombre);
    if (!usuario) {
      alert("La cuenta no existe. Por favor, regístrate.");
      return false;
    }
    if (usuario.contraseña !== contraseña) {
      alert("Contraseña incorrecta. Inténtalo nuevamente.");
      return false;
    }
    this.usuarioActual = usuario;
    return true;
  }

  jugar(eleccionUsuario) {
    const opciones = ["piedra", "papel", "tijeras"];
    const eleccionMaquina = opciones[Math.floor(Math.random() * 3)];
    let resultado = "";

    if (eleccionUsuario === eleccionMaquina) {
      resultado = "Empate";
    } else if (
      (eleccionUsuario === "piedra" && eleccionMaquina === "tijeras") ||
      (eleccionUsuario === "papel" && eleccionMaquina === "piedra") ||
      (eleccionUsuario === "tijeras" && eleccionMaquina === "papel")
    ) {
      resultado = "¡Ganaste!";
      this.puntajeUsuario++;
    } else {
      resultado = "Perdiste";
      this.puntajeMaquina++;
    }

    document.getElementById("puntajeUsuario").innerText = this.puntajeUsuario;
    document.getElementById("puntajeMaquina").innerText = this.puntajeMaquina;
    document.getElementById("resultado").innerText = `La máquina eligió ${eleccionMaquina}. ${resultado}`;
  }

  reiniciarPuntaje() {
    this.puntajeUsuario = 0;
    this.puntajeMaquina = 0;
    document.getElementById("puntajeUsuario").innerText = 0;
    document.getElementById("puntajeMaquina").innerText = 0;
  }
}

const juego = new Juego();


document.getElementById("btnIniciarSesion").addEventListener("click", () => {
  document.getElementById("formularioIniciarSesion").classList.add("activo");
  document.getElementById("formularioRegistrar").classList.remove("activo");
});

document.getElementById("btnRegistrarUsuario").addEventListener("click", () => {
  document.getElementById("formularioRegistrar").classList.add("activo");
  document.getElementById("formularioIniciarSesion").classList.remove("activo");
});


document.getElementById("btnEnviarRegistro").addEventListener("click", () => {
  const nombre = document.getElementById("usuarioRegistrar").value;
  const contraseña = document.getElementById("contraseñaRegistrar").value;
  if (nombre && contraseña) {
    juego.registrarUsuario(nombre, contraseña);
  } else {
    alert("Por favor, completa todos los campos.");
  }
});


document.getElementById("btnEnviarInicio").addEventListener("click", () => {
  const nombre = document.getElementById("usuarioIniciar").value;
  const contraseña = document.getElementById("contraseñaIniciar").value;
  if (juego.iniciarSesion(nombre, contraseña)) {
    document.getElementById("contenedorUsuario").classList.add("oculto");
    document.getElementById("contenedorJuego").classList.remove("oculto");
    alert(`¡Bienvenido, ${nombre}!`);
  }
});


document.querySelectorAll(".opcion").forEach((boton) => {
  boton.addEventListener("click", () => {
    const eleccion = boton.getAttribute("dataEleccion");
    juego.jugar(eleccion);
  });
});


document.getElementById("reiniciarPuntaje").addEventListener("click", () => {
  juego.reiniciarPuntaje();
});


document.getElementById("cerrarSesion").addEventListener("click", () => {
  juego.usuarioActual = null;
  document.getElementById("contenedorJuego").classList.add("oculto");
  document.getElementById("contenedorUsuario").classList.remove("oculto");
});