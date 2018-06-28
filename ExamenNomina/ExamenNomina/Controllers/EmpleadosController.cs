using ExamenNomina.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace ExamenNomina.Controllers
{
    public class EmpleadosController : Controller
    {
        // GET: Empleados
        public ActionResult Index()
        {
            return View();
        }

        // GET: Empleados
        public ActionResult Movimientos()
        {
            return View();
        }

        [HttpPost]
        public string ayudaEmpleado_FindByCode(string value)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            List<Models.HelpValues> ListaElementos;
            try
            {
                ListaElementos = new List<Models.HelpValues>();
                Models.HelpValues values = Models.Utilerias.Deserializar<Models.HelpValues>(value);
                var Empleado = Services.CatEmpleadosRepository.TraerCatEmpleados(int.Parse(values.Codigo));
                if (Empleado != null && Empleado.Id > 0)
                {
                    Models.HelpValues elemento = new Models.HelpValues() { ID = Empleado.Id.ToString(), Codigo = Empleado.Id.ToString(), Descripcion = Empleado.Nombre };
                    ListaElementos.Add(elemento);
                }
                else
                {
                    return serializer.Serialize(new { d = Response<object>.CrearResponseVacio<object>(false, "No se encontró resultado.") });
                }
                return serializer.Serialize(new { d = Response<object>.CrearResponse<object>(true, ListaElementos) });
            }
            catch (Exception ex)
            {
                return serializer.Serialize(new { d = Response<object>.CrearResponseVacio<object>(false, ex.Message) });
            }
        }


        [HttpPost]
        public string ayudaEmpleado_FindByPopUp(string value)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            List<Models.HelpValues> ListaElementos;
            try
            {
                ListaElementos = new List<Models.HelpValues>();
                Models.HelpValues values = Models.Utilerias.Deserializar<Models.HelpValues>(value);
                var ListaEmpleados = Services.CatEmpleadosRepository.TraerListaCatEmpleados();

                //Aplicamos el filtro de la descripcion por busqueda
                if (values.Descripcion.Trim().Length > 0)
                    ListaEmpleados = ListaEmpleados.FindAll(x => x.Nombre.Trim().ToUpper().Contains(values.Descripcion.Trim().ToUpper())).ToList();

                //Recorremos cada uno de los elementos de la lista
                ListaEmpleados.ForEach(Empleado =>
                {
                    Models.HelpValues elemento = new Models.HelpValues() { ID = Empleado.Id.ToString(), Codigo = Empleado.Id.ToString(), Descripcion = Empleado.Nombre };
                    ListaElementos.Add(elemento);
                });

                return serializer.Serialize(new { d = Response<object>.CrearResponse<object>(true, ListaElementos) });
            }
            catch (Exception ex)
            {
                return serializer.Serialize(new { d = Response<object>.CrearResponseVacio<object>(false, ex.Message) });
            }
        }


        [HttpPost]
        public string TraerModeloEmpleado(int id)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();

            try
            {
                var Empleado = Services.CatEmpleadosRepository.TraerCatEmpleados(id);
                if (Empleado == null)
                    return serializer.Serialize(new { d = Response<object>.CrearResponseVacio<object>(false, "No se encontró resultado. Inconsistencia en la base de datos") });

                return serializer.Serialize(new { d = Response<object>.CrearResponse<object>(true, Empleado) });
            }
            catch (Exception ex)
            {
                return serializer.Serialize(new { d = Response<object>.CrearResponseVacio<object>(false, ex.Message) });
            }
        }

        [HttpGet]
        public string TraerRolesEmpleados(int ? tipoExlusion)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            try
            {
                List<object> RespuestaCombo = new List<object>();
                var roles = Services.CatRolesEmpleadosRepository.TraerListaRolesEmpleados().Where(x => x.Tipo != (tipoExlusion > 0 ? tipoExlusion : 0)).ToList();
                roles.ForEach(rol =>
                {
                    RespuestaCombo.Add(new { id = rol.Id, nombre = rol.Descripcion });

                });
                return serializer.Serialize(new { d = Response<object>.CrearResponse<object>(true, RespuestaCombo) });
            }
            catch (Exception ex)
            {
                return serializer.Serialize(new { d = Response<object>.CrearResponseVacio<object>(false, ex.Message) });
            }
        }

        [HttpGet]
        public string TraerTiposEmpleados()
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            try
            {
                List<object> RespuestaCombo = new List<object>();
                var tipos = Services.CatTiposEmpleadosRepository.TraerListaTiposEmpleados();
                tipos.ForEach(tipo =>
                {
                    RespuestaCombo.Add(new { id = tipo.Id, nombre = tipo.Descripcion });

                });
                return serializer.Serialize(new { d = Response<object>.CrearResponse<object>(true, RespuestaCombo) });
            }
            catch (Exception ex)
            {
                return serializer.Serialize(new { d = Response<object>.CrearResponseVacio<object>(false, ex.Message) });
            }
        }


        [HttpPost]
        public string GuardarEmpleado(Models.CatEmpleados Empleado)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            try
            {
                Services.CatEmpleadosRepository.Guardar(new List<CatEmpleados>() { Empleado });
                return serializer.Serialize(new { d = Response<object>.CrearResponse<object>(true, Empleado) });
            }
            catch (Exception ex)
            {
                return serializer.Serialize(new { d = Response<object>.CrearResponseVacio<object>(false, ex.Message) });
            }
        }

        [HttpPost]
        public string EliminarEmpleado(Models.CatEmpleados Empleado)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            try
            {
                Services.CatEmpleadosRepository.Eliminar(new List<CatEmpleados>() { Empleado });
                return serializer.Serialize(new { d = Response<object>.CrearResponse<object>(true, Empleado) });
            }
            catch (Exception ex)
            {
                return serializer.Serialize(new { d = Response<object>.CrearResponseVacio<object>(false, ex.Message) });
            }
        }

        [HttpPost]
        public string GuardarMovimientoEmpleado(Models.CatMovimientosEmpleados EmpleadoMovimiento)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            try
            {
                Services.CatMovimientosEmpleadosRepository.Guardar(new List<CatMovimientosEmpleados>() { EmpleadoMovimiento });
                return serializer.Serialize(new { d = Response<object>.CrearResponse<object>(true, EmpleadoMovimiento) });
            }
            catch (Exception ex)
            {
                return serializer.Serialize(new { d = Response<object>.CrearResponseVacio<object>(false, ex.Message) });
            }
        }



    }
}