using System;
using LanguageHelper.Domain.Add;
using LanguageHelper.Domain.Delete;
using LanguageHelper.Domain.Exceptions;
using LanguageHelper.Domain.Game;
using LanguageHelper.Domain.Interfaces;
using LanguageHelper.Domain.List;
using LanguageHelper.Domain.Update;
using LanguageHelper.Services.Interfaces;

namespace LanguageHelper.Services
{
    public class LanguageHelperService : ILanguageHelperService
    {
        private readonly ILanguageRepository _languageRepository = null;
        
        public LanguageHelperService(ILanguageRepository languageRepository)
        {
            _languageRepository = languageRepository;
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
            var listWordsResponse = new ListWordsResponse();
            
            try
            {
                listWordsResponse.Words = _languageRepository.ListWords(listWordsRequest.LanguageId);                
            }
            catch (Exception e)
            {
                throw new LanguageHelperException("An exception occurred during a ListWords operation.", e);
            }
            
            return listWordsResponse;
        }
        
        FindWordsResponse ILanguageHelperService.FindWords(FindWordsRequest findWordsRequest)
        {
            throw new NotImplementedException();
        }
        
        ListSentancesResponse ILanguageHelperService.ListSentances(ListSentancesRequest listSentancesRequest)
        {
            var listSentancesResponse = new ListSentancesResponse();
            
            try
            {
                listSentancesResponse.Sentances = _languageRepository.ListSentances(listSentancesRequest.WordId);
            }
            catch (Exception e)
            {
                throw new LanguageHelperException("An exception occurred during a ListSentances operation.", e);
            }
            
            return listSentancesResponse;          
        }
        
        ListLanguagesResponse ILanguageHelperService.ListLanguages()
        {
            var listLanguagesResponse = new ListLanguagesResponse();
            
            try
            {
                listLanguagesResponse.Languages = _languageRepository.ListLanguages();
            }
            catch (Exception e)
            {
                throw new LanguageHelperException("An exception occurred during a ListLanguages operation.", e);
            }
            
            return listLanguagesResponse;
        }
    }
}
