/// <reference path="../typings/jquery.d.ts" />
/// <reference path="./ioc/container.ts" />
/// <reference path="./services/http-service/ihttpservice.ts" />
/// <reference path="./services/http-service/jquery-httpservice.ts" />

class Home {

    public SHOW_WORDS_URL: string = "Home/LanguageSet";

    public showLanguageButton: ShowHideButton;
    public wordsArea: JQuery;

    public constructor() {
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
            $.ajax({
                data: { languageId : this.showLanguageButton.languageId },
                type: "POST",
                url: this.SHOW_WORDS_URL
            })
            .done((html) => this.populateWordsArea(html, this))
            .fail(this.handleAjaxError);
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
        let sentances = new ShowSentances();
        sentances.intialise();
    }

    private handleAjaxError(jqXHR: any, textStatus: any, errorThrown: SyntaxError) {
        alert(errorThrown.message);
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

    public constructor() {
        this.reference = $("#sentances-modal");
    }

    public intialise() {
        if (this.reference) {
            this.reference.on("show.bs.modal", (e) => this.populateAndShow(e, this));
        }
    }

    private populateAndShow(e: JQueryEventObject, context: ShowSentances) {
        $.ajax({
                data: { wordId : $(e.relatedTarget).data("wordid") },
                type: "POST",
                url: context.LIST_SENTANCES_URL
            })
            .done(context.populatePopup)
            .fail(context.handleAjaxError);
    }

    private populatePopup(html: string) {
        $(".modal-body").html(html);
    }

    private handleAjaxError(jqXHR: any, textStatus: any, errorThrown: SyntaxError) {
        alert(errorThrown.message);
    }
}

$(document).ready(function() {
    let home = new Home();
    home.initialse();
    
    let container = new IoC.IocContainer();
    container.install(HttpService.IHttpService, HttpService.JQueryHttpService);
});
