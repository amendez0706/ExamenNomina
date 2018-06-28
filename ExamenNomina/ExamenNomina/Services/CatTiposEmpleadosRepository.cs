using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.Data.Entity.Migrations;

namespace ExamenNomina.Services
{
    public class CatTiposEmpleadosRepository
    {
        #region Métodos Públicos
        public static void Guardar(List<Models.CatTiposEmpleados> listaTiposEmpleados)
        {

            try
            {
                using (var db = new Manager.DataContext())
                {
                    listaTiposEmpleados.ForEach(tipo =>
                    {
                        db.CatTiposEmpleados.AddOrUpdate(x => x.Id, tipo);
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

        public static void Eliminar(List<Models.CatTiposEmpleados> listaTiposEmpleados)
        {

            try
            {
                using (var db = new Manager.DataContext())
                {
                    listaTiposEmpleados.ForEach(tipo =>
                    {
                        db.Entry(tipo).State = EntityState.Deleted;
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

        public static List<Models.CatTiposEmpleados> TraerListaTiposEmpleados()
        {

            try
            {
                using (var db = new Manager.DataContext())
                {
                    return db.CatTiposEmpleados.ToList();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public static Models.CatTiposEmpleados TraerCatTiposEmpleados(int Id)
        {

            try
            {
                using (var db = new Manager.DataContext())
                {
                    return db.CatTiposEmpleados.Where(x => x.Id == Id).FirstOrDefault();
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