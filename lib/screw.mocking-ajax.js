Smoke.MockAjax = {
  localPath: function(url) {
    // remove file://localhost or file://
    var match_result = url.match(/^file:\/\/(localhost)?(.*)$/);
    if (match_result) {
      return match_result[2];
    } else {
      return url;
    }
  },
  
  initMocks: function() {
    // if mocks has been reset then initialize Ajax mocks
    if (Smoke.mocks.length == 0) {
      this.jQueryMock = Smoke.Mock(jQuery);
      this.ajaxGetMock = Smoke.Mock();
      this.ajaxPostMock = Smoke.Mock();
    }
  },

  get: function(url) {
    this.initMocks();
    var expectation = this.ajaxGetMock.should_receive(url);
    this.jQueryMock.should_receive("ajax").and_return(function(options) {
      var ajax_url = Smoke.MockAjax.localPath(options.url);
      if (options.type === "GET" && ajax_url === url) {
        if (typeof options.success === "function") {
          options.success(Smoke.MockAjax.ajaxGetMock[url](options.data), "200 OK");
        }
        return new Object(); // return dummy new object
      } else {
        return undefined; // if ajax call did not match specified GET request
      }
    });
    return expectation;
  },

  post: function(url) {
    this.initMocks();
    var expectation = this.ajaxPostMock.should_receive(url);
    this.jQueryMock.should_receive("ajax").and_return(function(options) {
      var ajax_url = Smoke.MockAjax.localPath(options.url);
      if (options.type === "POST" && ajax_url === url) {
        if (typeof options.success === "function") {
          options.success(Smoke.MockAjax.ajaxPostMock[url](options.data), "200 OK");
        }
        return new Object(); // return dummy new object
      } else {
        return undefined; // if ajax call did not match specified GET request
      }
    });
    return expectation;
  }

};

Screw.Matchers.mockAjaxGet = function(url) {
  return Smoke.MockAjax.get(url);
};
Screw.Matchers.mockAjaxPost = function(url) {
  return Smoke.MockAjax.post(url);
};
