Screw.Unit(function() {
  describe("mock jQuery Ajax GET calls", function() {
    it("should mock Ajax GET call and return mocked result", function() {
      mockAjaxGet("/url").exactly("once").and_return("result");
      var result;
      $.get("/url", function(data) {
        result = data;
      });
      expect(result).to(equal, "result");
    });

    it("should mock Ajax GET call with hash parameters and return mocked result", function() {
      mockAjaxGet("/url").with_arguments({a: 1, b: 2}).and_return("result");
      var result;
      $.get("/url", {a: 1, b: 2}, function(data) {
        result = data;
      });
      expect(result).to(equal, "result");
    });

    it("should mock two different Ajax GET calls with same URL but different parameters", function() {
      mockAjaxGet("/url").with_arguments({a: 1}).and_return("result1");
      mockAjaxGet("/url").with_arguments({a: 2}).and_return("result2");
      var result1, result2;
      $.get("/url", {a: 1}, function(data) {
        result1 = data;
      });
      $.get("/url", {a: 2}, function(data) {
        result2 = data;
      });
      expect(result1).to(equal, "result1");
      expect(result2).to(equal, "result2");
    });

    it("should mock call with file://localhost prefix", function() {
      mockAjaxGet("/url").and_return("result");
      var result;
      $.get("file://localhost/url", function(data) {
        result = data;
      });
      expect(result).to(equal, "result");
    });

    it("should mock call with file:// prefix", function() {
      mockAjaxGet("/url").and_return("result");
      var result;
      $.get("file:///url", function(data) {
        result = data;
      });
      expect(result).to(equal, "result");
    });

  });

  describe("mock jQuery Ajax POST calls", function() {
    it("should mock Ajax POST call with parameters and return mocked result", function() {
      mockAjaxPost("/url").with_arguments({a: 1, b: 2}).exactly("once").and_return("result");
      var result;
      $.post("/url", {a: 1, b: 2}, function(data) {
        result = data;
      });
      expect(result).to(equal, "result");
    });

    it("should mock two different Ajax POST calls with same URL but different parameters", function() {
      mockAjaxPost("/url").with_arguments({a: 1}).and_return("result1");
      mockAjaxPost("/url").with_arguments({a: 2}).and_return("result2");
      var result1, result2;
      $.post("/url", {a: 1}, function(data) {
        result1 = data;
      });
      $.post("/url", {a: 2}, function(data) {
        result2 = data;
      });
      expect(result1).to(equal, "result1");
      expect(result2).to(equal, "result2");
    });

    it("should mock Ajax POST call with with file://localhost prefix", function() {
      mockAjaxPost("/url").with_arguments({a: 1, b: 2}).and_return("result");
      var result;
      $.post("file://localhost/url", {a: 1, b: 2}, function(data) {
        result = data;
      });
      expect(result).to(equal, "result");
    });

    it("should mock Ajax POST call with with file:// prefix", function() {
      mockAjaxPost("/url").with_arguments({a: 1, b: 2}).and_return("result");
      var result;
      $.post("file:///url", {a: 1, b: 2}, function(data) {
        result = data;
      });
      expect(result).to(equal, "result");
    });

  });

});
