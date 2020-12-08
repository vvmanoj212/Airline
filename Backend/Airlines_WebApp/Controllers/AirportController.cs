using Airlines_WebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Airlines_WebApp.Controllers
{
    [RoutePrefix("api/airport")]
    public class AirportController : ApiController
    {
        GladiatorProjectEntities1 db = new GladiatorProjectEntities1();

        [HttpGet]
        [Route("GetAll")]
        public IEnumerable<Airport> GetUsers()
        {
            return db.Airports.ToList();
        }
    }
}
