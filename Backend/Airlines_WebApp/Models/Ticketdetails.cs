using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Airlines_WebApp.Models
{
    public class Ticketdetails
    {
        GladiatorProjectEntities1 db = new GladiatorProjectEntities1();
        public IEnumerable<Ticket> GetAll()
        {
            return db.Tickets.ToList();
        }
        public void Delete(string id)
        {
            throw new NotImplementedException();

        }
        public void Add(Ticket newTicket)
        {
            db.Tickets.Add(newTicket);
            db.SaveChanges();
        }

        public Ticket Get(string id)
        {
            throw new NotImplementedException();
        }

        public void Update(Ticket ticket)
        {
           db.Entry(ticket).State = EntityState.Modified;
           db.SaveChanges();
        }
    }
}