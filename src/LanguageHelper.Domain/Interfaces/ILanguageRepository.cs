using System.Collections.Generic;
using LanguageHelper.Domain.Languages;

namespace LanguageHelper.Domain.Interfaces
{
    public interface ILanguageRepository
    {
        List<Language> ListLanguages();
        List<Word> ListWords(int languageId);
        List<Word> ListWords(List<int> wordIds);
        List<Sentance> ListSentances(int wordId);
        
        List<Word> FindWords(int languageId, string search);
    }
}