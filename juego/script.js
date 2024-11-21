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

    document.getElementById("puntaje-usuario").innerText = this.puntajeUsuario;
    document.getElementById("puntaje-maquina").innerText = this.puntajeMaquina;
    document.getElementById("resultado").innerText = `La máquina eligió ${eleccionMaquina}. ${resultado}`;
  }

  reiniciarPuntaje() {
    this.puntajeUsuario = 0;
    this.puntajeMaquina = 0;
    document.getElementById("puntaje-usuario").innerText = 0;
    document.getElementById("puntaje-maquina").innerText = 0;
  }
}

const juego = new Juego();

// Alternar entre formularios
document.getElementById("btn-iniciar-sesion").addEventListener("click", () => {
  document.getElementById("formulario-iniciar-sesion").classList.add("activo");
  document.getElementById("formulario-registrar").classList.remove("activo");
});

document.getElementById("btn-registrar-usuario").addEventListener("click", () => {
  document.getElementById("formulario-registrar").classList.add("activo");
  document.getElementById("formulario-iniciar-sesion").classList.remove("activo");
});

// Registro de usuario
document.getElementById("btn-enviar-registro").addEventListener("click", () => {
  const nombre = document.getElementById("usuario-registrar").value;
  const contraseña = document.getElementById("contraseña-registrar").value;
  if (nombre && contraseña) {
    juego.registrarUsuario(nombre, contraseña);
  } else {
    alert("Por favor, completa todos los campos.");
  }
});

// Inicio de sesión
document.getElementById("btn-enviar-inicio").addEventListener("click", () => {
  const nombre = document.getElementById("usuario-iniciar").value;
  const contraseña = document.getElementById("contraseña-iniciar").value;
  if (juego.iniciarSesion(nombre, contraseña)) {
    document.getElementById("contenedor-usuario").classList.add("oculto");
    document.getElementById("contenedor-juego").classList.remove("oculto");
    alert(`¡Bienvenido, ${nombre}!`);
  }
});

// Elección del juego
document.querySelectorAll(".opcion").forEach((boton) => {
  boton.addEventListener("click", () => {
    const eleccion = boton.getAttribute("data-eleccion");
    juego.jugar(eleccion);
  });
});

// Reiniciar puntaje
document.getElementById("reiniciar-puntaje").addEventListener("click", () => {
  juego.reiniciarPuntaje();
});

// Cerrar sesión
document.getElementById("cerrar-sesion").addEventListener("click", () => {
  juego.usuarioActual = null;
  document.getElementById("contenedor-juego").classList.add("oculto");
  document.getElementById("contenedor-usuario").classList.remove("oculto");
});
