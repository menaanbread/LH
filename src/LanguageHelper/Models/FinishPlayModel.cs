using System.Collections.Generic;

namespace LanguageHelper.Models
{
    public class FinishPlayModel
    {
        public FinishPlayModel()
        {
            CorrectionAnswers = new List<CorrectionAnswer>();
        }
        
        public List<CorrectionAnswer> CorrectionAnswers { get; set; }
    }
}