using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using LanguageHelper.Domain.Game;
using LanguageHelper.Services.Interfaces;
using LanguageHelper.ViewModels;

namespace LanguageHelper.Controllers
{
    public class PlayController : Controller
    {
        private readonly ILanguageHelperService _languageHelperService = null;
        
        public PlayController(ILanguageHelperService languageHelperService)
        {
            this._languageHelperService = languageHelperService;
        }
        
        public IActionResult Start(WordIdsViewModel word)
        {
            var playStartViewModel = new PlayStartViewModel();
            var wordIds = GetWordIds(word);
            
            var startTestResponse = this._languageHelperService.StartTest(new StartTestRequest() { SelectedWordIds = wordIds });
            playStartViewModel.SelectedWords = startTestResponse.PracticeWords;
                        
            return View(playStartViewModel);
        }
        
        //ToDo - move me somewhere more sensible
        private List<int> GetWordIds(WordIdsViewModel wordIdsViewModel)
        {
            var wordIds = new List<int>();
            
            var sanitisedSelectedList = GetSanitisedSelectedList(wordIdsViewModel.Selected);
            
            if (wordIdsViewModel.Word.Id.Count != sanitisedSelectedList.Count)
            {
                throw new ArgumentException("An exception occurred parsing play choices - mismatch between number of check values and ids.");
            }
            for (int i = 0; i < sanitisedSelectedList.Count; i++)
            {
                if (sanitisedSelectedList[i])
                {
                    wordIds.Add(wordIdsViewModel.Word.Id[i]);
                }
            }
            
            return wordIds;
        }
        
        //ToDo - move this with MapToPlayStartViewModel
        private List<bool> GetSanitisedSelectedList(List<bool> unsanitisedSelectedList)
        {
            var sanitisedSelectedList = new List<bool>();
            var ignoreNext = false;
            
            foreach (var selected in unsanitisedSelectedList)
            {
                if (selected) 
                {
                    sanitisedSelectedList.Add(selected);
                    ignoreNext = true;                    
                }
                else if (!ignoreNext)
                {
                    sanitisedSelectedList.Add(selected);
                }
                else
                {
                    ignoreNext = false;
                }
            }
            
            return sanitisedSelectedList;
        }
    }
}