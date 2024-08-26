
using System;

namespace TariffComparisonAPI.Models
{
    public class BasicElectricityTariff : Tariff
    {
        private const decimal MonthlyBaseCost = 5m;
        private const decimal ConsumptionCostPerKWh = 0.22m;

        public BasicElectricityTariff() : base("Basic Electricity Tariff") { }

        public override decimal CalculateAnnualCost(int consumptionInKWh)
        {
            if (consumptionInKWh < 0)
                throw new ArgumentException("Consumption cannot be negative.");

            decimal annualBaseCost = MonthlyBaseCost * 12;
            decimal consumptionCost = consumptionInKWh * ConsumptionCostPerKWh;
            return Math.Round(annualBaseCost + consumptionCost, 2);
        }
    }
}
