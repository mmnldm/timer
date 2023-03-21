// * CLASS OBJECT

export default class Timer {
  constructor(root) {
    root.innerHTML = Timer.getHTML();

    this.el = {
      minutes: root.querySelector(".minutes"),
      seconds: root.querySelector(".seconds"),
      control: root.querySelector(".control"),
      reset: root.querySelector(".reset"),
    };

    this.interval = null;
    this.remainingSeconds = 0;

    this.el.control.addEventListener("click", () => {
      if (this.interval === null) {
        this.start();
      } else {
        this.stop();
      }
    });

    this.el.reset.addEventListener("click", () => {
      const inputMinutes = prompt("Enter number of minutes");

      if (inputMinutes < 60) {
        this.stop();
        this.remainingSeconds = inputMinutes * 60;
        this.updateInterfaceTime();
      }
    });
  }

  // * FUNCTIONS

  updateInterfaceTime() {
    const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;

    this.el.minutes.textContent = minutes.toString().padStart(2, "0");
    this.el.seconds.textContent = seconds.toString().padStart(2, "0");
  }

  updateInterfaceControls() {
    if (this.interval === null) {
      this.el.control.innerHTML = `<span class = "material-icons">play_arrow</span>`;
      this.el.control.classList.add("start");
      this.el.control.classList.remove("stop");
    } else {
      this.el.control.innerHTML = `<span class = "material-icons">pause</span>`;
      this.el.control.classList.add("stop");
      this.el.control.classList.remove("start");
    }
  }

  start() {
    if (this.remainingSeconds === 0) return;

    this.interval = setInterval(() => {
      this.remainingSeconds--;
      this.updateInterfaceTime();

      if (this.remainingSeconds === 0) {
        let audio = new Audio ('./mp3/service-bell.mp3');
        audio.play();
        this.stop();
      }
    }, 1000);

    this.updateInterfaceControls();
  }

  stop() {
    clearInterval(this.interval);

    this.interval = null;

    this.updateInterfaceControls();
  }

  static getHTML() {
    return `
        <span class="minutes text-5xl font-bold" id="">00</span>
        <span class="part text-5xl font-bold" id="">:</span>
        <span class="seconds text-5xl font-bold" id="">00</span>

    <button type="button"class="control start bg-green-600 text-white ml-8 h-14 w-14 rounded-full cursor-pointer" ><span class="material-icons">play_arrow</span></button>
    <button type="button" class="reset bg-red-500 text-white ml-8 h-14 w-14 rounded-full cursor-pointer" > <span class="material-icons">timer</span></button>
        `;
  }
}
