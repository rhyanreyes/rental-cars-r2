using AngleSharp.Parser.Html;
using RentalCarsAPI.Models.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;

namespace RentalCarsAPI.Services
{
    public class RentalCarsPriceScraperService
    {
        public string GetThriftyRates()
        {
            var thriftyRatesResults = new List<ThriftyCarRentalRates>();
            var webClient = new WebClient();
            string webPage = "";
            var html = webClient.DownloadString(webPage);
            var parser = new HtmlParser();
            var document = parser.Parse(html);
            string jQuerySelect = "";
            var table = document.QuerySelector(jQuerySelect);

            string value = "Scraper doesn't work";

            return value;
        }
    }
}