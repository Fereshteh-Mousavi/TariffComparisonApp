using Microsoft.AspNetCore.Mvc;
using TariffComparisonAPI.Services;
using TariffComparisonAPI.Models;
using System.Collections.Generic;
using System.Linq;


namespace TariffComparisonAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TariffComparisonController : ControllerBase
    {
        private readonly TariffComparisonService _comparisonService;

        public TariffComparisonController()
        {
            _comparisonService = new TariffComparisonService();
        }

        [HttpGet("{consumptionInKWh}")]
        public IActionResult GetTariffComparison(int consumptionInKWh)
        {
            if (consumptionInKWh < 0)
            {
                return BadRequest("Consumption cannot be negative.");
            }

            var results = _comparisonService.CompareTariffs(consumptionInKWh);
            return Ok(results);
        }
    }
}

