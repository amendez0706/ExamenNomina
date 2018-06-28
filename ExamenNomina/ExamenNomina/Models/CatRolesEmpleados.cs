using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ExamenNomina.Models
{
    public class CatRolesEmpleados
    {
        public int Id { get; set; }
        [Required]
        [StringLength(200)]
        public string Descripcion { get; set; }
        public decimal PagoXHora { get; set; }
        public decimal PagoXEntrega { get; set; }
        public decimal BonoXHora { get; set; }
        public decimal Jornada { get; set; }
        public int Tipo { get; set; }
    }
}