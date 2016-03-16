using Microsoft.AspNet.Mvc;
using System;
using LanguageHelper.ViewModels;
using System.Collections.Generic;

namespace LanguageHelper.Controllers
{
    public class PlayController : Controller
    {
        public IActionResult Start(WordIdsViewModel word)
        {
            var playStartViewModel = MapToPlayStartViewModel(word);
            
            return View(playStartViewModel);
        }
        
        //ToDo - move me somewhere more sensible
        private PlayStartViewModel MapToPlayStartViewModel(WordIdsViewModel wordIdsViewModel)
        {
            var playStartViewModel = new PlayStartViewModel();
            
            var sanitisedSelectedList = GetSanitisedSelectedList(wordIdsViewModel.Selected);
            
            if (wordIdsViewModel.Word.Id.Count != sanitisedSelectedList.Count)
            {
                throw new ArgumentException("An exception occurred parsing play choices - mismatch between number of check values and ids.");
            }
            for (int i = 0; i < sanitisedSelectedList.Count; i++)
            {
                if (sanitisedSelectedList[i])
                {
                    playStartViewModel.SelectedWords.Add(wordIdsViewModel.Word.Id[i]);
                }
            }
            
            return playStartViewModel;
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