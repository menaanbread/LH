using System.Collections.Generic;
using LanguageHelper.Domain.Languages;

namespace LanguageHelper.Domain.Game
{
    public class StartTestResponse
    {
        public StartTestResponse()
        {
            PracticeWords = new List<Word>();    
        }
        
        public List<Word> PracticeWords { get; set; }
    }
}