using System.Collections.Generic;
using LanguageHelper.Domain.Languages;

namespace LanguageHelper.Domain.List
{
    public class ListWordsResponse
    {
        public ListWordsResponse()
        {
            Words = new List<Word>();    
        }
        
        public List<Word> Words { get; set; }
    }
}