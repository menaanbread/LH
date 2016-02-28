using System.Collections.Generic;
using LanguageHelper.Domain.Languages;

namespace LanguageHelper.ViewModels
{
    public class WordsViewModel
    {
        public Dictionary<Word, bool> Words { get; set; }
    }
}