using System.Collections.Generic;
using LanguageHelper.Models;

namespace LanguageHelper.ViewModels
{
    public class WordsViewModel
    {
        public WordsViewModel()
        {
            Words = new List<WordCheck>();
        }
        
        public List<WordCheck> Words { get; set; }
    }
}