using System;
using System.Text.RegularExpressions;
using System.Xml;
using System.Xml.Serialization;
using System.IO;
using System.Collections.Generic;
using WebApplication1.Models;

namespace HelloWorld
{
    public static class ProductRepository
    {
        private const string fileName = @"C:\Users\avihai.sudai\Desktop\vue\TipaltiCart\tipaltiCartBackend\tipaltiCartBackend\productsDB";
        public static void FlushAllProductsToDB(List<Product> products) => SerializeObject(products, fileName);

        private static void SerializeObject<T>(T serializableObject, string fileName)
        {
            if (serializableObject == null) { return; }

            if (File.Exists(fileName))
            {
                File.Delete(fileName);
            }

            try
            {
                XmlDocument xmlDocument = new XmlDocument();
                XmlSerializer serializer = new XmlSerializer(serializableObject.GetType());
                using (MemoryStream stream = new MemoryStream())
                {
                    serializer.Serialize(stream, serializableObject);
                    stream.Position = 0;
                    xmlDocument.Load(stream);
                    xmlDocument.Save(fileName);
                }
            }
            catch (Exception ex)
            {
                //Log exception here
            }
        }

        public static List<Product> GetProducts() => DeSerializeObject<List<Product>>(fileName);

        private static T DeSerializeObject<T>(string fileName)
        {
            if (string.IsNullOrEmpty(fileName)) { return default(T); }

            T objectOut = default(T);

            try
            {
                XmlDocument xmlDocument = new XmlDocument();
                xmlDocument.Load(fileName);
                string xmlString = xmlDocument.OuterXml;

                using (StringReader read = new StringReader(xmlString))
                {
                    Type outType = typeof(T);

                    XmlSerializer serializer = new XmlSerializer(outType);
                    using (XmlReader reader = new XmlTextReader(read))
                    {
                        objectOut = (T)serializer.Deserialize(reader);
                    }
                }
            }
            catch (Exception ex)
            {
                //Log exception here
            }

            return objectOut;
        }
    }
}
