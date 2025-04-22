- Pasos para correr el proyecto:

1. clonar el repositorio git clone https://github.com/stivenlozano/tenpo-challenge.git
2. Ejecutar npm install
3. Ejecutar npm run dev


- Definir la mejor forma bajo su criterio para mostrar la lista de la home
argumentando en unas pocas líneas su solución.

Respuesta//: La solución empleada para mostrar el total de registros en la home fue un scroll infinito, el cual irá interceptando un div referenciado que, al momento de aparecer en pantalla, realizará el llamado a la API y se irán mostrando registros continuamente.


- Proponer una mejora teórica sobre las llamadas usadas al backend para que nuestra app sea más eficiente.
Respuesta//: Utilizar algún sistema de caching en el backend podría reducir la carga en la base de datos si los mismos datos se solicitan con frecuencia.

