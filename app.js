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

function takeCommand(msg) {
  if (msg.includes("hey") || msg.includes("hello") || msg.includes("hi")) {
    speak("Hello, how can I assist you?");
  }
  else if (msg.includes("Thank You") || msg.includes("Thanks")) {
    speak("My pleasue, It feels good to help you!");
  } else if (msg.includes("calculator")) {
    window.open("Calculator:///");
    speak("Opening Calculator");
  } else if (msg.includes("open")) {
    const domain = msg.split("open")[1].trim();
    speak("Opening" + domain);
    window.open(`https://${domain}com`, "_blank");
  } else if (msg.includes("time")) {
    speak(
      new Date().toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit",
      })
    );
  } else if (msg.includes("date") || msg.includes("day")) {
    speak(
      new Date().toLocaleTimeString(undefined, {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  } else if (
    msg.includes("what is") ||
    msg.includes("who is") ||
    msg.includes("which is")
  ) {
    window.open(
      `https://www.google.com/search?q=${msg.replace("", "+")}`,
      "_blank"
    );
    const finalText = "This is what I found on internet regarding" + msg;
    speak(finalText);
  } else if (msg.includes("play")) {
    const song = msg.split("play")[1].trim();
    speak(`Playing ${song}`);
    const songUrl = `https://www.youtube.com/results?search_query=${song}`;
    window.open(songUrl, "_blank");
  } else if (msg.includes("stop")) {
    speak("Stopping music");
    window.open(
      "https://www.youtube.com/results?search_query=stop+music",
      "_blank"
    );
  }
   else if(msg){
    window.open(
      `https://www.google.com/search?q=${msg.replace("", "+")}`,
      "_blank"
    );
    const finalText = "This is what I found on internet regarding" + msg;
    speak(finalText);
  }
}
