using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExamenNomina.Models
{
    public class CatMovimientosEmpleados
    {
        public int Id { get; set; }
        public int EmpleadoID { get; set; }
        public DateTime Fecha { get; set; }
        public decimal Entregas { get; set; }
        public bool CubrioTurno { get; set; }
        public int RolIdCubrio { get; set; }

    }
}