using System.Collections.Generic;

namespace LanguageHelper.Domain.Languages
{
    public class Word
    {
        public string Translation { get; set; }
        public List<Sentance> Sentances { get; set; }
        public string EnglishTranslation { get; set; }
        public int Id { get; set; }
    }
}