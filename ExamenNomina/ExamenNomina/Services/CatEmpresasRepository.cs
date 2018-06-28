using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.Data.Entity.Migrations;

namespace ExamenNomina.Services
{
    public class CatEmpresasRepository
    {
        #region Métodos Públicos
        public static void Guardar(List<Models.CatEmpresas> listaEmpresas)
        {

            try
            {
                using (var db = new Manager.DataContext())
                {
                    listaEmpresas.ForEach(empresa =>
                    {
                        db.CatEmpresas.AddOrUpdate(x => x.Id, empresa);
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

        public static void Eliminar(List<Models.CatEmpresas> listaEmpresas)
        {

            try
            {
                using (var db = new Manager.DataContext())
                {
                    listaEmpresas.ForEach(empresa =>
                    {
                        db.Entry(empresa).State = EntityState.Deleted;
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

        public static List<Models.CatEmpresas> TraerListaCatEmpresas()
        {

            try
            {
                using (var db = new Manager.DataContext())
                {
                    return db.CatEmpresas.ToList();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public static Models.CatEmpresas TraerCatEmpresas(int Id)
        {

            try
            {
                using (var db = new Manager.DataContext())
                {
                    return db.CatEmpresas.Where(x => x.Id == Id).FirstOrDefault();
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