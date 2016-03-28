var LanguageHelper;
(function (LanguageHelper) {
    var Play;
    (function (Play) {
        var PlayCorrectionAnswers = (function () {
            function PlayCorrectionAnswers() {
                this.answers = new Array();
            }
            return PlayCorrectionAnswers;
        }());
        Play.PlayCorrectionAnswers = PlayCorrectionAnswers;
        var PlayCorrectionAnswer = (function () {
            function PlayCorrectionAnswer(wordId, givenAnswer, correctAnswer) {
                this.wordId = wordId;
                this.givenAnswer = givenAnswer;
                this.correctAnswer = correctAnswer;
            }
            return PlayCorrectionAnswer;
        }());
        Play.PlayCorrectionAnswer = PlayCorrectionAnswer;
    })(Play = LanguageHelper.Play || (LanguageHelper.Play = {}));
})(LanguageHelper || (LanguageHelper = {}));
