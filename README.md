# API inventory-api
## Prerrequisitos

1. Git
2. Node js 22.3.0 or later
3. Base de datos mysql creada

## Configuración inicial

1.  Abrir en consola ubicación donde va alojar el repositorio
2. `git clone https://github.com/Jhoancanchila/inventory-api.git`
3. `cd inventory-api/`
4. `npm install`

## Configuración variables de entorno

1. `Ubicar el archivo .env.example en la raiz del proyecto`
2. Renombrar este archivo por .env y asignar el valor a acada una de las variables
3. Lanzar servidor: `npm run dev`

## Comandos Git

1. `git status` Muestra el estado de los archivos dentro del repositorio.
2. `git add NombreArchivo` Agrega el archivo del Directorio al Staging Area.
2. `git add -A` Agrega todos los archivos al Staging Area.
3. `git commit -m "Mensaje"` Toma los archivos del Staging Area y realiza el commit.
4. `git branch NombreRama` Crea una nueva rama para el proyecto.
5. `git branch -l` Lista las ramas del proyecto.
6. `git branch -D NombreRama` Elimina la rama del proyecto.
7. `git branch -m NombreActualRama NuevoNombreRama` Renombra una rama.
8. `git checkout NombreRama` Para moverse entre ramas.
9. `git merge NombreRamaAUnir` Permite unir los commits de una rama a la rama en la que se encuentra.
10. `git pull origin NombreRama` Descarga los cambios de GitHub.
11. `git push origin NombreRama` Sube los cambios a GitHub.
