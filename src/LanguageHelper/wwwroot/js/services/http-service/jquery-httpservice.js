var HttpService;
(function (HttpService) {
    var JQueryHttpService = (function () {
        function JQueryHttpService() {
        }
        JQueryHttpService.prototype.Test = function () {
            return "test";
        };
        return JQueryHttpService;
    }());
    HttpService.JQueryHttpService = JQueryHttpService;
})(HttpService || (HttpService = {}));
