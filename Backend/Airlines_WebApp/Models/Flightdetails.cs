using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Airlines_WebApp.Models
{
    public class Flightdetails
    {
        GladiatorProjectEntities1 db = new GladiatorProjectEntities1();
     
        public Flight Get(string id)
        {
            Flight flight = null;
            try
            {
                var flightFound = db.Flights.Where(f => f.FlightId == id).SingleOrDefault();
                if (flightFound != null)
                {
                    flight = flightFound;
                }
                else
                {
                    flight = null;
                }
            }
            catch (Exception ex)
            {
                throw ex;

            }
            return flight;
        }

        public void Update(Flight dbEntity)
        {
            throw new NotImplementedException();
        }

        public void Delete(string id)
        {

            Flight flight = null;
            try
            {
                var flightFound = db.Flights.Where(f => f.FlightId == id).SingleOrDefault();
                if (flightFound != null)
                {
                    flight = flightFound;
                }
                else
                {
                    flight = null;
                }
            }
            catch (Exception ex)
            {
                throw ex;

            }
           db.Flights.Remove(flight);
            db.SaveChanges();
        }

        public IEnumerable<Flight> GetbookingbyID(string id)
        {
            throw new NotImplementedException();
        }
    }
}