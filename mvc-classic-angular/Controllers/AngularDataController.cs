using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Web.Mvc;

namespace mvc_classic_angular.Controllers
{
    public class AngularDataController : Controller
    {
        // GET: AngularData
        [HttpGet()]
        public ActionResult Index()
        {
            return View();
        }
    }
}