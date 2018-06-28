using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace ExamenNomina.Models
{
    public class CatEmpleados
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public int RolId { get; set; }
        public int TipoId { get; set; }

        [ForeignKey("RolId")]
        public CatRolesEmpleados RolEmpleado { get; set; }

        [ForeignKey("TipoId")]
        public CatTiposEmpleados TipoEmpleado { get; set; }

    }
}