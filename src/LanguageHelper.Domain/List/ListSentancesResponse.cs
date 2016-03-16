using System.Collections.Generic;
using LanguageHelper.Domain.Languages;

namespace LanguageHelper.Domain.List
{
    public class ListSentancesResponse
    {
        public ListSentancesResponse()
        {
            Sentances = new List<Sentance>();    
        }
        
        public List<Sentance> Sentances { get; set; }
    }
}