using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Tudu.Controllers
{
    [Route("api/[controller]")]
    public class PlansController : Controller
    {

        [HttpGet()]
        public IEnumerable<Plan> Get()
        {
            return new []{ 
                new Plan{ 
                    Name = "P1"
            }};
        }

        public class Plan
        {
            public string Name { get; set; }
            public int Length { get; set; }
            public int Type { get; set; }
        }
    }
}
