class Home {
    constructor() {
        this.SHOW_WORDS_URL = "Home/LanguageSet";
        this.showLanguageButton = new ShowHideButton();
        this.showLanguageButton.shouldShowWords = true;
        this.wordsArea = $("#wordsArea");
    }
    initialse() {
        if (this.showLanguageButton.isDefined() && this.wordsArea) {
            $(this.showLanguageButton.reference).click((e) => { this.onShowWordsClick(e); });
        }
    }
    onShowWordsClick(e) {
        if (this.showLanguageButton.shouldShowWords) {
            $.ajax({
                data: { languageId: this.showLanguageButton.languageId },
                type: "POST",
                url: this.SHOW_WORDS_URL
            })
                .done((html) => this.populateWordsArea(html, this))
                .fail(this.handleAjaxError);
        }
        else {
            this.wordsArea.hide();
            this.showLanguageButton.shouldShowWords = true;
            this.showLanguageButton.buttonText = "Show Words";
        }
    }
    populateWordsArea(html, context) {
        context.wordsArea.show();
        context.wordsArea.html(html);
        context.showLanguageButton.shouldShowWords = false;
        context.showLanguageButton.buttonText = "Hide Words";
        let sentances = new ShowSentances();
        sentances.intialise();
    }
    handleAjaxError(jqXHR, textStatus, errorThrown) {
        alert(errorThrown.message);
    }
}
class ShowHideButton {
    constructor() {
        this.reference = $("#showHideWords");
    }
    isDefined() {
        return this.reference && this.reference !== undefined;
    }
    get languageId() {
        let languageid = 0;
        if (this.isDefined()) {
            languageid = $(".select-language:checked").data("languageid");
        }
        return languageid;
    }
    get shouldShowWords() {
        let showOption = true;
        if (this.isDefined()) {
            showOption = $(this.reference).data("show");
        }
        return showOption;
    }
    set shouldShowWords(show) {
        if (this.isDefined()) {
            $(this.reference).data("show", show);
        }
    }
    set buttonText(buttonText) {
        if (this.isDefined) {
            $(this.reference).text(buttonText);
        }
    }
}
class ShowSentances {
    constructor() {
        this.LIST_SENTANCES_URL = "Home/ListSentances";
        this.reference = $("#sentances-modal");
    }
    intialise() {
        if (this.reference) {
            this.reference.on("show.bs.modal", (e) => this.populateAndShow(e, this));
        }
    }
    populateAndShow(e, context) {
        $.ajax({
            data: { wordId: $(e.relatedTarget).data("wordid") },
            type: "POST",
            url: context.LIST_SENTANCES_URL
        })
            .done(context.populatePopup)
            .fail(context.handleAjaxError);
    }
    populatePopup(html) {
        $(".modal-body").html(html);
    }
    handleAjaxError(jqXHR, textStatus, errorThrown) {
        alert(errorThrown.message);
    }
}
$(document).ready(function () {
    let home = new Home();
    home.initialse();
    let container = new IoC.IocContainer();
    container.install("IHttpService", HttpService.JQueryHttpService);
    let mything = container.resolve("IHttpService");
    alert(mything.Test());
});
//# sourceMappingURL=Home.js.map