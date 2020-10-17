# Metodos Https

## Introduccion

[HTTP](https://developer.mozilla.org/es/docs/Web/HTTP/Methods) define un conjunto de métodos de petición para indicar la acción que se desea realizar para un recurso determinado. Aunque estos también pueden ser sustantivos, estos métodos de solicitud a veces son llamados HTTP verbs. Cada uno de ellos implementan una semántica diferente, pero algunas características similares son compartidas por un grupo de ellos: ej. un request method puede ser safe, idempotent, o cacheable.

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