//% weight=20 color=#436EEE icon="\uf108"
namespace PS2X_PAD{

    //% blockId=LCD_Init
    //% blockGap=8
    //% block="LCD1IN8 Init"
    //% shim=PS2X_PAD::PS2X_PAD_Init
    //% weight=200
    export function PS2X_PAD_Init(): void {
        return;
    }

    //% blockId=LCD_Clear
    //% blockGap=8
    //% block="Clear screen and cache"
    //% shim=PS2X_PAD::PS2X_PAD_Scan
    //% weight=195
    export function PS2X_PAD_Scan(): void {
        return;
    }

    //% blockId=LCD_Filling
    //% blockGap=8
    //% block="按键 %button"
    //% shim=PS2X_PAD::PS2X_Key
    //% weight=194
    export function PS2X_Key(button: number): boolean {
        return true;
    }   
}        
