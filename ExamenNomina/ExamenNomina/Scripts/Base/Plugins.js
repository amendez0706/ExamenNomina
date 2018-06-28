//Muestra el mensaje de las alertas
(function ($) {
    var myMessages = ['info', 'warning', 'error', 'success'];

    function hideAllMessages() {
        var messagesHeights = []; // this array will store height for each
        for (var i = 0; i < myMessages.length; i++) {
            messagesHeights[i] = $('.' + myMessages[i]).outerHeight(); // fill array
            $('.' + myMessages[i]).css('top', -messagesHeights[i]); //move element outside viewport
        }
    }

    $.fn.mostrarMensaje = function (msjEncabezado, msjCuerpo, type) {
        for (var i = myMessages.length; i--;) {
            this.removeClass(myMessages[i]);
        }
        this.addClass(type);
        this.html('').css('display', 'inline-block');
        this.html('<h3>' + msjEncabezado + '</h3><p>' + msjCuerpo + '</p>');
        hideAllMessages();
        this.animate({ top: '0', opacity: 1 }, 500);

        this.click(function () {
            $(this).animate({ top: -$(this).outerHeight(), opacity: 0 }, 500);
        });

        return this;
    };

    $.fn.ocultarMensaje = function () {
        this.animate({ top: -this.outerHeight(), opacity: 0 }, 500);
    };

}(jQuery));


(function ($) {
    function hiddeEfectShow(item) {
        $("#" + $(item).attr("id") + "_Det").toggle();
        if ($("#" + $(item).attr("id") + " span img").attr("src").indexOf('mas') != -1) {
            $("#" + $(item).attr("id") + " span").html('<img src="../../Base/img/menos.png" />');
        } else {
            $("#" + $(item).attr("id") + " span").html('<img src="../../Base/img/mas.png" />');
        }
    }
    $.fn.hiddeEfect = function () {
        this.click(function () {
            hiddeEfectShow(this);
        });
        return this;
    };
}(jQuery));


// Llenar un elemento select (combobox)
// Recibe un arreglo de objetos con las propiedades id y nombre
// Ej. [{id:1, nombre:'xxx'}, {id:2, nombre:'yyy'}]
(function ($) {
    /**
    * Check whether an object is Array or not
    * @type Boolean
    * @param {object} subject is the variable that is
    * tested for Array identity check
    */
    var isArray = (function () {
        // Use compiler's own isArray when available
        if (Array.isArray) {
            return Array.isArray;
        }

        // Retain references to variables for performance
        // optimization
        var objectToStringFn = Object.prototype.toString,
              arrayToStringResult = objectToStringFn.call([]);

        return function (subject) {
            return objectToStringFn.call(subject) === arrayToStringResult;
        };
    }());

    $.fn.llenaCombo = function (datos, msgOpcSelec, defaultSelected) {
        if (isArray(datos)) {
            var arreglo = datos.reverse(),
                len = arreglo.length;

            return this.each(function () {
                var opt = msgOpcSelec ? '<option value="">' + msgOpcSelec + '</option>' : '',
                    combo = this;
                if (combo.tagName === 'SELECT') {
                    var i = len;
                    for (; i--;) {
                        opt += '<option value="' + arreglo[i].id + '">' + arreglo[i].nombre + '</option>';
                    }
                    combo.innerHTML = opt;
                    if (defaultSelected) {
                        combo.value = defaultSelected;
                    }
                }
            });
        } else {
            return this;
        }
    };

}(jQuery));


(function ($) {
    // Mueve el scroll al elemento seleccionado.
    // $('#elemento').scrollView();

    $.fn.scrollView = function () {
        return this.each(function () {
            $('html, body').animate({
                scrollTop: $(this).offset().top - 50
            }, 1000);
        });
    };

}(jQuery));

