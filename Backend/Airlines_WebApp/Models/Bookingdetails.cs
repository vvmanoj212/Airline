using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Airlines_WebApp.Models
{
    public class Bookingdetails
    {
        GladiatorProjectEntities1 db = new GladiatorProjectEntities1();
        public IEnumerable<Booking> GetAll()
        {
            return db.Bookings.ToList();
        }
        public void Add(Booking newbooking)
        {
            db.Bookings.Add(newbooking);
            db.SaveChanges();
        }

        public void Delete(string id)
        {
            throw new NotImplementedException();
        }
        public void Update(Booking dbEntity)
        {
            db.Entry(dbEntity).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
        }

        public Booking Get(string id)
        {
            return db.Bookings.Find(id);
        }
    }
}