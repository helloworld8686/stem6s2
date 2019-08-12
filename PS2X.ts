//% weight=20 color=#436EEE icon="\uf108"
namespace PS2X_PAD{

    //% blockId=PS2X_PAD_Init
    //% blockGap=8
    //% block="PS2X_PAD_Init"
    //% shim=PS2X_PAD::PS2X_PAD_Init
    //% weight=200
    export function PS2X_PAD_Init(): void {
        return;
    }

    //% blockId=PS2X_PAD_Scan
    //% blockGap=8
    //% block="PS2X_PAD_Scan"
    //% shim=PS2X_PAD::PS2X_PAD_Scan
    //% weight=195
    export function PS2X_PAD_Scan(): void {
        return;
    }

    //% blockId=PS2X_Key
    //% blockGap=8
    //% block="按键 %button"
    //% shim=PS2X_PAD::PS2X_Key
    //% weight=194
    export function PS2X_Key(button: number): boolean {
        return true;
    }   
}        