//Extencion para aplicar el efecto de arrastrar un elemento
(function ($) {
    'use strict';
    // Aplica efecto de arrastrar un elemento.
    // $('elemento').setDraggable('elementos');
    // Ej. $('.popup').setDraggable('.popup-body, .popup-footer, .close');

    // 'elementos': Son elementos a los que NO se les aplica el efecto de arrastre.
    // Utiliza el metodo $.fn.actual del plugin para obtener las medidas de elementos ocultos.

    $.fn.setDraggable = function (elementos) {
        //    var left = (window.innerWidth / 2) - (element.width() / 2),
        //        top = window.innerHeight * 0.1;
        var o = {
            delay: 200,
            position: "absolute",
            //top: top, //100,
            //left: left, // '50%',
            dragactive: false,
            opacity: '0.7',
            outline: '5px solid #aaaaaa',
            document: $(document)
        };
        return this.each(function () {
            var e = $(this);
            var width = e.actual('width'),
                left = (window.innerWidth / 2) - (width / 2),
                top = window.innerHeight * 0.1;
            e.css({ "position": o.position, "top": top, "left": left });
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

}(jQuery));



//Funciones Genericas que sirven para todas las pantallas si damos de alta alguna funcion aqui la podremos ver en todo el java script de nuestra pagina

(function (window, toastr) {
    'use strict';

    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": false,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    var mostrarToastR = function (titulo, mensaje, tipoMensaje) {
        toastr[tipoMensaje](mensaje, titulo);
    }

    var onlyAlfanumeric = function (evt) {
        evt = (evt) ? evt : event;
        var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode : ((evt.which) ? evt.which : 0));
        // á, é, í, ó, ú, ñÑ, üÜ, |, &
        if (charCode == 95 || charCode == 40 || charCode == 41 || charCode == 225 || charCode == 233 || charCode == 237 || charCode == 243 || charCode == 250 || charCode == 124 || charCode == 241 || charCode == 209 || charCode == 252 || charCode == 220 || charCode == 38) {
            return true;
        }
        if (charCode > 32 && (charCode < 44 || charCode > 57) && (charCode < 64 || charCode > 90) && (charCode < 97 || charCode > 122)) {
            return false;
        }
        return true;
    };

    var onlyNumeric = function (evt) {
        evt = (evt) ? evt : event;
        var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode : ((evt.which) ? evt.which : 0));
        if (charCode < 32 || (charCode > 47 && charCode < 58) || charCode === 46) { return true; }
        return false;
    };

    var onlyInteger = function (evt) {
        evt = (evt) ? evt : event;
        var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode : ((evt.which) ? evt.which : 0));
        if (charCode < 32 || (charCode > 47 && charCode < 58)) { return true; }
        return false;
    };


    var aplicarFormatoMoneda = function (num, prefix) {
        if (num === '' || isNaN(num)) { num = 0; }
        prefix = prefix || '';
        num += '';
        var splitStr = num.split('.');
        var splitLeft = splitStr[0];
        var splitRight = splitStr.length > 1 ? '.' + (splitStr[1] + '00').substring(0, 2) : '.00';
        var regx = /(\d+)(\d{3})/;
        while (regx.test(splitLeft)) { splitLeft = splitLeft.replace(regx, '$1' + ',' + '$2'); }
        return (prefix + splitLeft + splitRight).replace(prefix + '-', '-' + prefix);
    };

    var quitarFormatoMoneda = function (num) {
        if (num === undefined) { return; }
        return num.replace(/([^0-9\.\-])/g, '') * 1;
    };

    var radioGetCheckedValue = function (name) {
        var radioBtns = document.getElementsByName(name),
            i = radioBtns.length;
        for (; i--;) {
            if (radioBtns[i].checked) {
                return radioBtns[i].value;
            }
        }
        return '';
    };

    var radioSetCheckedValue = function (name, value) {
        var radioBtns = document.getElementsByName(name),
            i = radioBtns.length;
        for (; i--;) {
            if (radioBtns[i].value == value) {
                radioBtns[i].checked = true;
            }
        }
    };

    var fechaActual = function () {
        var fecha = new Date(), dd = ('0' + fecha.getDate().toString()).slice(-2), mm = ('0' + (fecha.getMonth() + 1).toString()).slice(-2), y = fecha.getFullYear().toString();
        return dd + '/' + mm + '/' + y;
    };

    window.genericas = (function () {
        return {
            aplicarFormatoMoneda: aplicarFormatoMoneda,
            quitarFormatoMoneda: quitarFormatoMoneda,
            onlyAlfanumeric: onlyAlfanumeric,
            onlyNumeric: onlyNumeric,
            onlyInteger: onlyInteger,
            radioGetCheckedValue: radioGetCheckedValue,
            radioSetCheckedValue: radioSetCheckedValue,
            fechaActual: fechaActual,
            mostrarToastR: mostrarToastR
        };
    }());

}(window, toastr));





//Habilita los elementos hijos del menu principal
(function ($) {
    $(document).ready(function () {
        $('ul.dropdown-menu [data-toggle=dropdown]').on('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            $(this).parent().siblings().removeClass('open');
            $(this).parent().toggleClass('open');
        });
    });
})(jQuery);