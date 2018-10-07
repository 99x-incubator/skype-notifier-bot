using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CICD_SkypeBot.Controllers
{
    [Produces("application/json")]
    [Route("api/Account")]
    public class AccountController : Controller
    {
            [HttpGet]
            public IActionResult Login(string returnUrl = "/")
            {
                return Challenge(new AuthenticationProperties() { RedirectUri = returnUrl });
            }
    }
}