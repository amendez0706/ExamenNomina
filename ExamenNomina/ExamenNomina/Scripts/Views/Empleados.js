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
    //***************************************************************F U N C I O N E S   A Y U D A S ***********************************************************************   
    var ayudaEmpleadoFindByCode = function () {
        var parametros = { value: JSON.stringify($('#ayudaEmpleado').getValuesByCode()) };
        ejecutaAjax('/Empleados/ayudaEmpleado_FindByCode', 'POST', parametros, function (d) {           
            if (d.d.EsValido)
                $('#ayudaEmpleado').showFindByCode(d.d.Datos);
            else {
                showMsg('Alerta', d.d.Mensaje, 'warning');
                $('#ayudaEmpleado').clearHelpField();
                $("#ayudaEmpleado_HelpLoad").hide();
            }                
        }, function (d) {
            showMsg('Alerta', d.responseText, 'error');
        }, true);
    };

    var ayudaEmpleadoFindByPopUp = function () {
        var parametros = { value: JSON.stringify($('#ayudaEmpleado').getValuesByPopUp()) };
        ejecutaAjax('/Empleados/ayudaEmpleado_FindByPopUp', 'POST', parametros, function (d) {
            if (d.d.EsValido) {
                $('#ayudaEmpleado').showFindByPopUp(d.d.Datos);
            } else {
                showMsg('Alerta', d.d.Mensaje, 'warning');
            }
        }, function (d) {
            showMsg('Alerta', d.responseText, 'error');
        }, true);
    };
    var ayudaEmpleado_onElementFound = function () {
        
        var parametros = { id: $('#ayudaEmpleado').getValuesByCode().ID };
        ejecutaAjax('/Empleados/TraerModeloEmpleado', 'POST', parametros, function (d) {
            if (d.d.EsValido) {
                setEmpleado(d.d.Datos);
                habilitarControles(false);
            } else {
                showMsg('Alerta', d.d.Mensaje, 'warning');
            }
        }, function (d) {
            showMsg('Alerta', d.responseText, 'error');
        }, false);

    };

    var iniciaAyudas = function () {
        $('#ayudaEmpleado').helpField({
            title: 'Empleado',
            codeNumeric: true,
            maxlengthCode: 6,
            enableCode: true,
            enableDescription: false,
            codePaste: false,
            nextControlID: '',
            widthDescription: '0',
            requeridField: false,
            cultureResourcesPopUp: {
                popUpHeader: 'Búsqueda de Empleados'
            },
            findByPopUp: ayudaEmpleadoFindByPopUp,
            findByCode: ayudaEmpleadoFindByCode,
            onElementFound: ayudaEmpleado_onElementFound
        });
    };

    //Eventos
    $('input').not('input[type=button]').on('keypress', null, function (e) {
        focusNextControl(this, e);
    });

    body.on("click", "#btnLimpiar", function () {
        window.location.replace('/Empleados');
    });

    body.on("click", "#btnNuevo", function () {
        habilitarControles(true);
    });

    body.on("click", "#btnGuardar", function () {
        if (validarGuardar()) {
            if (confirm('¿Desea guardar?')) {
                guardarEmpleado();
            }
        }
    });

    body.on("click", "#btnEliminar", function () {        
        if (confirm('¿Desea eliminar este empleado del sistema?')) {
            EliminarEmpleado();
        }
    });

    //Metodos y funciones
    var guardarEmpleado = function () {        
        ejecutaAjax('/Empleados/GuardarEmpleado', 'POST', getModeloEmpleado(), function (d) {
            if (d.d.EsValido) {
                habilitarControles(false);
                setEmpleado(d.d.Datos);
                showMsg("Aviso", "Datos guardados", "success");
            } else {
                showMsg('Alerta', d.d.Mensaje, 'warning');
            }
        }, function (d) {
            showMsg('Alerta', d.responseText, 'error');
        }, true);
    };

    var EliminarEmpleado = function () {
        ejecutaAjax('/Empleados/EliminarEmpleado', 'POST', getModeloEmpleado(), function (d) {
            if (d.d.EsValido) {
                $("#btnNuevo, #btnGuardar, #btnEliminar").attr("disabled", "disabled");
                showMsg("Aviso", "El empleado ha sido eliminado, favor de limpiar el formulario", "success");
            } else {
                showMsg('Alerta', d.d.Mensaje, 'warning');
            }
        }, function (d) {
            showMsg('Alerta', d.responseText, 'error');
        }, true);
    };

    var validarGuardar = function () {
        if (!$("#txtNombre").val()) {
            showMsg("Alerta", "Debe ingresar el nombre", "warning");
            $("#txtNombre").focus();
            return false;
        }
        return true;
    };

    var getModeloEmpleado = function () {
        var Empleado = {};
        Empleado.Id = $("#ayudaEmpleado").getValuesByCode().ID == "" ? 0 : $("#ayudaEmpleado").getValuesByCode().ID;
        Empleado.Nombre = $("#txtNombre").val();
        Empleado.RolId = $("#ddlRolEmpleado").val();
        Empleado.TipoId = $("#ddlTipoEmpleado").val();
        return Empleado;
    };

    var habilitarControles = function (nuevo) {
        $("#ayudaEmpleado").EnableHelpField(false);        
        $("#txtNombre, #ddlRolEmpleado, #ddlTipoEmpleado, #btnGuardar").removeAttr("disabled");
        $("#btnNuevo").attr("disabled", "disabled");
        if (!nuevo) {
            $("#btnEliminar").removeAttr("disabled");
        } else {
            $("#ayudaEmpleado").clearHelpField();
        }            
        $("#txtNombre").focus();
    };

    var setEmpleado = function (Empleado) {
        $("#txtNombre").val(Empleado.Nombre);
        $("#ddlRolEmpleado").val(Empleado.RolId);
        $("#ddlTipoEmpleado").val(Empleado.TipoId);
        $("#ayudaEmpleado_Code").val(Empleado.Id);        
        $("#ayudaEmpleado_ValorID").val(Empleado.Id);
    };

    var TraerRolesEmpleados = function () {
        ejecutaAjax('/Empleados/TraerRolesEmpleados', 'GET', null, function (d) {
            if (d.d.EsValido) {
                $('#ddlRolEmpleado').llenaCombo(d.d.Datos, null, null);
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
            ShowLightBox(false);
            if (d.d.EsValido) {
                $('#ddlTipoEmpleado').llenaCombo(d.d.Datos, null, null);
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
        iniciaAyudas();
        TraerRolesEmpleados();
        $("#ayudaEmpleado").setFocusHelp();
    });
}(jQuery, window.genericas));