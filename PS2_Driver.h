/*****************************************************************************
* | File        :   LCD1in8_Driver.h
* | Author      :   Waveshare team
* | Function    :   ILI9486 Drive function
* | Info        :
*   Image scanning
*      Please use progressive scanning to generate images or fonts
*----------------
* | This version:   V1.0
* | Date        :   2018-01-11
* | Info        :   Basic version
*
******************************************************************************/
#ifndef __LCD_DRIVER_H
#define __LCD_DRIVER_H

#include "MicroBitPin.h"
#include "mbed.h"

class PS2X{
private:
    unsigned char PS2data[21];
    void spi_init();
    void Scan(void); 
    void sendCommandString(unsigned char *, int );
    bool en_Rumble;
    bool en_Pressures;
    unsigned char read_delay;
    unsigned long last_read;

    unsigned int last_buttons;
    unsigned int buttons;

public:
    void config_gamepad();
	void PS2_Init(void);
	void PS2_Read(void);
    bool  read_gamepad(void);
    void enableRumble();
    bool enablePressures();
    bool NewButtonState(unsigned int button); 
    bool Button(unsigned int button);
    bool ButtonPressed(unsigned int button) ;
    bool ButtonReleased(unsigned int button); 
};


#endif