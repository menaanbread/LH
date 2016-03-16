/// <reference path="../typings/jquery.d.ts" />
var Home = (function () {
    function Home() {
        this.SHOW_WORDS_URL = "Home/LanguageSet";
        this.showLanguageButton = new ShowHideButton();
        this.showLanguageButton.shouldShowWords = true;
        this.wordsArea = $("#wordsArea");
    }
    Home.prototype.initialse = function () {
        var _this = this;
        if (this.showLanguageButton.isDefined() && this.wordsArea) {
            $(this.showLanguageButton.reference).click(function (e) { _this.onShowWordsClick(e); });
        }
    };
    Home.prototype.onShowWordsClick = function (e) {
        var _this = this;
        if (this.showLanguageButton.shouldShowWords) {
            $.ajax({
                data: { languageId: this.showLanguageButton.languageId },
                type: "POST",
                url: this.SHOW_WORDS_URL
            })
                .done(function (html) { return _this.populateWordsArea(html, _this); })
                .fail(this.handleAjaxError);
        }
        else {
            this.wordsArea.hide();
            this.showLanguageButton.shouldShowWords = true;
            this.showLanguageButton.buttonText = "Show Words";
        }
    };
    Home.prototype.populateWordsArea = function (html, context) {
        context.wordsArea.show();
        context.wordsArea.html(html);
        context.showLanguageButton.shouldShowWords = false;
        context.showLanguageButton.buttonText = "Hide Words";
        var sentances = new ShowSentances();
        sentances.intialise();
    };
    Home.prototype.handleAjaxError = function (jqXHR, textStatus, errorThrown) {
        alert(errorThrown.message);
    };
    return Home;
}());
var ShowHideButton = (function () {
    function ShowHideButton() {
        this.reference = $("#showHideWords");
    }
    ShowHideButton.prototype.isDefined = function () {
        return this.reference && this.reference !== undefined;
    };
    Object.defineProperty(ShowHideButton.prototype, "languageId", {
        get: function () {
            var languageid = 0;
            if (this.isDefined()) {
                languageid = $(".select-language:checked").data("languageid");
            }
            return languageid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShowHideButton.prototype, "shouldShowWords", {
        get: function () {
            var showOption = true;
            if (this.isDefined()) {
                showOption = $(this.reference).data("show");
            }
            return showOption;
        },
        set: function (show) {
            if (this.isDefined()) {
                $(this.reference).data("show", show);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShowHideButton.prototype, "buttonText", {
        set: function (buttonText) {
            if (this.isDefined) {
                $(this.reference).text(buttonText);
            }
        },
        enumerable: true,
        configurable: true
    });
    return ShowHideButton;
}());
var ShowSentances = (function () {
    function ShowSentances() {
        this.LIST_SENTANCES_URL = "Home/ListSentances";
        this.reference = $("#sentances-modal");
    }
    ShowSentances.prototype.intialise = function () {
        var _this = this;
        if (this.reference) {
            this.reference.on("show.bs.modal", function (e) { return _this.populateAndShow(e, _this); });
        }
    };
    ShowSentances.prototype.populateAndShow = function (e, context) {
        $.ajax({
            data: { wordId: $(e.relatedTarget).data("wordid") },
            type: "POST",
            url: context.LIST_SENTANCES_URL
        })
            .done(context.populatePopup)
            .fail(context.handleAjaxError);
    };
    ShowSentances.prototype.populatePopup = function (html) {
        $(".modal-body").html(html);
    };
    ShowSentances.prototype.handleAjaxError = function (jqXHR, textStatus, errorThrown) {
        alert(errorThrown.message);
    };
    return ShowSentances;
}());
$(document).ready(function () {
    var home = new Home();
    home.initialse();
});
