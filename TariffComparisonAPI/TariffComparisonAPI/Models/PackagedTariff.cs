using System;

namespace TariffComparisonAPI.Models
{
    public class PackagedTariff : Tariff
    {
        private const decimal BaseCost = 800m;
        private const int ConsumptionThreshold = 4000;
        private const decimal AdditionalConsumptionCostPerKWh = 0.30m;

        public PackagedTariff() : base("Packaged Tariff") { }

        public override decimal CalculateAnnualCost(int consumptionInKWh)
        {
            if (consumptionInKWh < 0)
                throw new ArgumentException("Consumption cannot be negative.", nameof(consumptionInKWh));

            if (consumptionInKWh <= ConsumptionThreshold)
                return BaseCost;

            int additionalConsumption = consumptionInKWh - ConsumptionThreshold;
            decimal additionalCost = additionalConsumption * AdditionalConsumptionCostPerKWh;
            return Math.Round(BaseCost + additionalCost, 2);
        }
    }
}


