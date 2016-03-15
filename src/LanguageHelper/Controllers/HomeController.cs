using Microsoft.AspNet.Mvc;
using System.Collections.Generic;
using LanguageHelper.Domain.Interfaces;
using LanguageHelper.Domain.Languages;
using LanguageHelper.ViewModels;

namespace LanguageHelper.Controllers
{
    public class HomeController : Controller
    {
        private readonly ITest _test = null;
        private readonly ILanguageRepository _languageRepository = null;
        
        public HomeController(ITest test, ILanguageRepository languageRepository)
        {
            _test = test;
            _languageRepository = languageRepository;
        }
        
        public IActionResult Index()
        {
            var homeViewModel = new HomeViewModel();
            homeViewModel.Message = _test.PrintMessage();
            homeViewModel.Languages = _languageRepository.ListLanguages();
            
            return View(homeViewModel);
        }
        
        [HttpPost]
        public IActionResult LanguageSet(int languageId)
        {
            var wordsViewModel = new WordsViewModel();
            wordsViewModel.Words = new Dictionary<Word, bool>();
            var languageWords = _languageRepository.ListWords(languageId);
            
            foreach (var word in languageWords) 
            {
                wordsViewModel.Words.Add(word, false);
            }
                        
            return PartialView(wordsViewModel);
        }
        
        [HttpPost]
        public IActionResult ListSentances(int wordId) 
        {
            var sentancesViewModel = new SentancesViewModel();
            sentancesViewModel.Sentances = new List<Sentance>();
            
            sentancesViewModel.Sentances = _languageRepository.ListSentances(wordId);

            return PartialView(sentancesViewModel);
        }
    }
}
