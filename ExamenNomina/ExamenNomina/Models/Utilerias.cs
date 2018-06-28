using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace ExamenNomina.Models
{
    public class Utilerias
    {
        public static string Serializar(object instancia)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            return serializer.Serialize(instancia);
        }
        public static T Deserializar<T>(string cadena)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            return serializer.Deserialize<T>(cadena);
        }
    }
}