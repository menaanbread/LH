namespace LanguageHelper.Domain.Add
{
    public class AddSentanceRequest
    {
        public string TranslatedSentance { get; set; }
        public string EnglishSentance { get; set; }
        public int LanguageId { get; set; }
    }
}