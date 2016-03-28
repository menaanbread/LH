using LanguageHelper.Domain.Add;
using LanguageHelper.Domain.Delete;
using LanguageHelper.Domain.Game;
using LanguageHelper.Domain.List;
using LanguageHelper.Domain.Update;

namespace LanguageHelper.Services.Interfaces
{
    public interface ILanguageHelperService
    {
        //Test game
        StartTestResponse StartTest(StartTestRequest startTestRequest);
        EndTestResponse EndTest(EndTestRequest endTestRequest);
                   
        //Add
        AddLanguageResponse AddLanguage(AddLanguageRequest addLanguageRequest);
        AddWordResponse AddWord(AddWordRequest addWordRequest);
        AddSentanceResponse AddSentance(AddSentanceRequest addSentanceRequest);
        
        //Update
        UpdateWordResponse UpdateWord(UpdateWordRequest updateWordRequest);
        UpdateSentanceResponse UpdateSentance(UpdateSentanceRequest updateSentanceRequest);
        
        //Delete
        DeleteWordResponse DeleteWord(DeleteWordRequest deleteWordRequest);
        DeleteSentanceResponse DeleteSentance(DeleteSentanceRequest deleteSentanceRequest);
        
        //List
        ListWordsResponse ListWords(ListWordsRequest listWordsRequest);
        FindWordsResponse FindWords(FindWordsRequest findWordsRequest);
        ListSentancesResponse ListSentences(ListSentancesRequest listSentancesRequest);
        ListSentancesResponse FindSentences(FindSentencesRequest findSentencesRequest);
        ListLanguagesResponse ListLanguages();
    }
}
