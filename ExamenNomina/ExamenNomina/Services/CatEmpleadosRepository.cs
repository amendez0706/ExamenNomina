using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.Data.Entity.Migrations;

namespace ExamenNomina.Services
{
    public class CatEmpleadosRepository
    {
        #region Métodos Públicos
        public static void Guardar(List<Models.CatEmpleados> listaEmpleados)
        {

            try
            {
                using (var db = new Manager.DataContext())
                {
                    listaEmpleados.ForEach(empleado =>
                    {
                        db.CatEmpleados.AddOrUpdate(x => x.Id, empleado);
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

        public static void Eliminar(List<Models.CatEmpleados> listaEmpleados)
        {

            try
            {
                using (var db = new Manager.DataContext())
                {
                    listaEmpleados.ForEach(empleado =>
                    {
                        db.Entry(empleado).State = EntityState.Deleted;
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

        public static List<Models.CatEmpleados> TraerListaCatEmpleados()
        {

            try
            {
                using (var db = new Manager.DataContext())
                {
                    return db.CatEmpleados.ToList();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public static Models.CatEmpleados TraerCatEmpleados(int Id)
        {

            try
            {
                using (var db = new Manager.DataContext())
                {
                    return db.CatEmpleados.Where(x => x.Id == Id).Include(x => x.RolEmpleado).Include(x => x.TipoEmpleado).FirstOrDefault();
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