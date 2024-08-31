const btn = document.querySelector(".input");
const content = document.querySelector(".content");

function speak(text) {
  const text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1;
  text_speak.pitch = 1;
  text_speak.volume = 1;

  window.speechSynthesis.speak(text_speak);
}

function wishMe() {
  var day = new Date();
  var hour = day.getHours();

  if (hour >= 5 && hour < 12) {
    speak("Good Morning");
  } else if (hour >= 12 && hour < 16) {
    speak("Good Afternoon");
  } else if (hour >= 16 && hour < 21) {
    speak("Good Evening");
  } else {
    speak("Good Night");
  }
}

window.addEventListener("load", () => {
  speak("hello...I,m Jarvis. ");
  wishMe();
});

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
  const currentIndex = event.resultIndex;
  const transcript = event.results[currentIndex][0].transcript;
  content.textContent = transcript;
  takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
  console.log("Button clicked");
  content.textContent = "Listening...";
  recognition.start();
});

function takeCommand(msg){
  if(msg.includes('hey')|| msg.includes('hello') || msg.includes('hi')){
    speak("Hello, how can I assist you?");
  }
  if(msg.includes("open")){
    const domain = msg.split("open")[1].trim();
    speak("Opening"+ domain);
    window.open(`https://${domain}com`,"_blank");
  }
  if(msg.includes('what is') || msg.includes('who is')  || msg.includes('which is') || msg){
    window.open(`https://www.google.com/search?q=${msg.replace("","+")}`,'_blank');
    const finalText = "This is what I found on internet regarding" + msg;
    speak(finalText);
  }
}