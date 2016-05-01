/// <reference path="../typings/jquery.d.ts" />
/// <reference path="./ioc/container.ts" />
/// <reference path="./services/http-service/ihttpservice.ts" />
/// <reference path="./services/http-service/jquery-httpservice.ts" />

class Home {

    public SHOW_WORDS_URL: string = "Home/LanguageSet";

    public showLanguageButton: ShowHideButton;
    public wordsArea: JQuery;

    public constructor(private httpService: HttpService.IHttpService) {
        this.showLanguageButton = new ShowHideButton();
        this.showLanguageButton.shouldShowWords = true;
        this.wordsArea = $("#wordsArea");
    }

    public initialse() {
        if (this.showLanguageButton.isDefined() && this.wordsArea) {
            $(this.showLanguageButton.reference).click((e) => { this.onShowWordsClick(e); });
        }
    }

    private onShowWordsClick(e: JQueryEventObject) {
        if (this.showLanguageButton.shouldShowWords) {
            this.httpService.post(
                this.SHOW_WORDS_URL,
                { languageId : this.showLanguageButton.languageId },
                (html) => this.populateWordsArea(html, this),
                this.handleAjaxError);
        } else {
            this.wordsArea.hide();
            this.showLanguageButton.shouldShowWords = true;
            this.showLanguageButton.buttonText = "Show Words";
        }
    }

    private populateWordsArea(html: string, context: Home) {
        context.wordsArea.show();
        context.wordsArea.html(html);
        context.showLanguageButton.shouldShowWords = false;
        context.showLanguageButton.buttonText = "Hide Words";
        let sentances = new ShowSentances(this.httpService);
        sentances.intialise();
    }

    private handleAjaxError(errorMessage: string) {
        alert(errorMessage);
    }
}

class ShowHideButton {

    public reference: JQuery;

    public constructor() {
        this.reference = $("#showHideWords");
    }

    public isDefined() {
        return this.reference && this.reference !== undefined;
    }

    public get languageId(): number {
        let languageid = 0;
        if (this.isDefined()) {
            languageid = $(".select-language:checked").data("languageid");
        }
        return languageid;
    }

    public get shouldShowWords(): boolean {
        let showOption = true;

        if (this.isDefined()) {
            showOption = $(this.reference).data("show");
        }

        return showOption;
    }
    public set shouldShowWords(show: boolean) {
        if (this.isDefined()) {
            $(this.reference).data("show", show);
        }
    }

    public set buttonText(buttonText: string) {
        if (this.isDefined) {
            $(this.reference).text(buttonText);
        }
    }
}

class ShowSentances {

    public LIST_SENTANCES_URL: string = "Home/ListSentances";
    public reference: JQuery;

    public constructor(private httpService: HttpService.IHttpService) {
        this.reference = $("#sentances-modal");
    }

    public intialise() {
        if (this.reference) {
            this.reference.on("show.bs.modal", (e) => this.populateAndShow(e, this));
        }
    }

    private populateAndShow(e: JQueryEventObject, context: ShowSentances) {
        this.httpService.post(
            context.LIST_SENTANCES_URL,
            { wordId : $(e.relatedTarget).data("wordid") },
            context.populatePopup,
            context.handleAjaxError);
    }

    private populatePopup(html: string) {
        $(".modal-body").html(html);
    }

    private handleAjaxError(errorMessage: string) {
        alert(errorMessage);
    }
}

$(document).ready(function() {
    let container = new IoC.IocContainer();
    container.install("IHttpService", HttpService.JQueryHttpService);

    let httpService = container.resolve<HttpService.IHttpService>("IHttpService");

    let home = new Home(httpService);
    home.initialse();
});
