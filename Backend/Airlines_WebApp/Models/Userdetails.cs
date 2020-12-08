using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Airlines_WebApp.Models
{
    public class Userdetails
    {
        GladiatorProjectEntities1 db = new GladiatorProjectEntities1();
        
        public void Add(UserTable newUser)
        {
            db.UserTables.Add(newUser);
            db.SaveChanges();
        }

        public UserTable Get(string id)
        {
            UserTable user = null;
            try
            {
                var userFound = db.UserTables.Where(u => u.UserEmailId == id).SingleOrDefault();
                if (userFound != null)
                {
                    user = userFound;
                }
                else
                {
                    user = null;
                }
            }
            catch (Exception ex)
            {
                throw ex;

            }
            return user;
        }

        public void Update(UserTable user)
        {
            db.Entry(user).State = EntityState.Modified;
            db.SaveChanges();
        }

        public void Delete(string entity)
        {
            throw new NotImplementedException();
        }
    }
}