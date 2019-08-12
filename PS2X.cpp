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
#include "PS2_Driver.h"

using namespace pxt;

//% weight=20 color=#436EEE icon="\uf108"
namespace PS2X_PAD {
	PS2X *PS2;
	
    //%
    void PS2X_PAD_Init() {
        PS2->PS2_Init();
    }
	
    //%
    void PS2X_PAD_Scan() {
        PS2->read_gamepad();    
        
    }
    
    //%
    bool PS2X_Key(unsigned int button) {
        if (PS2->read_gamepad() == false)
            return false;
        return PS2->ButtonPressed(button);
    }
}

