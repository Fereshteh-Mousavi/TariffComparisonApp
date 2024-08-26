using TariffComparisonAPI.Models;
using System.Collections.Generic;
using System.Linq;


namespace TariffComparisonAPI.Services
{
    public class TariffComparisonService
    {
        private readonly List<Tariff> _tariffs;

        public TariffComparisonService()
        {
            _tariffs = new List<Tariff>
            {
                new BasicElectricityTariff(),
                new PackagedTariff()
            };
        }

        public IEnumerable<TariffComparisonResult> CompareTariffs(int consumptionInKWh)
        {
            return _tariffs
                .Select(tariff => new TariffComparisonResult
                {
                    TariffName = tariff.Name,
                    AnnualCost = tariff.CalculateAnnualCost(consumptionInKWh)
                })
                .OrderBy(result => result.AnnualCost);
        }
    }

   
}
