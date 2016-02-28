using System.Collections.Generic;

namespace LanguageHelper.Domain.Languages
{
    public class Language
    {
        public string Name { get; set; }
        public List<Word> Words { get; set; }
        public int Id { get; set; }
    }
}