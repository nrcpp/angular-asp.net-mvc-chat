using mvc_classic_angular.Cors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Web.Mvc;

namespace mvc_classic_angular.Controllers
{
    [AllowCrossSite]
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