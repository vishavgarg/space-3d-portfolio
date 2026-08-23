// Generic Object Pool for high-performance recycling of bullets, particles, and temporary vectors

export class ObjectPool {
  constructor(factoryFn, initialSize = 30) {
    this.factoryFn = factoryFn;
    this.pool = [];
    this.active = [];

    for (let i = 0; i < initialSize; i++) {
      this.pool.push(this.factoryFn());
    }
  }

  acquire() {
    let item;
    if (this.pool.length > 0) {
      item = this.pool.pop();
    } else {
      item = this.factoryFn();
    }
    this.active.push(item);
    return item;
  }

  release(item) {
    const index = this.active.indexOf(item);
    if (index !== -1) {
      this.active.splice(index, 1);
      this.pool.push(item);
    }
  }

  releaseAll() {
    while (this.active.length > 0) {
      this.pool.push(this.active.pop());
    }
  }

  getActive() {
    return this.active;
  }
}
