
namespace TariffComparisonAPI.Models
{
    public abstract class Tariff
    {
        public string Name { get; }

        protected Tariff(string name)
        {
            Name = name;
        }

        public abstract decimal CalculateAnnualCost(int consumptionInKWh);
    }
}
