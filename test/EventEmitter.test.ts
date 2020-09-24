import Emitter from '../src/EventEmitter'
import util from 'util'

const Bell = () => {
  Emitter.call(this)
}
util.inherits(Bell, Emitter)
let bell = new Bell()

const studentIntoClassroom = (things, num) => {
  console.log(`学生带着${things}进入${num}教室`)
}
const teacherIntoClassroom = (things, num) => {
  console.log(`讲师带着${things}进入${num}教室`)
}
const masterIntoClassroom = (things, num) => {
  console.log(`校长带着${things}进入${num}教室`)
}
const LightClassroom = (things, num) => {
  console.log(`教室里的灯亮了`)
}

// test('#on #emit', () => {
//   bell.setMaxListeners(5)
//   bell.on('响', studentIntoClassroom)
//   bell.on('响', teacherIntoClassroom)
//   bell.on('响', studentIntoClassroom)
//   bell.on('响', teacherIntoClassroom)
//   bell.on('响', studentIntoClassroom)
//   bell.on('响', teacherIntoClassroom)
//   bell.on('响', studentIntoClassroom)
  // bell.on('响', teacherIntoClassroom)
  // bell.on('响', studentIntoClassroom)
  // bell.on('响', teacherIntoClassroom)
  // bell.on('响', studentIntoClassroom)
  // bell.on('响', teacherIntoClassroom)
  // bell.on('响', studentIntoClassroom)
  // bell.on('响', teacherIntoClassroom)
  // bell.on('响', studentIntoClassroom)
  // bell.on('响', teacherIntoClassroom)
  // bell.on('响', studentIntoClassroom)
  // bell.on('响', teacherIntoClassroom)
  // bell.on('响', studentIntoClassroom)
  // bell.on('响', teacherIntoClassroom)
  // bell.on('响', studentIntoClassroom)
  // bell.on('响', teacherIntoClassroom)
  // bell.on('响', studentIntoClassroom)
  // bell.on('响', teacherIntoClassroom)
  // bell.on('响', studentIntoClassroom)
  // bell.on('响', teacherIntoClassroom)
  // bell.on('响', studentIntoClassroom)
  // bell.on('响', teacherIntoClassroom)
  // bell.on('响', studentIntoClassroom)
  // bell.on('响', teacherIntoClassroom)
  // bell.on('响', studentIntoClassroom)
  // bell.on('响', teacherIntoClassroom)
  // bell.once('响', masterIntoClassroom)
  
  // bell.emit('响', '书', 302)
//   console.log('=================')
//   bell.emit('响', '书', 301)
// })

test('#on #emit', () => {
  bell.setMaxListeners(5)
  bell.on('响', studentIntoClassroom)
  bell.on('响', teacherIntoClassroom)
  bell.on('响', masterIntoClassroom)
  bell.emit('响', '书', 302)
  bell.emit('响', '书', 301)
})

// test('#once #emit', () => {
//   bell.setMaxListeners(5)
//   bell.once('响', masterIntoClassroom)
//   bell.emit('响', '书', 301)
// })