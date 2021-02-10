using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Phonebook.Contracts.Models.WeatherForecasts
{
    public class WeatherForecastFilter
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("from-date")]
        public DateTime FromDate { get; set; }

        [JsonProperty("to-date")]
        public DateTime ToDate { get; set; }
    }
}
