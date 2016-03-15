/// <reference path="jquery/jquery.d.ts" />

class Home {
    
    SHOW_WORDS_URL: string = "Home/LanguageSet";
    
    showLanguageButton: ShowHideButton;
    wordsArea: JQuery;
    
    constructor() {
        
        this.showLanguageButton = new ShowHideButton();
        this.showLanguageButton.shouldShowWords = true;
        this.wordsArea = $("#wordsArea");
        
        if (this.showLanguageButton.isDefined() && this.wordsArea) {
            $(this.showLanguageButton.reference).click((e) => { this.onShowWordsClick(e); });
        }
    }
    
    private onShowWordsClick(e: JQueryEventObject) {
        
        if (this.showLanguageButton.shouldShowWords) {
            $.ajax({
                type: "POST",
                url: this.SHOW_WORDS_URL,
                data: { languageId : this.showLanguageButton.languageId }
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
        context.wordsArea.html(html)
        context.showLanguageButton.shouldShowWords = false;
        context.showLanguageButton.buttonText = "Hide Words";
        new ShowSentances();
    }
    
    private handleAjaxError(jqXHR, textStatus, errorThrown: SyntaxError) {
        alert(errorThrown.message);
    }
}

class ShowHideButton {
    
    reference: JQuery;
    
    constructor() {
        
        this.reference = $("#showHideWords");
    }
    
    isDefined() {
        
        return this.reference && this.reference !== undefined;
    }
    
    get languageId(): number {
        
        var languageid: number = 0;
        if (this.isDefined()) {
            languageid = $('.select-language:checked').data('languageid');
        }
        return languageid;
    }
    
    get shouldShowWords(): boolean {
        
        var showOption: boolean = true;
        
        if (this.isDefined()) {
            showOption = $(this.reference).data("show");
        }
        
        return showOption;
    }
    
    set shouldShowWords(show: boolean) {
        
        if (this.isDefined()) {
            $(this.reference).data("show", show);
        }
    }
    
    set buttonText(buttonText: string) {
        
        if (this.isDefined) {
            $(this.reference).text(buttonText);
        }
    }
}

class ShowSentances {
    
    LIST_SENTANCES_URL: string = "Home/ListSentances";
    reference: JQuery;
    
    constructor() {

        this.reference = $("#sentances-modal");
        
        if (this.reference) {
            this.reference.on("show.bs.modal", (e) => this.populateAndShow(e, this));            
        }
    }
    
    private populateAndShow(e: JQueryEventObject, context: ShowSentances) {
        
        $.ajax({
                type: "POST",
                url: context.LIST_SENTANCES_URL,
                data: { wordId : $(e.relatedTarget).data("wordid") }
            })
            .done(context.populatePopup)
            .fail(context.handleAjaxError);
    }
    
    private populatePopup(html: string) {
        
        $(".modal-body").html(html);
    }
    
    private handleAjaxError(jqXHR, textStatus, errorThrown: SyntaxError) {
    
        alert(errorThrown.message);
    }
}

$(document).ready(function() {
    var home = new Home();    
});