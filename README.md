# RetoHackathon

# Diagnóstico Ley 1581

Aplicación web para evaluar el nivel de cumplimiento de la Ley 1581 de Protección de Datos Personales mediante un cuestionario, con recomendaciones generadas por IA.

# CAVALTEC - Autodiagnóstico Ley 1581 de 2012

## Descripción del proyecto

CAVALTEC es una plataforma web orientada al *autodiagnóstico del cumplimiento de la Ley 1581 de 2012 (Protección de Datos Personales en Colombia)*.

El sistema permite que una empresa evalúe su nivel de cumplimiento mediante un formulario interactivo, obteniendo resultados que facilitan la identificación de oportunidades de mejora en la gestión y protección de datos personales.


# Flujo del sistema

## 1. Inicio de sesión (Login)

El usuario ingresa al sistema mediante sus credenciales registradas.

### Funcionalidades:
- Ingreso con usuario y contraseña.
- Validación de datos.
- Recuperación de contraseña.
- Acceso al registro de nuevos usuarios.


# 2. Registro de usuario

Permite crear una cuenta dentro de la plataforma.

### Datos solicitados:
- Nombre del responsable.
- Empresa.
- NIT.
- Número de identificación.
- Cargo.
- Área.
- Sector empresarial.
- Información de contacto.

### Objetivo:
Registrar al evaluador encargado de realizar el diagnóstico de cumplimiento.


# 3. Perfil del evaluador

Después del registro, el usuario puede visualizar y gestionar su información personal.

### Información mostrada:
- Datos básicos del evaluador.
- Información de la empresa.
- Perfil y rol dentro de la plataforma.


# 4. Landing Page

Página principal informativa del sistema.

### Contenido:
- Presentación de CAVALTEC.
- Explicación sobre la Ley 1581 de 2012.
- Información del proceso de evaluación.
- Botón de inicio del autodiagnóstico.

### Objetivo:
Orientar al usuario antes de iniciar la evaluación.


# 5. Autodiagnóstico (Formulario)

Módulo principal del sistema.

Permite evaluar el estado actual de la empresa frente al cumplimiento de la Ley 1581 de 2012.

### Características:
- Preguntas organizadas por categorías.
- Navegación entre preguntas.
- Respuestas tipo selección.
- Seguimiento del progreso.


# 6. Confirmación de salida

Si el usuario intenta abandonar el diagnóstico:

El sistema muestra una alerta:

"¿Seguro quieres regresar?"

Opciones:
- Continuar evaluación.
- Salir del formulario.


# 7. Dashboard 

Panel de resultados del autodiagnóstico.

Permitirá visualizar:

## Indicadores principales:
- Nivel de cumplimiento general.
- Porcentaje de avance.
- Resultado obtenido.
- Estado de cumplimiento de la Ley 1581.

## Visualizaciones:
- Gráficos de cumplimiento.
- Indicadores por categoría.
- Áreas con mayor oportunidad de mejora.

## Funcionalidades:
- Consulta de resultados.
- Seguimiento de evaluaciones.
- Recomendaciones personalizadas.


# Tecnologías utilizadas

Frontend:
- React
- Vite
- C#
- CSS
- JavaScript
- Azure b2c

Backend:
- ASP.NET Core Web API
- C#
- .NET (ASP.NET Core)
- Swagger
- DTO (Data Transfer Objects)
- Inyección de Dependencias
- Middleware personalizado
