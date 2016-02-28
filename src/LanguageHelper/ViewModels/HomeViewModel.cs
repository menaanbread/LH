using System.Collections.Generic;
using LanguageHelper.Domain.Languages;

namespace LanguageHelper.ViewModels
{
    public class HomeViewModel
    {
        public string Message { get; set; }
        public List<Language> Languages { get; set; }
    }
}