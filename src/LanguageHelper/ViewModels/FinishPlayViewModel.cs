using System.Collections.Generic;
using LanguageHelper.Models;

namespace LanguageHelper.ViewModels
{
    public class FinishPlayViewModel
    {
        public FinishPlayViewModel() 
        {
            CorrectionAnswers = new List<CorrectionAnswer>();
        }
        
        public int CorrectAnswers { get; set; }
        public int CorrectPercentage { get; set; }
        public List<CorrectionAnswer> CorrectionAnswers { get; set; }
    }
}