using System.Collections.Generic;
using System.Linq;
using LanguageHelper.Domain.Interfaces;
using LanguageHelper.Domain.Languages;

namespace LanguageHelper.Test.Mocks.Repositories
{
    public class MockedLanguageRepository : ILanguageRepository
    {
        private static List<Language> _languages;
        private static List<Word> _words;
        private static List<Sentance> _sentances;
        
        static MockedLanguageRepository()
        {
            _languages = new List<Language>();
            _words = new List<Word>();
            _sentances = new List<Sentance>();
            
            AddWelsh();
            AddSpanish();
        }
        
        List<Language> ILanguageRepository.ListLanguages()
        {
            return _languages;
        }
        
        List<Word> ILanguageRepository.ListWords(int languageId)
        {
            return _languages.Find(x => x.Id == languageId).Words;
        }
        
        List<Sentance> ILanguageRepository.ListSentances(int wordId)
        {
            return _words.Find(x => x.Id == wordId).Sentances;
        }
        
        List<Word> ILanguageRepository.FindWords(int languageId, string search)
        {
            var words = new List<Word>();
            var allLanguageWords = _languages.Find(x => x.Id == languageId).Words;
            
            if (allLanguageWords.Any())
            {
                words.AddRange(allLanguageWords.FindAll(x => x.Translation.Contains(search)));
            }
            
            return words;
        }
        
