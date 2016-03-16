using Microsoft.AspNet.Mvc;
using System.Collections.Generic;
using LanguageHelper.Domain.Interfaces;
using LanguageHelper.Domain.Languages;
using LanguageHelper.Models;
using LanguageHelper.ViewModels;
using LanguageHelper.Services.Interfaces;
using LanguageHelper.Domain.List;

namespace LanguageHelper.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILanguageHelperService _languageHelperService = null;
        
        public HomeController(ILanguageHelperService languageHelperService)
        {
            _languageHelperService = languageHelperService;
        }
        
        public IActionResult Index()
        {
            var homeViewModel = new HomeViewModel();
            homeViewModel.Languages = _languageHelperService.ListLanguages().Languages;
            
            return View(homeViewModel);
        }
        
        [HttpPost]
        public IActionResult LanguageSet(int languageId)
        {
            var wordsViewModel = new WordsViewModel();
            var languageWords = _languageHelperService.ListWords(new ListWordsRequest() { LanguageId = languageId }).Words;
            
            foreach (var word in languageWords) 
            {
                wordsViewModel.Words.Add(new WordCheck() { Word = word, Selected = false });
            }
                        
            return PartialView(wordsViewModel);
        }
        
        [HttpPost]
        public IActionResult ListSentances(int wordId) 
        {
            var sentancesViewModel = new SentancesViewModel();
            sentancesViewModel.Sentances = new List<Sentance>();
            
            sentancesViewModel.Sentances = _languageHelperService.ListSentances(new ListSentancesRequest() { WordId = wordId }).Sentances;

            return PartialView(sentancesViewModel);
        }
    }
}
