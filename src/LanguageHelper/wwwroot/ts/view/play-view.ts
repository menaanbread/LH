/// <reference path="../../typings/jquery.d.ts" />

module LanguageHelper.Play {
    export class PlayView {

        public checkButton: JQuery;
        public answerTextbox: JQuery;

        constructor() {
            this.checkButton = $("#play-check");
            this.answerTextbox = $("#play-answer");
        }

        public get words() {
            return $(".play-word");
        }

        public get playQuestion(): string {
            return $("#play-question").html();
        }
        public set playQuestion(question: string) {
            $("#play-question").html(question);
        }

        public get playAnswer(): string {
            return this.answerTextbox.val();
        }

        public loadSentances(wordId: number): JQuery {
            let words: JQuery;

            words = $(".play-sentance[data-id='" + wordId + "']");

            return words;
        }

        public englishSentance(sentace: HTMLElement): string {
            let english = "";

            english = $(sentace).data("sentance-english");

            return english;
        }

        public translationSentance(sentace: HTMLElement): string {
            let translation = "";

            translation = $(sentace).data("sentance-translation");

            return translation;
        }

        public englishWord(word: HTMLElement): string {
            let english = "";

            english = $(word).data("english");

            return english;
        }

        public translationWord(word: HTMLElement): string {
            let translation = "";

            translation = $(word).data("translation");

            return translation;
        }

        public wordId(word: HTMLElement): number {
            return +$(word).data("id");
        }
    }
}
