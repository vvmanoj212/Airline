using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Airlines_WebApp.Models
{
    public class JoinFlightSchedule
    {
        public Flight GetFlight { get; set; }
        public FlightSchedule GetSchedule { get; set; }
    }
}