
:- [arbol].

:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_json)).
:- use_module(library(http/http_log)).
:- use_module(library(http/json)).
:- use_module(library(http/http_cors)).
:- use_module(library(http/html_write)).
:- use_module(library(date)).

% URL handlers.
:- http_handler('/hello', handle_request, [method(post)]).
:- http_handler('/consulta', handle_consulta, [method(post), methods([options])]).
:- http_handler('/', home, []).

% Configura las opciones CORS
:- set_setting(http:cors, [*]).
http:cors_enable([ 
    methods([post]),
    headers(['Content-Type']),
    credentials(true)
]).

% Manejador de la solicitud POST
handle_request(Request) :-
    option(method(post), Request),

    % Responde para confirmar que la operación fue exitosa
    reply_json_dict(_{message: "Hello World"}).

% Manejador de la solicitud POST para /consulta
handle_consulta(Request) :-
    cors_enable,
    http_read_json_dict(Request, Dict),
    _{file_name: FileName, pregunta: PreguntaList} :< Dict,
    % Convierte la lista de la pregunta a un término Prolog adecuado si es necesario
    % (si 'PreguntaList' está en el formato adecuado, no se necesita conversión adicional)
    atom_string(FileAtom, FileName),
    % Llama a la función init/3
    init(FileAtom, PreguntaList, Respuesta),
    % Responde con la respuesta obtenida
    reply_json_dict(_{respuesta: Respuesta}).

server(Port) :-
     http_server(http_dispatch, [port(Port), bind('[::]')]). 

home(_Request) :-
    reply_html_page(title('Code Timestamp Service'),
                    [ h1('To use it:'),
                      p(['Send a post message to ', a(href('/add'), '/add'), ' to add a timestamp comment to your file.']),
					  p(['Send a post message to ', a(href('/consulta'), '/consulta'), ' with parameters file_name and pregunta to get a response.'])
					]).

% Inicialización del servidor
:- initialization
    format('*** Starting Server ***~n', []),
    (current_prolog_flag(argv, [SPort | _]) -> true ; SPort='8001'),
    atom_number(SPort, Port),
    format('*** Serving on port ~d *** ~n', [Port]),
    server(Port).