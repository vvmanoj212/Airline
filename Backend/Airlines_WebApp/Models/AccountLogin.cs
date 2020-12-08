using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Airlines_WebApp.Models
{
    public class AccountLogin
    {
        GladiatorProjectEntities1 db = new GladiatorProjectEntities1();
        public UserTable VerifyLogin(string email, string password)
        {
            //throw new NotImplementedException();
            UserTable user = null;
            try
            {
                var userFound = db.UserTables.Where(u => u.UserEmailId == email && u.Password == password).SingleOrDefault();
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
    }
}