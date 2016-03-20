using System.Collections.Generic;
using LanguageHelper.Domain.Languages;

namespace LanguageHelper.ViewModels
{
    public class PlayStartViewModel
    {
        public PlayStartViewModel()
        {
            SelectedWords = new List<Word>();
        }
        
        //ToDo - change this to list of words
        public List<Word> SelectedWords { get; set; }
    }
}
