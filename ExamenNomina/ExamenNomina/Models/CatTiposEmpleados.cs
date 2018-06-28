using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExamenNomina.Models
{
    public class CatTiposEmpleados
    {
        public int Id { get; set; }
        public string Descripcion { get; set; }
        public int Tipo { get; set; }
        public decimal ValeDespensa { get; set; }
    }
}