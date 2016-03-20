var LanguageHelper;
(function (LanguageHelper) {
    var Play;
    (function (Play) {
        var PlayModel = (function () {
            function PlayModel() {
            }
            Object.defineProperty(PlayModel.prototype, "wordCount", {
                get: function () {
                    return this.words.length;
                },
                enumerable: true,
                configurable: true
            });
            return PlayModel;
        }());
        Play.PlayModel = PlayModel;
        var PlayWord = (function () {
            function PlayWord() {
            }
            Object.defineProperty(PlayWord.prototype, "sentanceCount", {
                get: function () {
                    return this.sentances.length;
                },
                enumerable: true,
                configurable: true
            });
            return PlayWord;
        }());
        Play.PlayWord = PlayWord;
        var PlaySentance = (function () {
            function PlaySentance() {
            }
            return PlaySentance;
        }());
        Play.PlaySentance = PlaySentance;
    })(Play = LanguageHelper.Play || (LanguageHelper.Play = {}));
})(LanguageHelper || (LanguageHelper = {}));
