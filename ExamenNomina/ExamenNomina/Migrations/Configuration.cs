namespace ExamenNomina.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<ExamenNomina.Manager.DataContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(ExamenNomina.Manager.DataContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data.

            /*
            context.CatRolesEmpleados.AddOrUpdate(x => x.Id, new Models.CatRolesEmpleados()
            {
                Id = 1,
                Descripcion = "Choferes",
                Jornada = 8m,
                Tipo = 1,
                BonoXHora = 10m,
                PagoXEntrega = 5m,
                PagoXHora = 30m
            });

            context.CatRolesEmpleados.AddOrUpdate(x => x.Id, new Models.CatRolesEmpleados()
            {
                Id = 2,
                Descripcion = "Cargadores",
                Jornada = 8m,
                Tipo = 2,
                BonoXHora = 5m,
                PagoXEntrega = 5m,
                PagoXHora = 30m
            });

            context.CatRolesEmpleados.AddOrUpdate(x => x.Id, new Models.CatRolesEmpleados()
            {
                Id = 3,
                Descripcion = "Auxiliares",
                Jornada = 8m,
                Tipo = 3,
                BonoXHora = 0m,
                PagoXEntrega = 5m,
                PagoXHora = 30m
            });


            context.CatTiposEmpleados.AddOrUpdate(x => x.Id, new Models.CatTiposEmpleados() { Id = 1, Descripcion = "Interno", Tipo = 1, ValeDespensa = 0.04m });
            context.CatTiposEmpleados.AddOrUpdate(x => x.Id, new Models.CatTiposEmpleados() { Id = 2, Descripcion = "SubContratado", Tipo = 2, ValeDespensa = 0m });

            context.CatEmpresas.AddOrUpdate(x => x.Id, new Models.CatEmpresas()
            {
                Id = 1,
                Descripcion = "Coppel",
                Rfc = "Coppel",
                DiasMes = 30m,
                RetIsr = 0.09m,
                RetIsrAdicional = 0.03m,
                TopeMensual = 16000m
            });

            context.SaveChanges();
            */

            /*
            Services.CatEmpleadosRepository.Guardar(new System.Collections.Generic.List<Models.CatEmpleados> { new Models.CatEmpleados() { Id = 1, Nombre = "Alfonso Mendez 2", RolId = 1, TipoId = 1 }, new Models.CatEmpleados() { Id = 2, Nombre = "Alfonso Mendez 3", RolId = 1, TipoId = 1 } });
            Services.CatEmpleadosRepository.Eliminar(new System.Collections.Generic.List<Models.CatEmpleados> { new Models.CatEmpleados() { Id = 1 } });

            Models.CatEmpresas empresa = new Models.CatEmpresas()
            {
                Id = 1
            };
            context.Entry(empresa).State = EntityState.Deleted;
            context.SaveChanges();
            */
        }
    }
}
