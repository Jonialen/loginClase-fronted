document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm")
  const messageElement = document.getElementById("loginMessage")
  const backendUrl = "http://localhost:3000"

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    // Ocultar mensaje anterior
    messageElement.style.display = "none"
    messageElement.textContent = ""

    if (!username || !password) {
      messageElement.textContent = "Por favor completa todos los campos."
      messageElement.style.display = "block"
      return
    }

    try {
      const response = await fetch(`${backendUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (response.ok) {
        // Login exitoso
        localStorage.setItem("userId", data.userId)
        localStorage.setItem("username", username)

        // Mostrar mensaje de éxito brevemente antes de redirigir
        messageElement.textContent = "¡Inicio de sesión exitoso! Redirigiendo..."
        messageElement.classList.remove("error")
        messageElement.classList.add("success")
        messageElement.style.display = "block"

        // Redirigir después de un breve retraso
        setTimeout(() => {
          window.location.href = "profile.html"
        }, 1000)
      } else {
        // Error de login
        messageElement.textContent = `Error: ${data.error || "Usuario o contraseña inválidos"}`
        messageElement.classList.remove("success")
        messageElement.classList.add("error")
        messageElement.style.display = "block"

        localStorage.removeItem("userId")
        localStorage.removeItem("username")
      }
    } catch (error) {
      console.error("Error de login:", error)
      messageElement.textContent =
        "Error de conexión. Verifica tu conexión a internet o que el servidor esté funcionando."
      messageElement.classList.remove("success")
      messageElement.classList.add("error")
      messageElement.style.display = "block"

      localStorage.removeItem("userId")
      localStorage.removeItem("username")
    }
  })
})


