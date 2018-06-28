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
            if (d.d.EsValido) {                
                $('#ayudaEmpleado').showFindByCode(d.d.Datos);
            }
            else {
                showMsg('Alerta', d.d.Mensaje, 'warning');
                limpiarPantalla();
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
    body.on("click", "#btnLimpiar", function () {
        window.location.replace('/Empleados/Movimientos');
    });
    body.on("click", "#btnGuardar", function () {
        if (validarGuardar()) {
            if (confirm('¿Desea guardar?')) {
                guardarMovimientoEmpleado();
            }
        }
    });
    body.on("click", "#chkCantidadEntregas", function () {
        if ($(this).is(":checked")) {
            $("#txtCantidadEntregas").removeAttr("disabled").focus();
        } else {
            $("#txtCantidadEntregas").val("").attr("disabled", "disabled");
        }
    });

    body.on("click", "#chkCubrioTurno", function () {
        if ($(this).is(":checked")) {
            $("#ddlRolEmpleadoCubrioTurno").removeAttr("disabled").focus();
        } else {
            $("#ddlRolEmpleadoCubrioTurno").val("").attr("disabled", "disabled");
        }
    });

    body.on('keypress', '#txtCantidadEntregas', null, function (e) {
        return genericas.onlyNumeric(e);
    });

    $('input').not('input[type=button]').on('keypress', null, function (e) {
        focusNextControl(this, e);
    });

    
   


    //Metodos y funciones
    var guardarMovimientoEmpleado = function () {
        ejecutaAjax('/Empleados/GuardarMovimientoEmpleado', 'POST', getModeloEmpleadoMovimiento(), function (d) {
            if (d.d.EsValido) {               
                showMsg("Aviso", "Datos guardados", "success");
                window.location.replace('/Empleados/Movimientos');
            } else {
                showMsg('Alerta', d.d.Mensaje, 'warning');
            }
        }, function (d) {
            showMsg('Alerta', d.responseText, 'error');
        }, true);
    };

    var validarGuardar = function () {
        if ($("#ayudaEmpleado").getValuesByCode().ID == "") {
            showMsg("Alerta", "Debe consultar un empleado", "warning");
            $("#ayudaEmpleado").setFocusHelp();
            return false;
        }
        if (!$("#txtfecha").val()) {
            showMsg("Alerta", "Debe ingresar la fecha del movimiento", "warning");
            $("#txtfecha").focus();
            return false;
        }
        if ($("#chkCantidadEntregas").is(":checked")) {
            if (!$("#txtCantidadEntregas").val()) {
                showMsg("Alerta", "Debe ingresar la cantidad de entregas", "warning");
                $("#txtCantidadEntregas").focus();
                return false;
            }
        }
        if ($("#chkCubrioTurno").is(":checked")) {
            if (!$("#ddlRolEmpleadoCubrioTurno").val()) {
                showMsg("Alerta", "Debe seleccionar el rol que cubrio el axuliar", "warning");
                $("#ddlRolEmpleadoCubrioTurno").focus();
                return false;
            }
        }
        return true;
    };

    var getModeloEmpleadoMovimiento = function () {
        var EmpleadoMovimiento = {};
        EmpleadoMovimiento.EmpleadoID = $("#ayudaEmpleado").getValuesByCode().ID;
        EmpleadoMovimiento.Fecha = $("#txtfecha").val();
        EmpleadoMovimiento.Entregas = $("#chkCantidadEntregas").is(":checked") ? $("#txtCantidadEntregas").val() : 0;
        EmpleadoMovimiento.CubrioTurno = $("#chkCubrioTurno").is(":checked");
        if ($("#chkCubrioTurno").is(":checked"))
            EmpleadoMovimiento.RolIdCubrio = $("#ddlRolEmpleadoCubrioTurno").val();
        return EmpleadoMovimiento;
    };

    var habilitarControles = function () {
        $("#chkCantidadEntregas,#chkCubrioTurno").prop("checked", false).attr("disabled", "disabled");
        $("#txtCantidadEntregas, #ddlRolEmpleadoCubrioTurno").val("").attr("disabled", "disabled");

        $("#txtfecha").val(genericas.fechaActual());
        $("#txtfecha, #chkCantidadEntregas, #btnGuardar").removeAttr("disabled");

        //Esta valicacion es por que solamente los auxliares pueden cubri turno
        if ($("#ddlRolEmpleado").val() == 3) {
            $("#chkCubrioTurno").removeAttr("disabled");
        }

        $("#txtfecha").focus();
    };

    var limpiarPantalla = function () {
        $("#txtNombre").val("");
        $("#ddlRolEmpleado, #ddlTipoEmpleado").val(1);
        $("#chkCantidadEntregas,#chkCubrioTurno").prop("checked", false).attr("disabled", "disabled");
        $("#txtCantidadEntregas, #ddlRolEmpleadoCubrioTurno").val("").attr("disabled", "disabled");
        $("#txtfecha").val(genericas.fechaActual());
    };

    var setEmpleado = function (Empleado) {
        $("#txtNombre").val(Empleado.Nombre);
        $("#ddlRolEmpleado").val(Empleado.RolId);
        $("#ddlTipoEmpleado").val(Empleado.TipoId);
        $("#ayudaEmpleado_Code").val(Empleado.Id);
        $("#ayudaEmpleado_ValorID").val(Empleado.Id);
        habilitarControles();
    };

    var TraerRolesEmpleados = function () {
        ejecutaAjax('/Empleados/TraerRolesEmpleados', 'GET', null, function (d) {
            if (d.d.EsValido) {
                $('#ddlRolEmpleado').llenaCombo(d.d.Datos, null, null);
                TraerRolesEmpleadosExclusionAuxiliar();
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

    var TraerRolesEmpleadosExclusionAuxiliar = function () {
        ejecutaAjax('/Empleados/TraerRolesEmpleados?tipoExlusion=3', 'GET', null, function (d) {            
            if (d.d.EsValido) {
                $('#ddlRolEmpleadoCubrioTurno').llenaCombo(d.d.Datos, null, null);
                TraerTiposEmpleados();
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
        $("#txtfecha").val(genericas.fechaActual());
        $("#ayudaEmpleado").setFocusHelp();

    });
}(jQuery, window.genericas));