export default class Frame {
  constructor () {
    this.frames = []
    
    this.#init()
  }

  #onBefore = () => {}

  get onBefore () {
    return this.#onBefore
  }

  set onBefore (callbackfn) {
    this.#onBefore = callbackfn
  }

  #init () {
    const callback = async () => {
      if (await this.#onBefore()) {
        this.frames.forEach((frame) => {
          typeof frame === 'function' && frame()
        })
        requestAnimationFrame(callback)
      }
    }
    requestAnimationFrame(callback)
  }

  pushFrame (callbackfn) {
    this.frames.push(callbackfn)
  }
}
