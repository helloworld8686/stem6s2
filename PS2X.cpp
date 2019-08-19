/*****************************************************************************
* | File      	:   LCD1in8.cpp
* | Author      :   Waveshare team
* | Function    :   Contorl lcd Show
* | Info        :
*----------------
* | This version:   V1.0
* | Date        :   2018-05-02
* | Info        :   Basic version
*
******************************************************************************/
#include "pxt.h"
#include "MicroBitPin.h"
#include "PS2_Driver.h"
#include "mbed.h"
//PS2



using namespace pxt;


namespace STEM6S2 {
	PS2X  PS2;
#if 0
    MicroBitPin P16(MICROBIT_ID_IO_P16, MICROBIT_PIN_P16, PIN_CAPABILITY_DIGITAL);
    DigitalOut  P16_CS(MICROBIT_PIN_P16);
#endif
    //%
    void PS2X_PAD_Init() {
        PS2.PS2_Init();
    }
    //%
    void PS2X_PAD_Scan() {
        PS2.read_gamepad();    
    }

    #if 0
    //%
    void PS2X_PAD_Scan() {
        wait_ms(10);
        P16_CS = 0;
        wait_ms(10);
        P16_CS = 1;      
    }
    #endif
	#if 0 
    //%
    void PS2X_PAD_Scan() {
        wait_ms(10);
        P16.setDigitalValue(0);
        wait_ms(10);
        P16.setDigitalValue(1);      
    }
    #endif
     
  

    //%
    int PS2X_ButtonPressed() 
    {      
        return PS2.ButtonPressed();
    }

    //%
    int PS2X_ButtonReleased() 
    {      
        return PS2.ButtonReleased();
    }

}

