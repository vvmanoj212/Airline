using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Airlines_WebApp.Models
{
    public class FlightScheduledetails
    {
        GladiatorProjectEntities1 db = new GladiatorProjectEntities1();
        public IEnumerable<FlightSchedule> GetAll()
        {
            return db.FlightSchedules.ToList();
            // throw new NotImplementedException();
        }
        public void Add(FlightSchedule newFlightSchedule)
        {
            db.FlightSchedules.Add(newFlightSchedule);
            db.SaveChanges();
        }

        public FlightSchedule Get(string id1)
        {
            FlightSchedule flights = null;
            try
            {
                var flightFound = db.FlightSchedules.Where(f => (f.FlightId == id1)).SingleOrDefault();
                if (flightFound != null)
                {
                    flights = flightFound;
                }
                else
                {
                    flights = null;
                }
            }
            catch (Exception ex)
            {
                throw ex;

            }
            return flights;
        }

        public void Update(FlightSchedule fs)
        {
            db.Entry(fs).State = EntityState.Modified;
            db.SaveChanges();
        }

        public void Delete(string entity)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<FlightSchedule> GetbookingbyID(string id)
        {
            throw new NotImplementedException();
        }
       
       
    }
}