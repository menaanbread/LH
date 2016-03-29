/// <reference path="../core/keycodes.ts" />

module LanguageHelper.Play {
    import KeyCodes = LanguageHelper.Core.KeyCodes;
    const QuestionLimit = 10;

    export class PlayController {
        private view: PlayView;
        private playData: PlayModel;
        private currentQuestion: string;
        private currentAnswer: string;
        private currentWordId: number;
        private questionsAnswered = 0;
        private correctAnswers = 0;
        private correctionAnswers: PlayCorrectionAnswers;

        public initialise() {
            this.view = new PlayView();
            this.playData = new PlayModel();
            this.correctionAnswers = new PlayCorrectionAnswers();

            this.playData.words = new Array<PlayWord>();
            this.playData.words = this.initialseModel();

            this.setQuestion();

            this.setupEventListeners();
        }

        public setQuestion() {
            let questionWord = this.grabWord();
            let questionSentance = this.grabSentance(questionWord);
            let showEnglish = this.showEnglish();

            this.view.playQuestion = showEnglish ? questionSentance.englishSentance : questionSentance.translation;
            this.currentQuestion = showEnglish ? questionSentance.englishSentance : questionSentance.translation;
            this.currentAnswer = showEnglish ? questionSentance.translation : questionSentance.englishSentance;
            this.currentWordId = questionSentance.wordId;

            this.view.answerTextbox.val("");
        }

        private grabWord(): PlayWord {
            return this.playData.words[this.getNext(this.playData.wordCount)];
        }

        private grabSentance(word: PlayWord): PlaySentance {
            return word.sentances[this.getNext(word.sentanceCount)];
        }

        private initialseModel(): Array<PlayWord> {
            let foundWords: Array<PlayWord> = new Array<PlayWord>();
            let words = this.view.words;

            for (let i = 0; i < words.length; i++) {
                let foundWord: PlayWord = new PlayWord();
                foundWord.word = this.view.translationWord(words[i]);
                foundWord.englishWord = this.view.englishWord(words[i]);

                foundWord.sentances = new Array<PlaySentance>();
                let foundSentances = this.view.loadSentances(this.view.wordId(words[i]));

                for (let j = 0; j < foundSentances.length; j++) {
                    let foundSentance: PlaySentance = new PlaySentance();
                    foundSentance.translation = this.view.translationSentance(foundSentances[j]);
                    foundSentance.englishSentance = this.view.englishSentance(foundSentances[j]);
                    foundSentance.wordId = this.view.wordId(foundSentances[j]);

                    foundWord.sentances.push(foundSentance);
                }

                foundWords.push(foundWord);
            }

            return foundWords;
        }

        private setupEventListeners() {
            this.view.answerTextbox.on("keydown", (e) => {
                // If enter/return was hit
                if (e.keyCode === KeyCodes.Return) {
                    e.preventDefault();
                    this.checkAnswer();
                }
             });
            this.view.checkButton.on("click", () => { this.checkAnswer(); });
        }

        private checkAnswer() {
            let usersAnswer: string = this.view.playAnswer;

            if (usersAnswer.toLowerCase() === this.currentAnswer.toLowerCase()) {
                alert("That was right!");
                this.correctAnswers++;
            } else {
                this.correctionAnswers.answers.push(new PlayCorrectionAnswer(this.currentWordId, usersAnswer, this.currentAnswer));
                alert("That was wrong!\nThe correct answer was " + this.currentAnswer);
            }

            this.questionsAnswered++;

            if (this.questionsAnswered < QuestionLimit) {
                this.setQuestion();
            } else {
                alert("Times up! You got " + this.correctAnswers + " questions correct.");
                this.postAnswers();
            }
        }

        private getNext(size: number): number {
            return Math.floor(Math.random() * size);
        }

        private showEnglish(): boolean {
            return Math.floor(Math.random() * 2) === 1;
        }

        private postAnswers() {
            let i = 0;
            this.view.form.submit(() => {
                this.correctionAnswers.answers.forEach((correctionAnswer: PlayCorrectionAnswer) => {
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

    $(document).ready(function() {
        let playcontroller = new PlayController();
        playcontroller.initialise();
    });
}
