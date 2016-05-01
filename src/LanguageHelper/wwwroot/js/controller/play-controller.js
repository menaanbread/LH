/// <reference path="../core/keycodes.ts" />
var LanguageHelper;
(function (LanguageHelper) {
    var Play;
    (function (Play) {
        var KeyCodes = LanguageHelper.Core.KeyCodes;
        const QuestionLimit = 10;
        class PlayController {
            constructor() {
                this.questionsAnswered = 0;
                this.correctAnswers = 0;
            }
            initialise() {
                this.view = new Play.PlayView();
                this.playData = new Play.PlayModel();
                this.correctionAnswers = new Play.PlayCorrectionAnswers();
                this.playData.words = new Array();
                this.playData.words = this.initialseModel();
                this.setQuestion();
                this.setupEventListeners();
            }
            setQuestion() {
                let questionWord = this.grabWord();
                let questionSentance = this.grabSentance(questionWord);
                let showEnglish = this.showEnglish();
                this.view.playQuestion = showEnglish ? questionSentance.englishSentance : questionSentance.translation;
                this.currentQuestion = showEnglish ? questionSentance.englishSentance : questionSentance.translation;
                this.currentAnswer = showEnglish ? questionSentance.translation : questionSentance.englishSentance;
                this.currentWordId = questionSentance.wordId;
                this.view.answerTextbox.val("");
            }
            grabWord() {
                return this.playData.words[this.getNext(this.playData.wordCount)];
            }
            grabSentance(word) {
                return word.sentances[this.getNext(word.sentanceCount)];
            }
            initialseModel() {
                let foundWords = new Array();
                let words = this.view.words;
                for (let i = 0; i < words.length; i++) {
                    let foundWord = new Play.PlayWord();
                    foundWord.word = this.view.translationWord(words[i]);
                    foundWord.englishWord = this.view.englishWord(words[i]);
                    foundWord.sentances = new Array();
                    let foundSentances = this.view.loadSentances(this.view.wordId(words[i]));
                    for (let j = 0; j < foundSentances.length; j++) {
                        let foundSentance = new Play.PlaySentance();
                        foundSentance.translation = this.view.translationSentance(foundSentances[j]);
                        foundSentance.englishSentance = this.view.englishSentance(foundSentances[j]);
                        foundSentance.wordId = this.view.wordId(foundSentances[j]);
                        foundWord.sentances.push(foundSentance);
                    }
                    foundWords.push(foundWord);
                }
                return foundWords;
            }
            setupEventListeners() {
                this.view.answerTextbox.on("keydown", (e) => {
                    // If enter/return was hit
                    if (e.keyCode === KeyCodes.Return) {
                        e.preventDefault();
                        this.checkAnswer();
                    }
                });
                this.view.checkButton.on("click", () => { this.checkAnswer(); });
            }
            checkAnswer() {
                let usersAnswer = this.view.playAnswer;
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
            }
            getNext(size) {
                return Math.floor(Math.random() * size);
            }
            showEnglish() {
                return Math.floor(Math.random() * 2) === 1;
            }
            postAnswers() {
                let i = 0;
                this.view.form.submit(() => {
                    this.correctionAnswers.answers.forEach((correctionAnswer) => {
                        $("<input />").attr("type", "hidden")
                            .attr("name", "finishPlayModel.CorrectionAnswers[" + i + "].WordId")
                            .attr("value", correctionAnswer.wordId)
                            .appendTo(this.view.form);
                        $("<input />").attr("type", "hidden")
                            .attr("name", "finishPlayModel.CorrectionAnswers[" + i + "].GivenAnswer")
                            .attr("value", correctionAnswer.givenAnswer)
                            .appendTo(this.view.form);
                        $("<input />").attr("type", "hidden")
                            .attr("name", "finishPlayModel.CorrectionAnswers[" + i + "].CorrectAnswer")
                            .attr("value", correctionAnswer.correctAnswer)
                            .appendTo(this.view.form);
                        i++;
                    });
                });
                this.view.form.submit();
            }
        }
        Play.PlayController = PlayController;
        $(document).ready(function () {
            let playcontroller = new PlayController();
            playcontroller.initialise();
        });
    })(Play = LanguageHelper.Play || (LanguageHelper.Play = {}));
})(LanguageHelper || (LanguageHelper = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXIvcGxheS1jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDRDQUE0QztBQUU1QyxJQUFPLGNBQWMsQ0FpSnBCO0FBakpELFdBQU8sY0FBYztJQUFDLElBQUEsSUFBSSxDQWlKekI7SUFqSnFCLFdBQUEsSUFBSSxFQUFDLENBQUM7UUFDeEIsSUFBTyxRQUFRLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDL0MsTUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBRXpCO1lBQUE7Z0JBTVksc0JBQWlCLEdBQUcsQ0FBQyxDQUFDO2dCQUN0QixtQkFBYyxHQUFHLENBQUMsQ0FBQztZQWdJL0IsQ0FBQztZQTdIVSxVQUFVO2dCQUNiLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxhQUFRLEVBQUUsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGNBQVMsRUFBRSxDQUFDO2dCQUNoQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSwwQkFBcUIsRUFBRSxDQUFDO2dCQUVyRCxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBWSxDQUFDO2dCQUM1QyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBRTVDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFFbkIsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDL0IsQ0FBQztZQUVNLFdBQVc7Z0JBQ2QsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNuQyxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3ZELElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFFckMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxHQUFH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SUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUU3QixDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUM7NkJBQ2pDLElBQUksQ0FBQyxNQUFNLEVBQUUsb0NBQW9DLEdBQUcsQ0FBQyxHQUFHLGlCQUFpQixDQUFDOzZCQUMxRSxJQUFJLENBQUMsT0FBTyxFQUFFLGdCQUFnQixDQUFDLGFBQWEsQ0FBQzs2QkFDN0MsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBRTFCLENBQUMsRUFBRSxDQUFDO29CQUNaLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUMsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQzVCLENBQUM7UUFDTCxDQUFDO1FBdklZLG1CQUFjLGlCQXVJMUIsQ0FBQTtRQUVELENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDZCxJQUFJLGNBQWMsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO1lBQzFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsRUFqSnFCLElBQUksR0FBSixtQkFBSSxLQUFKLG1CQUFJLFFBaUp6QjtBQUFELENBQUMsRUFqSk0sY0FBYyxLQUFkLGNBQWMsUUFpSnBCIiwiZmlsZSI6ImNvbnRyb2xsZXIvcGxheS1jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2NvcmUva2V5Y29kZXMudHNcIiAvPlxuXG5tb2R1bGUgTGFuZ3VhZ2VIZWxwZXIuUGxheSB7XG4gICAgaW1wb3J0IEtleUNvZGVzID0gTGFuZ3VhZ2VIZWxwZXIuQ29yZS5LZXlDb2RlcztcbiAgICBjb25zdCBRdWVzdGlvbkxpbWl0ID0gMTA7XG5cbiAgICBleHBvcnQgY2xhc3MgUGxheUNvbnRyb2xsZXIge1xuICAgICAgICBwcml2YXRlIHZpZXc6IFBsYXlWaWV3O1xuICAgICAgICBwcml2YXRlIHBsYXlEYXRhOiBQbGF5TW9kZWw7XG4gICAgICAgIHByaXZhdGUgY3VycmVudFF1ZXN0aW9uOiBzdHJpbmc7XG4gICAgICAgIHByaXZhdGUgY3VycmVudEFuc3dlcjogc3RyaW5nO1xuICAgICAgICBwcml2YXRlIGN1cnJlbnRXb3JkSWQ6IG51bWJlcjtcbiAgICAgICAgcHJpdmF0ZSBxdWVzdGlvbnNBbnN3ZXJlZCA9IDA7XG4gICAgICAgIHByaXZhdGUgY29ycmVjdEFuc3dlcnMgPSAwO1xuICAgICAgICBwcml2YXRlIGNvcnJlY3Rpb25BbnN3ZXJzOiBQbGF5Q29ycmVjdGlvbkFuc3dlcnM7XG5cbiAgICAgICAgcHVibGljIGluaXRpYWxpc2UoKSB7XG4gICAgICAgICAgICB0aGlzLnZpZXcgPSBuZXcgUGxheVZpZXcoKTtcbiAgICAgICAgICAgIHRoaXMucGxheURhdGEgPSBuZXcgUGxheU1vZGVsKCk7XG4gICAgICAgICAgICB0aGlzLmNvcnJlY3Rpb25BbnN3ZXJzID0gbmV3IFBsYXlDb3JyZWN0aW9uQW5zd2VycygpO1xuXG4gICAgICAgICAgICB0aGlzLnBsYXlEYXRhLndvcmRzID0gbmV3IEFycmF5PFBsYXlXb3JkPigpO1xuICAgICAgICAgICAgdGhpcy5wbGF5RGF0YS53b3JkcyA9IHRoaXMuaW5pdGlhbHNlTW9kZWwoKTtcblxuICAgICAgICAgICAgdGhpcy5zZXRRdWVzdGlvbigpO1xuXG4gICAgICAgICAgICB0aGlzLnNldHVwRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzZXRRdWVzdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBxdWVzdGlvbldvcmQgPSB0aGlzLmdyYWJXb3JkKCk7XG4gICAgICAgICAgICBsZXQgcXVlc3Rpb25TZW50YW5jZSA9IHRoaXMuZ3JhYlNlbnRhbmNlKHF1ZXN0aW9uV29yZCk7XG4gICAgICAgICAgICBsZXQgc2hvd0VuZ2xpc2ggPSB0aGlzLnNob3dFbmdsaXNoKCk7XG5cbiAgICAgICAgICAgIHRoaXMudmlldy5wbGF5UXVlc3Rpb24gPSBzaG93RW5nbGlzaCA/IHF1ZXN0aW9uU2VudGFuY2UuZW5nbGlzaFNlbnRhbmNlIDogcXVlc3Rpb25TZW50YW5jZS50cmFuc2xhdGlvbjtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFF1ZXN0aW9uID0gc2hvd0VuZ2xpc2ggPyBxdWVzdGlvblNlbnRhbmNlLmVuZ2xpc2hTZW50YW5jZSA6IHF1ZXN0aW9uU2VudGFuY2UudHJhbnNsYXRpb247XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRBbnN3ZXIgPSBzaG93RW5nbGlzaCA/IHF1ZXN0aW9uU2VudGFuY2UudHJhbnNsYXRpb24gOiBxdWVzdGlvblNlbnRhbmNlLmVuZ2xpc2hTZW50YW5jZTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFdvcmRJZCA9IHF1ZXN0aW9uU2VudGFuY2Uud29yZElkO1xuXG4gICAgICAgICAgICB0aGlzLnZpZXcuYW5zd2VyVGV4dGJveC52YWwoXCJcIik7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIGdyYWJXb3JkKCk6IFBsYXlXb3JkIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBsYXlEYXRhLndvcmRzW3RoaXMuZ2V0TmV4dCh0aGlzLnBsYXlEYXRhLndvcmRDb3VudCldO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBncmFiU2VudGFuY2Uod29yZDogUGxheVdvcmQpOiBQbGF5U2VudGFuY2Uge1xuICAgICAgICAgICAgcmV0dXJuIHdvcmQuc2VudGFuY2VzW3RoaXMuZ2V0TmV4dCh3b3JkLnNlbnRhbmNlQ291bnQpXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgaW5pdGlhbHNlTW9kZWwoKTogQXJyYXk8UGxheVdvcmQ+IHtcbiAgICAgICAgICAgIGxldCBmb3VuZFdvcmRzOiBBcnJheTxQbGF5V29yZD4gPSBuZXcgQXJyYXk8UGxheVdvcmQ+KCk7XG4gICAgICAgICAgICBsZXQgd29yZHMgPSB0aGlzLnZpZXcud29yZHM7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd29yZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgZm91bmRXb3JkOiBQbGF5V29yZCA9IG5ldyBQbGF5V29yZCgpO1xuICAgICAgICAgICAgICAgIGZvdW5kV29yZC53b3JkID0gdGhpcy52aWV3LnRyYW5zbGF0aW9uV29yZCh3b3Jkc1tpXSk7XG4gICAgICAgICAgICAgICAgZm91bmRXb3JkLmVuZ2xpc2hXb3JkID0gdGhpcy52aWV3LmVuZ2xpc2hXb3JkKHdvcmRzW2ldKTtcblxuICAgICAgICAgICAgICAgIGZvdW5kV29yZC5zZW50YW5jZXMgPSBuZXcgQXJyYXk8UGxheVNlbnRhbmNlPigpO1xuICAgICAgICAgICAgICAgIGxldCBmb3VuZFNlbnRhbmNlcyA9IHRoaXMudmlldy5sb2FkU2VudGFuY2VzKHRoaXMudmlldy53b3JkSWQod29yZHNbaV0pKTtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZm91bmRTZW50YW5jZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZvdW5kU2VudGFuY2U6IFBsYXlTZW50YW5jZSA9IG5ldyBQbGF5U2VudGFuY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgZm91bmRTZW50YW5jZS50cmFuc2xhdGlvbiA9IHRoaXMudmlldy50cmFuc2xhdGlvblNlbnRhbmNlKGZvdW5kU2VudGFuY2VzW2pdKTtcbiAgICAgICAgICAgICAgICAgICAgZm91bmRTZW50YW5jZS5lbmdsaXNoU2VudGFuY2UgPSB0aGlzLnZpZXcuZW5nbGlzaFNlbnRhbmNlKGZvdW5kU2VudGFuY2VzW2pdKTtcbiAgICAgICAgICAgICAgICAgICAgZm91bmRTZW50YW5jZS53b3JkSWQgPSB0aGlzLnZpZXcud29yZElkKGZvdW5kU2VudGFuY2VzW2pdKTtcblxuICAgICAgICAgICAgICAgICAgICBmb3VuZFdvcmQuc2VudGFuY2VzLnB1c2goZm91bmRTZW50YW5jZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZm91bmRXb3Jkcy5wdXNoKGZvdW5kV29yZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmb3VuZFdvcmRzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBzZXR1cEV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICAgICAgdGhpcy52aWV3LmFuc3dlclRleHRib3gub24oXCJrZXlkb3duXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gSWYgZW50ZXIvcmV0dXJuIHdhcyBoaXRcbiAgICAgICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSBLZXlDb2Rlcy5SZXR1cm4pIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQW5zd2VyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy52aWV3LmNoZWNrQnV0dG9uLm9uKFwiY2xpY2tcIiwgKCkgPT4geyB0aGlzLmNoZWNrQW5zd2VyKCk7IH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBjaGVja0Fuc3dlcigpIHtcbiAgICAgICAgICAgIGxldCB1c2Vyc0Fuc3dlcjogc3RyaW5nID0gdGhpcy52aWV3LnBsYXlBbnN3ZXI7XG5cbiAgICAgICAgICAgIGlmICh1c2Vyc0Fuc3dlci50b0xvd2VyQ2FzZSgpID09PSB0aGlzLmN1cnJlbnRBbnN3ZXIudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwiVGhhdCB3YXMgcmlnaHQhXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29ycmVjdEFuc3dlcnMrKztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb3JyZWN0aW9uQW5zd2Vycy5hbnN3ZXJzLnB1c2gobmV3IFBsYXlDb3JyZWN0aW9uQW5zd2VyKHRoaXMuY3VycmVudFdvcmRJZCwgdXNlcnNBbnN3ZXIsIHRoaXMuY3VycmVudEFuc3dlcikpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwiVGhhdCB3YXMgd3JvbmchXFxuVGhlIGNvcnJlY3QgYW5zd2VyIHdhcyBcIiArIHRoaXMuY3VycmVudEFuc3dlcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucXVlc3Rpb25zQW5zd2VyZWQrKztcblxuICAgICAgICAgICAgaWYgKHRoaXMucXVlc3Rpb25zQW5zd2VyZWQgPCBRdWVzdGlvbkxpbWl0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRRdWVzdGlvbigpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbGVydChcIlRpbWVzIHVwISBZb3UgZ290IFwiICsgdGhpcy5jb3JyZWN0QW5zd2VycyArIFwiIHF1ZXN0aW9ucyBjb3JyZWN0LlwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBvc3RBbnN3ZXJzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIGdldE5leHQoc2l6ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzaXplKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgc2hvd0VuZ2xpc2goKTogYm9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMikgPT09IDE7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIHBvc3RBbnN3ZXJzKCkge1xuICAgICAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICAgICAgdGhpcy52aWV3LmZvcm0uc3VibWl0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvcnJlY3Rpb25BbnN3ZXJzLmFuc3dlcnMuZm9yRWFjaCgoY29ycmVjdGlvbkFuc3dlcjogUGxheUNvcnJlY3Rpb25BbnN3ZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICQoXCI8aW5wdXQgLz5cIikuYXR0cihcInR5cGVcIiwgXCJoaWRkZW5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKFwibmFtZVwiLCBcImZpbmlzaFBsYXlNb2RlbC5Db3JyZWN0aW9uQW5zd2Vyc1tcIiArIGkgKyBcIl0uV29yZElkXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cihcInZhbHVlXCIsIGNvcnJlY3Rpb25BbnN3ZXIud29yZElkKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMudmlldy5mb3JtKTtcblxuICAgICAgICAgICAgICAgICAgICAgJChcIjxpbnB1dCAvPlwiKS5hdHRyKFwidHlwZVwiLCBcImhpZGRlblwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoXCJuYW1lXCIsIFwiZmluaXNoUGxheU1vZGVsLkNvcnJlY3Rpb25BbnN3ZXJzW1wiICsgaSArIFwiXS5HaXZlbkFuc3dlclwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoXCJ2YWx1ZVwiLCBjb3JyZWN0aW9uQW5zd2VyLmdpdmVuQW5zd2VyKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMudmlldy5mb3JtKTtcblxuICAgICAgICAgICAgICAgICAgICAgJChcIjxpbnB1dCAvPlwiKS5hdHRyKFwidHlwZVwiLCBcImhpZGRlblwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoXCJuYW1lXCIsIFwiZmluaXNoUGxheU1vZGVsLkNvcnJlY3Rpb25BbnN3ZXJzW1wiICsgaSArIFwiXS5Db3JyZWN0QW5zd2VyXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cihcInZhbHVlXCIsIGNvcnJlY3Rpb25BbnN3ZXIuY29ycmVjdEFuc3dlcilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLnZpZXcuZm9ybSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy52aWV3LmZvcm0uc3VibWl0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IHBsYXljb250cm9sbGVyID0gbmV3IFBsYXlDb250cm9sbGVyKCk7XG4gICAgICAgIHBsYXljb250cm9sbGVyLmluaXRpYWxpc2UoKTtcbiAgICB9KTtcbn1cbiJdfQ==
