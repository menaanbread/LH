/// <reference path="../../typings/jquery.d.ts" />
var LanguageHelper;
(function (LanguageHelper) {
    var Play;
    (function (Play) {
        var PlayView = (function () {
            function PlayView() {
                this.checkButton = $("#play-check");
                this.answerTextbox = $("#play-answer");
            }
            Object.defineProperty(PlayView.prototype, "words", {
                get: function () {
                    return $(".play-word");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PlayView.prototype, "playQuestion", {
                get: function () {
                    return $("#play-question").html();
                },
                set: function (question) {
                    $("#play-question").html(question);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PlayView.prototype, "playAnswer", {
                get: function () {
                    return this.answerTextbox.val();
                },
                enumerable: true,
                configurable: true
            });
            PlayView.prototype.loadSentances = function (wordId) {
                var words;
                words = $(".play-sentance[data-id='" + wordId + "']");
                return words;
            };
            PlayView.prototype.englishSentance = function (sentace) {
                var english = "";
                english = $(sentace).data("sentance-english");
                return english;
            };
            PlayView.prototype.translationSentance = function (sentace) {
                var translation = "";
                translation = $(sentace).data("sentance-translation");
                return translation;
            };
            PlayView.prototype.englishWord = function (word) {
                var english = "";
                english = $(word).data("english");
                return english;
            };
            PlayView.prototype.translationWord = function (word) {
                var translation = "";
                translation = $(word).data("translation");
                return translation;
            };
            PlayView.prototype.wordId = function (word) {
                return +$(word).data("id");
            };
            return PlayView;
        }());
        Play.PlayView = PlayView;
    })(Play = LanguageHelper.Play || (LanguageHelper.Play = {}));
})(LanguageHelper || (LanguageHelper = {}));
