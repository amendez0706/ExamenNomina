using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.Data.Entity.Migrations;

namespace ExamenNomina.Services
{
    public class CatMovimientosEmpleadosRepository
    {
        #region Métodos Públicos
        public static void Guardar(List<Models.CatMovimientosEmpleados> listaMovimientosEmpleados)
        {

            try
            {
                using (var db = new Manager.DataContext())
                {
                    listaMovimientosEmpleados.ForEach(movimiento =>
                    {
                        db.CatMovimientosEmpleados.AddOrUpdate(x => x.Id, movimiento);
                    });
                    db.SaveChanges();
                }
            }
            catch (Exception)
            {

                throw;
            }
            finally
            {

            }
        }

        public static List<Models.EmpleadosXPagar> TraerEmpleadosPagarNomina(int tipo,int rol)
        {

            try
            {
                List<Models.EmpleadosXPagar> ListaEmpleadosXPagar = new List<Models.EmpleadosXPagar>();
                using (var db = new Manager.DataContext())
                {
                    ListaEmpleadosXPagar = (from a in db.CatEmpleados
                                            join b in db.CatRolesEmpleados on
                                            new { RolID = a.RolId } equals
                                            new { RolID = b.Id }
                                            join d in db.CatTiposEmpleados on
                                            new { Tipo = a.TipoId } equals
                                            new { Tipo = d.Id }
                                            where a.TipoId == (tipo == 0 ? a.TipoId : tipo) &&
                                                  a.RolId == (rol == 0 ? a.RolId : rol)
                                            select new Models.EmpleadosXPagar //Este objeto esta en el archivo fisico DefaultView
                                            {
                                                EmpleadoID = a.Id,
                                                Nombre = a.Nombre,
                                                RolId = a.RolId,
                                                Rol = b.Descripcion,
                                                PagoXHora = b.PagoXHora,
                                                PagoxEntrega = b.PagoXEntrega,
                                                BonoxHora = b.BonoXHora,
                                                Jornada = b.Jornada,
                                                TipoId = a.TipoId,
                                                Tipo = d.Descripcion,
                                                ValeDespensa = d.ValeDespensa
                                            }).ToList();
                }
                return ListaEmpleadosXPagar;
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {

            }
        }



        public static List<Models.CatMovimientosEmpleados> TraerMovimientosMensualesPorEmpleado(int empleadoID,int año, int mes)
        {

            try
            {
                using (var db = new Manager.DataContext())
                {
                    return db.CatMovimientosEmpleados.Where(x => x.EmpleadoID == empleadoID && x.Fecha.Year == año && x.Fecha.Month == mes).ToList();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion
    }
}