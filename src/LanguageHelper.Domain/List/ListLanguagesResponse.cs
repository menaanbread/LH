using System.Collections.Generic;
using LanguageHelper.Domain.Languages;

namespace LanguageHelper.Domain.List
{
    public class ListLanguagesResponse
    {
        public ListLanguagesResponse()
        {
            Languages = new List<Language>();
        }
        
        public List<Language> Languages { get; set; } 
    }
}