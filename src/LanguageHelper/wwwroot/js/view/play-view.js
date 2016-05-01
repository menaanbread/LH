/// <reference path="../../typings/jquery.d.ts" />
var LanguageHelper;
(function (LanguageHelper) {
    var Play;
    (function (Play) {
        class PlayView {
            constructor() {
                this.checkButton = $("#play-check");
                this.answerTextbox = $("#play-answer");
                this.form = $("#play-form");
            }
            get words() {
                return $(".play-word");
            }
            get playQuestion() {
                return $("#play-question").html();
            }
            set playQuestion(question) {
                $("#play-question").html(question);
            }
            get playAnswer() {
                return this.answerTextbox.val();
            }
            loadSentances(wordId) {
                let words;
                words = $(".play-sentance[data-id='" + wordId + "']");
                return words;
            }
            englishSentance(sentace) {
                let english = "";
                english = $(sentace).data("sentance-english");
                return english;
            }
            translationSentance(sentace) {
                let translation = "";
                translation = $(sentace).data("sentance-translation");
                return translation;
            }
            englishWord(word) {
                let english = "";
                english = $(word).data("english");
                return english;
            }
            translationWord(word) {
                let translation = "";
                translation = $(word).data("translation");
                return translation;
            }
            wordId(word) {
                return +$(word).data("id");
            }
        }
        Play.PlayView = PlayView;
    })(Play = LanguageHelper.Play || (LanguageHelper.Play = {}));
})(LanguageHelper || (LanguageHelper = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXcvcGxheS12aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGtEQUFrRDtBQUVsRCxJQUFPLGNBQWMsQ0F3RXBCO0FBeEVELFdBQU8sY0FBYztJQUFDLElBQUEsSUFBSSxDQXdFekI7SUF4RXFCLFdBQUEsSUFBSSxFQUFDLENBQUM7UUFDeEI7WUFNSTtnQkFDSSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDcEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ2hDLENBQUM7WUFFRCxJQUFXLEtBQUs7Z0JBQ1osTUFBTSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMzQixDQUFDO1lBRUQsSUFBVyxZQUFZO2dCQUNuQixNQUFNLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDdEMsQ0FBQztZQUNELElBQVcsWUFBWSxDQUFDLFFBQWdCO2dCQUNwQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdkMsQ0FBQztZQUVELElBQVcsVUFBVTtnQkFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDcEMsQ0FBQztZQUVNLGFBQWEsQ0FBQyxNQUFjO2dCQUMvQixJQUFJLEtBQWEsQ0FBQztnQkFFbEIsS0FBSyxHQUFHLENBQUMsQ0FBQywwQkFBMEIsR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUM7Z0JBRXRELE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDakIsQ0FBQztZQUVNLGVBQWUsQ0FBQyxPQUFvQjtnQkFDdkMsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO2dCQUVqQixPQUFPLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2dCQUU5QyxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQ25CLENBQUM7WUFFTSxtQkFBbUIsQ0FBQyxPQUFvQjtnQkFDM0MsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO2dCQUVyQixXQUFXLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO2dCQUV0RCxNQUFNLENBQUMsV0FBVyxDQUFDO1lBQ3ZCLENBQUM7WUFFTSxXQUFXLENBQUMsSUFBaUI7Z0JBQ2hDLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztnQkFFakIsT0FBTyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBRWxDLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDbkIsQ0FBQztZQUVNLGVBQWUsQ0FBQyxJQUFpQjtnQkFDcEMsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO2dCQUVyQixXQUFXLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFFMUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztZQUN2QixDQUFDO1lBRU0sTUFBTSxDQUFDLElBQWlCO2dCQUMzQixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9CLENBQUM7UUFDTCxDQUFDO1FBdEVZLGFBQVEsV0FzRXBCLENBQUE7SUFDTCxDQUFDLEVBeEVxQixJQUFJLEdBQUosbUJBQUksS0FBSixtQkFBSSxRQXdFekI7QUFBRCxDQUFDLEVBeEVNLGNBQWMsS0FBZCxjQUFjLFFBd0VwQiIsImZpbGUiOiJ2aWV3L3BsYXktdmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi90eXBpbmdzL2pxdWVyeS5kLnRzXCIgLz5cblxubW9kdWxlIExhbmd1YWdlSGVscGVyLlBsYXkge1xuICAgIGV4cG9ydCBjbGFzcyBQbGF5VmlldyB7XG5cbiAgICAgICAgcHVibGljIGNoZWNrQnV0dG9uOiBKUXVlcnk7XG4gICAgICAgIHB1YmxpYyBhbnN3ZXJUZXh0Ym94OiBKUXVlcnk7XG4gICAgICAgIHB1YmxpYyBmb3JtOiBKUXVlcnk7XG5cbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrQnV0dG9uID0gJChcIiNwbGF5LWNoZWNrXCIpO1xuICAgICAgICAgICAgdGhpcy5hbnN3ZXJUZXh0Ym94ID0gJChcIiNwbGF5LWFuc3dlclwiKTtcbiAgICAgICAgICAgIHRoaXMuZm9ybSA9ICQoXCIjcGxheS1mb3JtXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGdldCB3b3JkcygpIHtcbiAgICAgICAgICAgIHJldHVybiAkKFwiLnBsYXktd29yZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBnZXQgcGxheVF1ZXN0aW9uKCk6IHN0cmluZyB7XG4gICAgICAgICAgICByZXR1cm4gJChcIiNwbGF5LXF1ZXN0aW9uXCIpLmh0bWwoKTtcbiAgICAgICAgfVxuICAgICAgICBwdWJsaWMgc2V0IHBsYXlRdWVzdGlvbihxdWVzdGlvbjogc3RyaW5nKSB7XG4gICAgICAgICAgICAkKFwiI3BsYXktcXVlc3Rpb25cIikuaHRtbChxdWVzdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgZ2V0IHBsYXlBbnN3ZXIoKTogc3RyaW5nIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFuc3dlclRleHRib3gudmFsKCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgbG9hZFNlbnRhbmNlcyh3b3JkSWQ6IG51bWJlcik6IEpRdWVyeSB7XG4gICAgICAgICAgICBsZXQgd29yZHM6IEpRdWVyeTtcblxuICAgICAgICAgICAgd29yZHMgPSAkKFwiLnBsYXktc2VudGFuY2VbZGF0YS1pZD0nXCIgKyB3b3JkSWQgKyBcIiddXCIpO1xuXG4gICAgICAgICAgICByZXR1cm4gd29yZHM7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgZW5nbGlzaFNlbnRhbmNlKHNlbnRhY2U6IEhUTUxFbGVtZW50KTogc3RyaW5nIHtcbiAgICAgICAgICAgIGxldCBlbmdsaXNoID0gXCJcIjtcblxuICAgICAgICAgICAgZW5nbGlzaCA9ICQoc2VudGFjZSkuZGF0YShcInNlbnRhbmNlLWVuZ2xpc2hcIik7XG5cbiAgICAgICAgICAgIHJldHVybiBlbmdsaXNoO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHRyYW5zbGF0aW9uU2VudGFuY2Uoc2VudGFjZTogSFRNTEVsZW1lbnQpOiBzdHJpbmcge1xuICAgICAgICAgICAgbGV0IHRyYW5zbGF0aW9uID0gXCJcIjtcblxuICAgICAgICAgICAgdHJhbnNsYXRpb24gPSAkKHNlbnRhY2UpLmRhdGEoXCJzZW50YW5jZS10cmFuc2xhdGlvblwiKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRyYW5zbGF0aW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGVuZ2xpc2hXb3JkKHdvcmQ6IEhUTUxFbGVtZW50KTogc3RyaW5nIHtcbiAgICAgICAgICAgIGxldCBlbmdsaXNoID0gXCJcIjtcblxuICAgICAgICAgICAgZW5nbGlzaCA9ICQod29yZCkuZGF0YShcImVuZ2xpc2hcIik7XG5cbiAgICAgICAgICAgIHJldHVybiBlbmdsaXNoO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHRyYW5zbGF0aW9uV29yZCh3b3JkOiBIVE1MRWxlbWVudCk6IHN0cmluZyB7XG4gICAgICAgICAgICBsZXQgdHJhbnNsYXRpb24gPSBcIlwiO1xuXG4gICAgICAgICAgICB0cmFuc2xhdGlvbiA9ICQod29yZCkuZGF0YShcInRyYW5zbGF0aW9uXCIpO1xuXG4gICAgICAgICAgICByZXR1cm4gdHJhbnNsYXRpb247XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgd29yZElkKHdvcmQ6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcbiAgICAgICAgICAgIHJldHVybiArJCh3b3JkKS5kYXRhKFwiaWRcIik7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=
