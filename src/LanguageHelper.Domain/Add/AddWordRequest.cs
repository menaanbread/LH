namespace LanguageHelper.Domain.Add
{
    public class AddWordRequest
    {
        public string TranslatedWord { get; set; }
        public string TranslatedSentance { get; set; }
        public int LanguageId { get; set; }
    }
}