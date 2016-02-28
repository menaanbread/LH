using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LanguageHelper.Domain.Add;
using LanguageHelper.Domain.Delete;
using LanguageHelper.Domain.Game;
using LanguageHelper.Domain.List;
using LanguageHelper.Domain.Update;
using LanguageHelper.Services.Interfaces;

namespace LanguageHelper.Services
{
    public class LanguageHelperService : ILanguageHelperService
    {
        public LanguageHelperService()
        {
        }
        
        //Test game
        StartTestResponse ILanguageHelperService.StartTest(StartTestRequest startTestRequest)
        {
            throw new NotImplementedException();
        }
        
        EndTestResponse ILanguageHelperService.EndTest(EndTestRequest endTestRequest)
        {
            throw new NotImplementedException();
        }
                   
        //Add
        AddLanguageResponse ILanguageHelperService.AddLanguage(AddLanguageRequest addLanguageRequest)
        {
            throw new NotImplementedException();
        }
        
        AddWordResponse ILanguageHelperService.AddWord(AddWordRequest addWordRequest)
        {
            throw new NotImplementedException();
        }
        
        AddSentanceResponse ILanguageHelperService.AddSentance(AddSentanceRequest addSentanceRequest)
        {
            throw new NotImplementedException();
        }
        
        //Update
        UpdateWordResponse ILanguageHelperService.UpdateWord(UpdateWordRequest updateWordRequest)
        {
            throw new NotImplementedException();
        }
        
        UpdateSentanceResponse ILanguageHelperService.UpdateSentance(UpdateSentanceRequest updateSentanceRequest)
        {
            throw new NotImplementedException();
        }
        
        //Delete
        DeleteWordResponse ILanguageHelperService.DeleteWord(DeleteWordRequest deleteWordRequest)
        {
            throw new NotImplementedException();
        }
        
        DeleteSentanceResponse ILanguageHelperService.DeleteSentance(DeleteSentanceRequest deleteSentanceRequest)
        {
            throw new NotImplementedException();
        }
        
        //List
        ListWordsResponse ILanguageHelperService.ListWords(ListWordsRequest listWordsRequest)
        {
            throw new NotImplementedException();
        }
        
        FindWordsResponse ILanguageHelperService.FindWords(FindWordsRequest findWordsRequest)
        {
            throw new NotImplementedException();
        }
    }
}
