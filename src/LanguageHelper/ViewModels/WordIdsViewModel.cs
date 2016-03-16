using System.Collections.Generic;
using LanguageHelper.Models;

namespace LanguageHelper.ViewModels
{
    public class WordIdsViewModel
    {
        public WordIdCheck Word { get; set; }
        public List<bool> Selected { get; set; }
    }
}