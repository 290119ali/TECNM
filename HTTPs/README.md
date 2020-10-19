# Metodos Https

## Introduccion

[HTTP](https://developer.mozilla.org/es/docs/Web/HTTP/Methods) define un conjunto de métodos de petición para indicar la acción que se desea realizar para un recurso determinado. Aunque estos también pueden ser sustantivos, estos métodos de solicitud a veces son llamados HTTP verbs. Cada uno de ellos implementan una semántica diferente, pero algunas características similares son compartidas por un grupo de ellos: ej. un request method puede ser safe, idempotent, o cacheable.


<img height="300" width="600" src="HTTP.jpg"> 

## Marco teorico

### Metodo GET

El método [HTTP GET](https://developer.mozilla.org/es/docs/Web/HTTP/Methods/GET) solicita una representación del recurso especificado. Las solicitudes que usan GET solo deben recuperar datos.

    Ejemplo

    GET /index.html HTTP/1.1  
    User-Agent: Mozilla/4.0 (compatible; MSIE5.01; Windows NT)
    Host: www.yosoy.dev
    Accept-Language: es-mx
    Accept-Encoding: gzip, deflate
    Connection: Keep-Alive
  
El servidor constara algo similar

    Ejemplo respuesta del servidor:
    HTTP/1.1 200 OK
    Date: Wed, 08 Nov 2017 12:28:53 GMT
    Server: Apache/2.2.14 (Win32)
    Last-Modified: Mon, 22 Jul 2014 19:15:56 GMT
    ETag: "34aa387-d-1568eb00"
    Vary: Authorization,Accept
    Accept-Ranges: bytes
    Content-Length: 88
    Content-Type: text/html
    Connection: Closed
    

### Metodo HEAD

El método [HTTP HEAD](https://developer.mozilla.org/es/docs/Web/HTTP/Methods/HEAD) solicita los encabezados que se devolverían si la HEAD URL de la solicitud se solicitara con el GET método HTTP . Por ejemplo, si una URL puede producir una descarga grande, una HEAD solicitud podría leer su Content-Lengthencabezado para verificar el archivo sin descargar el archivo.

Si la respuesta a una HEAD solicitud muestra que una respuesta de URL almacenada en caché ahora está desactualizada, la copia almacenada en caché se invalida incluso si no GET se realizó ninguna solicitud.

    Ejemplo 
    El método HEAD es muy similar al GET (funcionalmente hablando) 
    A excepción de que el servidor responde con líneas y headers, pero no con el body de la respuesta.

    GET /index.html HTTP/1.1  
    User-Agent: Mozilla/4.0 (compatible; MSIE5.01; Windows NT)
    Host: www.yosoy.dev
    Accept-Language: es-mx
    Accept-Encoding: gzip, deflate
    Connection: Keep-Alive

El servidor nos respondería algo como

    HTTP/1.1 200 OK
    Date: Mon, 27 Jul 2009 12:28:53 GMT
    Server: Apache/2.2.14 (Win32)
    Last-Modified: Wed, 22 Jul 2009 19:15:56 GMT
    ETag: "34aa387-d-1568eb00"
    Vary: Authorization,Accept
    Accept-Ranges: bytes
    Content-Length: 88
    Content-Type: text/html
    Connection: Closed


### Metodo POST

El método [HTTP POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST) envía datos al servidor. El tipo de cuerpo de la solicitud se indica mediante el Content-Typeencabezado.

Una POSTsolicitud se envía normalmente a través de un formulario HTML y da como resultado un cambio en el servidor. En este caso, el tipo de contenido se selecciona poniendo la cadena adecuada en el `enctype` atributo del `<form>` elemento o el `formenctype` atributo de los elementos `<input>` o `<button>`

    Ejemplo Se enviará información de formulario al servidor, que será procesada por un process.cgi

    POST /cgi-bin/process.cgi HTTP/1.1
    User-Agent: Mozilla/4.0 (compatible; MSIE5.01; Windows NT)
    Host: www.yosoy.dev
    Content-Type: text/xml; charset=utf-8
    Content-Length: 88
    Accept-Language: es-mx
    Accept-Encoding: gzip, deflate
    Connection: Keep-Alive


### Metodo PATCH

El método de solicitud [HTTP PATCH](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PATCH) aplica modificaciones parciales a un recurso.

PATCH es algo análogo al concepto de "actualización" que se encuentra en CRUD. Una PATCH solicitud se considera un conjunto de instrucciones sobre cómo modificar un recurso.

    Ejemplo

    PATCH /file.txt HTTP/1.1 
    Host: www.example.com
    Content-Type: application/example
    If-Match: "e0023aa4e"
    Content-Length: 100

La respuesta del servidor

    HTTP/1.1 204 No Content
    Content-Location: /file.txt
    ETag: "e0023aa4f"

### Metodo PUT

El método de solicitud [HTTP PUT](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT) crea un nuevo recurso o reemplaza una representación del recurso de destino con la carga útil de la solicitud.

La diferencia entre PUT y POST es que PUTes idempotente: llamarlo una o varias veces sucesivamente tiene el mismo efecto (que no es un efecto secundario )

    
    Se solicita al servidor que guarde el cuerpo de la entidad dada en index.htm en la raíz del servidor:

    PUT /index.htm HTTP/1.1
    User-Agent: Mozilla/4.0 (compatible; MSIE5.01; Windows NT)
    Host: www.yosoy.dev
    Accept-Language: es-mx
    Connection: Keep-Alive
    Content-type: text/html
    Content-Length: 182

index.html

    <html>
    <body>
    <h1>Howdy, Michelle!</h1>
    </body>
    </html>

Y el servidor por su parte, responde con lo siguiente al cliente

    habiendo ya guardado el cuerpo de la entidad en el archivo index.htm
    
    HTTP/1.1 201 Created
    Date: Mon, 27 Nov 2017 12:28:53 GMT
    Server: Apache/2.2.14 (Win32)
    Content-type: text/html
    Content-length: 30
    Connection: Closed


### Metodo DELETE

El método de solicitud [HTTP DELETE](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/DELETE) elimina el recurso especificado.

    Ejemplo Se le solicitará al servidor eliminar el archivo hello.htm en la ruta raíz del servidor:

    DELETE /hello.htm HTTP/1.1
    User-Agent: Mozilla/4.0 (compatible; MSIE5.01; Windows NT)
    Host: www.yosoy.dev
    Accept-Language: es-mx
    Connection: Keep-Alive

#### El servidor por su parte responderá eliminando dicho archivo y respondiendo al cliente lo siguiente

    HTTP/1.1 200 OK
    Date: Mon, 27 Jul 2009 12:28:53 GMT
    Server: Apache/2.2.14 (Win32)
    Content-type: text/html
    Content-length: 30
    Connection: Closed
 
    <html>
    <body>
    <h1>URL deleted.</h1>
    </body>

### Metodo OPTIONS

El método [HTTP OPTIONS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS) solicita opciones de comunicación permitidas para una URL o servidor determinados. Un cliente puede especificar una URL con este método, o un asterisco ( *) para referirse a todo el servidor.

    Ejemplo
    Se necesita saber cuáles métodos de solicitud soporta el servidor, podemos utilizar curl y una solicitud OPTIONS:
   
    	
    curl -X OPTIONS https://yosoy.dev -i

Lo cual el servidor podria contestar algo similar

     HTTP/1.1 200 OK
     Date: Wed, 8 Nov 2017 12:28:53 GMT
     Server: Apache/2.2.14 (Win32)
     Allow: GET,HEAD,POST,OPTIONS,TRACE
     Content-Type: httpd/unix-directory

[REFERENCIAS DE LOS EJEMPLOS](https://yosoy.dev/peticiones-http-get-post-put-delete-etc/#:~:text=El%20m%C3%A9todo%20GET%20significa%20recuperar,el%20texto%20fuente%20del%20proceso.)


# Tipos de mensajes de las peticiones HTTPs

[Un código de estado HTTP](https://www.lucushost.com/blog/codigos-http-mas-comunes/) es un mensaje que devuelve el servidor cada vez que el navegador realiza una petición al servidor. Si el servidor es capaz de devolver el contenido que solicita el navegador y no existe ningún error, estos códigos HTTP no son visibles para el usuario. En cambio, si algo va mal, verás que el servidor devuelve un código de estado HTTP que indica que algo no salió como esperaba.

Estos codigos de estados manejan intervalos de mensajes según la respuesta del servidor. Los significados de estos intervalos son

* Códigos de estado 1xx: Se trata de respuestas de carácter informativo e indica que el navegador puede continuar realizando su petición.

* Códigos de estado 2xx: El conjunto de códigos 2xx son respuestas satisfactorias, Simplemente indican que la petición fue procesada correctamente, por lo que lo ideal es que todas las webs devuelvan este código HTTP. Generalmente como la petición fue exitosa no se muestra el código de estado, el navegador únicamente devuelve el contenido que el usuario solicitó.

* Códigos de estado 3xx: Estos códigos HTTP hacen referencia a cuando el navegador tiene que realizar una acción adicional como, por ejemplo, una redirección.

* Códigos de estado 4xx: Los códigos de estado que comienzan con el dígito 4 hacen referencia a errores producidos por el navegador web. En estos casos, el usuario normalmente recibe una página en HTML en la que es informado del error.

* Códigos de estado 5xx: Esto códigos HTTP también muestran errores, pero por el lado del servidor web.


# Errores o Mensajes de los intervalos 100--199

* ### Error [100 continue](https://developer.mozilla.org/es/docs/Web/HTTP/Status/100) 

indica que todo hasta ahora está bien y que el cliente debe continuar con la solicitud o ignorarlo si ya está terminado

* ### Error [101 Switching Protocols](https://developer.mozilla.org/es/docs/Web/HTTP/Status/101)

El servidor está cambiando de protocolo al solicitado por un cliente que mandó un mensaje incluyendo la cabecera Upgrade.

* ### Error [102 Processing](https://stackoverflow.com/questions/22906688/which-java-http-client-supports-status-code-102-processing) 

Este código indica que el servidor ha recibido la solicitud y aún se encuentra procesandola, por lo que no hay respuesta disponible.

* ### Error [103 Primeros avisos](https://stackoverflow.com/questions/33919067/http-status-code-103-in-log)

Esto devuelve algunos encabezados de respuesta antes de que el resto de la respuesta del servidor esté lista.

# Errores o Mensajes de los intervalos 200--299

* ### Error [200 Todo bien](https://stackoverflow.com/questions/27921537/returning-http-200-ok-with-error-within-response-body)

Este es el código que se entrega cuando una página web o recurso actúa exactamente como se espera.

* ### Erro [201 Created](https://httpstatuses.com/201) 

La solicitud ha tenido éxito y se ha creado un nuevo recurso como resultado de ello. Ésta es típicamente la respuesta enviada después de una petición PUT.

* ### Error [202 Accepted](https://httpstatuses.com/202)

El servidor ha aceptado la solicitud de tu navegador pero aún la está procesando. La solicitud puede, en última instancia, dar lugar o no a una respuesta completa.

* ### Error [203 Non-Authoritative Information](https://evertpot.com/http/203-non-authoritative-information)

Este código de estado puede aparecer cuando se utiliza un apoderado. Significa que el servidor proxy recibió un código de estado de 200 «Todo está bien» del servidor de origen, pero ha modificado la respuesta antes de pasarla a su navegador.

* ### Error [204 No Content](https://stackoverflow.com/questions/12807753/http-get-with-204-no-content-is-that-normal)

La petición se ha completado con éxito pero su respuesta no tiene ningún contenido, aunque los encabezados pueden ser útiles. El agente de usuario puede actualizar sus encabezados en caché para este recurso con los nuevos valores.

# Errores o Mensajes de los intervalos 300--399

* ### Error [300 Multiple Choice](https://stackoverflow.com/questions/12591029/http-300-multiple-choices-on-apache-server)

Esta solicitud tiene más de una posible respuesta. User-Agent o el usuario debe escoger uno de ellos. No hay forma estandarizada de seleccionar una de las respuestas.

* ### Error [301 Moved Permanently](https://www.inboundcycle.com/blog-de-inbound-marketing/que-son-las-redirecciones-301-y-302-y-como-configurarlas)

Este código de respuesta significa que la URI  del recurso solicitado ha sido cambiado. Probablemente una nueva URI sea devuelta en la respuesta.

* ### Error [302 Found ](https://stackoverflow.com/questions/973098/what-does-http-1-1-302-mean-exactly)

Este código de respuesta significa que el recurso de la URI solicitada ha sido cambiado temporalmente. Nuevos cambios en la URI serán agregados en el futuro. Por lo tanto, la misma URI debe ser usada por el cliente en futuras solicitudes

* ### Error [303 See Other](https://stackoverflow.com/questions/3242498/how-to-handle-nsurlrequest-http-error-303)

El servidor envía esta respuesta para dirigir al cliente a un nuevo recurso solicitado a otra dirección usando una petición GET.

* ### Error [304 Not Modified](https://stackoverflow.com/questions/20978189/how-does-304-not-modified-work-exactly)

Esta es usada para propósitos de "caché". Le indica al cliente que la respuesta no ha sido modificada. Entonces, el cliente puede continuar usando la misma versión almacenada en su caché.

# Errores o Mensajes de los intervalos 400--499

* ### Error [400 Bad Request](https://stackoverflow.com/questions/19671317/400-bad-request-http-error-code-meaning/19671511#19671511)

Esta respuesta significa que el servidor no pudo interpretar la solicitud dada una sintaxis inválida.

* ### Error [401 Unauthorized](https://stackoverflow.com/questions/31935452/how-to-solve-401-error)

Es necesario autenticar para obtener la respuesta solicitada. Esta es similar a 403, pero en este caso, la autenticación es posible

* ### Error [402 Payment Required](https://stackoverflow.com/questions/1270759/difference-between-http-response-status-code-402-and-403#:~:text=3%20Answers&text=The%20server%20understood%20the%20request,request%20SHOULD%20NOT%20be%20repeated.)

Este código de respuesta está reservado para futuros usos. El objetivo inicial de crear este código fue para ser utilizado en sistemas digitales de pagos. Sin embargo, no está siendo usado actualmente.

* ### Error [403 Forbidden](https://stackoverflow.com/questions/15602331/http-server-error-403-forbidden)

El cliente no posee los permisos necesarios para cierto contenido, por lo que el servidor está rechazando otorgar una respuesta apropiada.

* ### Error [404 Not Found](https://meta.stackexchange.com/questions/183096/stack-overflow-often-not-available-and-returns-error-404-or)

El servidor no pudo encontrar el contenido solicitado. Este código de respuesta es uno de los más famosos dada su alta ocurrencia en la web.

# Errores o Mensajes de los intervalos 500--599

* ### Error [500 Internal Server Error](https://es.stackoverflow.com/questions/219403/500-internal-server-error)

El servidor ha encontrado una situación que no sabe cómo manejarla.

* ### Error [501 Not Implemented](https://stackoverflow.com/questions/32889983/is-http-501-appropriate-for-an-unimplemented-api#:~:text=1%20Answer&text=The%20501%20(Not%20Implemented)%20status,supporting%20it%20for%20any%20resource.)

El método solicitado no está soportado por el servidor y no puede ser manejado. Los únicos métodos que los servidores requieren soporte (y por lo tanto no deben retornar este código) son GET y HEAD.

* ### Error [502 Bad Gateway](https://meta.stackexchange.com/questions/181866/stackoverflow-com-sends-me-502)

Esta respuesta de error significa que el servidor, mientras trabaja como una puerta de enlace para obtener una respuesta necesaria para manejar la petición, obtuvo una respuesta inválida.

* ### Error [503 Service Unavailable](https://stackoverflow.com/questions/4150952/what-possibilities-can-cause-service-unavailable-503-error)

El servidor no está listo para manejar la petición. Causas comunes puede ser que el servidor está caído por mantenimiento o está sobrecargado. Hay que tomar en cuenta que junto con esta respuesta, una página usuario-amigable explicando el problema debe ser enviada

* ### Error [504 Gateway Timeout](https://stackoverflow.com/questions/261536/http-status-504/8494758#:~:text=This%20usually%20means%20that%20the,possibly%20including%20the%20Web%20server.)

Esta respuesta de error es dada cuando el servidor está actuando como una puerta de enlace y no puede obtener una respuesta a tiempo.