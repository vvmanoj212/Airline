using Airlines_WebApp.Models;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web.Http;

namespace Airlines_WebApp.Controllers
{
    [RoutePrefix("api/accounts")]
    public class AccountController : ApiController
    {
        GladiatorProjectEntities1 db = new GladiatorProjectEntities1();
        AccountLogin acclogin = new AccountLogin();
        AdminLogin adminlogin = new AdminLogin();

        
        [HttpPost]
        [Route("userlogin")]
        public IHttpActionResult VerifyLogin(Login login)
        {
            UserTable user = null;
            try
            {
                user = acclogin.VerifyLogin(login.Email, login.Password);
                if (user == null)
                    return NotFound();
            }
            catch(Exception ex)
            {
                throw ex;
            }
            user.Password = user.GetHashCode().ToString();
            return Ok(user);
        }

       
        [HttpPost]
        [Route("adminlogin")]

        public IHttpActionResult VerifyAdminLogin(Login login)
        {
            Admin admin = null;
            try
            {
                admin = adminlogin.VerifyAdminLogin(login.Email, login.Password);
                if (admin == null)
                    return NotFound();
            }
            catch (Exception e)
            {
                throw e;
            }
            admin.Password = admin.GetHashCode().ToString();
            return Ok(admin);


        }
        [HttpPost]
        [AllowAnonymous]
        [Route("sendmsg")]
        public string postsendmsg([FromBody] string user)
        {
            Random rnd = new Random();
            int otp = rnd.Next(1000, 9999);
            string number = user;
            string msg = "your otp for payment on AirBook is: " + otp.ToString();
            string result;
            string msg1 = System.Web.HttpUtility.UrlEncode(msg);
            //write query
            using (var wb = new WebClient())
            {
                byte[] response = wb.UploadValues("https://api.textlocal.in/send/", new NameValueCollection()
                {
                    {"apikey","u+yDoLUKYko-KZvegKcqUS2LLotimX337tsdoo3QEz"},
                 //   {"apikey" , "jjjN2BjuUAI-bX4URpflXBxJiwQAklIevNOmkHrUAn" },
                    {"numbers", number},
                    {"message", msg1 },
                    {"sender", "txtlcl" }

                });
                result = System.Text.Encoding.UTF8.GetString(response);
            }
            try
            {

                return otp.ToString();
            }
            catch (Exception ex)
            {
                return "error:" + ex.ToString();
            }
        }



    }
}
