/// <reference path="../typings/jquery.d.ts" />
/// <reference path="./ioc/container.ts" />
/// <reference path="./services/http-service/ihttpservice.ts" />
/// <reference path="./services/http-service/jquery-httpservice.ts" />
class Home {
    constructor(httpService) {
        this.httpService = httpService;
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
            this.httpService.post(this.SHOW_WORDS_URL, { languageId: this.showLanguageButton.languageId }, (html) => this.populateWordsArea(html, this), this.handleAjaxError);
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
        let sentances = new ShowSentances(this.httpService);
        sentances.intialise();
    }
    handleAjaxError(errorMessage) {
        alert(errorMessage);
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
    constructor(httpService) {
        this.httpService = httpService;
        this.LIST_SENTANCES_URL = "Home/ListSentances";
        this.reference = $("#sentances-modal");
    }
    intialise() {
        if (this.reference) {
            this.reference.on("show.bs.modal", (e) => this.populateAndShow(e, this));
        }
    }
    populateAndShow(e, context) {
        this.httpService.post(context.LIST_SENTANCES_URL, { wordId: $(e.relatedTarget).data("wordid") }, context.populatePopup, context.handleAjaxError);
    }
    populatePopup(html) {
        $(".modal-body").html(html);
    }
    handleAjaxError(errorMessage) {
        alert(errorMessage);
    }
}
$(document).ready(function () {
    let container = new IoC.IocContainer();
    container.register("IHttpService", HttpService.JQueryHttpService, IoC.LifeStyle.Singleton);
    let httpService = container.resolve("IHttpService");
    let home = new Home(httpService);
    home.initialse();
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkhvbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsK0NBQStDO0FBQy9DLDJDQUEyQztBQUMzQyxnRUFBZ0U7QUFDaEUsc0VBQXNFO0FBRXRFO0lBT0ksWUFBMkIsV0FBcUM7UUFBckMsZ0JBQVcsR0FBWCxXQUFXLENBQTBCO1FBTHpELG1CQUFjLEdBQVcsa0JBQWtCLENBQUM7UUFNL0MsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7UUFDL0MsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDL0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVNLFNBQVM7UUFDWixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxFQUFFLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDeEQsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckYsQ0FBQztJQUNMLENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxDQUFvQjtRQUN6QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FDakIsSUFBSSxDQUFDLGNBQWMsRUFDbkIsRUFBRSxVQUFVLEVBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxFQUNuRCxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUM1QyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDOUIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsa0JBQWtCLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztZQUMvQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxHQUFHLFlBQVksQ0FBQztRQUN0RCxDQUFDO0lBQ0wsQ0FBQztJQUVPLGlCQUFpQixDQUFDLElBQVksRUFBRSxPQUFhO1FBQ2pELE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0IsT0FBTyxDQUFDLGtCQUFrQixDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDbkQsT0FBTyxDQUFDLGtCQUFrQixDQUFDLFVBQVUsR0FBRyxZQUFZLENBQUM7UUFDckQsSUFBSSxTQUFTLEdBQUcsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BELFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRU8sZUFBZSxDQUFDLFlBQW9CO1FBQ3hDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN4QixDQUFDO0FBQ0wsQ0FBQztBQUVEO0lBSUk7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFTSxTQUFTO1FBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUM7SUFDMUQsQ0FBQztJQUVELElBQVcsVUFBVTtRQUNqQixJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDbkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNuQixVQUFVLEdBQUcsQ0FBQyxDQUFDLDBCQUEwQixDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2xFLENBQUM7UUFDRCxNQUFNLENBQUMsVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFXLGVBQWU7UUFDdEIsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBRXRCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbkIsVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hELENBQUM7UUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFDRCxJQUFXLGVBQWUsQ0FBQyxJQUFhO1FBQ3BDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pDLENBQUM7SUFDTCxDQUFDO0lBRUQsSUFBVyxVQUFVLENBQUMsVUFBa0I7UUFDcEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDakIsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkMsQ0FBQztJQUNMLENBQUM7QUFDTCxDQUFDO0FBRUQ7SUFLSSxZQUEyQixXQUFxQztRQUFyQyxnQkFBVyxHQUFYLFdBQVcsQ0FBMEI7UUFIekQsdUJBQWtCLEdBQVcsb0JBQW9CLENBQUM7UUFJckQsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRU0sU0FBUztRQUNaLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzdFLENBQUM7SUFDTCxDQUFDO0lBRU8sZUFBZSxDQUFDLENBQW9CLEVBQUUsT0FBc0I7UUFDaEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQ2pCLE9BQU8sQ0FBQyxrQkFBa0IsRUFDMUIsRUFBRSxNQUFNLEVBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFDOUMsT0FBTyxDQUFDLGFBQWEsRUFDckIsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFTyxhQUFhLENBQUMsSUFBWTtRQUM5QixDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFTyxlQUFlLENBQUMsWUFBb0I7UUFDeEMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3hCLENBQUM7QUFDTCxDQUFDO0FBRUQsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNkLElBQUksU0FBUyxHQUFHLElBQUksR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3ZDLFNBQVMsQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRTNGLElBQUksV0FBVyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQTJCLGNBQWMsQ0FBQyxDQUFDO0lBRTlFLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUNyQixDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJIb21lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvanF1ZXJ5LmQudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vaW9jL2NvbnRhaW5lci50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9zZXJ2aWNlcy9odHRwLXNlcnZpY2UvaWh0dHBzZXJ2aWNlLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL3NlcnZpY2VzL2h0dHAtc2VydmljZS9qcXVlcnktaHR0cHNlcnZpY2UudHNcIiAvPlxuXG5jbGFzcyBIb21lIHtcblxuICAgIHB1YmxpYyBTSE9XX1dPUkRTX1VSTDogc3RyaW5nID0gXCJIb21lL0xhbmd1YWdlU2V0XCI7XG5cbiAgICBwdWJsaWMgc2hvd0xhbmd1YWdlQnV0dG9uOiBTaG93SGlkZUJ1dHRvbjtcbiAgICBwdWJsaWMgd29yZHNBcmVhOiBKUXVlcnk7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwU2VydmljZTogSHR0cFNlcnZpY2UuSUh0dHBTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMuc2hvd0xhbmd1YWdlQnV0dG9uID0gbmV3IFNob3dIaWRlQnV0dG9uKCk7XG4gICAgICAgIHRoaXMuc2hvd0xhbmd1YWdlQnV0dG9uLnNob3VsZFNob3dXb3JkcyA9IHRydWU7XG4gICAgICAgIHRoaXMud29yZHNBcmVhID0gJChcIiN3b3Jkc0FyZWFcIik7XG4gICAgfVxuXG4gICAgcHVibGljIGluaXRpYWxzZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2hvd0xhbmd1YWdlQnV0dG9uLmlzRGVmaW5lZCgpICYmIHRoaXMud29yZHNBcmVhKSB7XG4gICAgICAgICAgICAkKHRoaXMuc2hvd0xhbmd1YWdlQnV0dG9uLnJlZmVyZW5jZSkuY2xpY2soKGUpID0+IHsgdGhpcy5vblNob3dXb3Jkc0NsaWNrKGUpOyB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25TaG93V29yZHNDbGljayhlOiBKUXVlcnlFdmVudE9iamVjdCkge1xuICAgICAgICBpZiAodGhpcy5zaG93TGFuZ3VhZ2VCdXR0b24uc2hvdWxkU2hvd1dvcmRzKSB7XG4gICAgICAgICAgICB0aGlzLmh0dHBTZXJ2aWNlLnBvc3QoXG4gICAgICAgICAgICAgICAgdGhpcy5TSE9XX1dPUkRTX1VSTCxcbiAgICAgICAgICAgICAgICB7IGxhbmd1YWdlSWQgOiB0aGlzLnNob3dMYW5ndWFnZUJ1dHRvbi5sYW5ndWFnZUlkIH0sXG4gICAgICAgICAgICAgICAgKGh0bWwpID0+IHRoaXMucG9wdWxhdGVXb3Jkc0FyZWEoaHRtbCwgdGhpcyksXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVBamF4RXJyb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy53b3Jkc0FyZWEuaGlkZSgpO1xuICAgICAgICAgICAgdGhpcy5zaG93TGFuZ3VhZ2VCdXR0b24uc2hvdWxkU2hvd1dvcmRzID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc2hvd0xhbmd1YWdlQnV0dG9uLmJ1dHRvblRleHQgPSBcIlNob3cgV29yZHNcIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcG9wdWxhdGVXb3Jkc0FyZWEoaHRtbDogc3RyaW5nLCBjb250ZXh0OiBIb21lKSB7XG4gICAgICAgIGNvbnRleHQud29yZHNBcmVhLnNob3coKTtcbiAgICAgICAgY29udGV4dC53b3Jkc0FyZWEuaHRtbChodG1sKTtcbiAgICAgICAgY29udGV4dC5zaG93TGFuZ3VhZ2VCdXR0b24uc2hvdWxkU2hvd1dvcmRzID0gZmFsc2U7XG4gICAgICAgIGNvbnRleHQuc2hvd0xhbmd1YWdlQnV0dG9uLmJ1dHRvblRleHQgPSBcIkhpZGUgV29yZHNcIjtcbiAgICAgICAgbGV0IHNlbnRhbmNlcyA9IG5ldyBTaG93U2VudGFuY2VzKHRoaXMuaHR0cFNlcnZpY2UpO1xuICAgICAgICBzZW50YW5jZXMuaW50aWFsaXNlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVBamF4RXJyb3IoZXJyb3JNZXNzYWdlOiBzdHJpbmcpIHtcbiAgICAgICAgYWxlcnQoZXJyb3JNZXNzYWdlKTtcbiAgICB9XG59XG5cbmNsYXNzIFNob3dIaWRlQnV0dG9uIHtcblxuICAgIHB1YmxpYyByZWZlcmVuY2U6IEpRdWVyeTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5yZWZlcmVuY2UgPSAkKFwiI3Nob3dIaWRlV29yZHNcIik7XG4gICAgfVxuXG4gICAgcHVibGljIGlzRGVmaW5lZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVmZXJlbmNlICYmIHRoaXMucmVmZXJlbmNlICE9PSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBsYW5ndWFnZUlkKCk6IG51bWJlciB7XG4gICAgICAgIGxldCBsYW5ndWFnZWlkID0gMDtcbiAgICAgICAgaWYgKHRoaXMuaXNEZWZpbmVkKCkpIHtcbiAgICAgICAgICAgIGxhbmd1YWdlaWQgPSAkKFwiLnNlbGVjdC1sYW5ndWFnZTpjaGVja2VkXCIpLmRhdGEoXCJsYW5ndWFnZWlkXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsYW5ndWFnZWlkO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgc2hvdWxkU2hvd1dvcmRzKCk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgc2hvd09wdGlvbiA9IHRydWU7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNEZWZpbmVkKCkpIHtcbiAgICAgICAgICAgIHNob3dPcHRpb24gPSAkKHRoaXMucmVmZXJlbmNlKS5kYXRhKFwic2hvd1wiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzaG93T3B0aW9uO1xuICAgIH1cbiAgICBwdWJsaWMgc2V0IHNob3VsZFNob3dXb3JkcyhzaG93OiBib29sZWFuKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRGVmaW5lZCgpKSB7XG4gICAgICAgICAgICAkKHRoaXMucmVmZXJlbmNlKS5kYXRhKFwic2hvd1wiLCBzaG93KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgYnV0dG9uVGV4dChidXR0b25UZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEZWZpbmVkKSB7XG4gICAgICAgICAgICAkKHRoaXMucmVmZXJlbmNlKS50ZXh0KGJ1dHRvblRleHQpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5jbGFzcyBTaG93U2VudGFuY2VzIHtcblxuICAgIHB1YmxpYyBMSVNUX1NFTlRBTkNFU19VUkw6IHN0cmluZyA9IFwiSG9tZS9MaXN0U2VudGFuY2VzXCI7XG4gICAgcHVibGljIHJlZmVyZW5jZTogSlF1ZXJ5O1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cFNlcnZpY2U6IEh0dHBTZXJ2aWNlLklIdHRwU2VydmljZSkge1xuICAgICAgICB0aGlzLnJlZmVyZW5jZSA9ICQoXCIjc2VudGFuY2VzLW1vZGFsXCIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbnRpYWxpc2UoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlZmVyZW5jZSkge1xuICAgICAgICAgICAgdGhpcy5yZWZlcmVuY2Uub24oXCJzaG93LmJzLm1vZGFsXCIsIChlKSA9PiB0aGlzLnBvcHVsYXRlQW5kU2hvdyhlLCB0aGlzKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHBvcHVsYXRlQW5kU2hvdyhlOiBKUXVlcnlFdmVudE9iamVjdCwgY29udGV4dDogU2hvd1NlbnRhbmNlcykge1xuICAgICAgICB0aGlzLmh0dHBTZXJ2aWNlLnBvc3QoXG4gICAgICAgICAgICBjb250ZXh0LkxJU1RfU0VOVEFOQ0VTX1VSTCxcbiAgICAgICAgICAgIHsgd29yZElkIDogJChlLnJlbGF0ZWRUYXJnZXQpLmRhdGEoXCJ3b3JkaWRcIikgfSxcbiAgICAgICAgICAgIGNvbnRleHQucG9wdWxhdGVQb3B1cCxcbiAgICAgICAgICAgIGNvbnRleHQuaGFuZGxlQWpheEVycm9yKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHBvcHVsYXRlUG9wdXAoaHRtbDogc3RyaW5nKSB7XG4gICAgICAgICQoXCIubW9kYWwtYm9keVwiKS5odG1sKGh0bWwpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlQWpheEVycm9yKGVycm9yTWVzc2FnZTogc3RyaW5nKSB7XG4gICAgICAgIGFsZXJ0KGVycm9yTWVzc2FnZSk7XG4gICAgfVxufVxuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICBsZXQgY29udGFpbmVyID0gbmV3IElvQy5Jb2NDb250YWluZXIoKTtcbiAgICBjb250YWluZXIucmVnaXN0ZXIoXCJJSHR0cFNlcnZpY2VcIiwgSHR0cFNlcnZpY2UuSlF1ZXJ5SHR0cFNlcnZpY2UsIElvQy5MaWZlU3R5bGUuU2luZ2xldG9uKTtcblxuICAgIGxldCBodHRwU2VydmljZSA9IGNvbnRhaW5lci5yZXNvbHZlPEh0dHBTZXJ2aWNlLklIdHRwU2VydmljZT4oXCJJSHR0cFNlcnZpY2VcIik7XG5cbiAgICBsZXQgaG9tZSA9IG5ldyBIb21lKGh0dHBTZXJ2aWNlKTtcbiAgICBob21lLmluaXRpYWxzZSgpO1xufSk7XG4iXX0=
