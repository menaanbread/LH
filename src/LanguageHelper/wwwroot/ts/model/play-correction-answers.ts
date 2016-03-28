module LanguageHelper.Play {
    export class PlayCorrectionAnswers {
        public answers: Array<PlayCorrectionAnswer>;

        constructor() {
            this.answers = new Array<PlayCorrectionAnswer>();
        }
    }

    export class PlayCorrectionAnswer {
        public wordId: number;
        public givenAnswer: string;
        public correctAnswer: string;

        constructor(wordId: number, givenAnswer: string, correctAnswer: string) {
            this.wordId = wordId;
            this.givenAnswer = givenAnswer;
            this.correctAnswer = correctAnswer;
        }
    }
}
