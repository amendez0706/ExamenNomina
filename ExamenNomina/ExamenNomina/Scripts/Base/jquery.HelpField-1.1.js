/**
* Titulo: helpField V 1.1
* Descripcion
* Extencion Jquery para creacion de ayudas para mostrar datos
* (c) 2014 Balor
*/

(function ($) {
    'use strict';
    /**
    * Tipo: Funcion (Principal)
    * Nombre: helpField
    * Requiere: JQuery >= 1.4.1    
    * Requiere: JSON2 (IE < 8)
    * Descripcion:
    * Emula la creacion de ayudas tipo SIR apartir de un TAG HTLM y Procesa una Coleccion de datos JSON
    * Ejemplo:
    * $('#ID_TAG_HTML').helpField({
    *    title: 'Almacen',
    *    cultureResourcesPopUp: {
    *        popUpHeader: 'Busqueda de Almacenes'
    *    },
    *    findByCode: function (){},
    *    findByPopUp: fuction (){}    
    *});
 
    * Opciones:   
    defaults = {
    title: '',                          /// Establece el valor del nombre del campo de la ayuda
    requeridField: true,                /// Define si la ayuda es requerida o no
    minimumCharacters: 0,               /// Parametro para configurar un minimo de caracteres en la caja de busqueda default.
    widthCode: '80',                    /// Permite establecer un tamaño al campo codigo de nuestra ayuda en la paguina principal
    widthDescription: '300',            /// Permite establecer un tamaño al campo descripcion de nuestra ayuda en la pagina principal
    codeNumeric: false,                 /// Establece el tipo de dato del campo codigo de nuestra ayuda
    codePaste: true,                    /// Parametro para indicar si puede pegar en la caja código
    descriptionPaste: true,             /// Parametro para indicar si puede pegar en la caja descripción
    maxlengthCode: 0,                   /// Permite establecer una longitud de caracteres para el campo codigo de la ayuda
    maxlengthDescription: 0,            /// Permite establecer una longitud de caracteres para el campo descripcion de la ayuda
    enableCode: true,                   /// Establece si el campo codigo es editable
    enableDescription: true,            /// Establece si el campo descripcion es editable
    targetMessage: '',                  /// Indicar el ID del control donde se enviaran los mensajes
    nextControlID: '',                  /// Indicar el ID del control siguiente
    cultureResourcesPopUp: {            /// Objeto JSON para la internacionalizacion de las etiquetas
    popUpHeader: '',                    /// Titulo del PopUp de la ayuda
    textHeaderFilter: '',               /// Titulo de la etiqueta filtros de la ayuda
    textButton: '',                     /// Titulo del boton consultar
    textSelection: '',                  /// Titulo del boton seleccionar
    textFiltroDefault: '',              /// Titulo del filtro default
    textHeaderDefaultCode: '',          /// Titulo del campo de salida codigo default
    textHeaderDefaultDescription: '',   /// Titulo del campo de salida descripcion default
    requeridMessage: '',                /// Mensaje que indica que la ayuda es requerida
    resultNotFound: '',                 /// Mensaje que se envia cuando no regresa resultado
    minimumCharacters: '',              /// Mensaje que se envia cuando los caracteres de busqueda son menores al valor 'minimumCharacters'
    de: '',                             /// Texto para indicar la palabra 'de'
    procesando: '',                     /// Texto para indicar la palabra 'procesando'
    mostrar: '',                        /// Texto para indicar la palabra 'mostrar'
    mostrando: '',                      /// Texto para indicar la palabra 'mostrando'
    hasta: '',                          /// Texto para indicar la palabra 'hasta'
    registros: '',                      /// Texto para indicar la palabra 'registros'
    buscar: '',                         /// Texto para indicar la palabra 'buscar'  
    page: ''                            /// Texto para indicar la palabra 'pagina'       
    },
    filtros:                            /// Recibe un arreglo de objetos JSON con los campos de salida personalizados de la ayuda
    [{ 
    name: '',                       /// Atributo name equivale al valor de la etiqueta que se le muestra al usuario
    value: 'Descripcion'            /// Atributo value equivale al valor que se envia al servidor con el contenido del filtro
    }],                        
    camposSalida:                       /// Recibe un arreglo de objetos JSON con los campos de salida personalizados de la ayuda
    [{
    header: '',                     /// Valor de la etiqueta se muestra en el campo de salida
    value: 'codigo',                /// Valor de la propiedad que se va a procesar de nuestra coleccion de datos
    code: true,                     /// Campo de salida al que se envia a la caja codigo de la pagina principal
    description: false              /// Campo de salida al que se envia a la caja descripcion de la pagina principal
    }],
    parametroID: 'ID',                  /// Campo de salida al que se envia a la caja valorid de la pagina principal
    findByPopUp: function() { },        /// Funcion ajax para buscar registro por popup
    findByCode: function() { },         /// Funcion ajax para buscar registro por código
    onElementFound: '',                 /// Nombre de la funcion que se ejecuta cuando se encuentra un registro
    Datos: 0,
    DatosFiltrados: 0,
    AyudaBase: {},
    paginador: 0,
    ElementosPorPaguina: 10,
    ElementosPorPaginaConfig: [],
    NumeroPaguinas: 0,
    PaguinaActual: 0,
    Parametros: null,
    iconWarning: '',
    iconSearch: '',                     /// TAG IMG del boton de busqueda 
    iconClose: '',                      /// TAG IMG del boton de cerrar del PopUp
    iconFirst: '',                      /// TAG IMG del boton de First del PopUp
    iconPrev: '',                       /// TAG IMG del boton de Prev del PopUp 
    iconNext: '',                       /// TAG IMG del boton de Next del PopUp 
    iconLast: '',                       /// TAG IMG del boton de Last del PopUp 
    iconLoad: '',                       /// TAG IMG del icono ajax effect del PopUp 
    iconCollapseUp: '',                 /// TAG IMG del icono del contenedor cuando esta descolapsado
    iconCollapseDown: ''                /// TAG IMG del icono del contenedor cuando esta colapsado
    };  
    */

    var settings = {};
    var ctrlDown = false;
    var ctrlKey = 17, vKey = 86, cKey = 67;

    /**
    * Tipo: Funcion (Externa)
    * Nombre: helpField
    * Descripcion:
    * Extiende nuestro TAG-HTML y renderiza el control tipo ayuda
    */
    $.fn.helpField = function (options) {
        var defaults = getOptions();
        var opts = configurarOpciones(defaults, options);
        opts.camposSalida[0].header = (opts.camposSalida[0].header === '' ? opts.cultureResourcesPopUp.textHeaderDefaultCode : opts.camposSalida[0].header);
        opts.camposSalida[1].header = (opts.camposSalida[1].header === '' ? opts.cultureResourcesPopUp.textHeaderDefaultDescription : opts.camposSalida[1].header);
        opts.filtros[0].name = (opts.filtros[0].name === '' ? opts.cultureResourcesPopUp.textFiltroDefault : opts.filtros[0].name);
        drawHelpControls($(this), opts, this);
        applyStylesControls($(this), opts);
        setHelpProperties($(this), opts);
        eventHandler($(this), opts);
        settings[$(this).attr("id")] = opts;
    };

    /**
    * Tipo: Funcion (Interna)
    * Nombre: configurarOpciones
    * Descripcion:
    * Realiza un merge entre las opciones default y las opciones del cliente
    */
    var configurarOpciones = function (defaults, options) {
        var opts = $.extend({}, defaults, options);
        var cultureDefault = defaults.cultureResourcesPopUp;
        var cultureOption = options.cultureResourcesPopUp;
        var culture = $.extend({}, cultureDefault, cultureOption);
        opts.cultureResourcesPopUp = culture;
        return opts;
    };
    /**
    * Tipo: Funcion (Interna)
    * Nombre: getOptions
    * Descripcion:
    * Obtiene los valores por defecto de la ayuda.
    */
    var getOptions = function () {
        var filtrosDefault = [{ name: '', value: 'Descripcion'}];
        var camposDefault = [{ header: '', value: 'Codigo', code: true, description: false }, { header: '', value: 'Descripcion', code: false, description: true}];
        var defaults = {
            title: '',
            requeridField: true,
            minimumCharacters: 0,
            widthCode: '80',
            widthDescription: '300',
            codeNumeric: false,
            codePaste: true,
            descriptionPaste: true,
            maxlengthCode: 0,
            maxlengthDescription: 0,
            enableCode: true,
            enableDescription: true,
            targetMessage: '',
            nextControlID: '',
            cultureResourcesPopUp: {
                popUpHeader: 'Titulo Encabezado',
                textHeaderFilter: 'Filtros de busqueda',
                textButton: 'Consultar',
                textSelection: 'Seleccionar',
                textFiltroDefault: 'Descripcion',
                textHeaderDefaultCode: 'Codigo',
                textHeaderDefaultDescription: 'Descripcion',
                requeridMessage: "Campo Requerido",
                resultNotFound: "No se encontro resultado",
                minimumCharacters: "Capture un minimo de caracteres de: ",
                de: "De",
                procesando: 'Procesando',
                mostrar: 'Mostrar',
                mostrando: 'Mostrando',
                hasta: 'Al',
                registros: 'Registros',
                buscar: 'Buscar',
                page: 'Pagina'
            },
            filtros: filtrosDefault,
            camposSalida: camposDefault,
            parametroID: 'ID',
            findByPopUp: function () { return false; },
            findByCode: function () { return false; },
            onElementFound: '',
            Datos: 0,
            DatosFiltrados: 0,
            AyudaBase: {},
            paginador: 0,
            ElementosPorPaguina: 10,
            ElementosPorPaginaConfig: [10, 15, 20, 25, 50],
            NumeroPaguinas: 0,
            PaguinaActual: 0,
            Parametros: null,
            iconWarning: '<img alt="warning" src="data:image/gif;base64,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">',
            //iconSearch: '<img alt="search" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAADtSURBVDhPlZLRDcMgDETZKbN0BebIGl4hs/Cbedy7A1PSBpQiWYnAfpwPJx/X6V7O4nYUL4gnK0VSLwSgEIQDQri/WgIwMSu5FbYKQaRqjkj1ZnMbilXYQvsLFcl287xTgVcIIr7xbzibQVJuACax8C4I94mKZC8oQP8q1E1NfsAIXimgtAzItwcyF6F9GjzxUa9AE9nKndvGZ13MRJ+DaiYh9e1jLgjv83Daj44OiHngFEbEzRWSYSTjCrkAZuNSAPBj+wAGyCNAVQcVO9MBG5Q8BnTIgRIqAIRt/QVQi/JjUzE9+h+gdrJejOsNvBmpSvc2JzwAAAAASUVORK5CYII=" />',
            iconSearch: '<img alt="search" width="20" height="20"  src="data:image/png;base64,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" />',
            iconClose: '<img alt="close" width="15" height="15" src="data:image/gif;base64,R0lGODlhDwAPAOYBAIgAAJxpaXMAAKUuLn4AAH8AAKQuLrRVVYwAAJUAAHowMO3t7XoAAKsuLngAAG8YGHUAAKYuLooAAJoAAJ8oKJAAAH0AAIIAAJoiIm8PD4UKCqcuLn8rK6t0dIpMTHcAAIUAAOPd3ZhUVKUYGMm3t5YMDM26usCmppYAAPLy8rNSUvb29qg3N596eqJ6encnJ+Dg4IMAAKxAQHMPD5gUFJgSEsXFxZEAAJcAAJQAAIMKCqouLo8AAMjIyIwKCvDw8IEAAHwAAI4AAN/S0nkAAM7Ozt/f38rExJtpafz8/KYwMKkuLsq2tqwuLos9Perq6o0AAIMpKZ1bW83NzZJSUokJCaAZGW0ODn8oKJ8ZGe/o6KN9fd/Z2bJPT30dHcrKynUPD9XV1XYODsy4uKF6eoUzM3koKIAAAHsAALVVVXIAAIcAAFcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAEALAAAAAAPAA8AAAe+gAFsg4SFhIJdKmlpB4yLjDI1gyxKGBQGBgMGlgMlF4MDOgoPRDdrEKMIawyDEWo2Ry8MEC1fSGhraK0aHjBcZltFJFc8a0GDG1kOVAtPRiYZFwkAFoNLVghqJz8rThYJKBIEgzs0aGRhQ0laHAU4EgWDDVUuU2MzUikhWBUIZ/JoejABs6aAiAUdYkD5x6aJjzJiAEyYcCaKlxxCgAwakQANiDUAQBI4s2YNwwoEBKhZKUClyg8O2AgyRFNmIAA7">',
            iconFirst: '<img alt="first" width="16" height="16" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAD6SURBVDhPpZPREYQwCETTk7XYgnVcG7RgLfm1Ho8HJCYx3n2YGS/OwS7Lgul8eRL49NFnj1vft+M3awaz8qu3E2QDbUc+FyWS3YOzk8nTOJiG4FSgkiiYWx4UACZOkRRFqoIrMFcgqNOqpVDfgvYD66L9kyT63h5a4n+8sjzza/DAgpFEj+UAphqAkmMEnYlNAonFRDMrYqhzEicaCMTkl2AlaAH0bzlu5F1B3YPeA2vBzLv2xBR0HiAzTORuPcCLSmILF2SjBz5brzJbpBxjtEK3KazSKWDmT1vouzAZY5nv/1VmY28mMoUYkfY2ejCq8Y9Jrm/hzRf9BUSaPzhKGT7RAAAAAElFTkSuQmCC"/>',
            iconPrev: '<img alt="prev" width="16" height="16" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAC9SURBVDhPpVPBDcQgDMtOnaUrMEfX6AqdhS/zcHHcQO+kQnpFqhKp2DE2SH25JIrPunHZct0PdH2FCPZSa1KggED7RwQAYvJyqALtwwpycSDBST9ToHWqwKfKhqmcjMojDDzA1KSbZOV5jQDyrbqCGwIz6QfoJKz8f2vil+xzuitgnSiAMc04EODsBiKweRC5Bz06+tDJJiZe46EapmAET2JsREjl34t0VYPsPaXhPRg9LHtMiDFiYvSFYt8HEkKCs2KY+dAAAAAASUVORK5CYII="/>',
            iconNext: '<img alt="next" width="16" height="16" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAADOSURBVDhPpZPrDcMwCIS9k2fJCp4ja3iFzsLfzEMPDH4kaUpVS5YlO/cBB0n850qurwdz3okJ5y+rA0SYAMgv4npQmDFlALECkAkgBScFQDcZsIoFkvfvkAlAnLaRgYi1JOwC2Ke1ZuCALhaIgfB2V9LigUT07RmMO4AAkWzmTl1L0IgtqpyjlHZXsOFMr+hiYoKBrXYDiaHmxWMJ8ugmamQBmThkokxiGyQTP0SdO7J64ABrXWSsT22sOkARoWexjvJWQ+N7W0L47zl9+AYQyoLs6tY+kgAAAABJRU5ErkJggg=="/>',
            iconLast: '<img alt="last" width="16" height="16" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAADySURBVDhPpVPBEcMgDGOnzNIVmIM1WCGz8M08qSXbMRDSPsJdrilIsiycdL5cCfx2yPNHqArGn7wHngJ5b+dWGoWeFjFC3OwX/7EoAGUcYvNJBFWJOVQInBCgalRoAppX7apTYHAgG8kcpCKVpJ06icAdz9iuuh0cJCHhwAXSR0QMpDnhzDEoMLUAogK0Et4pYk7UQScwh0hC78BEsuwzaGvBcYsW1D4BCAx9lnpl6Rk4BqGOGRhJye0KyRUiRC003YJVNXIfXgiYQ4b5KIDk17PIDGxW4PLmgHffXdss45OIIVoK/CL334sOUhTjt/BmfQFRu1c3riZnTwAAAABJRU5ErkJggg=="/>',
            iconLoad: '<img alt="load" width="16" height="16" src="data:image/gif;base64,R0lGODlhEAAQAPQAANXV1ROj/s/S1Tyt9He86Bek/S+p97XM25LD4iOm+my56mC27cDP2YbA5arJ3kmw8lSz8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAFUCAgjmRpnqUwFGwhKoRgqq2YFMaRGjWA8AbZiIBbjQQ8AmmFUJEQhQGJhaKOrCksgEla+KIkYvC6SJKQOISoNSYdeIk1ayA8ExTyeR3F749CACH5BAkKAAAALAAAAAAQABAAAAVoICCKR9KMaCoaxeCoqEAkRX3AwMHWxQIIjJSAZWgUEgzBwCBAEQpMwIDwY1FHgwJCtOW2UDWYIDyqNVVkUbYr6CK+o2eUMKgWrqKhj0FrEM8jQQALPFA3MAc8CQSAMA5ZBjgqDQmHIyEAIfkECQoAAAAsAAAAABAAEAAABWAgII4j85Ao2hRIKgrEUBQJLaSHMe8zgQo6Q8sxS7RIhILhBkgumCTZsXkACBC+0cwF2GoLLoFXREDcDlkAojBICRaFLDCOQtQKjmsQSubtDFU/NXcDBHwkaw1cKQ8MiyEAIfkECQoAAAAsAAAAABAAEAAABVIgII5kaZ6AIJQCMRTFQKiDQx4GrBfGa4uCnAEhQuRgPwCBtwK+kCNFgjh6QlFYgGO7baJ2CxIioSDpwqNggWCGDVVGphly3BkOpXDrKfNm/4AhACH5BAkKAAAALAAAAAAQABAAAAVgICCOZGmeqEAMRTEQwskYbV0Yx7kYSIzQhtgoBxCKBDQCIOcoLBimRiFhSABYU5gIgW01pLUBYkRItAYAqrlhYiwKjiWAcDMWY8QjsCf4DewiBzQ2N1AmKlgvgCiMjSQhACH5BAkKAAAALAAAAAAQABAAAAVfICCOZGmeqEgUxUAIpkA0AMKyxkEiSZEIsJqhYAg+boUFSTAkiBiNHks3sg1ILAfBiS10gyqCg0UaFBCkwy3RYKiIYMAC+RAxiQgYsJdAjw5DN2gILzEEZgVcKYuMJiEAOwAAAAAAAAAAAA==">',
            iconCollapseUp: '<img width="16" height="15" src="../../Base/img/Menos.png" />',
            iconCollapseDown: '<img width="16" height="15" src="../../Base/img/Mas.png" />'
        };
        filtrosDefault = null;
        camposDefault = null;
        return defaults;
    };
    /**
    * Tipo: Funcion (Interna)
    * Nombre: drawHelpControls
    * Descripcion:
    * Prepara los controles de la pagina principal, codigo, descripcion, boton y hiddenfield para renderizarlos en la pantalla
    */
    var drawHelpControls = function (item, opts, element) {
        var id = item.attr("id");
        var controlAyuda = '';
        if (opts.title != '') {
            controlAyuda += '<label id="' + id + '_LabelHelp">' + opts.title + '</label>';
            if (opts.requeridField) { controlAyuda += '<span id="' + id + '_RequeridHelp">&nbsp;*</span>'; }
            controlAyuda += '<br />';
        }
        controlAyuda += '<table cellspacing="0" cellpadding="0" border="0" style="border-style:none;border-collapse:collapse;"><tbody><tr>';
        controlAyuda += '<td align="left" valign="middle"><input type="text" id="' + id + '_Code"/></td>';
        controlAyuda += '<td align="left" valign="middle"><input type="text" id="' + id + '_lBox"/></td>';
        controlAyuda += '<td align="left" valign="middle"><span id="' + id + '_HelpButton">' + opts.iconSearch + '</span></td>';
        controlAyuda += '<td align="left" valign="middle"><span id="' + id + '_HelpLoad">' + opts.iconLoad + '</span></td>';
        controlAyuda += '</tr></tbody></table>';
        controlAyuda += '<input type="hidden" id="' + id + '_ValorID" />';
        controlAyuda += '<input type="hidden" id="' + id + '_parametros" />';
        controlAyuda += '<input type="hidden" id="' + id + '_doPostBack" />';
        $(controlAyuda).appendTo(element);
        $('#' + id + '_parametros').val(JSON.stringify(opts));
    };
    /**
    * Tipo: Funcion (interna)
    * Nombre: setHelpProperties
    * Descripcion:
    * Establece las propiedades de los controles usados en la ayuda
    */
    var setHelpProperties = function (item, opts) {
        var id = item.attr("id"),
        code = $('#' + id + '_Code'),
        lbox = $('#' + id + '_lBox');
        $('body').on("keypress", '#' + id + '_Code', function (e) {
            if (opts.codeNumeric) { return onlyNumeric(e); }
            else { return onlyAlfanumeric(e); }
        });
        $('body').on("keypress", '#' + id + '_lBox', function (e) { return onlyAlfanumeric(e); });
        if (opts.maxlengthCode > 0) { code.attr("maxlength", opts.maxlengthCode); }
        if (opts.maxlengthDescription > 0) { lbox.attr("maxlength", opts.maxlengthDescription); }
        if (!opts.enableCode) { code.attr("readonly", "readonly"); }
        if (!opts.enableDescription) { lbox.attr("readonly", "readonly"); }
        $('body').on("keypress", '.CajaHelpField_HMX', function (e) { return onlyAlfanumeric(e); });
    };
    /**
    * Tipo: Funcion (Interna)
    * Nombre: onlyAlfanumeric
    * Descripcion:
    * define que en un control solo se puedan teclear letras y numeros
    */
    var onlyAlfanumeric = function (evt) {
        evt = (evt) ? evt : event;
        var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode : ((evt.which) ? evt.which : 0));
        if (charCode == 40 || charCode == 41
            || charCode == 225 // á
            || charCode == 233 // é      
            || charCode == 237 // í
            || charCode == 243 // ó
            || charCode == 250 // ú
            || charCode == 124 // |
            || charCode == 38 // &
            ) { return true; }
        if (charCode > 32 &&
            (charCode < 44 || charCode > 57) &&
            (charCode < 64 || charCode > 90) &&
            (charCode < 97 || charCode > 122)) { return false; }
        return true;
    };
    /**
    * Tipo: Funcion (Interna)
    * Nombre: onlyNumeric
    * Descripcion:
    * define que en un control solo se puedan teclear numeros
    */
    var onlyNumeric = function (evt) {
        evt = (evt) ? evt : event;
        var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode : ((evt.which) ? evt.which : 0));
        if (charCode < 32 || (charCode > 47 && charCode < 58)) { return true; }
        return false;
    };
    /**
    * Tipo: Funcion (Interna)
    * Nombre: ClearControls
    * Descripcion:
    * Asigna una cadena vacia a la caja descripcion y el hidden del valor id.
    */
    var ClearControls = function (item) {
        $('#' + item.attr("id") + '_lBox').val('');
        $('#' + item.attr("id") + '_ValorID').val('');
    };
    /**
    * Tipo: Funcion (Interna)
    * Nombre: applyStylesControls
    * Descripcion:
    * Aplica estilos a los controles de la pagina principal donde se instancia la ayuda
    */
    var applyStylesControls = function (item, opts) {
        var id = item.attr('id');
        $('#' + id + '_RequeridHelp').css({ 'color': '#900' });
        $('#' + id + '_Code').css((opts.widthCode === '0' ? { 'display': 'none'} : { 'width': opts.widthCode + 'px' }));
        $('#' + id + '_lBox').css((opts.widthDescription === '0' ? { 'display': 'none'} : { 'width': opts.widthDescription + 'px' }));
        $('#' + id + '_HelpButton').css({ 'cursor': 'pointer' });
        $('#' + id + '_HelpLoad').css({ 'visibility': 'hidden' });
    };

    /**
    * Tipo: Funcion (Interna)
    * Nombre: PasteOnlyAlfanumeric
    * Descripcion:
    * define que en un control solo se puedan pegar letras y numeros
    */
    var PasteOnlyAlfanumeric = function (Cadena) {
        var retorno = true;
        for (var i = 0; i < Cadena.length; i++) {
            var letra = Cadena.substring(i, i + 1);
            var charCode = letra.charCodeAt(0);
            if (charCode == 40 || charCode == 41
                || charCode == 225 // á
                || charCode == 233 // é
                || charCode == 237 // í
                || charCode == 243 // ó
                || charCode == 250 // ú
                || charCode == 38 // &
                ) { retorno = true; }
            if (charCode > 32 &&
            (charCode < 44 || charCode > 57) &&
            (charCode < 64 || charCode > 90) &&
            (charCode < 97 || charCode > 122)) { return false; }
        }
        return retorno;
    };
    /**
    * Tipo: Funcion (Interna)
    * Nombre: PasteOnlyNumeric
    * Descripcion:
    * define que en un control solo se puedan pegar numeros
    */
    var PasteOnlyNumeric = function (Cadena) {
        var retorno = true;
        for (var i = 0; i < Cadena.length; i++) {
            var letra = Cadena.substring(i, i + 1);
            var charCode = letra.charCodeAt(0);
            if (charCode < 32 || (charCode > 47 && charCode < 58)) {
                retorno = true;
            }
            else {
                return false;
            }
        }
        return retorno;
    };
    /*
    * Tipo: Funcion (Interna)
    * Nombre: eventHandler
    * Descripcion:
    * Prepara los eventos que controlaran los controles de la ayuda
    */
    var eventHandler = function (item, opts) {
        var body = $('body');
        var cerrarHlpPopup = function () {
            $(".HelpField_lightbox, .HelpField_panel_pop").remove();
        };

        //Evento para cerrar el POPUP con tecla ESC
        body.on("keyup", function (e) {
            if (e.keyCode == 27) { cerrarHlpPopup(); }
        });
        /** COPY & PASTE **/
        //Evento para detectar cuando la tecla CTLR esta presionada
        $(document).keydown(function (e) {
            if (e.keyCode == ctrlKey) ctrlDown = true;
        }).keyup(function (e) {
            if (e.keyCode == ctrlKey) ctrlDown = false;
        });
        //Evento para validar si se puede pegar sobre la caja descripcion
        body.on("keyup", '#' + item.attr("id") + '_lBox', function (e) {
            if (!opts.descriptionPaste) {
                if (ctrlDown && (e.keyCode == vKey || e.keyCode == cKey)) {
                    $('#' + item.attr("id") + '_lBox').val('');
                    return false;
                }
            }
            if (ctrlDown && (e.keyCode == vKey || e.keyCode == cKey)) {
                if (PasteOnlyAlfanumeric($('#' + item.attr("id") + '_lBox').val()) === false) {
                    $('#' + item.attr("id") + '_lBox').val('');
                    return false;
                }
            }
        });
        //Evento para validar los datos que se estan pegando en la caja codigo
        body.on("keyup", '#' + item.attr("id") + '_Code', function (e) {
            if (ctrlDown && (e.keyCode == vKey || e.keyCode == cKey)) {
                if (opts.codeNumeric) {
                    if (PasteOnlyNumeric($('#' + item.attr("id") + '_Code').val()) === false) {
                        $('#' + item.attr("id") + '_Code').val('');
                        return false;
                    }
                }
                else {
                    if (PasteOnlyAlfanumeric($('#' + item.attr("id") + '_Code').val()) === false) {
                        $('#' + item.attr("id") + '_Code').val('');
                        return false;
                    }
                }
            }
        });

        /** FIND_BY_CODE */

        var showPopUpByCode = function (itm, opc) {
            BoxHelpField_NoShowMessage();
            if (opc.targetMessage !== "") { HMXHideMessage(opc.targetMessage); }
            mostrarPopUp(itm, opc);
            TemplateShow(itm, opc);
            $('#' + itm.attr("id") + '_' + opc.filtros[0].value).focus();
        };

        body.on("keydown", '#' + item.attr("id") + '_Code', function (e) {
            iniciaFindByCode(opts);

            if (!opts.codePaste) {
                if (ctrlDown && (e.keyCode == vKey || e.keyCode == cKey)) return false;
            }
            $('#' + item.attr("id") + '_Code').css({ "background-color": "white" });
            if (opts.targetMessage !== "") { HMXHideMessage(opts.targetMessage); }
            if (e.keyCode != 13 & e.keyCode != 9 & e.keyCode != 18 & e.keyCode != 17 & e.keyCode != 16 & e.keyCode != 35 & e.keyCode != 36 & e.keyCode != 37 & e.keyCode != 38 & e.keyCode != 39 & e.keyCode != 40) { ClearControls(item); }
            var code = (e.keyCode ? e.keyCode : e.which);
            if (code == 13) {
                if (opts.targetMessage !== "") { HMXHideMessage(opts.targetMessage); }
                if ($('#' + item.attr("id") + '_Code').val() === "") {
                    if (opts.requeridField) {
                        if (opts.targetMessage !== "") {
                            HMXShowWarning(opts.targetMessage, opts.cultureResourcesPopUp.requeridMessage + ": " + opts.title);
                        }
                    }
                    else {
                        if (opts.nextControlID !== "") {
                            if ($("#" + opts.nextControlID + "_Code").length > 0) {
                                $("#" + opts.nextControlID + "_Code").focus();
                            } else {
                                e.preventDefault();
                                $("#" + opts.nextControlID).focus();
                            }
                        }
                    }
                } else {
                    //$('#' + item.attr("id") + '_HelpLoad').css({ "display": "inline" });
                    $('#' + item.attr("id") + '_HelpLoad').css({ 'visibility': 'visible' });
                    $('#' + item.attr("id") + '_doPostBack').val("1");
                    opts.findByCode.call();
                }
            }
            if (code == 118) {
                showPopUpByCode(item, opts);
            }
        });

        body.on("blur", '#' + item.attr("id") + '_Code', function (e) {
            if ($("#" + item.attr("id") + "_Code").val() !== "" && $('#' + item.attr("id") + '_doPostBack').val() == "") {
                iniciaFindByCode(opts);
                $('#' + item.attr("id") + '_HelpLoad').css({ 'visibility': 'visible' });
                opts.findByCode.call();
            }
        });


        /** FIND_BY_POPUP */



        var funcHelpBtn = function (itm, opc) {
            return function () {
                BoxHelpField_NoShowMessage();
                if (opc.targetMessage !== "") { HMXHideMessage(opc.targetMessage); }
                mostrarPopUp(itm, opc);
                TemplateShow(itm, opc);
                $('#' + itm.attr("id") + '_' + opc.filtros[0].value).focus();
            };
        };

        var habilita = function (id, it, op) {
            deshabilita(id);
            body.on("click", '#' + id + '_HelpButton', funcHelpBtn(it, op));
        };

        var deshabilita = function (id) {
            body.off('click', '#' + id + '_HelpButton');
        };

        body.on("click", '#' + item.attr("id") + '_HelpButton', funcHelpBtn(item, opts));

        //Funcion (Externa)
        //Habilita el icono de busqueda
        $.fn.habilitaHlpBtn = function () {
            return this.each(function () {
                habilita($(this).attr("id"), $(this), settings[$(this).attr("id")] || opts);
            });
        };

        //Funcion (Externa)
        //Deshabilita el icono de busqueda
        $.fn.desHabilitaHlpBtn = function () {
            return this.each(function () {
                deshabilita($(this).attr("id"));
            });
        };

        //    $('body').on("click", '#' + item.attr("id") + '_HelpButton', function () {
        //      BoxHelpField_NoShowMessage();
        //      if (opts.targetMessage !== "") { HMXHideMessage(opts.targetMessage); }
        //      mostrarPopUp(item, opts);
        //      TemplateShow(item, opts);
        //      $('#' + item.attr("id") + '_' + opts.filtros[0].value).focus();
        //    });

        //Ejecutar el consultar del popUp en el clic del boton
        body.on('click', '#' + item.attr("id") + '_BotonConsultar', function () {
            $('#' + $(this).attr("id") + '_HelpFieldTableData').remove();
            BoxHelpField_NoShowMessage();
            if (opts.targetMessage !== "") { HMXHideMessage(opts.targetMessage); }
            if (opts.minimumCharacters > 0) {
                if ($('#' + item.attr("id") + '_' + opts.filtros[0].value).val().length < opts.minimumCharacters) {
                    BoxHelpField_Warning(opts.cultureResourcesPopUp.minimumCharacters + opts.minimumCharacters);
                    return;
                }
            }
            $('#' + item.attr("id") + '_BotonConsultar').attr('disabled', 'disabled');
            $('#' + item.attr("id") + '_ConsultarLoad').css({ "display": "inline" });
            opts.findByPopUp.call();
        });
        //Ejecutar el consultar del popUp al presionar ENTER
        for (var i = 0; i < opts.filtros.length; i++) {
            body.on('keydown', '#' + item.attr("id") + '_' + opts.filtros[i].value, function (e) {
                BoxHelpField_NoShowMessage();
                var code = (e.keyCode ? e.keyCode : e.which);
                if (code == 13) {
                    if (opts.minimumCharacters > 0) {
                        if ($('#' + item.attr("id") + '_' + opts.filtros[0].value).val().length < opts.minimumCharacters) {
                            BoxHelpField_Warning(opts.cultureResourcesPopUp.minimumCharacters + opts.minimumCharacters);
                            return;
                        }
                    }
                    $('#' + item.attr("id") + '_BotonConsultar').attr('disabled', 'disabled');
                    $('#' + item.attr("id") + '_ConsultarLoad').css({ "display": "inline" });
                    opts.findByPopUp.call();
                }
                if (code == 27) { cerrarHlpPopup(); }
            });
        }
        //Evento para cerrar el POPUP
        body.on("click", '#' + item.attr("id") + '_PopUpClose', function () { cerrarHlpPopup(); });
        //Evento para cerrar la caja de mensajes del POPUP
        body.on("click", '.Boton_BoxHelpField_Cerrar', function () { BoxHelpField_NoShowMessage(); });
        //Evento para controlar la seleccion de un elemento del popup
        body.on('click', '.' + item.attr("id") + '_ClassHelpSelection', function () {
            var parametros = JSON.parse($('#' + item.attr("id") + '_parametros').val());
            for (var i = 0; i < parametros.camposSalida.length; i++) {
                if (parametros.camposSalida[i].code === true) {
                    $('#' + item.attr("id") + '_Code').val($(this.parentNode).find('.' + item.attr("id") + '_' + parametros.camposSalida[i].value + '_ClassHelpColumn').text());
                }
                if (parametros.camposSalida[i].description === true) {
                    $('#' + item.attr("id") + '_lBox').val($(this.parentNode).find('.' + item.attr("id") + '_' + parametros.camposSalida[i].value + '_ClassHelpColumn').text());
                }
            }
            $('#' + item.attr("id") + '_ValorID').val($(this.parentNode).attr("data-ID"));
            $('#' + item.attr("id") + '_parametros').val(JSON.stringify(parametros));
            cerrarHlpPopup();
            //      if (parametros.onElementFound !== "") {
            //        if (typeof (eval(parametros.onElementFound)) == 'function') {
            //          OnElementFound = eval(parametros.onElementFound);
            //          OnElementFound();
            //        }
            //      }
            if ($.isFunction(opts.onElementFound)) {
                opts.onElementFound.call();
            }
            if (parametros.nextControlID !== "") {
                if ($("#" + parametros.nextControlID + "_Code").length > 0) {
                    $("#" + parametros.nextControlID + "_Code").focus();
                } else {
                    $("#" + parametros.nextControlID).focus();
                }
            }
        });
        var collapsed = false;
        body.on('click', '#' + item.attr("id") + '_DivHelpField_FiltrosBusqueda', function () {
            $('#' + item.attr("id") + '_DivHelpField_FiltrosBusqueda_Det').toggle();
            if (!collapsed) {
                $('.hmx_container_img').html(opts.iconCollapseUp);
                collapsed = true;
            } else {
                $('.hmx_container_img').html(opts.iconCollapseDown);
                collapsed = false;
            }
        });
        //Eventos para controlar la paginacion
        body.on('click', '.' + item.attr("id") + '_First', function () { var param = getOptionsJson(item); First(item, param); });
        body.on('click', '.' + item.attr("id") + '_Prev', function () { var param = getOptionsJson(item); Prev(item, param); });
        body.on('click', '.' + item.attr("id") + '_Next', function () { var param = getOptionsJson(item); Next(item, param); });
        body.on('click', '.' + item.attr("id") + '_Last', function () { var param = getOptionsJson(item); Last(item, param); });
    };
    /**
    * Tipo: Funcion (Interna)
    * Nombre: Box_onWarning
    * Descripcion:
    * Regresa el HTML de la caja de mensajes tipo warning
    */
    var Box_onWarning = function (opts) {
        var Panel = '';
        Panel += '<div id="BoxHelpField_ShowWarning" style="display:none"><div class="CBoxHelpField_ShowWarning" id="CajaMensajes_ShowWarnings_PopUpInterno">';
        Panel += '<table border="0" cellspacing="0" cellpadding="0"><tbody><tr>';
        Panel += '<td align="left" vAlign="middle" style="padding-left:22px;"><span id="BoxHelpField_ShowWarning_Message" style="color:#003366"></span></td>';
        Panel += '<td align="right" vAlign="top" style="padding-right:5px;"><span class="Boton_BoxHelpField_Cerrar">' + opts.iconClose + '</span></td>';
        //Panel += '<td align="right" vAlign="top" style="padding-right:5px;"><span class="Boton_BoxHelpField_Cerrar close">X</span></td>';
        Panel += '</tr></tbody></table></div></div>';
        return Panel;
    };
    /**
    * Tipo: Funcion (Interna)
    * Nombre: BoxHelpField_Warning
    * Descripcion:
    * Muestra la caja de mensajes tipo warning dentro del popup
    */
    var BoxHelpField_Warning = function (mensaje) {
        $("#BoxHelpField_ShowWarning").css({ 'display': 'inline' });
        $("#BoxHelpField_ShowWarning_Message").html(mensaje);
    };
    /**
    * Tipo: Funcion (Interna)
    * Nombre: BoxHelpField_NoShowMessage
    * Descripcion:
    * Oculta la caja de mensajes tipo warning dentro del popup
    */
    var BoxHelpField_NoShowMessage = function () {
        $("#BoxHelpField_ShowWarning").css({ 'display': 'none' });
        $("#BoxHelpField_ShowWarning_Message").html("");
    };
    /**
    * Tipo: Funcion (Interna)
    * Nombre: mostrarPopUp
    * Descripcion:
    * Invoca y dibuja el popup
    */
    var mostrarPopUp = function (item, opts) {
        var Element = 'body';
        var Contenido = '<div id="' + item.attr("id") + '_PopUp"></div>';
        var height = 500;
        var width = 700;
        var margin = width / 2;
        var color = '#222222'; /* '#58ACFA';*/
        var lightBox = "<div class='HelpField_lightbox'></div>";
        $(lightBox).appendTo('body');
        $('.HelpField_lightbox').css({
            "display": "none",
            "background": color,
            "filter": "alpha(opacity=50)",
            "-moz-opacity": "0.5",
            "-khtml-opacity": "0.5",
            "opacity": "0.5",
            "position": "fixed",
            "top": "0px",
            "left": "0px",
            "width": "100%",
            "height": "100%",
            "z-index": "1000"
        });
        var Panel = "";
        Panel += "<div class='HelpField_panel_pop'>";
        Panel += "<div class='HelpField_header'>";
        Panel += "<div class='HelpField_header_title' title='Cerrar'>" + opts.cultureResourcesPopUp.popUpHeader + "</div>";
        //Panel += "<div id='" + item.attr("id") + "_PopUpClose' style='cursor:pointer;color:white;'>" + opts.iconClose + "</div>";
        Panel += "<div id='" + item.attr("id") + "_PopUpClose' class='close'>X</div>";
        Panel += "</div>";
        Panel += "<div class='HelpField_fondo'>";
        Panel += Box_onWarning(opts);
        Panel += "<br />";
        Panel += "<div class='HelpField_contenido'>";
        Panel += "<div class='HelpField_subcontenido'>";
        Panel += "<div class='HelpField_panel_content'>" + Contenido + "</div>";
        Panel += "<div class='HelpField_pie'><div class='HelpField_pie_se'><div class='HelpField_pie_so'></div></div>";
        Panel += "</div></div></div></div>";
        $(Panel).appendTo(Element);
        $('.HelpField_panel_pop').css({
            "background": "#2b6b97 top left no-repeat",
            "top": "161px",
            "height": height + "px",
            "display": "inline",
            "z-index": "100000",
            "left": "269px",
            "width": "700px",
            "position": "absolute",
            "margin": "0px",
            "opacity": "1",
            "visibility": "visible",
            "-webkit-border-radius": "12px",
            "-moz-border-radius": "12px",
            "border-radius": "12px"
        });
        $('.HelpField_header').css({ "cursor": "move", "background": "#2b6b97 top right no-repeat", "margin-left": "21px" });
        $('.HelpField_header_title').css({
            "font-size": "16px",
            "font-family": "Arial, Helvetica, sans-serif",
            "color": "white",
            "font-weight": "bold",
            "text-align": "left",
            "background": "#2b6b97 top center repeat-x",
            "margin-right": "25px",
            "padding-top": "5px",
            "padding-bottom": "5px",
            "height": "30px",
            "-moz-user-select": "none",
            "-khtml-user-select": "none"
        });
        $('.HelpField_fondo').css({ "background": "#FFFFFF top right repeat-y", "border-left": "solid 1px #036", "border-right": "solid 1px #036", "border-bottom-right-radius": "12px", "border-bottom-left-radius": "12px" });
        $('.HelpField_contenido').css({ "background": "#FFFFFF top right repeat-y", "margin-left": "25px", "border-bottom-right-radius": "12px" });
        $('.HelpField_subcontenido').css({ "background": "#FFFFFF", "margin-right": "23px", "padding-top": "1px", "padding-bottom": "1px" });
        $('.HelpField_panel_content').css({ "height": height - 78 + "px", "width": "98%", "overflow": "auto", "padding": "5px" });
        $('.HelpField_pie').css({ "background": "#FFFFFF bottom left no-repeat" });
        $('.HelpField_pie_se').css({ "background": "#FFFFFF bottom left no-repeat", "margin-left": "21px" });
        $('.HelpField_pie_so').css({ "background": "#FFFFFF bottom repeat-x", "padding-top": "20px", "margin-right": "25px" });
        setDraggable($('.HelpField_panel_pop'), $('.HelpField_fondo *, ' + "#" + item.attr("id") + "_PopUpClose"));
        $("#" + item.attr("id") + "_PopUpClose img, #" + item.attr("id") + "_PopUpClose label").css({ "cursor": "pointer", "position": "relative", "top": "0", "float": "right", "margin-top": "-22px", "margin-right": "8px", "margin-left": "5px" });
        $('.HelpField_lightbox, .HelpField_panel_pop').fadeIn('slow');
        $('.HelpField_panel_pop').css({ "margin-left": "-" + margin + "px", "width": width + 10 + "px" });
        var url = '';
        if (opts.iconWarning != '!') { url = $(opts.iconWarning)[0].src; }
        $(".CBoxHelpField_ShowWarning").css({
            'background-image': 'url(' + url + ')',
            'background-repeat': 'no-repeat',
            'background-position': '5px center',
            'border': '#800000 1px solid',
            'padding-bottom': '5px',
            'padding-top': '5px',
            'background-color': '#ffffbb',
            'min-height': '15px',
            'width': '99.8%',
            'font-family': 'arial, Helvetica, sans-serif',
            'font-weight': 'bold',
            'height': 'auto',
            'color:': '#003366',
            'font-size': '13px',
            'top': '0px',
            'left': '0px'
        });
        $(".CBoxHelpField_ShowWarning table").css({ 'border-bottom-style': 'none', 'border-right-style': 'none', 'margin-top': '3px', 'width': '100%', 'border-collapse': 'collapse', 'border-top-style': 'none', 'border-left-style': 'none' });
        $('body').on('keyup', '#' + item.attr("id") + '_TextFiltro', function (e) { $('#' + item.attr("id")).filterDataCall($(this).val()); });
        $('body').on('change', '#' + item.attr("id") + '_ComboPageLength', function () { $('#' + item.attr("id")).changePageLength($(this).val()); });
    };
    /**
    * Tipo: Funcion (Interna)
    * Nombre: SetDraggable
    * Descripcion:
    * Prepara el elemento arrastrable
    */
    var setDraggable = function (element, elementos) {
        var o = {
            delay: 200,
            position: "absolute",
            top: 100,
            left: '50%',
            dragactive: false,
            opacity: '0.7',
            outline: '5px solid #aaaaaa',
            document: $(document)
        };
        return element.each(function () {
            var e = $(this);
            e.css({ "position": o.position, "top": o.top, "left": o.left });
            var cursor = e.css('cursor');
            var p = [null, null], m = null, t = null;
            var bl = function (e) {
                try {
                    e.stopPropagation();
                } catch (e) { }
            };
            $(elementos).each(function () {
                $(this).bind('mousedown', bl);
            });
            var md = function (e_md) {
                bl(e_md);
                if (o.dragactive) {
                    e.css({ 'opacity': o.opacity, 'cursor': 'move', 'outline': o.outline });
                    o.document.bind('mousemove', mm);
                    p = [e_md.clientX - e.position().left, e_md.clientY - e.position().top];
                    e.trigger('dragstart');
                } else {
                    m = e_md;
                    t = setTimeout(to, o.delay);
                }
            };
            var mu = function (e_mu) {
                if (o.dragactive) {
                    bl(e_mu);
                    o.document.unbind('mousemove', mm);
                    e.css({ 'opacity': '1', 'cursor': cursor, 'outline': 'none' }).trigger('dragend');
                }
                o.dragactive = false;
                clearTimeout(t);
            };
            var mm = function (e_mm) {
                bl(e_mm);
                e.css({ 'left': (e_mm.clientX - p[0]) + 'px', 'top': (e_mm.clientY - p[1]) + 'px' });
            };
            var to = function () {
                o.dragactive = true;
                if (m) md(m);
            };
            e.bind('mousedown', md).bind('mouseup', mu);
            return e;
        });
    };
    /**
    * Tipo: Funcion (Interna)
    * Nombre: TemplateFilters
    * Descripcion:
    * Obtene los filtros que se usaran en el POPUP
    */
    var TemplateFilters = function (item, opts) {
        var Filtros = '';
        for (var i = 0; i < opts.filtros.length; i++) {
            Filtros += '<label ID="EtiquetaHelpField_' + opts.filtros[i].value + '" class="HelpField_label_Field">' + opts.filtros[i].name + '</label>';
            Filtros += '<br />';
            Filtros += '<input type="text" id="' + item.attr("id") + '_' + opts.filtros[i].value + '" class="CajaHelpField_HMX" style="width:300px;"/> <br />';
        }
        return Filtros;
    };
    /**
    * Tipo: Funcion (Interna)
    * Nombre: TemplateColumns
    * Descripcion:
    * Obtene las columnas que nos da como resultado
    */
    var TemplateColumns = function (opts) {
        var ColumnHeader = '<th scope="col" class="centrado">&nbsp;</th>';
        for (var i = 0; i < opts.camposSalida.length; i++) {
            ColumnHeader += '<th scope="col" class="centrado">' + opts.camposSalida[i].header + '</th>';
        }
        return ColumnHeader;
    };
    /**
    * Tipo: Funcion (Interna)
    * Nombre: TemplateFooter
    * Descripcion:
    * Establece el pie de pagina del template
    */
    var TemplateFooter = function (opts) {
        var ColumnFoot = '<td></td>';
        for (var i = 0; i < opts.camposSalida.length; i++) {
            ColumnFoot += '<td></td>';
        }
        return ColumnFoot;
    };
    /**
    * Tipo: Funcion (Interna)
    * Nombre: TemplateResult
    * Descripcion:
    * Establece los registros correspondientes al resultado de la busqueda
    */
    var TemplateResult = function (item, opts) {
        var ContentResut = '<td class="' + item.attr("id") + '_ClassHelpSelection selecciona" style="cursor:pointer;" >' + opts.cultureResourcesPopUp.textSelection + '</td>';
        for (var i = 0; i < opts.camposSalida.length; i++) {
            ContentResut += '<td class="' + item.attr("id") + '_' + opts.camposSalida[i].value + '_ClassHelpColumn centrado">{$T.Item.' + opts.camposSalida[i].value + '}</td>';
        }
        return ContentResut;
    };
    /**
    * Tipo: Funcion (Interna)
    * Nombre: TemplatePaginator
    * Descripcion:
    * Establece el paginador para el manejo de datos dentro del template
    */
    var TemplatePaginator = function (item, opts) {
        var paginador = '<div id="' + item.attr("id") + '_Paginador" style="display:none;clear: both;">';
        paginador += '<div style="float:right;"><label id="HelpField_Paginas" Class="EtiquetaHelpField_HMX"></label></div>';
        paginador += '<table style="width:98%;padding:5px">';
        paginador += '<tr>';
        paginador += '<td style="text-align:right;width:50%;">';
        paginador += '<span class="' + item.attr("id") + '_Prev" style="cursor:pointer;float:right;text-align:center;">' + opts.iconPrev + '</span><span style="float:right;">&nbsp;</span>';
        paginador += '<span class="' + item.attr("id") + '_First" style="cursor:pointer;float:right;text-align:center;">' + opts.iconFirst + '</span>';
        paginador += '</td>';
        paginador += '<td style="text-align:left;width:50%;">';
        paginador += '<span class="' + item.attr("id") + '_Next" style="cursor:pointer;float:left;text-align:center;">' + opts.iconNext + '</span><span style="float:left;">&nbsp;</span>';
        paginador += '<span class="' + item.attr("id") + '_Last" style="cursor:pointer;float:left;text-align:center;">' + opts.iconLast + '</span>';
        paginador += '</td>';
        paginador += '</tr>';
        paginador += '</table>';
        paginador += '</div>';
        return paginador;
    };
    /**
    * Tipo: Funcion (Interna)
    * Nombre: TemplateStruct
    * Descripcion:
    * Prepara el Template del POPUP
    */
    var TemplateStruct = function (item, opts) {
        var template = '';
        template = '{#template MAIN}';
        template += '<div class="divCentrado"><div id="panelEncabezado"><div class="hmx_container_uno"><div class="content_header">';
        template += '<div id="' + item.attr("id") + '_DivHelpField_FiltrosBusqueda" class="balorFiltrosBusqueda" >';
        template += '<span class="hmx_container_img">' + opts.iconCollapseUp + '</span>';
        template += '<span id="EtiquetaHelpField_Filtros" class="content_header_title">{$T.cultureResourcesPopUp.textHeaderFilter}</span>';
        template += '</div></div>';
        template += '<div id="' + item.attr("id") + '_DivHelpField_FiltrosBusqueda_Det" class="HelpField_FiltrosBusqueda_Det">';
        template += TemplateFilters(item, opts);
        template += '<table border="0" cellspacing="0" cellpadding="0"><tr>';
        template += '<td><input type="button" id="' + item.attr("id") + '_BotonConsultar" class="HelpField_Secundary_Button btn btn-primary" value={$T.cultureResourcesPopUp.textButton} /></td>';
        template += '<td><span id="' + item.attr("id") + '_ConsultarLoad" style="display:none;">' + opts.iconLoad + '</span></td>';
        template += '</tr></table>';
        template += '</div></div></div></div>';
        template += '<br />';
        template += '<div id="' + item.attr("id") + '_DivHelpField_ClientTools" class="CT_HelpField">';
        template += '<div id="' + item.attr("id") + '_DivHelpField_CT_PageLength" class="CT_PL_HelpField">';
        template += opts.cultureResourcesPopUp.mostrar + ' ';
        template += '<select id="' + item.attr("id") + '_ComboPageLength" class="ComboHelpField_HMX">';
        template += '{#foreach $T.ElementosPorPaginaConfig as Item}';
        template += '<option value="{$T.Item}">{$T.Item}</option>';
        template += '{#/for}';
        template += '</select>';
        template += ' ' + opts.cultureResourcesPopUp.registros;
        template += '</div>';
        template += '<div id="' + item.attr("id") + '_DivHelpField_CT_RowFilter" class="CT_RF_HelpField">';
        template += opts.cultureResourcesPopUp.buscar + ' ' + '<input type="text" id="' + item.attr("id") + '_TextFiltro" class="CajaHelpField_HMX" value=""/>';
        template += '</div>';
        template += '</div>';
        template += '<div id="' + item.attr("id") + '_DivHelpField_Results" class="divCentrado">';
        template += '{#include RESULTS root=$T}';
        template += '</div>';
        template += '{#/template MAIN}';
        template += DataTemplateStruct(item, opts, 'RESULTS');
        return template;
    };
    /**
    * Tipo: Funcion (Interna)
    * Nombre: TemplateStruct
    * Descripcion:
    * Prepara el Template del POPUP
    */
    var DataTemplateStruct = function (item, opts, tplName) {
        var template = '';
        template = '{#template ' + tplName + '}';
        template += '<div class="table_hmx_style_HelpField">';
        template += '<table id="' + item.attr("id") + '_HelpFieldTableData" cellspacing="0" cellpadding="4" border="0">';
        template += '<thead>';
        template += '<tr>';
        template += TemplateColumns(opts);
        template += '</tr>';
        template += '</thead>';
        template += '<tbody>';
        template += '{#foreach $T.Datos as Item}';
        template += '<tr class="{#cycle values=["","odd"]}" data-ID="{$T.Item.' + opts.parametroID + '}">';
        template += TemplateResult(item, opts);
        template += '</tr>';
        template += '{#/for}';
        template += '</tbody>';
        template += '<tfoot>';
        template += '<tr>';
        template += TemplateFooter(opts);
        template += '</tr>';
        template += '</tfoot>';
        template += '</table>';
        template += '</div>';
        template += TemplatePaginator(item, opts);
        template += '{#/template ' + tplName + '}';
        return template;
    };
    /**
    * Tipo: Funcion (Interna)
    * Nombre: TemplateApplyStyles
    * Descripcion:
    * Aplica estilos al template de listado de resultados del POPUP
    */
    var TemplateApplyStyles = function (item) {
        $('.HelpField_FiltrosBusqueda_Det').css({
            'border-style': 'none solid solid solid',
            'border-width': '1px 2px 2px 1px',
            'border-color': '#2b6b97',
            'padding': '5px',
            'padding-top': '5px',
            'font-family': 'Arial, Helvetica, sans-serif',
            'font-size': '11px',
            'color': '#003366',
            'text-align': 'left'
        });
        $('.divCentrado').css({ "width": "610px", "margin-left": "auto", "margin-right": "auto" });
        $('.hmx_container_uno').css({ "width": "100%" });
        $('.hmx_container_img').css({ "cursor": "pointer", "float": "right", "margin-right": "5px", "padding-top": "3px", "display":"none" });
        $(".content_header_title").css('font-size', '16px');
        $(".balorFiltrosBusqueda").css("height", "20px");
        $('.table_hmx_style_HelpField').css({ 'width': '610px' });
        $('.table_hmx_style_HelpField table').css({ 'border-collapse': 'collapse', 'border': '1px solid #9CF', 'width': '100%' });
        $('.table_hmx_style_HelpField table, .table_hmx_style_HelpField table th, .table_hmx_style_HelpField table td').css({
            'border-collapse': 'collapse',
            'border-style': 'none none none none',
            'border-width': '1px 1px 1px 1px',
            'border-color': '#9CF',
            'font-family': 'arial, Helvetica, sans-serif',
            'color': '#003366',
            'font-size': '11px',
            'margin-left': 'auto',
            'margin-right': 'auto'
        });
        $('.table_hmx_style_HelpField table thead tr th').css({ 'background-color': '#2b6b97', 'font-size': '11px', 'font-weight': 'bold', 'color': '#FFFFFF' });
        $('.table_hmx_style_HelpField table tbody tr td').css({ 'font-size': '11px', 'font-weight': 'normal', 'color': '#036', 'padding': '4px' });
        $('.table_hmx_style_HelpField table tbody tr').css({ 'background': '#F8F8F8' });
        $('.table_hmx_style_HelpField table tbody tr.odd').css({ 'background': '#FFF' });
        $('.table_hmx_style_HelpField table td.texto').css({ 'text-align': 'left' });
        $('.table_hmx_style_HelpField table td.numero').css({ 'text-align': 'right' });
        $('.table_hmx_style_HelpField table td.centrado').css({ 'text-align': 'center' });
        $('.table_hmx_style_HelpField table td.selecciona').css({ 'width': '20%', 'text-decoration': 'underline', 'text-align': 'center', 'cursor': 'pointer' });
        $('.table_hmx_style_HelpField table tfoot tr').css({ 'border-style': 'none' });
        $("#HelpField_Paginas").css({ "text-align": "right", "color": "#036", "font-family": "arial, Helvetica, sans-serif", "font-size": "11px", "font-weight": "normal" });
        $('.CT_HelpField').css({ "width": "610px", 'margin-left': 'auto', 'margin-right': 'auto', 'overflow': 'auto' });
        $('.CT_PL_HelpField').css({ "float": "left", 'font-family': 'Arial, Helvetica, sans-serif', 'font-size': '11px', 'color': '#003366', 'font-weight': 'bold' });
        $('.CT_RF_HelpField').css({ "float": "right", 'font-family': 'Arial, Helvetica, sans-serif', 'font-size': '11px', 'color': '#003366', 'font-weight': 'bold' });
    };
    /**
    * Tipo: Funcion (Interna)
    * Nombre: TemplateShow
    * Descripcion:
    * Muestra el template dentro del popup generado por la ayuda
    */
    var TemplateShow = function (item, opts) {
        $('#' + item.attr("id") + '_PopUp').setTemplate(TemplateStruct(item, opts));
        $('#' + item.attr("id") + '_PopUp').processTemplate(opts);
        TemplateApplyStyles(item);
    };
    /**
    * Tipo: Funcion (Interna)
    * Nombre: TemplateShow
    * Descripcion:
    * Muestra el template dentro del popup generado por la ayuda
    */
    var DataTemplateShow = function (item, opts) {
        $('#' + item.attr("id") + '_DivHelpField_Results').setTemplate(DataTemplateStruct(item, opts, 'MAIN'));
        $('#' + item.attr("id") + '_DivHelpField_Results').processTemplate(opts);
        TemplateApplyStyles(item);
    };
    /**
    * Tipo: Funcion (Interna)
    * Nombre: setOptionJson
    * Descripcion:
    * Establece los valores de las opciones de configuracion de la ayuda y los almacena en el hidden de los parametros de la pagina principal
    */
    var setOptionJson = function (item, opts) { $('#' + $(item).attr("id") + '_parametros').val(JSON.stringify(opts)); };
    /**
    * Tipo: Funcion (Interna)
    * Nombre: getOptionsJson
    * Descripcion:
    * Obtiene los valores de las opciones de configuracion de la ayuda, almacenados en el hidden de los parametros de la pagina principal
    */
    var getOptionsJson = function (item) { return JSON.parse($('#' + $(item).attr("id") + '_parametros').val()); };
    /**
    * Tipo: Funcion (Interna)
    * Nombre: isPaginable
    * Descripcion:
    * Determina si la lista de elementos obtenida en la busqueda requiere paginacion
    */
    var isPaginable = function (listaElementos, ElementosPorPaguina) {
        if (listaElementos.length > ElementosPorPaguina) {
            return true;
        } else {
            return false;
        }
    };
    /**
    * Tipo: Funcion (Interna)
    * Nombre: First
    * Descripcion:
    * Regresa a la primer pagina de la lista de elementos
    */
    var First = function (item, opts) {
        var AyudaPaginada = [];
        opts.paginador = 0;
        opts.NumeroPaguinas = Math.ceil((opts.DatosFiltrados.length / opts.ElementosPorPaguina));
        //Recorremos los registros del resultado de la busqueda
        for (var i = 0; i < opts.ElementosPorPaguina; i++) {
            var Elemento = {};
            //Barremos las columnas o las propiedades que tienen los datos en base a los campos de salida               
            for (var j = 0; j < opts.camposSalida.length; j++) {
                var a = 'Elemento.' + opts.camposSalida[j].value + ' = opts.DatosFiltrados[opts.paginador].' + opts.camposSalida[j].value;
                eval(a);
            }
            var b = 'Elemento.' + opts.parametroID + ' = opts.DatosFiltrados[opts.paginador].' + opts.parametroID;
            eval(b);
            AyudaPaginada.push(Elemento);
            //Controla la posicion donde debe iniciar el paginador
            opts.paginador += 1;
        }
        //Inicia la pagina actual en 1
        opts.PaguinaActual = 1;
        //Muestra el div con los botones de navegacion              
        opts.Datos = AyudaPaginada;
        DataTemplateShow(item, opts);
        setOptionJson(item, opts);
        $('#' + $(item).attr("id") + '_Paginador').css({ "display": "inline" });
        PaginatorDescriptionShow(opts, false);

    };
    /**
    * Tipo: Funcion (Interna)
    * Nombre: PaginatorDescriptionShow
    * Descripcion:
    * Muestra el contador de paginas
    */
    var PaginatorDescriptionShow = function (opts, ultimaPag) {
        $('#HelpField_Paginas').html(opts.cultureResourcesPopUp.mostrando + ' ' + (ultimaPag ? ((opts.paginador + 1) - opts.Datos.length) : ((opts.paginador + 1) - opts.ElementosPorPaguina)) + ' ' + opts.cultureResourcesPopUp.hasta + ' ' + opts.paginador + ' ' + opts.cultureResourcesPopUp.de + ' ' + opts.DatosFiltrados.length + ' ' + opts.cultureResourcesPopUp.registros);
    };
    /**
    * Tipo: Funcion (Interna)
    * Nombre: Prev
    * Descripcion:
    * Cambia a la pagina anterior de la lista de elementos
    */
    var Prev = function (item, opts) {
        if (opts.PaguinaActual == 1) { return; }
        var AyudaPaginada = [];
        opts.PaguinaActual = opts.PaguinaActual - 1;
        opts.paginador = ((opts.PaguinaActual * opts.ElementosPorPaguina) - opts.ElementosPorPaguina);
        for (var i = 0; i < opts.ElementosPorPaguina; i++) {
            var Elemento = {};
            //Barremos las columnas o las propiedades que tienen los datos en base a los campos de salida               
            for (var j = 0; j < opts.camposSalida.length; j++) {
                var a = 'Elemento.' + opts.camposSalida[j].value + ' = opts.DatosFiltrados[opts.paginador].' + opts.camposSalida[j].value;
                eval(a);
            }
            var b = 'Elemento.' + opts.parametroID + ' = opts.DatosFiltrados[opts.paginador].' + opts.parametroID;
            eval(b);
            AyudaPaginada.push(Elemento);
            //Controla la posicion donde debe iniciar el paginador
            opts.paginador += 1;
        }
        //Muestra el div con los botones de navegacion              
        opts.Datos = AyudaPaginada;
        DataTemplateShow(item, opts);
        $('#' + $(item).attr("id") + '_Paginador').css({ "display": "inline" });
        setOptionJson(item, opts);
        PaginatorDescriptionShow(opts, false);
    };
    /**
    * Tipo: Funcion (Interna)
    * Nombre: Next
    * Descripcion:
    * Cambia a la pagina siguiente de la lista de elementos
    */
    var Next = function (item, opts) {
        //Preguntamos si nos encontramos en la ultima pagina
        if (opts.PaguinaActual == opts.NumeroPaguinas) { return; }
        //Codigo para PAGINAR
        var AyudaPaginada = [];
        var inicio = 0;
        var ultimaPagina = false;
        var fin = opts.ElementosPorPaguina;
        if ((opts.PaguinaActual + 1) == opts.NumeroPaguinas) {
            inicio = opts.paginador;
            fin = opts.DatosFiltrados.length;
            ultimaPagina = true;
        }
        for (var i = inicio; i < fin; i++) {
            var Elemento = {};
            //Barremos las columnas o las propiedades que tienen los datos en base a los campos de salida               
            for (var j = 0; j < opts.camposSalida.length; j++) {
                var a = 'Elemento.' + opts.camposSalida[j].value + ' = opts.DatosFiltrados[opts.paginador].' + opts.camposSalida[j].value;
                eval(a);
            }
            var b = 'Elemento.' + opts.parametroID + ' = opts.DatosFiltrados[opts.paginador].' + opts.parametroID;
            eval(b);
            AyudaPaginada.push(Elemento);
            //Controla la posicion donde debe iniciar el paginador
            opts.paginador += 1;
        }
        opts.PaguinaActual = opts.PaguinaActual + 1;
        //Muestra el div con los botones de navegacion              
        opts.Datos = AyudaPaginada;
        DataTemplateShow(item, opts);
        $('#' + $(item).attr("id") + '_Paginador').css({ "display": "inline" });
        setOptionJson(item, opts);
        PaginatorDescriptionShow(opts, ultimaPagina);
    };
    /**
    * Tipo: Funcion (Interna)
    * Nombre: Last
    * Descripcion:
    * Cambia a la ultima pagina de la lista de elementos
    */
    var Last = function (item, opts) {
        //Codigo para PAGINAR
        opts.PaguinaActual = opts.NumeroPaguinas;
        opts.paginador = ((opts.PaguinaActual * opts.ElementosPorPaguina) - opts.ElementosPorPaguina);
        var AyudaPaginada = [];
        var paginadorAux = opts.paginador; //Para iniciar en la posicion del paginador
        for (var i = paginadorAux; i < opts.DatosFiltrados.length; i++) {
            var Elemento = {};
            //Barremos las columnas o las propiedades que tienen los datos en base a los campos de salida               
            for (var j = 0; j < opts.camposSalida.length; j++) {

                var a = 'Elemento.' + opts.camposSalida[j].value + ' = opts.DatosFiltrados[opts.paginador].' + opts.camposSalida[j].value;
                eval(a);

            }
            var b = 'Elemento.' + opts.parametroID + ' = opts.DatosFiltrados[opts.paginador].' + opts.parametroID;
            eval(b);
            AyudaPaginada.push(Elemento);
            //Controla la posicion donde debe iniciar el paginador
            opts.paginador += 1;
        }
        //Muestra el div con los botones de navegacion              
        opts.Datos = AyudaPaginada;
        DataTemplateShow(item, opts);
        $('#' + $(item).attr("id") + '_Paginador').css({ "display": "inline" });
        setOptionJson(item, opts);
        PaginatorDescriptionShow(opts, true);
    };
    /**
    * Tipo: Funcion (Externa)
    * Nombre: showFindByPopUp
    * Descripcion:
    * Muestra en el template el resultado de la consulta de datos de la ayuda realizada por el cliente
    */
    $.fn.showFindByPopUp = function (listaElementos) {
        $('#' + $(this).attr("id") + '_BotonConsultar').removeAttr('disabled');
        $('#' + $(this).attr("id") + '_ConsultarLoad').css({ "display": "none" });
        var opts = getOptionsJson(this);
        opts.AyudaBase = listaElementos;
        opts.DatosFiltrados = listaElementos;
        setOptionJson(this, opts);
        if (isPaginable(listaElementos, opts.ElementosPorPaguina)) {
            First(this, opts);
        } else {
            opts.Datos = listaElementos;
            setOptionJson(this, opts);
            TemplateShow(this, opts);
        }
        if (listaElementos.length <= 0) {
            BoxHelpField_Warning(opts.cultureResourcesPopUp.resultNotFound);
            $('#' + $(this).attr("id") + '_' + opts.filtros[0].value).focus();
            return;
        }
        $('#' + $(this).attr("id") + '_DivHelpField_FiltrosBusqueda_Det').toggle();
        $('.hmx_container_img').html(opts.iconCollapseDown);
    };
    /**
    * Tipo: Funcion (Externa)
    * Nombre: getValuesByCode
    * Descripcion:
    * Regresa un objeto con los valores contenidos en el ID,CODIGO Y DESCRIPCION
    */
    $.fn.getValuesByCode = function () {
        var opts = getOptionsJson($(this));
        var filtros = {};
        if (opts.Parametros != null) {
            for (var i = 0; i < opts.Parametros.length; i++) {
                var valor = "";
                if (opts.Parametros[i].value.length > 2) {
                    var len = opts.Parametros[i].value.length;
                    if (opts.Parametros[i].value.substring(len - 2, len) == '()') {
                        valor = eval(opts.Parametros[i].value);
                    }
                    else {
                        valor = opts.Parametros[i].value;
                    }
                }
                else {
                    valor = opts.Parametros[i].value;
                }
                var b = 'filtros.' + opts.Parametros[i].name + ' = eval("valor");';
                eval(b);
            }
        }
        if (opts.dependencia !== '') { }
        filtros.ID = $('#' + $(this).attr("id") + '_ValorID').val();
        filtros.Codigo = $('#' + $(this).attr("id") + '_Code').val();
        filtros.Descripcion = $('#' + $(this).attr("id") + '_lBox').val();
        return filtros;
    };
    /**
    * Tipo: Funcion (Externa)
    * Nombre: getValuesByPopUp
    * Descripcion:
    * Regresa un objeto con los valores de los Filtros del PopUp
    */
    $.fn.getValuesByPopUp = function () {
        var opts = getOptionsJson($(this));
        var filtros = {};
        var id = $(this).attr('id');
        for (var i = 0; i < opts.filtros.length; i++) {
            //var b = 'filtros.' + opts.filtros[i].value + ' = $(\'#\' + $(this).attr("id") + \'_\' + opts.filtros[i].value).val();';
            //eval(b);
            filtros[opts.filtros[i].value] = $('#' + id + '_' + opts.filtros[i].value).val();
        }
        if (opts.Parametros != null) {
            for (i = 0; i < opts.Parametros.length; i++) {
                //var b = 'filtros.' + opts.Parametros[i].name + ' = opts.Parametros[i].value;';
                //eval(b);
                filtros[opts.Parametros[i].name] = opts.Parametros[i].value;
            }
        }
        return filtros;
    };
    /**
    * Tipo: Funcion (Externa)
    * Nombre: showFindByCode
    * Descripcion:
    * Pone los valores recibidos de la busqueda por codigo en los controles de la pagina principal
    */
    var iniciaFindByCode = function (settings) {
        $.fn.showFindByCode = function (values) {
            var opts = getOptionsJson($(this)),
          id = $(this).attr('id');
            if (values && values.length > 0) {
                $('#' + id + '_ValorID').val(values[0].ID);
                $('#' + id + '_Code').val(values[0].Codigo);
                $('#' + id + '_lBox').val(values[0].Descripcion);
                //$('#' + id + '_HelpLoad').css({ "display": "none" });
                $('#' + id + '_HelpLoad').css({ 'visibility': 'hidden' });
                //      if (opts.onElementFound !== "") {
                //        if (typeof (eval(opts.onElementFound)) == 'function') {
                //          OnElementFound = eval(opts.onElementFound);
                //          OnElementFound();
                //        }
                //      }                                
                if ($.isFunction(settings.onElementFound)) {
                    settings.onElementFound.call();
                }
                if (opts.nextControlID !== "") {
                    if ($("#" + opts.nextControlID + "_Code").length > 0) {
                        $("#" + opts.nextControlID + "_Code").focus();
                    } else {
                        $("#" + opts.nextControlID).focus();
                    }
                }
            } else {
                if (opts.targetMessage !== "") { HMXShowWarning(opts.targetMessage, opts.cultureResourcesPopUp.resultNotFound); }
                $('#' + id).clearHelpField();
                $('#' + id + '_Code').focus();
                //$('#' + id + '_HelpLoad').css({ "display": "none" });
                $('#' + id + '_HelpLoad').css({ 'visibility': 'hidden' });
            }
            
        };
    };
    /**
    * Tipo: Funcion (Externa)
    * Nombre: setValuesByCode
    * Descripcion:
    * Setea los valores en la pagina principal sin hacer ninguna validacion
    */
    $.fn.setValuesByCode = function (values) {
        var opts = getOptionsJson($(this));
        if (values.length > 0) {
            $('#' + $(this).attr("id") + '_ValorID').val(values[0].ID);
            $('#' + $(this).attr("id") + '_Code').val(values[0].Codigo);
            $('#' + $(this).attr("id") + '_lBox').val(values[0].Descripcion);
        }
    };
    /**
    * Tipo: Funcion (Externa)
    * Nombre: clearHelpField
    * Descripcion:
    * Limpia todos los valores de la ayuda
    */
    $.fn.clearHelpField = function () {
        $('#' + $(this).attr("id") + '_Code').val("");
        $('#' + $(this).attr("id") + '_lBox').val("");
        $('#' + $(this).attr("id") + '_ValorID').val("");
        //$('#' + $(this).attr("id") + '_HelpLoad').css({ "display": "none" });
        $('#' + $(this).attr("id") + '_HelpLoad').css({ 'visibility': 'hidden' });
        return this;
    };
    /**
    * Tipo: Funcion (Externa)
    * Nombre: getOptions
    * Descripcion:
    * Obtiene un objeto con los ids de los controles de la ayuda
    */
    $.fn.getOptionsHelpField = function () {
        return {
            controlId: $(this).attr("id") + '_ValorID',
            controlCodigo: $(this).attr("id") + '_Code',
            controlDescripcion: $(this).attr("id") + '_lBox',
            controlBoton: $(this).attr("id") + '_HelpButton',
            controlLoad: $(this).attr("id") + '_HelpLoad',
            controlParametros: $(this).attr("id") + '_parametros'
        };
    };
    /**
    * Tipo: Funcion (Externa)
    * Nombre: setFocusHelp
    * Descripcion:
    * Limpia todos los valores de la ayuda
    */
    $.fn.setFocusHelp = function () {
        $('#' + $(this).attr("id") + '_Code').focus();
    };
    /**
    * Tipo: Funcion (Externa)
    * Nombre: HelpIsValid
    * Descripcion:
    * Si la ayuda es requerida, valida si se capturo un codigo
    */
    $.fn.HelpIsValid = function () {
        var opts = getOptionsJson($(this));
        if (opts.requeridField) {
            if ($('#' + $(this).attr("id") + '_Code').val() === "") {
                if (opts.targetMessage !== "") {
                    HMXShowWarning(opts.targetMessage, opts.cultureResourcesPopUp.requeridMessage + ": " + opts.title);
                }
                $('#' + $(this).attr("id") + '_Code').css({ "background-color": "#ffd9d9" });
                $('#' + $(this).attr("id") + '_Code').focus();
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    };
    /**
    * Tipo: Funcion (Externa)
    * Nombre: EnableHelpField
    * Descripcion:
    * Habilita o deshabilita los controles de la ayuda
    */
    $.fn.EnableHelpField = function (enable) {
        return this.each(function () {
            var id = $(this).attr('id'),
          elementos = $('#' + id + '_Code, #' + id + '_lBox, #' + id + '_HelpButton');
            if (enable) {
                elementos.removeAttr('disabled');
            } else {
                elementos.attr('disabled', 'true');
            }
        });
    };
    /**
    * Tipo: Funcion 
    * Nombre: filterDataCall
    * Descripcion:
    * Implementa la espera de tecleado del usuario para filtrar la informaciòn registrada en el grid de resultado del popup
    */
    $.fn.filterDataCall = (function () {
        var self;
        var fDataTimeout;
        var waitTime = 750;
        function fCall(filtro) {
            if (!self) { var self = this; }
            if (!fDataTimeout) { fDataTimeout = setTimeout(function () { $(self).filterData(filtro); }, waitTime); }
            else {
                clearTimeout(fDataTimeout);
                fDataTimeout = setTimeout(function () { $(self).filterData(filtro); }, waitTime);
            }
        }
        return fCall;
    })();
    /**
    * Tipo: Funcion 
    * Nombre: filterData
    * Descripcion:
    * Filtra la informaciòn registrada en el grid de resultado del popup
    */
    $.fn.filterData = function (filtro) {
        var opts = getOptionsJson(this);
        var datos = opts.AyudaBase;
        var resultado = [];
        filtro = filtro.toLowerCase();
        for (var i = 0; i < datos.length; i++) {
            for (var c = 0; c < opts.camposSalida.length; c++) {
                if (datos[i][opts.camposSalida[c].value].toString().toLowerCase().indexOf(filtro) >= 0) {
                    resultado.push(datos[i]);
                    break;
                }
            }
        }
        opts.DatosFiltrados = resultado;
        if (isPaginable(resultado, opts.ElementosPorPaguina)) { First(this, opts); }
        else {
            opts.Datos = resultado;
            opts.DatosFiltrados = resultado;
            DataTemplateShow(this, opts);
        }
        setOptionJson(this, opts);
    };
    /**
    * Tipo: Funcion 
    * Nombre: changePageLength
    * Descripcion:
    * Establece el número de registros que serán mostrados por página
    */
    $.fn.changePageLength = function (len) {
        var opts = getOptionsJson(this);
        opts.ElementosPorPaguina = len;
        setOptionJson(this, opts);
        if (isPaginable(opts.DatosFiltrados, opts.ElementosPorPaguina)) { First(this, opts); }
        else { DataTemplateShow(this, opts); }
    };
})(jQuery);