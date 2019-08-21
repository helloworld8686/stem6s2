// MakerBit blocks supporting a Keyestudio Infrared Wireless Module Kit
// (receiver module+remote controller)


const enum IrButton {

  //% block="1" 
  Number_1 = 0xA2,
  //% block="2"
  Number_2 = 0x62,
  //% block="3"
  Number_3 = 0xE2,
  //% block="4"
  Number_4 = 0x22,
  //% block="5"
  Number_5 = 0x02,
  //% block="6"
  Number_6 = 0xC2,
  //% block="7"
  Number_7 = 0xE0,
  //% block="8"
  Number_8 = 0xA8,
  //% block="9"
  Number_9 = 0x90,
  //% block="*"
  Star = 0x68,
  //% block="0"
  Number_0 = 0x98,
  //% block="#"
  Hash = 0xB0,
    //% block=" "
  Any = -1,
  //% block="▲"
  Up = 0x18,
  //% block=" "
  Unused_2 = -2,
  //% block="◀"
  Left = 0x10,
  //% block="OK"
  Ok = 0x38,
  //% block="▶"
  Right = 0x5A,
  //% block=" "
  Unused_3 = -3,
  //% block="▼"
  Down = 0x4A,
  //% block=" "
  Unused_4 = -4
}


const enum IrButtonAction {
  //% block="按下"
  Pressed = 0,
  //% block="弹开"
  Released = 1
}

const enum UltrasonicStep {
    idle = 0,
    sendTrig = 1,
    waitEcho = 2
}

const enum Ultrasoniccompare{
  //% block="小于"
  small = 0,    
  //% block="大于"
  big = 1
}

namespace STEM6S2 {
  let detectStep = UltrasonicStep.idle ;
  let timeout:number;
  let Ultrasonicinitialized = false
  const MICROBIT_STEM6S2_Ultrasonic_ID = 880
  let UltrasonicDuty  = 0

  /**
   * IO口检测到电压变化时，记录下脉宽周期，当完成一次高低变化时，触发一次 MICROBIT_MAKERBIT_IR_MARK_SPACE 事件，并且把高低变化的时间推送给事件
   * @param 
   */
  function enableUltrasonicDetection(pin: DigitalPin) {
    let mark = 0;
    let space = 0;

  /*   pins.onPulsed(pin, PulseValue.Low, () => {
      // HIGH
      mark = pins.pulseDuration();
    });*/

    pins.onPulsed(pin, PulseValue.High, () => {
      // LOW
      detectStep = UltrasonicStep.idle
      UltrasonicDuty = pins.pulseDuration();  
    });
  }

  /**
   * Connects to the IR receiver module at the specified pin.
   * @param pin IR receiver pin, eg: DigitalPin.P0
   */
  //% subcategory="遥控器"
  //% blockId="connectUltrasonic"
  //% block="超声波测距传感器初始化"
  //% weight=90
  function connectUltrasonic(): void {
      let activeCommand = 0;
      let repeatTimeout = 0;
      const REPEAT_TIMEOUT_MS = 120;
      detectStep = UltrasonicStep.idle
      control.inBackground(() => {
        pins.digitalWritePin(DigitalPin.P8, 0)
        enableUltrasonicDetection(DigitalPin.P9);
        while (true) {
          /*
          pins.digitalWritePin(DigitalPin.P8, 0)
          basic.pause(100)
          pins.digitalWritePin(DigitalPin.P8, 1)
          basic.pause(100)*/


          if (detectStep == UltrasonicStep.idle) {
            pins.digitalWritePin(DigitalPin.P8, 0)
            basic.pause(100)   
            detectStep = UltrasonicStep.sendTrig 
          } 
          else if (detectStep == UltrasonicStep.sendTrig){
            pins.digitalWritePin(DigitalPin.P8, 1)
            control.waitMicros(100)
            pins.digitalWritePin(DigitalPin.P8, 0)
            detectStep = UltrasonicStep.waitEcho
            timeout = 0
          }
          else{
            timeout = timeout + 1
            if (timeout > 200)
            {
              detectStep = UltrasonicStep.idle
            }
          } 
        }   
      });
      Ultrasonicinitialized = true
    }
    /**
   * Returns the code of the IR button that is currently pressed and 0 if no button is pressed.
   */
  //% subcategory="超声波"
  //% blockId=UltrasonicDutyRead
  //% block="超声波测量值%compare|%value厘米"
  //% weight=57
  export function UltrasonicDutyRead(value:number,compare:Ultrasoniccompare): boolean {
    if (Ultrasonicinitialized == false)
      connectUltrasonic()
    if (UltrasonicDuty == 0)
      return false

    if (compare == Ultrasoniccompare.big)
    {
      if (UltrasonicDuty*34/2000 > value)
      {
        return true
      }    
      else
        return false
    }
    else
    {
      if (UltrasonicDuty*34/2000 < value)
      {
        return true
      }    
      else
        return false
    }
  }
}
