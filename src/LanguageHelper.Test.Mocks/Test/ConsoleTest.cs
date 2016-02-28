using LanguageHelper.Domain.Interfaces;

namespace LanguageHelper.Test.Mocks.Test
{
    public class ConsoleTest : ITest
    {
        string ITest.PrintMessage()
        {
            return "Console test";
        }
    }
}