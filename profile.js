document.addEventListener("DOMContentLoaded", async () => {
  const usernameDisplay = document.getElementById("usernameDisplay")
  const usernameDetail = document.getElementById("usernameDetail")
  const userIdDisplay = document.getElementById("userIdDisplay")
  const avatarInitial = document.getElementById("avatarInitial")
  const logoutButton = document.getElementById("logoutButton")
  const backendUrl = "http://localhost:3000"

  // Verificar si hay sesión activa
  const userId = localStorage.getItem("userId")
  const username = localStorage.getItem("username")

  if (!userId) {
    // No hay sesión, redirigir al login
    alert("No has iniciado sesión. Redirigiendo al login...")
    window.location.href = "index.html"
    return
  }

  // Mostrar información del usuario
  userIdDisplay.textContent = userId
  usernameDisplay.textContent = username || "Usuario"
  usernameDetail.textContent = username || "Usuario"

  // Mostrar inicial del nombre de usuario en el avatar
  if (username && username.length > 0) {
    avatarInitial.textContent = username.charAt(0).toUpperCase()
  } else {
    avatarInitial.textContent = "U"
  }

  // Configurar el botón de logout
  logoutButton.addEventListener("click", () => {
    // Limpiar localStorage
    localStorage.removeItem("userId")
    localStorage.removeItem("username")

    // Mostrar mensaje y redirigir
    alert("Has cerrado sesión correctamente.")
    window.location.href = "index.html"
  })
})


