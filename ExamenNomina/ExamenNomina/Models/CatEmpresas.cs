using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ExamenNomina.Models
{
    public class CatEmpresas
    {
        public int Id { get; set; }
        public string Descripcion { get; set; }
        public string Rfc { get; set; }
        public decimal RetIsr { get; set; }
        public decimal TopeMensual { get; set; }
        public decimal RetIsrAdicional { get; set; }
        public decimal DiasMes { get; set; }

    }
}