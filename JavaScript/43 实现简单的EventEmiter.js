class EventEmiter {
  constructor() {
    this.events = {};
  }

  on(event, fn) {
    if (this.events[event]) {
      this.events[event].push(fn);
    } else {
      this.events[event] = [fn];
    }
  }

  emit(event, ...args) {
    this.events[event].forEach((fn) => {
      fn.apply(this, args);
    });
  }

  remove(event, fn) {
    // delete this.events[event];
    if (this.events[event]) {
      const index = this.events[event].findIndex((func) => func === fn);
      console.log(index)
      if (index > -1) {
        this.events[event].splice(index, 1);
      }
    }
  }
}

const pub = new EventEmiter();

pub.on("test1", (str) => {
  console.log(str);
});
const listener = (str) => {
  console.log(str);
};
pub.on("test1", listener);
pub.emit("test1", "hello word");
pub.remove("test1", listener);
pub.emit("test1", "hello word");

