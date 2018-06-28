using ExamenNomina.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace ExamenNomina.Controllers
{
    public class NominaController : Controller
    {
        // GET: Nomina
        public ActionResult Index()
        {
            return View();
        }



        [HttpGet]
        public string TraerMeses()
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            try
            {
                List<object> RespuestaCombo = new List<object>();
                for (int i = 1; i <= 12; i++)
                {
                    DateTime date = new DateTime(2018, i, 1);
                    RespuestaCombo.Add(new { id = i, nombre = date.ToString("MMMM").ToUpper() });
                }
                return serializer.Serialize(new { d = Response<object>.CrearResponse<object>(true, RespuestaCombo) });
            }
            catch (Exception ex)
            {
                return serializer.Serialize(new { d = Response<object>.CrearResponseVacio<object>(false, ex.Message) });
            }
        }

        [HttpPost]
        public string TraerReporteNomina(int anio,int mes,string tipo,string rol)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            try
            {
                //Obtenemos la lista de los empleados a los cuales les vamos a calcular nomina
                int _Tipo = intForce(tipo);
                int _Rol = intForce(rol);
                List<Models.EmpleadosXPagar> ListaEmpleadosXPagar = Services.CatMovimientosEmpleadosRepository.TraerEmpleadosPagarNomina(_Tipo, _Rol);

                //Obtenemos los parametos de configuracion
                var paramEmpresa = Services.CatEmpresasRepository.TraerListaCatEmpresas().FirstOrDefault();

                //Recorremos el arreglo de empleados para calcular el sueldo mensual y considerando los movimientos del periodo
                List<SueldoMensualEmpleado> ListaSueldoMensualEmpleado = new List<SueldoMensualEmpleado>();
                ListaEmpleadosXPagar.ForEach(Empleado =>
                {
                    SueldoMensualEmpleado SdoXEmp = new SueldoMensualEmpleado();
                    SdoXEmp.EmpleadoID = Empleado.EmpleadoID;
                    SdoXEmp.Nombre = Empleado.Nombre;
                    SdoXEmp.Rol = Empleado.Rol;
                    SdoXEmp.Tipo = Empleado.Tipo;
                    SdoXEmp.SueldoMensual = Math.Round(((Empleado.PagoXHora * Empleado.Jornada) * paramEmpresa.DiasMes), 2);
                    SdoXEmp.BonoPorHora = Math.Round(((Empleado.BonoxHora * Empleado.Jornada) * paramEmpresa.DiasMes), 2);

                    //Variables para acumular los bonos
                    decimal bonoXEntrega = 0m;
                    decimal bonoxHoraAuxiliar = 0m;

                    //Obtenemos los movimientos que tubo el empleado durante el periodo
                    List<Models.CatMovimientosEmpleados> movimientosPorEmpleado = Services.CatMovimientosEmpleadosRepository.TraerMovimientosMensualesPorEmpleado(Empleado.EmpleadoID, anio, mes);
                    movimientosPorEmpleado.ForEach(movto =>
                    {
                        bonoXEntrega += Math.Round(movto.Entregas * Empleado.PagoxEntrega, 2);
                        //Preguntamos si el empleado cubrio el turno para brindarle las prestaciones del turno que cubrio
                        if (movto.CubrioTurno) {
                            //Obtenemos el rol del empleado que cubrio en ese dia
                            Models.CatRolesEmpleados RolCubrio = Services.CatRolesEmpleadosRepository.TraerCatRolesEmpleados(movto.RolIdCubrio);
                            bonoxHoraAuxiliar += (RolCubrio.BonoXHora * Empleado.Jornada); //Se calcula a un solo dia ya que el movimiento es por dia
                        }
                    });

                    //Asignamos los importes acumulados en el mes resultado de los movimientos que tubo el empleado
                    SdoXEmp.BonoPorHora += bonoxHoraAuxiliar;
                    SdoXEmp.BonoPorEntrega = bonoXEntrega;

                    //Sueldo Mensual Antes de Impuestos
                    decimal SdoMensualAntesImpuestos = (SdoXEmp.SueldoMensual + SdoXEmp.BonoPorHora + SdoXEmp.BonoPorEntrega);
                    //Asignamos el importe de los vales de despensa
                    SdoXEmp.ValesDespensa = Math.Round((SdoMensualAntesImpuestos * Empleado.ValeDespensa), 2);

                    //Aqui me quedo la duda si al sueldo mensual se le suman los vales de despensa para calcular el impuesto
                    SdoMensualAntesImpuestos += SdoXEmp.ValesDespensa;

                    SdoXEmp.ISR_Ret = Math.Round(SdoMensualAntesImpuestos * paramEmpresa.RetIsr, 2);

                    //Si el sueldo mensual es mayor que $16,000 le aplicamos una retencion adicional del ISR
                    if (SdoMensualAntesImpuestos > 16000m)
                    {
                        SdoXEmp.ISR_Adi = Math.Round(SdoMensualAntesImpuestos * paramEmpresa.RetIsrAdicional, 2);
                    }

                    SdoXEmp.TotalPagar = SdoMensualAntesImpuestos - SdoXEmp.ISR_Ret - SdoXEmp.ISR_Adi;

                    //Por ultimo agregamos el objeto a la lista principal la cual va a ser regresada a la vista para mostrar la informacion en pantalla
                    ListaSueldoMensualEmpleado.Add(SdoXEmp);
                });

                return serializer.Serialize(new { d = Response<object>.CrearResponse<object>(true, ListaSueldoMensualEmpleado) });
            }
            catch (Exception ex)
            {
                return serializer.Serialize(new { d = Response<object>.CrearResponseVacio<object>(false, ex.Message) });
            }
        }

        public int intForce(string cadena) {
            try {
                return int.Parse(cadena);               
            }
            catch{
                return 0;
            }
        }
    }
}