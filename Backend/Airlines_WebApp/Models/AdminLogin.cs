using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Airlines_WebApp.Models
{
    public class AdminLogin
    {
        GladiatorProjectEntities1 db = new GladiatorProjectEntities1();
        public Admin VerifyAdminLogin(string email, string password)
        {
            Admin admin = null;
            try
            {
                var adminFound = db.Admins
                                     .Where(u => u.AdminEmailId == email && u.Password == password)
                                     .SingleOrDefault();

                if (adminFound != null)
                {
                    admin = adminFound;
                }
                else
                {
                    admin = null;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return admin;
        }
    }
}