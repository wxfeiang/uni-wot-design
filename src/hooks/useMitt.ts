// useMitt.ys
import mitt from 'mitt'

// 创建一个 mitt 实例，并导出相关的函数
const emitter = mitt()

export function useMitt() {
  return {
    emit: emitter.emit.bind(emitter),
    on: emitter.on.bind(emitter),
    off: emitter.off.bind(emitter),
    // 可以根据需要添加其他 mitt 方法
  }
}
