module LanguageHelper.Play {
    export class PlayModel {
        public words: Array<PlayWord>;

        public get wordCount(): number {
            return this.words.length;
        }
    }

    export class PlayWord {
        public word: string;
        public englishWord: string;
        public sentances: Array<PlaySentance>;

        public get sentanceCount(): number {
            return this.sentances.length;
        }
    }

    export class PlaySentance {
        public wordId: number;
        public translation: string;
        public englishSentance: string;
    }
}
