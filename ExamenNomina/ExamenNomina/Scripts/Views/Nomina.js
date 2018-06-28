(function ($, genericas) {
    //*******************************************************************************F U N C I O N E S   G E N E R A L E S*******************************************************************************************
    'use strict';
    var body = $('body');

    var showMsg = function (titulo, mensaje, tipoMensaje) {
        genericas.mostrarToastR(titulo, mensaje, tipoMensaje);
    };

    var ShowLightBox = function (Mostrar) {
        if (Mostrar == true) {
            $("body").addClass("loading");
        } else {
            $("body").removeClass("loading");
        }
    };

    var focusNextControl = function (control, e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code === 13) {
            var inputs = $(control).closest('#mainContainer').find('input[type=text]:enabled, input[type=time]:enabled, input[type=password]:enabled, input[type=button]:enabled, input[type=checkbox]:enabled, input[type=radio]:enabled, input[type=date]:enabled, input[type=tel]:enabled, input[type=email]:enabled, input[type=number]:enabled, select:enabled, textarea:enabled').not('input[readonly=readonly], fieldset:hidden *, *:hidden');
            inputs.eq(inputs.index(control) + 1).focus();
            e.preventDefault();
        }
    };

    var ejecutaAjax = function (url, tipo, datos, successfunc, errorfunc, async) {
        $.ajax(url, {
            type: tipo || 'POST',
            cache: false,
            async: async,
            dataType: 'json',
            data: datos ? JSON.stringify(datos) : '{}',
            contentType: 'application/json; charset=utf-8',
            success: successfunc,
            error: errorfunc || function (d) {
                console.log(d.responseText);
            }
        });
    };    
    //Eventos
    $('input').not('input[type=button]').on('keypress', null, function (e) {
        focusNextControl(this, e);
    });

    body.on('keypress', '#txtAño', null, function (e) {
        return genericas.onlyNumeric(e);
    });

    body.on("click", "#btnLimpiar", function () {
        window.location.replace('/Nomina');
    });

    body.on("click", "#btnConsultar", function () {
        if (!$("#txtAño").val()) {
            showMsg('Alerta', "Debe ingresar el año", 'warning');
            $("#txtAño").focus();
            return;
        }

        if ($("#ddlMes").val() == "") {
            showMsg('Alerta', "Debe seleccionar el mes", 'warning');
            $("#ddlMes").focus();
            return;
        }

        ShowLightBox(true);
        var parametros = {};
        parametros.anio = $("#txtAño").val();
        parametros.mes = $("#ddlMes").val();
        parametros.tipo = $("#ddlTipo").val();
        parametros.rol = $("#ddlRol").val();
        ejecutaAjax('/Nomina/TraerReporteNomina', 'POST', parametros, function (d) {
            ShowLightBox(false);
            if (d.d.EsValido) {
                ProcessarDatos(d.d.Datos);
            } else {
                showMsg('Alerta', d.d.Mensaje, 'warning');
            }
        }, function (d) {
            ShowLightBox(false);
            showMsg('Alerta', d.responseText, 'error');
        }, true);
    });

    var ProcessarDatos = function (Datos) {
        var resHtml = '';
        for (var i = 0; i < Datos.length; i++) {
            resHtml += '<tr>';
            resHtml += '<td>' + Datos[i].EmpleadoID + '</td>';
            resHtml += '<td>' + Datos[i].Nombre + '</td>';
            resHtml += '<td>' + Datos[i].Rol + '</td>';
            resHtml += '<td>' + Datos[i].Tipo + '</td>';
            resHtml += '<td>' + genericas.aplicarFormatoMoneda(Datos[i].SueldoMensual, "$") + '</td>';
            resHtml += '<td>' + genericas.aplicarFormatoMoneda(Datos[i].BonoPorEntrega, "$") + '</td>';
            resHtml += '<td>' + genericas.aplicarFormatoMoneda(Datos[i].BonoPorHora, "$") + '</td>';
            resHtml += '<td>' + genericas.aplicarFormatoMoneda(Datos[i].ValesDespensa, "$") + '</td>';
            resHtml += '<td>' + genericas.aplicarFormatoMoneda(Datos[i].ISR_Ret, "$") + '</td>';
            resHtml += '<td>' + genericas.aplicarFormatoMoneda(Datos[i].ISR_Adi, "$") + '</td>';
            resHtml += '<td>' + genericas.aplicarFormatoMoneda(Datos[i].TotalPagar, "$") + '</td>';
            resHtml += '</tr>';
        }
        $("#TablaNomina tbody").html(resHtml);
    };


    var TraerMeses = function () {
        ejecutaAjax('/Nomina/TraerMeses', 'GET', null, function (d) {
            if (d.d.EsValido) {
                $('#ddlMes').llenaCombo(d.d.Datos, "Seleccione", null);
                TraerTiposEmpleados();
            } else {
                showMsg('Alerta', d.d.Mensaje, 'warning');
            }
        }, function (d) {
            ShowLightBox(false);
            showMsg('Alerta', d.responseText, 'error');
        }, true);
    };

    var TraerTiposEmpleados = function () {
        ejecutaAjax('/Empleados/TraerTiposEmpleados', 'GET', null, function (d) {
            if (d.d.EsValido) {
                $('#ddlTipo').llenaCombo(d.d.Datos, "Todos", null);
                TraerRolesEmpleados();
            } else {
                showMsg('Alerta', d.d.Mensaje, 'warning');
            }
        }, function (d) {
            ShowLightBox(false);
            showMsg('Alerta', d.responseText, 'error');
        }, true);
    };

    var TraerRolesEmpleados = function () {
        ejecutaAjax('/Empleados/TraerRolesEmpleados', 'GET', null, function (d) {
            ShowLightBox(false);
            if (d.d.EsValido) {
                $('#ddlRol').llenaCombo(d.d.Datos, "Todos", null);
            } else {
                showMsg('Alerta', d.d.Mensaje, 'warning');
            }
        }, function (d) {
            ShowLightBox(false);
            showMsg('Alerta', d.responseText, 'error');
        }, true);
    };

    

    $(document).ready(function () {
        ShowLightBox(true);
        TraerMeses();
    });
}(jQuery, window.genericas));