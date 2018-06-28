using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExamenNomina.Models
{
    public class HelpValues
    {
        public string ID { get; set; }
        public string Codigo { get; set; }
        public string Descripcion { get; set; }
        public string LlaveForanea { get; set; }
    }


    public class EmpleadosXPagar {
        public int EmpleadoID { get; set; }
        public string Nombre { get; set; }
        public int RolId { get; set; }
        public string Rol { get; set; }
        public decimal PagoXHora { get; set; }
        public decimal PagoxEntrega { get; set; }
        public decimal BonoxHora { get; set; }
        public decimal Jornada { get; set; }
        public int TipoId { get; set; }
        public string Tipo { get; set; }
        public decimal ValeDespensa { get; set; }
    }

    public class SueldoMensualEmpleado {
        public int EmpleadoID { get; set; }
        public string Nombre { get; set; }
        public string Rol { get; set; }
        public string Tipo { get; set; }
        public decimal SueldoMensual { get; set; }
        public decimal BonoPorEntrega { get; set; }
        public decimal BonoPorHora { get; set; }
        public decimal ValesDespensa { get; set; }
        public decimal ISR_Ret { get; set; }
        public decimal ISR_Adi { get; set; }
        public decimal TotalPagar { get; set; }
    }

}