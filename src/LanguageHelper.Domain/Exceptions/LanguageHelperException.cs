using System;

namespace LanguageHelper.Domain.Exceptions
{
    public class LanguageHelperException : Exception
    {
        public LanguageHelperException()
            : base() { }

        public LanguageHelperException(string message)
            : base(message) { }

        public LanguageHelperException(string format, params object[] args)
            : base(string.Format(format, args)) { }

        public LanguageHelperException(string message, Exception innerException)
            : base(message, innerException) { }

        public LanguageHelperException(string format, Exception innerException, params object[] args)
            : base(string.Format(format, args), innerException) { }
    }
}