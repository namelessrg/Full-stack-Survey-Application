$(document).ready(function () {
  $("#survey-form").on("submit", function (e) {
    e.preventDefault();

    // Get form data
    var formData = $(this).serializeArray();
    var age = formData.find(field => field.name === 'age').value;

    // Age validation
    if (parseInt(age) < 18) {
      $("#result").html(
        '<p style="color:red;">You must be at least 18 years old to submit the survey.</p>'
      );
      return;
    }

    // Send data to backend
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/submit-survey",
      data: $(this).serialize(),
      success: function (response) {
        var resultHtml = "<h2>Survey Results</h2><ul>";
        $.each(response.data, function (key, value) {
          resultHtml +=
            "<li><strong>" +
            key.charAt(0).toUpperCase() +
            key.slice(1) +
            ":</strong> " +
            value +
            "</li>";
        });
        resultHtml += "</ul>";
        $("#result").html(resultHtml);
      },
      error: function (xhr) {
        var errorMsg = "There was an error submitting the survey. Please try again.";
        if (xhr.status === 400 && xhr.responseJSON.message) {
          errorMsg = xhr.responseJSON.message;
        }
        $("#result").html(
          `<p style="color:red;">${errorMsg}</p>`
        );
      },
    });

    this.reset();
  });
});
