const enum PS2XButtonAction {
    //% block="按下"
    Pressed = 0,
    //% block="弹开"
    Released = 1
}

const enum PS2XButton {

    //% block=" "
    Unused_1 = -7,  
    //% block="L2"
    PSB_L2         = 0x0100, 
    //% block=" "
    Unused_2 = -8,
    //% block=" "
    Unused_3 = -9,   
    //% block=" " 
    Unused_4 = -10,
    //% block=" "
    Unused_5 = -11,  
    //% block="R2"
    PSB_R2         = 0x0200,   
    //% block=" "
    Unused_6 = -12,




    //% block=" "
    Unused_7 = -7,   
    //% block="L1"
    PSB_L1         = 0x0400,  
    //% block=" "
    Unused_8 = -8,
    //% block=" "
    Unused_9 = -9,   
    //% block=" " 
    Unused_10 = -10,
    //% block=" "
    Unused_11 = -11,  
    //% block="R1"
    PSB_R1         = 0x0800,   
    //% block=" "
    Unused_12 = -12,





    //% block=" "
    Unused_13 = -13,       
    //% block="▲"
    PSB_PAD_UP     = 0x0010,
    //% block=" " 
    Unused_14 = -14,
    //% block=" "
    Unused_15 = -15,     
    //% block=" "
    Unused_16 = -16,
    //% block=" "
    Unused_17 = -17,   
    //% block="△"
    PSB_TRIANGLE   = 0x1000,
    //% block=" " 
    Unused_18 = -18,


    //% block="◀"
    PSB_PAD_LEFT   = 0x0080,
    //% block=" "
    Unused_19 = -19,  
    //% block="▶"
    PSB_PAD_RIGHT  = 0x0020,
    //% block="SELECT"  
    PSB_SELECT     = 0x0001,
    //% block="START"
    PSB_START      = 0x0008,
    //% block="□"
    PSB_SQUARE     = 0x8000,
    //% block=" "
    Unused_20 = -20,
    //% block="○"
    PSB_CIRCLE     = 0x2000,



    //% block=" "
    Unused_21 = -21,    
    //% block="▼"
    PSB_PAD_DOWN   = 0x0040,
    //% block=" " 
    Unused_22 = -22,  
    //% block="L3" 
    PSB_L3         = 0x0002,
    //% block="R3"
    PSB_R3         = 0x0004,  
    //% block=" "
    Unused_23 = -26, 
    //% block="×"
    PSB_CROSS      = 0x4000,    
    //% block=" "
    Unused_24 = -24
}

//% weight=20 color=#436EEE icon="\uf108"
//% category="思特牛S2"
namespace STEM6S2{
    const MICROBIT_PS2X_BUTTON_PRESSED_ID = 791;
    const MICROBIT_PS2X_BUTTON_RELEASED_ID = 792;
    
    //% blockId=PS2X_PAD_Init
    //% blockGap=8
    //% block="PS2X_PAD_Init"
    //% shim=STEM6S2::PS2X_PAD_Init
    //% weight=200
    function PS2X_PAD_Init(): void {
        return;
    }

    //% blockId=PS2X_PAD_Scan
    //% blockGap=8
    //% block="PS2X_PAD_Scan"
    //% shim=STEM6S2::PS2X_PAD_Scan
    //% weight=195
    function PS2X_PAD_Scan(): void {
        return;
    }


    //% blockId=PS2X_ButtonPressed
    //% blockGap=8
    //% block="PS2X_ButtonPressed"
    //% shim=STEM6S2::PS2X_ButtonPressed
    //% weight=195
    function PS2X_ButtonPressed(): number {
        return 0;
    }


    //% subcategory="PS2遥控器"
    //% blockId=PS2X_INIT
    //% blockGap=8
    //% block="PS2遥控器初始化"
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

    //% subcategory="PS2遥控器"
    //% blockId=onPS2Button
    //% block="当PS2遥控器按键|%button|被|%action|时"
    //% button.fieldEditor="gridpicker"
    //% button.fieldOptions.columns=8
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
