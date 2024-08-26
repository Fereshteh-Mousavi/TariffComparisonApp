// TariffComparisonAPI.Tests/TariffTests.cs
using Xunit;
using TariffComparisonAPI.Models;
using TariffComparisonAPI.Services;
using System.Linq;

namespace TariffComparisonAPI.Tests
{
    public class TariffTests
    {
        [Theory]
        [InlineData(0, 60.00, 800.00)]
        [InlineData(3500, 830.00, 800.00)]
        [InlineData(4500, 1050.00, 950.00)]
        [InlineData(6000, 1380.00, 1400.00)]
        public void CalculateAnnualCost_ShouldReturnExpectedValues(int consumption, decimal expectedBasicCost, decimal expectedPackagedCost)
        {
            // Arrange
            var basicTariff = new BasicElectricityTariff();
            var packagedTariff = new PackagedTariff();

            // Act
            var basicCost = basicTariff.CalculateAnnualCost(consumption);
            var packagedCost = packagedTariff.CalculateAnnualCost(consumption);

            // Assert
            Assert.Equal(expectedBasicCost, basicCost);
            Assert.Equal(expectedPackagedCost, packagedCost);
        }

        [Theory]
        [InlineData(3500, "Basic Electricity Tariff", 830.00)]
        [InlineData(4500, "Packaged Tariff", 950.00)]
        [InlineData(6000, "Basic Electricity Tariff", 1380.00)]
        public void CompareTariffs_ShouldReturnCheapestTariff(int consumption, string expectedCheapestTariff, decimal expectedCheapestCost)
        {
            // Arrange
            var comparisonService = new TariffComparisonService();

            // Act
            var results = comparisonService.CompareTariffs(consumption).ToList();
            var cheapestTariff = results.First();

            // Assert
            Assert.Equal(expectedCheapestTariff, cheapestTariff.TariffName);
            Assert.Equal(expectedCheapestCost, cheapestTariff.AnnualCost);
        }

        [Fact]
        public void CalculateAnnualCost_NegativeConsumption_ShouldThrowArgumentException()
        {
            // Arrange
            var basicTariff = new BasicElectricityTariff();
            var packagedTariff = new PackagedTariff();

            // Act & Assert
            Assert.Throws<System.ArgumentException>(() => basicTariff.CalculateAnnualCost(-100));
            Assert.Throws<System.ArgumentException>(() => packagedTariff.CalculateAnnualCost(-100));
        }
    }
}
