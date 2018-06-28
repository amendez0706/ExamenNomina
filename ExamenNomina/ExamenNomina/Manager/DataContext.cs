using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace ExamenNomina.Manager
{
    public class DataContext: DbContext
    {
        public DataContext(): base("conexionStrCoppel")
        {

        }
        public DbSet<Models.CatRolesEmpleados> CatRolesEmpleados { get; set; }
        public DbSet<Models.CatEmpleados> CatEmpleados { get; set; }
        public DbSet<Models.CatEmpresas> CatEmpresas { get; set; }
        public DbSet<Models.CatMovimientosEmpleados> CatMovimientosEmpleados { get; set; }
        public DbSet<Models.CatTiposEmpleados> CatTiposEmpleados { get; set; }
    }
}