using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.Data.Entity.Migrations;

namespace ExamenNomina.Services
{
    public class CatRolesEmpleadosRepository
    {
        #region Métodos Públicos
        public static void Guardar(List<Models.CatRolesEmpleados> listaRolesEmpleados)
        {

            try
            {
                using (var db = new Manager.DataContext())
                {
                    listaRolesEmpleados.ForEach(rol =>
                    {
                        db.CatRolesEmpleados.AddOrUpdate(x => x.Id, rol);
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

        public static void Eliminar(List<Models.CatRolesEmpleados> listaRolesEmpleados)
        {

            try
            {
                using (var db = new Manager.DataContext())
                {
                    listaRolesEmpleados.ForEach(rol =>
                    {
                        db.Entry(rol).State = EntityState.Deleted;
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

        public static List<Models.CatRolesEmpleados> TraerListaRolesEmpleados()
        {

            try
            {
                using (var db = new Manager.DataContext())
                {
                    return db.CatRolesEmpleados.ToList();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public static Models.CatRolesEmpleados TraerCatRolesEmpleados(int Id)
        {

            try
            {
                using (var db = new Manager.DataContext())
                {
                    return db.CatRolesEmpleados.Where(x => x.Id == Id).FirstOrDefault();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion Métodos Públicos
    }
}