
const enum STEM6S2Mode{
    //% block="手动模式"
    MANUAL = 0,
    //% block="自动巡线模式"
    AUTOMATIC = 1
}

//% weight=20 color=#436EEE icon="\uf108"
namespace STEM6S2{
    let LineFollowingInit = false
    let initial_motor_speed = 100
    let outlineCnt = 0
    let input = 0
    let ouput = 0
    
    //% blockId=PID_Init
    //% blockGap=8
    //% block="PID_Init"
    //% shim=STEM6S2::PID_Init
    //% weight=200
    function PID_Init(): void{
        return;
    }

    //% blockId=GetTestData
    //% blockGap=8
    //% block="GetTestData Init"
    //% shim=STEM6S2::GetTestData
    //% weight=200
    function GetTestData(): number {
        return 0;
    }
    
    
    //% blockId=Compute
    //% blockGap=8
    //% block="Compute Init"
    //% shim=STEM6S2::Compute
    //% weight=200
    function Compute(): void {
        return;
    }

    //% blockId=SetInput
    //% blockGap=8
    //% block="SetInput"
    //% shim=STEM6S2::SetInput
    //% weight=200  
    function SetInput(value:number): void {
        return;
    }

    //% blockId=GetOutput
    //% blockGap=8
    //% block="GetOutput Init"
    //% shim=STEM6S2::GetOutput
    //% weight=200  
    function GetOutput(): number {
        return 0;
    }


    function echoTrace():number{
        let ret:number;
        ret = 0

        if (pins.digitalReadPin(DigitalPin.P4) == 0){
            ret |= 0x01
        }
        if (pins.digitalReadPin(DigitalPin.P5) == 0){
            ret |= 0x02
        }
        if (pins.digitalReadPin(DigitalPin.P6) == 0){
            ret |= 0x04
        }
        if (pins.digitalReadPin(DigitalPin.P7) == 0){
            ret |= 0x08
        }
        if (pins.digitalReadPin(DigitalPin.P1) == 0){
            ret |= 0x10
        }
        return ret
    }



    //% blockId=SetMode
    //% blockGap=8
    //% block="SetMode"
    //% shim=STEM6S2::SetMode
    //% weight=200
    function SetMode(value:number): void {
        return;
    }
    //% blockId=GetMode
    //% blockGap=8
    //% block="GetMode"
    //% shim=STEM6S2::GetMode
    //% weight=200
    function GetMode(): number {
        return 0;
    }

    //% subcategory="自动巡线模式"
    //% blockId=IsModeLineFollowing
    //% blockGap=8
    //% block="当自动巡线模式时"
    //% weight=200
    export function IsModeLineFollowing(): boolean {
        return (GetMode() == STEM6S2Mode.AUTOMATIC);
    }

    //% subcategory="自动巡线模式"
    //% blockId=SetModeLineFollowing
    //% blockGap=8
    //% block="将小车设置为%mode|模式"
    //% weight=195
    export function SetModeLineFollowing(mode:STEM6S2Mode): void{
        LineFollowingInit = false
        SetMode(mode)    
        return; 
    }    



    //% subcategory="自动巡线模式"
    //% blockId=PS2X_INIT
    //% blockGap=8
    //% block="自动选线模块初始化"
    //% weight=195
    export function LineFollowing_Init(): void{
        let pos
        basic.forever(function () {
            basic.pause(10)
            if (GetMode() != STEM6S2Mode.AUTOMATIC)
            {
                return
            }
            if (LineFollowingInit == false){
                pins.setPull(DigitalPin.P4,PinPullMode.PullNone)
                pins.setPull(DigitalPin.P5,PinPullMode.PullNone)
                pins.setPull(DigitalPin.P6,PinPullMode.PullNone)
                pins.setPull(DigitalPin.P7,PinPullMode.PullNone)
                pins.setPull(DigitalPin.P1,PinPullMode.PullNone)
                LineFollowingInit = true
                outlineCnt = 0
                input = 0
                ouput = 0
                PID_Init()
            }
            pos = echoTrace()
            if (pos == 0x00 || pos == 0x1f)
            {
                outlineCnt++;
            }
            else if ((pos & 0x01) == 0x01)
            {
                outlineCnt = 0;
                input = 4;
            }
            else if ((pos & 0x10) == 0x10)
            {
                outlineCnt = 0;
                input = -4;
            }
            else if ((pos & 0x08) == 0x08)
            {
                outlineCnt = 0;
                input = -2;
            }
            else if ((pos & 0x02) == 0x02)
            {
                outlineCnt = 0;
                input = 2;
            }
            else
            {
                outlineCnt = 0;
                input = 0;
            }
            if (outlineCnt > 100)
            {
                //   motorController.stopMoving();
                LineFollowingInit = false;
                SetModeLineFollowing(STEM6S2Mode.MANUAL)
                STEM6S2.SetMecanum(MOTOR_Dir.Stop, 0)
            }
            else
            {

                SetInput(input)
                Compute()
                ouput = GetOutput()
    /*
                serial.writeString("[")
                serial.writeNumber(GetTestData())
                serial.writeString("]")
                serial.writeString("input:")
                serial.writeNumber(input)
                serial.writeString("      ouput:")
                serial.writeNumber(ouput)
                serial.writeString("\n")*/

                let left_motor_speed = initial_motor_speed + ouput
                let right_motor_speed = initial_motor_speed - ouput
                if (left_motor_speed > 255)
                    left_motor_speed = 255
                if (left_motor_speed < -255)    
                    left_motor_speed = -255

                if (right_motor_speed > 255)
                    right_motor_speed = 255
                if (right_motor_speed < -255)    
                    right_motor_speed = -255

                left_motor_speed *=16    

                right_motor_speed *=16
    
                STEM6S2.SetMecanum_Move(left_motor_speed,right_motor_speed)
            }
        })        
    }
}    