        private static void AddWelsh() 
        {
            var boreSentances = new List<Sentance>();
            boreSentances.Add(new Sentance() { Id = 1, TranslatedSentance = "Bore Da", EnglishSentance = "Good Morning" });
            boreSentances.Add(new Sentance() { Id = 2, TranslatedSentance = "Bore Dydd Llun", EnglishSentance = "Monday Morning" });
            boreSentances.Add(new Sentance() { Id = 3, TranslatedSentance = "Bore Da Tom", EnglishSentance = "Good Morning Tom" });
            boreSentances.Add(new Sentance() { Id = 4, TranslatedSentance = "Bore Sul", EnglishSentance = "Sunday Morning" });
            
            var prynhawnSentances = new List<Sentance>();
            prynhawnSentances.Add(new Sentance() { Id = 5, TranslatedSentance = "Prynhawn Da", EnglishSentance = "Good Afternoon" });
            prynhawnSentances.Add(new Sentance() { Id = 6, TranslatedSentance = "Prynhawn Dydd Mercher", EnglishSentance = "Tuesday Afternoon" });
            prynhawnSentances.Add(new Sentance() { Id = 7, TranslatedSentance = "Prynhawn Da Tom", EnglishSentance = "Good Afternoon Tom" });
            prynhawnSentances.Add(new Sentance() { Id = 8, TranslatedSentance = "Prynhawn Gwener", EnglishSentance = "Friday Afternoon" });
            
            var croesoSentances = new List<Sentance>();
            croesoSentances.Add(new Sentance() { Id = 9, TranslatedSentance = "Croeso Tom", EnglishSentance = "Welcome Tom" });
            croesoSentances.Add(new Sentance() { Id = 10, TranslatedSentance = "Croeso i Cymru", EnglishSentance = "Welcome to Wales" });
            
            var gwneudSentances = new List<Sentance>();
            gwneudSentances.Add(new Sentance() { Id = 11, TranslatedSentance = "Dw i'n gwneud brecwast", EnglishSentance = "I am making breakfast" });
            gwneudSentances.Add(new Sentance() { Id = 12, TranslatedSentance = "Dych chi'n gwneud cinio", EnglishSentance = "Are you making dinner" });
            gwneudSentances.Add(new Sentance() { Id = 13, TranslatedSentance = "Dw i'n gwneud te", EnglishSentance = "I am making tea" });
            
            var gwerthuSentances = new List<Sentance>();
            gwerthuSentances.Add(new Sentance() { Id = 14, TranslatedSentance = "Dw i'n gwerthu car", EnglishSentance = "I'm selling a car" });
            gwerthuSentances.Add(new Sentance() { Id = 15, TranslatedSentance = "Dw i'n hoffi gwerthu mewn siop", EnglishSentance = "I like selling in a shop" });
            gwerthuSentances.Add(new Sentance() { Id = 16, TranslatedSentance = "Dych chi'n gwerthu cwrw", EnglishSentance = "Are you selling beer" });
            
            var gweithioSentances = new List<Sentance>();
            gweithioSentances.Add(new Sentance() { Id = 17, TranslatedSentance = "Dw i'n gweithio mewn swyddfa", EnglishSentance = "I am working in an office" });
            gweithioSentances.Add(new Sentance() { Id = 18, TranslatedSentance = "Dych chi ddim yn hoffi gweithio mewn siop", EnglishSentance = "Do you not like working in an office" });
            gweithioSentances.Add(new Sentance() { Id = 19, TranslatedSentance = "Dych chi'n gweithio", EnglishSentance = "Do you work?" });
            
            var dwSentances = new List<Sentance>();
            dwSentances.Add(new Sentance() { Id = 20, TranslatedSentance = "Dw i eisiau tegan", EnglishSentance = "I want a toy" });
            dwSentances.Add(new Sentance() { Id = 21, TranslatedSentance = "Dw i'n hoffi coffi", EnglishSentance = "I like coffee" });
            
            var dychSentances = new List<Sentance>();
            dychSentances.Add(new Sentance() { Id = 22, TranslatedSentance = "Dych chi eisiau ci", EnglishSentance = "Do you want a dog" });
            dychSentances.Add(new Sentance() { Id = 23, TranslatedSentance = "Dych chi'n hoffi te", EnglishSentance = "Do you like tea" });
            
            var adioSentances = new List<Sentance>();
            adioSentances.Add(new Sentance() { Id = 24, TranslatedSentance = "Deg adio un", EnglishSentance = "Ten add one" });
            adioSentances.Add(new Sentance() { Id = 25, TranslatedSentance = "Dau adio tri", EnglishSentance = "Two add three" });
            
            var swyddfaSentances = new List<Sentance>();
            swyddfaSentances.Add(new Sentance() { Id = 26, TranslatedSentance = "Dw i wedi mynd i'r swyddfa", EnglishSentance = "I have gone to the office" });
            swyddfaSentances.Add(new Sentance() { Id = 27, TranslatedSentance = "Dych chi'n hoffi Y Swyddfa?", EnglishSentance = "Do you like the office?" });
            
            var myndSentances = new List<Sentance>();
            myndSentances.Add(new Sentance() { Id = 28, TranslatedSentance = "Dych chi wedi mynd?", EnglishSentance = "Have you gone?" });
            myndSentances.Add(new Sentance() { Id = 29, TranslatedSentance = "Dw i wedi mynd i'r parc", EnglishSentance = "I have gone to the park." });
            
            var codiSentances = new List<Sentance>();
            codiSentances.Add(new Sentance() { Id = 30, TranslatedSentance = "Dw i wedi codi", EnglishSentance = "I have got up" });
            codiSentances.Add(new Sentance() { Id = 31, TranslatedSentance = "Dych chi wedi codi eto?", EnglishSentance = "Have you got up yet?" });
            
            var wediBlinoSentances = new List<Sentance>();
            wediBlinoSentances.Add(new Sentance() { Id = 32, TranslatedSentance = "Dw i wedi blino", EnglishSentance = "I am tired" });
            wediBlinoSentances.Add(new Sentance() { Id = 33, TranslatedSentance = "Dych chi wedi blino?", EnglishSentance = "Are you tired?" });
            
            _words.Add(new Word() { Id = 1, Translation = "Bore", EnglishTranslation = "Morning", Sentances = boreSentances });
            _words.Add(new Word() { Id = 2, Translation = "Prynhawn", EnglishTranslation = "Afternoon", Sentances = prynhawnSentances });
            _words.Add(new Word() { Id = 3, Translation = "Croeso", EnglishTranslation = "Welcome", Sentances = croesoSentances });
            _words.Add(new Word() { Id = 4, Translation = "Gwneud", EnglishTranslation = "Making", Sentances = gwneudSentances });
            _words.Add(new Word() { Id = 5, Translation = "Gwerthu", EnglishTranslation = "To Sell", Sentances = gwerthuSentances });
            _words.Add(new Word() { Id = 6, Translation = "Gweithio", EnglishTranslation = "To Work", Sentances = gweithioSentances });
            _words.Add(new Word() { Id = 7, Translation = "Dw", EnglishTranslation = "I", Sentances = dwSentances });
            _words.Add(new Word() { Id = 8, Translation = "Dych", EnglishTranslation = "You", Sentances = dychSentances });
            _words.Add(new Word() { Id = 9, Translation = "Adio", EnglishTranslation = "Add", Sentances = adioSentances });
            _words.Add(new Word() { Id = 10, Translation = "Swyddfa", EnglishTranslation = "Office", Sentances = swyddfaSentances });
            _words.Add(new Word() { Id = 11, Translation = "Mynd", EnglishTranslation = "Going", Sentances = myndSentances });
            _words.Add(new Word() { Id = 12, Translation = "Codi", EnglishTranslation = "Get Up", Sentances = codiSentances });
            _words.Add(new Word() { Id = 13, Translation = "Wedi Blino", EnglishTranslation = "Tired", Sentances = wediBlinoSentances }); 
            
            _sentances.AddRange(boreSentances);
            _sentances.AddRange(prynhawnSentances);
            _sentances.AddRange(croesoSentances);
            _sentances.AddRange(gwneudSentances);
            _sentances.AddRange(gwerthuSentances);
            _sentances.AddRange(gweithioSentances);
            _sentances.AddRange(dwSentances);
            _sentances.AddRange(dychSentances);
            _sentances.AddRange(adioSentances);
            _sentances.AddRange(swyddfaSentances);
            _sentances.AddRange(myndSentances);
            _sentances.AddRange(codiSentances);
            _sentances.AddRange(wediBlinoSentances); 
            
            _languages.Add(new Language() { Name = "Welsh", Id = 1, Words = _words.Where(x => x.Id < 14).ToList() });    
        }
        
