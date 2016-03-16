using System.Collections.Generic;

namespace LanguageHelper.ViewModels
{
    public class PlayStartViewModel
    {
        public PlayStartViewModel()
        {
            SelectedWords = new List<int>();
        }
        
        //ToDo - change this to list of words
        public List<int> SelectedWords { get; set; }
    }
}
