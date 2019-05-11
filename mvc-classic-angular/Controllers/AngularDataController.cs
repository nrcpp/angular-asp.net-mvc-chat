using mvc_classic_angular.Cors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Cors;
using System.Web.Mvc;

namespace mvc_classic_angular.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class AngularDataController : Controller
    {
        // GET: AngularData
        [HttpGet()]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public ActionResult Index()
        {
            return View();
        }
    }
}