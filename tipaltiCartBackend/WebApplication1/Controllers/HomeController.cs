using HelloWorld;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

        public ActionResult GetProducts()
        {
            return Json(ProductRepository.GetProducts(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [Route("Post")]
        public ActionResult UpdateCart([System.Web.Http.FromBody]List<Product> products)
        {
            ProductRepository.FlushAllProductsToDB(products);
            return Json(ProductRepository.GetProducts(), JsonRequestBehavior.AllowGet);
        }
    }
}
