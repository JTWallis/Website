// If ever hitting a memory leak warning again, uncomment and run:
// --import ./src/trace-listeners.mjs ./node_modules/.bin/astro dev

/*
import { EventEmitter } from 'node:events';

const origAdd = EventEmitter.prototype.addListener;

EventEmitter.prototype.addListener = function (type, listener) {
  const count = this.listenerCount(type);
  if (count > 8) { // lower than the default 10, so you catch it early
    console.log(`\n[listener #${count}] event="${type}" on`, this.constructor.name);
    console.log(new Error().stack);
  }
  return origAdd.call(this, type, listener);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;
*/