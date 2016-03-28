namespace LanguageHelper.Models
{
    public class IncorrectAnswer
    {
        public int SentenceId { get; set; }
        public int WordId { get; set; }
        public string GivenAnswer { get; set; }
    }   
}