/// <reference path="../core/keycodes.ts" />
var LanguageHelper;
(function (LanguageHelper) {
    var Play;
    (function (Play) {
        var KeyCodes = LanguageHelper.Core.KeyCodes;
        var QuestionLimit = 10;
        var PlayController = (function () {
            function PlayController() {
                this.questionsAnswered = 0;
                this.correctAnswers = 0;
            }
            PlayController.prototype.initialise = function () {
                this.view = new Play.PlayView();
                this.playData = new Play.PlayModel();
                this.correctionAnswers = new Play.PlayCorrectionAnswers();
                this.playData.words = new Array();
                this.playData.words = this.initialseModel();
                this.setQuestion();
                this.setupEventListeners();
            };
            PlayController.prototype.setQuestion = function () {
                var questionWord = this.grabWord();
                var questionSentance = this.grabSentance(questionWord);
                var showEnglish = this.showEnglish();
                this.view.playQuestion = showEnglish ? questionSentance.englishSentance : questionSentance.translation;
                this.currentQuestion = showEnglish ? questionSentance.englishSentance : questionSentance.translation;
                this.currentAnswer = showEnglish ? questionSentance.translation : questionSentance.englishSentance;
                this.currentWordId = questionSentance.wordId;
                this.view.answerTextbox.val("");
            };
            PlayController.prototype.grabWord = function () {
                return this.playData.words[this.getNext(this.playData.wordCount)];
            };
            PlayController.prototype.grabSentance = function (word) {
                return word.sentances[this.getNext(word.sentanceCount)];
            };
            PlayController.prototype.initialseModel = function () {
                var foundWords = new Array();
                var words = this.view.words;
                for (var i = 0; i < words.length; i++) {
                    var foundWord = new Play.PlayWord();
                    foundWord.word = this.view.translationWord(words[i]);
                    foundWord.englishWord = this.view.englishWord(words[i]);
                    foundWord.sentances = new Array();
                    var foundSentances = this.view.loadSentances(this.view.wordId(words[i]));
                    for (var j = 0; j < foundSentances.length; j++) {
                        var foundSentance = new Play.PlaySentance();
                        foundSentance.translation = this.view.translationSentance(foundSentances[j]);
                        foundSentance.englishSentance = this.view.englishSentance(foundSentances[j]);
                        foundSentance.wordId = this.view.wordId(foundSentances[j]);
                        foundWord.sentances.push(foundSentance);
                    }
                    foundWords.push(foundWord);
                }
                return foundWords;
            };
            PlayController.prototype.setupEventListeners = function () {
                var _this = this;
                this.view.answerTextbox.on("keydown", function (e) {
                    // If enter/return was hit
                    if (e.keyCode === KeyCodes.Return) {
                        e.preventDefault();
                        _this.checkAnswer();
                    }
                });
                this.view.checkButton.on("click", function () { _this.checkAnswer(); });
            };
            PlayController.prototype.checkAnswer = function () {
                var usersAnswer = this.view.playAnswer;
                if (usersAnswer.toLowerCase() === this.currentAnswer.toLowerCase()) {
                    alert("That was right!");
                    this.correctAnswers++;
                }
                else {
                    this.correctionAnswers.answers.push(new Play.PlayCorrectionAnswer(this.currentWordId, usersAnswer, this.currentAnswer));
                    alert("That was wrong!\nThe correct answer was " + this.currentAnswer);
                }
                this.questionsAnswered++;
                if (this.questionsAnswered < QuestionLimit) {
                    this.setQuestion();
                }
                else {
                    alert("Times up! You got " + this.correctAnswers + " questions correct.");
                    this.postAnswers();
                }
            };
            PlayController.prototype.getNext = function (size) {
                return Math.floor(Math.random() * size);
            };
            PlayController.prototype.showEnglish = function () {
                return Math.floor(Math.random() * 2) === 1;
            };
            PlayController.prototype.postAnswers = function () {
                var _this = this;
                this.view.form.submit(function () {
                    _this.correctionAnswers.answers.forEach(function (correctionAnswer) {
                        $("<input />").attr("type", "hidden")
                            .attr("name", "finishPlayModel.CorrectionAnswers.WordId")
                            .attr("value", correctionAnswer.wordId)
                            .appendTo(_this.view.form);
                        $("<input />").attr("type", "hidden")
                            .attr("name", "finishPlayModel.CorrectionAnswersGivenAnswer")
                            .attr("value", correctionAnswer.givenAnswer)
                            .appendTo(_this.view.form);
                        $("<input />").attr("type", "hidden")
                            .attr("name", "finishPlayModel.CorrectionAnswers.CorrectAnswer")
                            .attr("value", correctionAnswer.correctAnswer)
                            .appendTo(_this.view.form);
                    });
                });
                this.view.form.submit();
            };
            return PlayController;
        }());
        Play.PlayController = PlayController;
        $(document).ready(function () {
            var playcontroller = new PlayController();
            playcontroller.initialise();
        });
    })(Play = LanguageHelper.Play || (LanguageHelper.Play = {}));
})(LanguageHelper || (LanguageHelper = {}));
