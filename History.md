Soy desarrollador Fox desde las primeras versiones (FoxPlus, FoxPro Unix, VFP desde el 5 hasta el 9). Siempre busqué un lenguaje para sustituir VFP, ya que tengo millones de líneas de código funcionando hasta la fecha en VFP con Postgres y MSSQL.

Exploré varios lenguajes para encontrar el ideal que me permitiera migrar toda esta programación. Evalué Python, Jython, Ruby, PHP, Lazarus, JavaScript, TypeScript, entre otros. Tengo formación en Ingeniería en Sistemas Computacionales, lleve las materias  en desarrollo de Lenguajes y Compiladores. Esto me llevó a buscar un lenguaje que permitiera crear un traductor desde VFP hacia ese nuevo lenguaje.

Decisión tomada:

Encontré que JavaScript o TypeScript tienen una estructura similar al lenguaje nativo de VFP (programación orientada a objetos que cumple con el paradigma orientado a objetos). Sin embargo, en su forma nativa solo se ejecuta en consola. Descubrí que utilizando un framework de programación web (Vue/Nuxt) se pueden desarrollar los objetos visuales equivalentes a los de VFP (EditBox, ComboBox, Spinners, Containers, Browse, etc.).

Lo que hice:

Aprendímos TypeScript, Vue y Nuxt.

Desarrollamos los objetos visuales de VFP de la manera más parecida en funcionamiento y apariencia.

Desarrollamos un BackEnd para manejar bases de datos MSSQL y Postgres.

Se crearon librerías para gestionar la base de datos de forma similar a como lo hace VFP con cursores, vistas remotas e instrucciones (usando funciones, ya que no encontré cómo extender las instrucciones de TypeScript): USE, USE NODATA, SQLEXEC, SCATTER, etc.

Desarrollamos un traductor de VFP a TypeScript en VFP.

Desarrollamos un traductor de los reportes en VFP a JASPER REPORTS

Desarrollamos un administrador de aplicaciones con menú y diseñador de bases de datos.

Lo que logré:

Programar en web sin la necesidad de aprender html y css utilizando solo TypeScript.

Que no he logrado: 

Un editor Visual grafico (GUI)  como lo tiene VFP. Todo se hace desde un editor de programación no visual en texto (VSCODE)

Conclusión: 

Ya he desarrollado 2 aplicaciones web cuyo código es 100% TypeScript. Actualmente estoy traduciendo todo mi ERP para PYME y grandes empresas (www.siavcom.com.mx). Esta tecnología la llamé Web-Ones y está registrada como open-source.

GitHub: https://github.com/siavcom/web-ones-technology/

DeepWiki: https://deepwiki.com/siavcom/web-ones-technology

Sitio web: http://web-ones-technology.xyz/

A la fecha, sigo mejorando este framework diariamente. Espero tener todo mi ERP traducido este año; actualmente llevo aproximadamente un 80%. La interfaz es similar a la de VFP y funciona de manera similar.

Resultado clave: Los usuarios de mis sistemas pueden migrar a esta nueva versión sin necesidad de ser capacitados para utilizar las nuevas herramientas.

Funciona en los navegadores web más comunes: Chrome, Firefox, Safari y Edge.

Pongo esta tecnología a disposición de la comunidad para que crezca y tener otra opción de desarrollo en las nuevas tecnologías web

Me pueden contactar por Microsoft Teams o correo electrónico: siavcom@hotmail.com.

Fernando Cuadras