        private static void AddSpanish() 
        {
            var holaSentances = new List<Sentance>();
            holaSentances.Add(new Sentance() { Id = 34, TranslatedSentance = "Hola Tom", EnglishSentance = "Hello Tom" });
            holaSentances.Add(new Sentance() { Id = 35, TranslatedSentance = "Hola, que pasó?", EnglishSentance = "Hello, how is it going?" });
            
            var adiosSentances = new List<Sentance>();
            adiosSentances.Add(new Sentance() { Id = 36, TranslatedSentance = "Adiós, amigo", EnglishSentance = "Goodbye, friend" });
            adiosSentances.Add(new Sentance() { Id = 37, TranslatedSentance = "Adiós y buenas noches", EnglishSentance = "Goodbye and goodnight" });
        
            var cebollaSentances = new List<Sentance>();
            cebollaSentances.Add(new Sentance() { Id = 38, TranslatedSentance = "Tengo una cebolla", EnglishSentance = "I have an onion" });
            cebollaSentances.Add(new Sentance() { Id = 39, TranslatedSentance = "Ella come una cebolla", EnglishSentance = "She eats an onion" });
            
            var monoSentances = new List<Sentance>();
            monoSentances.Add(new Sentance() { Id = 40, TranslatedSentance = "Tenemos un mono", EnglishSentance = "We have a monkey" });
            monoSentances.Add(new Sentance() { Id = 41, TranslatedSentance = "El mono le gusta el pan", EnglishSentance = "The monkey likes bread" });
            
            var cartaSentances = new List<Sentance>();
            cartaSentances.Add(new Sentance() { Id = 42, TranslatedSentance = "Escribo una carta", EnglishSentance = "I write a letter" });
            cartaSentances.Add(new Sentance() { Id = 43, TranslatedSentance = "Tú tiene una carta", EnglishSentance = "You have a letter" });
            
            var comidaSentances = new List<Sentance>();
            comidaSentances.Add(new Sentance() { Id = 44, TranslatedSentance = "Comemos comida", EnglishSentance = "We eat food" });
            comidaSentances.Add(new Sentance() { Id = 45, TranslatedSentance = "Quiero comida", EnglishSentance = "I want food" });
            
            var jugoSentances = new List<Sentance>();
            jugoSentances.Add(new Sentance() { Id = 46, TranslatedSentance = "Ella bebe jugo", EnglishSentance = "She drinks juice" });
            jugoSentances.Add(new Sentance() { Id = 47, TranslatedSentance = "Bebo jugo", EnglishSentance = "I drink juice" });
            
            var ustedSentances = new List<Sentance>();
            ustedSentances.Add(new Sentance() { Id = 48, TranslatedSentance = "Usted no come pan", EnglishSentance = "You do not drink bread" });
            ustedSentances.Add(new Sentance() { Id = 49, TranslatedSentance = "Usted es un hombre", EnglishSentance = "You are a man" });
            
            var mujerSentances = new List<Sentance>();
            mujerSentances.Add(new Sentance() { Id = 50, TranslatedSentance = "Tú no eres una mujer", EnglishSentance = "You are not a woman" });
            mujerSentances.Add(new Sentance() { Id = 51, TranslatedSentance = "La mujer come", EnglishSentance = "The women eats" });
            
            var ninaSentances = new List<Sentance>();
            ninaSentances.Add(new Sentance() { Id = 52, TranslatedSentance = "Ella es una niña", EnglishSentance = "She is a girl" });
            ninaSentances.Add(new Sentance() { Id = 53, TranslatedSentance = "La niña bebe agua", EnglishSentance = "The girl drinks water" });
            
            _words.Add(new Word() { Id = 14, Translation = "Hola", EnglishTranslation = "Hello", Sentances = holaSentances });
            _words.Add(new Word() { Id = 15, Translation = "Adiós", EnglishTranslation = "Goodbye", Sentances = adiosSentances });
            _words.Add(new Word() { Id = 16, Translation = "Cebolla", EnglishTranslation = "Onion", Sentances = cebollaSentances });
            _words.Add(new Word() { Id = 17, Translation = "Mono", EnglishTranslation = "Monkey", Sentances = monoSentances });
            _words.Add(new Word() { Id = 18, Translation = "Carta", EnglishTranslation = "Letter", Sentances = cartaSentances });
            _words.Add(new Word() { Id = 19, Translation = "Comida", EnglishTranslation = "Food", Sentances = comidaSentances });
            _words.Add(new Word() { Id = 20, Translation = "Jugo", EnglishTranslation = "Juice", Sentances =jugoSentances });
            _words.Add(new Word() { Id = 21, Translation = "Usted", EnglishTranslation = "You (formal)", Sentances = ustedSentances });
            _words.Add(new Word() { Id = 22, Translation = "Mujer", EnglishTranslation = "Woman", Sentances = mujerSentances });
            _words.Add(new Word() { Id = 23, Translation = "Niña", EnglishTranslation = "Girl", Sentances = ninaSentances });
            
            _sentances.AddRange(holaSentances);
            _sentances.AddRange(adiosSentances);
            _sentances.AddRange(cebollaSentances);
            _sentances.AddRange(cartaSentances);
            _sentances.AddRange(comidaSentances);
            _sentances.AddRange(jugoSentances);
            _sentances.AddRange(ustedSentances);
            _sentances.AddRange(mujerSentances);
            _sentances.AddRange(ninaSentances);
            
            _languages.Add(new Language() { Name = "Spanish", Id = 2, Words = _words.Where(x => x.Id >= 14).ToList() });
        }
    }
}