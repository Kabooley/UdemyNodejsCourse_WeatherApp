// client side JavaScript

console.log("Client side javascript file is loaded!");
const url = "/weather?address=";
const weatherForm = document.querySelector("form");
const input = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

const fetchLocation = (location) => {
  fetch(url + location)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response is not OK");
      }
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        console.log(data);
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
};

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  fetchLocation(input.value);
});

// ----- debug用確認 -------------------------------------------------------
// ：response.text()をみたらforecast.jsのhtmlファイルが返されていた...
// そういえばJSONを返さないでhtmlファイルを返すように自分が作っていたんだった...
// つまり
// htmlファイルを返されたからこれを表示できるようにすればいいわけだ...
// fetch(request).then((response) => {
//   if (!response.ok) {
//     throw new Error("Network response is not OK");
//   }
//   return response.text().then((text) => {
//     console.log(text);
//   });
// });
// ------------------------------------------------------------------------

// 42.3605
// -71.0596
// "http://api.weatherstack.com/current?access_key=57163040d5b1955c5c7b05a3176cb6f8&query=42.3605,-71.0596"

/************************************************************
 * ちょっとばかしfetch()のお勉強
 *
 * Fetch API
 *
 * fetch()は戻り値としてFetch APIのResponseオブジェクトを返す
 *
 *
 * https://developers.suitecommerce.com/troubleshooting-uncaught-syntaxerror-unexpected-token-u-in-json-at-position-0.html#:~:text=The%20'Uncaught%20SyntaxError%3A%20Unexpected%20token,the%20JSON%20it%20was%20expecting.&text=This%20is%20a%20generic%20JavaScript,the%20specific%20client%2Dside%20application.
 *
 */
