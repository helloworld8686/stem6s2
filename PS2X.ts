const enum PS2XButtonAction {
    //% block="按下"
    Pressed = 0,
    //% block="弹开"
    Released = 1
}

const enum PS2XButton {
    //% block="SELECT"  
    PSB_SELECT     = 0x0001,
    //% block="1" 
    PSB_L3         = 0x0002,
    //% block="2"
    PSB_R3         = 0x0004,
    //% block="3"
    PSB_START      = 0x0008,
    //% block="4"
    PSB_PAD_UP     = 0x0010,
    //% block="5"
    PSB_PAD_RIGHT  = 0x0020,
    //% block="6"
    PSB_PAD_DOWN   = 0x0040,
    //% block="7"
    PSB_PAD_LEFT   = 0x0080,
    //% block="8"
    PSB_L2         = 0x0100,
    //% block=""9
    PSB_R2         = 0x0200,
    //% block="10"
    PSB_L1         = 0x0400,
    //% block="11"
    PSB_R1         = 0x0800,
    //% block="12"
    PSB_GREEN      = 0x1000,
    //% block="13"
    PSB_RED        = 0x2000,
    //% block="14"
    PSB_BLUE       = 0x4000,
    //% block="15"
    PSB_PINK       = 0x8000,
    //% block="16"
    PSB_TRIANGLE   = 0x1000,
    //% block="17"
    PSB_CIRCLE     = 0x2000,
    //% block="18"
    PSB_CROSS      = 0x4000,
    //% block="19"
    PSB_SQUARE     = 0x8000
}

//% weight=20 color=#436EEE icon="\uf108"
namespace PS2X_PAD{
    const MICROBIT_PS2X_BUTTON_PRESSED_ID = 791;
    const MICROBIT_PS2X_BUTTON_RELEASED_ID = 792;
    //% blockId=PS2X_PAD_Init
    //% blockGap=8
    //% block="PS2X_PAD_Init"
    //% shim=PS2X_PAD::PS2X_PAD_Init
    //% weight=200
    function PS2X_PAD_Init(): void {
        return;
    }

    //% blockId=PS2X_PAD_Scan
    //% blockGap=8
    //% block="PS2X_PAD_Scan"
    //% shim=PS2X_PAD::PS2X_PAD_Scan
    //% weight=195
    function PS2X_PAD_Scan(): void {
        return;
    }


    //% blockId=PS2X_ButtonPressed
    //% blockGap=8
    //% block="PS2X_ButtonPressed"
    //% shim=PS2X_PAD::PS2X_ButtonPressed
    //% weight=195
    function PS2X_ButtonPressed(): number {
        return 0;
    }



    //% blockId=PS2X_INIT
    //% blockGap=8
    //% block="PS2X_INIT"
    //% weight=195
    export function PS2X_INIT(): void{
        let temp = 0;
        control.inBackground(function () {
            PS2X_PAD_Init()
            while(true)
            {
                basic.pause(10)
                PS2X_PAD_Scan()
                temp = PS2X_ButtonPressed()
                if (temp > 0)
                {
                    control.raiseEvent(
                        MICROBIT_PS2X_BUTTON_PRESSED_ID,
                        temp
                        )
                }   
            }
        })
    }


    //% blockId=onPS2Button
    //% block="当遥控器按键|%button|被|%action|时"
    //% button.fieldEditor="gridpicker"
    //% button.fieldOptions.columns=3
    //% button.fieldOptions.tooltips="false"
    //% weight=69
    export function onPS2Button(
    button: PS2XButton,
    action: PS2XButtonAction,
    handler: () => void
    ) {
        control.onEvent(      
            action === PS2XButtonAction.Pressed
            ? MICROBIT_PS2X_BUTTON_PRESSED_ID
            : MICROBIT_PS2X_BUTTON_RELEASED_ID, 
            button, 
            function () {
                 handler();
            })       
    }
}        
