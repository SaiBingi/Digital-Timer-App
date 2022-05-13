import {Component} from 'react'

import './index.css'

const initialState = {
  isTimerRunning: false,
  timeElapsedInSeconds: 0,
  timerLimitInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecreaseTimerLimitInMinutes = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncreaseTimerLimitInMinutes = () =>
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))

  renderTimerLimitController = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isButtonsDisabled = timeElapsedInSeconds > 0

    return (
      <div className="timer-limit-controller-container">
        <p className="limit-label">Set Timer limit</p>
        <div className="timer-limit-controller">
          <button
            className="limit-controller-button"
            disabled={isButtonsDisabled}
            onClick={this.onDecreaseTimerLimitInMinutes}
            type="button"
          >
            -
          </button>
          <div className="limit-label-and-value-container">
            <p className="limit-value">{timerLimitInMinutes}</p>
          </div>
          <button
            className="limit-controller-button"
            disabled={isButtonsDisabled}
            onClick={this.onIncreaseTimerLimitInMinutes}
            type="button"
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {
      isTimerRunning,
      timeElapsedInSeconds,
      timerLimitInMinutes,
    } = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="timer-controller-container">
        <button
          className="timer-controller-btn"
          onClick={this.onStartOrPauseTimer}
          type="button"
        >
          <img
            alt={startOrPauseAltText}
            className="timer-controller-icon"
            src={startOrPauseImageUrl}
          />
          <p className="timer-controller-label">
            {isTimerRunning ? 'Pause' : 'Start'}
          </p>
        </button>
        <button
          className="timer-controller-btn"
          onClick={this.onResetTimer}
          type="button"
        >
          <img
            alt="reset icon"
            className="timer-controller-icon"
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
          />
          <p className="timer-controller-label">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="timer-display-container">
            <div className="elapsed-time-container">
              <h1 className="elapsed-time">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="timer-state">{labelText}</p>
            </div>
          </div>
          <div className="controls-container">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer









// import {Component} from 'react'

// import './index.css'

// let isZeroTimer = false

// class DigitalTimer extends Component {
//   state = {
//     minutes: 25,
//     time: new Date(1, 1, 1, 1, 25, 0),
//     isTimerStarted: false,
//     isResetClicked: true,
//   }

//   onDecreaseMinutes = () => {
//     const {time} = this.state

//     this.setState({
//       time: new Date(1, 1, 1, 1, time.getMinutes() - 1),
//       minutes: time.getMinutes() - 1,
//     })
//   }

//   constantMinutes = () => {
//     const {minutes} = this.state

//     this.setState({minutes})
//   }

//   onIncreaseMinutes = () => {
//     const {time} = this.state

//     this.setState({
//       time: new Date(1, 1, 1, 1, time.getMinutes() + 1),
//       minutes: time.getMinutes() + 1,
//     })
//   }

//   zeroTimer = () => {
//     clearInterval(this.timerId)

//     this.setState(previousState => ({
//       isTimerStarted: !previousState.isTimerStarted,
//       minutes: 1,
//     }))
//   }

//   onResetTimer = () => {
//     this.setState({
//       time: new Date(1, 1, 1, 1, 25),
//       minutes: 25,
//       isResetClicked: true,
//     })
//     clearInterval(this.timerId)
//   }

//   onStartOrPause = () => {
//     const {isTimerStarted} = this.state

//     if (!isTimerStarted) {
//       this.timerId = setInterval(() => {
//         const {time} = this.state

//         this.setState({
//           time: new Date(1, 1, 1, 1, time.getMinutes(), time.getSeconds() - 1),
//         })
//       }, 1000)

//       this.setState({isTimerStarted: true, isResetClicked: false})
//     } else {
//       clearInterval(this.timerId)
//       this.setState({isTimerStarted: false, isResetClicked: false})
//     }
//   }

//   render() {
//     const {minutes, time, isTimerStarted, isResetClicked} = this.state

//     const getMinutes = time.getMinutes()
//     const getSeconds = time.getSeconds()

//     const getTime = `${
//       String(getMinutes).length === 1 ? `0${getMinutes}` : getMinutes
//     }:${String(getSeconds).length === 1 ? `0${getSeconds}` : getSeconds}`

//     if (!isZeroTimer && getTime === '00:00') {
//       this.zeroTimer()
//       isZeroTimer = true
//     }

//     const changeTimerStatus = isTimerStarted
//       ? {
//           iconStatus: 'Pause',
//           changeIcon:
//             'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png',
//           changeIconAltText: 'pause icon',
//           timerStatus: 'Running',
//           onIncreaseMin: this.constantMinutes,
//           onDecreaseMin: this.constantMinutes,
//         }
//       : {
//           iconStatus: 'Start',
//           changeIcon:
//             'https://assets.ccbp.in/frontend/react-js/play-icon-img.png',
//           changeIconAltText: 'play icon',
//           timerStatus: 'Paused',
//           onIncreaseMin: this.constantMinutes,
//           onDecreaseMin: this.constantMinutes,
//         }

//     const resetTimerStatus = isResetClicked
//       ? {
//           iconStatus: 'Start',
//           changeIcon:
//             'https://assets.ccbp.in/frontend/react-js/play-icon-img.png',
//           changeIconAltText: 'play icon',
//           timerStatus: 'Paused',
//           onIncreaseMin: this.onDecreaseMinutes,
//           onDecreaseMin: this.onIncreaseMinutes,
//         }
//       : ''

//     return (
//       <div className="bg-container">
//         <h1 className="heading">Digital Timer</h1>
//         <div className="container">
//           <div className="timer-container">
//             <div className="time-display">
//               <h1 className="timer">{getTime}</h1>
//               <p className="timer-status">
//                 {resetTimerStatus.timerStatus || changeTimerStatus.timerStatus}
//               </p>
//             </div>
//           </div>
//           <div className="set-timer-limit">
//             <div className="icons-container">
//               <div>
//                 <button
//                   type="button"
//                   className="icon-button icon-text"
//                   onClick={this.onStartOrPause}
//                 >
//                   <img
//                     src={
//                       resetTimerStatus.changeIcon ||
//                       changeTimerStatus.changeIcon
//                     }
//                     alt={
//                       resetTimerStatus.changeIconAltText ||
//                       changeTimerStatus.changeIconAltText
//                     }
//                     className="icon"
//                   />
//                   <p className="icon-status">
//                     {resetTimerStatus.iconStatus ||
//                       changeTimerStatus.iconStatus}
//                   </p>
//                 </button>
//               </div>
//               <div>
//                 <button
//                   type="button"
//                   className="icon-button icon-text"
//                   onClick={this.onResetTimer}
//                 >
//                   <img
//                     src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
//                     alt="reset icon"
//                     className="icon"
//                   />
//                   <p className="icon-status">Reset</p>
//                 </button>
//               </div>
//             </div>
//             <div className="set-timer">
//               <p className="set-timer-text">Set Timer limit</p>
//               <div className="increase-decrease-container">
//                 <button
//                   type="button"
//                   className="operator plus-minus-button"
//                   onClick={
//                     resetTimerStatus.onIncreaseMin ||
//                     changeTimerStatus.onIncreaseMin
//                   }
//                 >
//                   -
//                 </button>
//                 <p className="setting-time">{minutes}</p>
//                 <button
//                   type="button"
//                   className="operator plus-minus-button"
//                   onClick={
//                     resetTimerStatus.onDecreaseMin ||
//                     changeTimerStatus.onDecreaseMin
//                   }
//                 >
//                   +
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

// export default DigitalTimer
